import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FolderPlus, ExternalLink, Trash2, Pencil, Upload, Sparkles,
  Check, Star, Eye, Plus, Image as ImageIcon, Link as LinkIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  getAllCases,
  getFeaturedSlugs,
  toggleFeaturedSlug,
  saveCustomCase,
  deleteCustomCase,
  uploadCaseImage
} from "@/services/caseService";
import type { Project } from "@/data/projects";

export const CasesTab = () => {
  const [casesList, setCasesList] = useState<Project[]>(getAllCases());
  const [featuredSlugs, setFeaturedSlugs] = useState<string[]>(getFeaturedSlugs());
  const [openModal, setOpenModal] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: "",
    slug: "",
    category: "Identidade visual",
    client: "",
    year: new Date().getFullYear().toString(),
    bgColor: "#0B0C0B",
    coverImage: "",
    logo: "",
    heroBanner: "",
    subtitle: "",
    about: "",
    challenge: "",
    solution: "",
    objective: "",
    colors: "",
    typography: "",
    videoUrl: "",
    finalResult: "",
    pages: [] as string[],
    featuredOnHome: false,
  });

  const [newPageUrl, setNewPageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const refresh = () => {
    setCasesList(getAllCases());
    setFeaturedSlugs(getFeaturedSlugs());
  };

  const handleToggleFeatured = (slug: string, isChecked: boolean) => {
    toggleFeaturedSlug(slug, isChecked);
    setFeaturedSlugs(getFeaturedSlugs());
    toast.success(isChecked ? "Adicionado aos destaques da Home" : "Removido dos destaques da Home");
  };

  const openNewCaseDialog = () => {
    setEditingSlug(null);
    setForm({
      title: "",
      slug: "",
      category: "Identidade visual",
      client: "",
      year: new Date().getFullYear().toString(),
      bgColor: "#0B0C0B",
      coverImage: "",
      logo: "",
      heroBanner: "",
      subtitle: "",
      about: "",
      challenge: "",
      solution: "",
      objective: "",
      colors: "",
      typography: "",
      videoUrl: "",
      finalResult: "",
      pages: [],
      featuredOnHome: true,
    });
    setOpenModal(true);
  };

  const openEditCaseDialog = (p: Project) => {
    setEditingSlug(p.slug);
    setForm({
      title: p.title || "",
      slug: p.slug || "",
      category: p.category || "Identidade visual",
      client: p.client || "",
      year: p.year || "",
      bgColor: p.bgColor || "#0B0C0B",
      coverImage: p.coverImage || (p.pages ? p.pages[0] : ""),
      logo: p.logo || "",
      heroBanner: p.heroBanner || "",
      subtitle: p.subtitle || "",
      about: p.about || "",
      challenge: p.challenge || "",
      solution: p.solution || "",
      objective: p.objective || "",
      colors: p.colors || "",
      typography: p.typography || "",
      videoUrl: p.videoBlock?.url || "",
      finalResult: p.finalResult || p.result || "",
      pages: p.pages || [],
      featuredOnHome: featuredSlugs.includes(p.slug),
    });
    setOpenModal(true);
  };

  const handleTitleChange = (val: string) => {
    const autoSlug = val
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: editingSlug ? prev.slug : autoSlug,
    }));
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadCaseImage(file, "covers");
      setForm((prev) => ({ ...prev, coverImage: url }));
      toast.success("Imagem de capa carregada com sucesso!");
    } catch (err: any) {
      toast.error(err.message || "Erro no upload da imagem");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadCaseImage(files[i], "gallery");
        uploadedUrls.push(url);
      }
      setForm((prev) => ({
        ...prev,
        pages: [...prev.pages, ...uploadedUrls],
      }));
      toast.success(`${uploadedUrls.length} imagem(ns) adicionada(s) à galeria!`);
    } catch (err: any) {
      toast.error(err.message || "Erro ao carregar imagens");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddPageUrl = () => {
    if (!newPageUrl.trim()) return;
    setForm((prev) => ({
      ...prev,
      pages: [...prev.pages, newPageUrl.trim()],
    }));
    setNewPageUrl("");
  };

  const handleRemovePage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      pages: prev.pages.filter((_, i) => i !== index),
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) {
      toast.error("Título e slug são obrigatórios.");
      return;
    }

    const newCase: Project = {
      id: editingSlug ? (casesList.find((c) => c.slug === editingSlug)?.id || Date.now()) : Date.now(),
      slug: form.slug,
      title: form.title,
      category: form.category,
      client: form.client || "Studio Kiiro",
      year: form.year || new Date().getFullYear().toString(),
      bgColor: form.bgColor || "#0B0C0B",
      coverImage: form.coverImage || form.pages[0] || "",
      logo: form.logo || form.coverImage || "",
      heroBanner: form.heroBanner || form.coverImage || "",
      intro: form.subtitle || form.about || "",
      subtitle: form.subtitle,
      about: form.about,
      challenge: form.challenge,
      solution: form.solution,
      objective: form.objective,
      colors: form.colors,
      typography: form.typography,
      finalResult: form.finalResult,
      strategy: form.solution || "",
      result: form.finalResult || "",
      service: form.category,
      tags: [form.category],
      deliverables: ["Identidade Visual", "Aplicações"],
      role: "Design & Direção de Arte",
      pages: form.pages.length > 0 ? form.pages : [form.coverImage],
      videoBlock: form.videoUrl
        ? {
            title: "Motion / Vídeo",
            url: form.videoUrl,
            description: "Apresentação visual dinâmica.",
          }
        : undefined,
    };

    saveCustomCase(newCase);
    toggleFeaturedSlug(form.slug, form.featuredOnHome);
    toast.success("Case salvo com sucesso!");
    setOpenModal(false);
    refresh();
  };

  const handleDelete = (slug: string) => {
    if (confirm("Tem certeza que deseja remover este case?")) {
      deleteCustomCase(slug);
      toast.success("Case removido.");
      refresh();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0B0C0B] border border-white/10 p-5 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-[#FFCA16]" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#FFCA16] font-bold">
              Portfólio & Cases
            </span>
          </div>
          <h2 className="text-xl font-bold text-white font-display">
            Gerenciador de Cases do Studio Kiiro
          </h2>
          <p className="text-xs text-white/50 mt-0.5">
            Cadastre novos projetos, defina quais aparecem em destaque na Home e atualize conteúdos visuais.
          </p>
        </div>

        <Button
          onClick={openNewCaseDialog}
          className="bg-[#FFCA16] text-black hover:bg-[#FFCA16]/90 font-bold text-xs h-10 px-5 rounded-xl gap-2 shadow-lg shadow-[#FFCA16]/10 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Novo Case
        </Button>
      </div>

      {/* Grid de Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {casesList.map((p) => {
          const isFeatured = featuredSlugs.includes(p.slug);
          const cover = p.coverImage || (p.pages && p.pages[0]) || "";

          return (
            <div
              key={p.slug}
              className="bg-[#0B0C0B] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden flex flex-col justify-between transition-all"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/9] bg-zinc-900 overflow-hidden">
                {cover ? (
                  <img src={cover} alt={p.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[9px] font-bold uppercase tracking-wider text-[#FFCA16] border border-[#FFCA16]/30">
                    {p.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-white/40 mb-1">
                    <span>{p.client || "Studio Kiiro"}</span>
                    <span>{p.year}</span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-tight font-display">
                    {p.title}
                  </h3>
                </div>

                {/* Destaque na Home Toggle */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Star
                      className={`w-3.5 h-3.5 ${
                        isFeatured ? "text-[#FFCA16] fill-[#FFCA16]" : "text-white/30"
                      }`}
                    />
                    <span className="text-white/70 text-[11px]">Destaque na Home</span>
                  </div>
                  <Switch
                    checked={isFeatured}
                    onCheckedChange={(checked) => handleToggleFeatured(p.slug, checked)}
                  />
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  <a
                    href={`/projeto/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white text-[11px] h-8 rounded-lg gap-1.5"
                    >
                      <Eye className="w-3 h-3" /> Ver Página
                    </Button>
                  </a>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditCaseDialog(p)}
                    className="h-8 px-2.5 text-white/60 hover:text-white"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(p.slug)}
                    className="h-8 px-2.5 text-rose-400 hover:text-rose-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de Criação / Edição de Case */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-2xl bg-[#0B0C0B] border-white/15 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-lg text-white">
              {editingSlug ? "Editar Case de Portfólio" : "Novo Case de Portfólio"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSave} className="space-y-4 mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/60 font-medium">
                  Título do Projeto *
                </label>
                <Input
                  value={form.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="ex: Aura Cosméticos"
                  required
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/60 font-medium">
                  Slug (URL) *
                </label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="ex: aura-cosmeticos"
                  required
                  className="bg-white/5 border-white/10 text-white font-mono text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/60 font-medium">
                  Categoria
                </label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="ex: Identidade visual"
                  className="bg-white/5 border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/60 font-medium">
                  Cliente
                </label>
                <Input
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                  placeholder="ex: Aura Brand"
                  className="bg-white/5 border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/60 font-medium">
                  Ano
                </label>
                <Input
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  placeholder="2025"
                  className="bg-white/5 border-white/10 text-white text-xs"
                />
              </div>
            </div>

            {/* Imagem de Capa */}
            <div className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/10">
              <label className="text-xs uppercase tracking-wider text-white/70 font-medium block">
                Imagem de Capa (Upload ou URL)
              </label>
              <div className="flex gap-2">
                <Input
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  placeholder="https://... ou faça upload ao lado"
                  className="bg-white/5 border-white/10 text-white text-xs flex-1"
                />
                <input
                  type="file"
                  ref={coverInputRef}
                  onChange={handleCoverUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="border-white/20 bg-white/5 text-white text-xs shrink-0"
                >
                  <Upload className="w-3.5 h-3.5 mr-1 text-[#FFCA16]" />
                  Upload
                </Button>
              </div>
              {form.coverImage && (
                <div className="mt-2 h-20 w-36 rounded-lg overflow-hidden border border-white/10 bg-black">
                  <img src={form.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Textos Principais */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-white/60 font-medium">
                Subtítulo / Frase de Impacto
              </label>
              <Input
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="Uma breve apresentação marcante do projeto..."
                className="bg-white/5 border-white/10 text-white text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-white/60 font-medium">
                Sobre o Projeto
              </label>
              <Textarea
                value={form.about}
                onChange={(e) => setForm({ ...form, about: e.target.value })}
                rows={3}
                placeholder="Contexto e história do projeto..."
                className="bg-white/5 border-white/10 text-white text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/60 font-medium">
                  O Desafio
                </label>
                <Textarea
                  value={form.challenge}
                  onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                  rows={2}
                  placeholder="Qual problema a marca enfrentava?"
                  className="bg-white/5 border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/60 font-medium">
                  A Solução / Objetivo
                </label>
                <Textarea
                  value={form.solution}
                  onChange={(e) => setForm({ ...form, solution: e.target.value })}
                  rows={2}
                  placeholder="Como o Studio Kiiro resolveu?"
                  className="bg-white/5 border-white/10 text-white text-xs"
                />
              </div>
            </div>

            {/* Galeria de Entregáveis */}
            <div className="space-y-2 p-3 rounded-xl bg-white/[0.02] border border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-white/70 font-medium">
                  Galeria de Imagens & Entregáveis ({form.pages.length})
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleGalleryUpload}
                  multiple
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="border-white/20 bg-white/5 text-white text-xs h-7"
                >
                  <Upload className="w-3 h-3 mr-1 text-[#FFCA16]" />
                  Upload em Lote
                </Button>
              </div>

              <div className="flex gap-2">
                <Input
                  value={newPageUrl}
                  onChange={(e) => setNewPageUrl(e.target.value)}
                  placeholder="Cole link de imagem e clique em adicionar..."
                  className="bg-white/5 border-white/10 text-white text-xs flex-1"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddPageUrl}
                  className="bg-white/10 text-white hover:bg-white/20 text-xs h-9"
                >
                  Adicionar
                </Button>
              </div>

              {form.pages.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {form.pages.map((img, i) => (
                    <div key={i} className="relative group w-16 h-16 rounded-lg overflow-hidden border border-white/10 bg-black">
                      <img src={img} alt={`Item ${i}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemovePage(i)}
                        className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Opcionais: Métricas & Vídeo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/60 font-medium">
                  Vídeo / GIF / Vinheta (Opcional)
                </label>
                <Input
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  placeholder="Link direto de GIF ou MP4"
                  className="bg-white/5 border-white/10 text-white text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/60 font-medium">
                  Resultado / Métricas (Opcional)
                </label>
                <Input
                  value={form.finalResult}
                  onChange={(e) => setForm({ ...form, finalResult: e.target.value })}
                  placeholder="ex: +45% engajamento, 100k views..."
                  className="bg-white/5 border-white/10 text-white text-xs"
                />
              </div>
            </div>

            {/* Toggle Destaque na Home */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/80 font-medium">
                Exibir este projeto em destaque na página inicial (Home)
              </span>
              <Switch
                checked={form.featuredOnHome}
                onCheckedChange={(checked) => setForm({ ...form, featuredOnHome: checked })}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" onClick={() => setOpenModal(false)}>
                Cancelar
              </Button>
              <Button
                type="submit"
                className="bg-[#FFCA16] text-black hover:bg-[#FFCA16]/90 font-bold"
              >
                Salvar Case
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CasesTab;
