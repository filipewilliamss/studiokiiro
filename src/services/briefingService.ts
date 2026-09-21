import { supabase } from "@/integrations/supabase/client";

/**
 * Gera um token curto, amigável e seguro de 8 caracteres alfanuméricos.
 */
export const generateShortToken = (length = 8): string => {
  const chars = "23456789abcdefghjkmnpqrstuvwxyz";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => chars[b % chars.length]).join("");
};

/**
 * Retorna a URL pública curta do briefing baseado no token fornecido.
 * Exemplo: https://studiokiiro.com/b/k8m2p9xr
 */
export const getBriefingUrl = (token: string): string => {
  return `${window.location.origin}/b/${token}`;
};

/**
 * Garante a existência de um link de briefing para um determinado projeto.
 * Se já existir, retorna o token. Se não existir, gera um token curto e insere no banco.
 */
export const ensureBriefingToken = async (projectId: string): Promise<string | null> => {
  try {
    const existing = await supabase
      .from("briefing_links")
      .select("token")
      .eq("project_id", projectId)
      .maybeSingle();

    if (existing.data?.token) {
      return existing.data.token;
    }

    const generatedToken = generateShortToken(8);

    const { data: created, error } = await supabase
      .from("briefing_links")
      .insert({
        project_id: projectId,
        token: generatedToken,
      })
      .select("token")
      .single();

    if (error) {
      // Se ocorreu conflito, busca novamente
      const retry = await supabase
        .from("briefing_links")
        .select("token")
        .eq("project_id", projectId)
        .maybeSingle();
      return retry.data?.token ?? null;
    }

    return created?.token ?? generatedToken;
  } catch (err) {
    console.error("Erro ao gerar token de briefing:", err);
    return null;
  }
};

/**
 * Regera um novo token de briefing curto para o projeto, invalidando o anterior caso necessário.
 */
export const regenerateBriefingToken = async (projectId: string): Promise<string | null> => {
  try {
    const newToken = generateShortToken(8);
    const { error } = await supabase
      .from("briefing_links")
      .upsert(
        {
          project_id: projectId,
          token: newToken,
          revoked: false,
        },
        { onConflict: "project_id" }
      );

    if (error) {
      console.error("Erro ao regerar token:", error);
      return null;
    }

    return newToken;
  } catch (err) {
    console.error("Erro ao regerar token:", err);
    return null;
  }
};

/**
 * Formata a mensagem padrão do WhatsApp com as informações do cliente e o link do briefing.
 */
export const buildBriefingMessage = (
  clientName: string,
  projectName: string,
  projectType: string,
  token: string
): string => {
  const url = getBriefingUrl(token);
  return `Olá, ${clientName}! 👋

Para darmos início ao desenvolvimento do seu projeto *${projectName}* (${projectType}), preparamos um formulário exclusivo de briefing para entender suas necessidades, preferências e referências:

👉 ${url}

Preencha com o máximo de detalhes possível para garantirmos um resultado incrível!
Qualquer dúvida, estamos à disposição.
Studio Kiiro`;
};
