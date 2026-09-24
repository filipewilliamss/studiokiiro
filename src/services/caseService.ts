/**
 * caseService.ts
 * Gerenciamento centralizado de cases de portfólio do Studio Kiiro.
 * Combina os cases originais com novos cases criados dinamicamente no painel Admin,
 * com suporte a upload de imagens no Supabase Storage e controle de destaques na Home.
 */
import { projects as initialProjects, type Project } from "@/data/projects";
import { supabase } from "@/integrations/supabase/client";

const CUSTOM_CASES_KEY = "studio_kiiro_custom_cases";
const FEATURED_SLUGS_KEY = "studio_kiiro_featured_slugs";

// Slugs padrão que aparecem em destaque na Home
const DEFAULT_FEATURED_SLUGS = [
  "akedah-podcast",
  "construmar",
  "tabernaculo-da-trindade",
  "team-luisa-crosstraining",
];

export interface CustomCaseItem extends Omit<Partial<Project>, "id"> {
  id: number | string;
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  bgColor: string;
  intro: string;
  challenge: string;
  solution: string;
  result?: string;
  logo: string;
  pages: string[];
  isCustom?: boolean;
  featuredOnHome?: boolean;
}

/**
 * Retorna todos os cases (iniciais + customizados salvos no localStorage/Supabase).
 */
export function getAllCases(): Project[] {
  let customCases: Project[] = [];
  try {
    const saved = localStorage.getItem(CUSTOM_CASES_KEY);
    if (saved) {
      customCases = JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Falha ao carregar custom cases:", e);
  }

  // Mescla sem duplicar slugs
  const initialSlugs = new Set(initialProjects.map((p) => p.slug));
  const uniqueCustom = customCases.filter((c) => !initialSlugs.has(c.slug));

  return [...initialProjects, ...uniqueCustom];
}

/**
 * Retorna os slugs dos projetos que devem ser exibidos na Home.
 */
export function getFeaturedSlugs(): string[] {
  try {
    const saved = localStorage.getItem(FEATURED_SLUGS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Falha ao ler featured slugs:", e);
  }
  return DEFAULT_FEATURED_SLUGS;
}

/**
 * Retorna os projetos em destaque para a Home.
 */
export function getFeaturedCases(): Project[] {
  const all = getAllCases();
  const featuredSlugs = new Set(getFeaturedSlugs());
  const featured = all.filter((p) => featuredSlugs.has(p.slug));
  return featured.length > 0 ? featured : all.slice(0, 4);
}

/**
 * Retorna um case pelo slug.
 */
export function getCaseBySlug(slug: string): Project | undefined {
  return getAllCases().find((p) => p.slug === slug);
}

/**
 * Salva ou atualiza um case customizado.
 */
export function saveCustomCase(newCase: Project): void {
  try {
    const saved = localStorage.getItem(CUSTOM_CASES_KEY);
    let list: Project[] = saved ? JSON.parse(saved) : [];
    const index = list.findIndex((c) => c.slug === newCase.slug || c.id === newCase.id);

    if (index >= 0) {
      list[index] = { ...list[index], ...newCase };
    } else {
      list.push({ ...newCase, id: Date.now() });
    }

    localStorage.setItem(CUSTOM_CASES_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Erro ao salvar case customizado:", e);
  }
}

/**
 * Deleta um case customizado.
 */
export function deleteCustomCase(slug: string): void {
  try {
    const saved = localStorage.getItem(CUSTOM_CASES_KEY);
    if (saved) {
      const list: Project[] = JSON.parse(saved);
      const filtered = list.filter((c) => c.slug !== slug);
      localStorage.setItem(CUSTOM_CASES_KEY, JSON.stringify(filtered));
    }
  } catch (e) {
    console.error("Erro ao deletar case customizado:", e);
  }
}

/**
 * Alterna se um case é exibido em destaque na Home.
 */
export function toggleFeaturedSlug(slug: string, isFeatured: boolean): void {
  try {
    let slugs = getFeaturedSlugs();
    if (isFeatured) {
      if (!slugs.includes(slug)) slugs.push(slug);
    } else {
      slugs = slugs.filter((s) => s !== slug);
    }
    localStorage.setItem(FEATURED_SLUGS_KEY, JSON.stringify(slugs));
  } catch (e) {
    console.error("Erro ao alternar destaque do case:", e);
  }
}

/**
 * Faz upload de imagem para o Supabase Storage (bucket 'files' ou 'images')
 * e retorna a URL pública gerada.
 */
export async function uploadCaseImage(file: File, folder = "cases"): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const safeName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

  // Tenta upload no bucket 'files'
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("files")
    .upload(safeName, file, { upsert: true });

  if (uploadError) {
    // Tenta fallback no bucket 'images'
    const { data: imgData, error: imgError } = await supabase.storage
      .from("images")
      .upload(safeName, file, { upsert: true });

    if (imgError) {
      throw new Error(`Falha no upload da imagem: ${imgError.message}`);
    }

    const { data: pubUrl } = supabase.storage.from("images").getPublicUrl(safeName);
    return pubUrl.publicUrl;
  }

  const { data: pubUrl } = supabase.storage.from("files").getPublicUrl(safeName);
  return pubUrl.publicUrl;
}
