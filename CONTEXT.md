# Studio Kiiro — Domain Model & Ubiquitous Language

Studio Kiiro é um estúdio criativo especializado em design estratégico, identidade visual, branding e presença digital de alto padrão, combinando um ecossistema web público com um portal operacional avançado (Área do Cliente, Painel Admin e Portal de Parceiros).

Este documento define a **Linguagem Ubíqua (Ubiquitous Language)** e os princípios arquiteturais do projeto baseados no framework de engenharia de *codebase-design* e *domain-modeling*.

---

## 🏛️ Linguagem do Domínio (Ubiquitous Language)

### 1. Entidades Principais

**Cliente (Client / Profile)**:
A entidade humana ou jurídica atendida pelo estúdio. Possui perfil cadastrado em `profiles` (nome, empresa, e-mail, telefone, status: `novo`, `ativo`, `recorrente`, `inativo`) e credenciais de acesso opcionais via Supabase Auth.
_Evitar_: usuário, lead, contact.

**Projeto (Project)**:
A unidade central de trabalho do estúdio. Todo projeto pertence a um único **Cliente** e possui um **Tipo de Projeto**, prazo, status de produção (`briefing`, `planejamento`, `producao`, `revisao`, `finalizacao`, `entregue`, `pausado`), saúde (`No Prazo`, `Atenção`, `Atrasado`) e percentual de progresso calculado.
_Evitar_: job, task, demanda.

**Tipo de Projeto (Project Type)**:
Uma das 15 categorias de serviços formais oferecidas pelo Studio Kiiro (ex: *Logotipo Essencial*, *Identidade Visual*, *Branding Completo*, *Manual de Logotipo*, *Personal Brand Kit*, *Landing Page Completa*, etc.). Cada tipo define um conjunto preestabelecido de **Etapas da Metodologia** e de **Perguntas de Briefing**.

**Etapa da Metodologia (Methodology Stage)**:
Fases cronológicas padronizadas que guiam a execução do projeto (ex: *Briefing e Direção Criativa*, *Pesquisa e Conceituação*, *Apresentação do Projeto*, *Refinamento e Entrega*). Cada etapa possui status (`pendente`, `concluida`) e pode conter sub-etapas internas.

**Briefing Público / Link de Briefing (Briefing Link)**:
Formulário interativo e autônomo acessível via link encurtado (`/b/:token`), gerado exclusivamente para um **Projeto**. Permite que o **Cliente** responda ao questionário da metodologia do seu serviço sem precisar criar conta ou fazer login no portal.

**Resposta de Briefing (Briefing Response)**:
O conjunto compilado de respostas estruturadas fornecidas pelo cliente para as perguntas do seu respectivo **Tipo de Projeto**, armazenadas em `briefing_responses`.

**Orçamento (Quote)**:
Documento financeiro preliminar emitido pelo estúdio, discriminando itens de serviço, valores unitários, prazo de validade e condições de pagamento, sujeito à aprovação do cliente.

**Proposta (Proposal)**:
Apresentação comercial e estratégica formal submetida a um cliente ou prospect, acompanhada de aceite contratual (`ProposalGate`).

**Ordem de Serviço (Service Order)**:
Documento formal de autorização e escopo de execução emitido após aprovação de proposta ou orçamento.

---

## 🎨 Sistema de Design e Identidade Visual (Design System)

- **Cores Fundamentais**:
  - `Background Base`: `#000000` / `#070807` (Preto absoluto e ébano profundo).
  - `Accent Primário`: `#FFCA16` / `#FFC700` (Amarelo Kiiro, transmitindo precisão, luz e sofisticação editorial).
  - `Bordas e Superfícies`: `#1A1A1A` / `#222222` / `border-white/10`.
  - `Tipografia`:
    - Display / Headings: `font-display` (Syne / Editorial, tracking ajustado, alto impacto).
    - Corpo / Conteúdo: Plus Jakarta Sans / Poppins (legibilidade técnica, pesos 300 a 600).
    - Metadados: Monospace em caixa alta com tracking estendido (`tracking-[0.4em]` a `tracking-[0.6em]`).
- **Animações e Física**:
  - Lenis para scroll suave de alta precisão.
  - GSAP & ScrollTrigger para revelações sequenciais e transformações espaciais.
  - Framer Motion para transições de rotas e microinterações de estado.
  - Canvas 2D/3D para esculturas generativas da marca (ex: dot-matrix Kiiro 3D).

---

## ⚙️ Arquitetura e Módulos Profundos (Deep Modules)

Seguindo o princípio de *codebase-design*:
- **Módulos Profundos**: Pequenas interfaces externas com implementações ricas e encapsuladas.
  - Exemplo: `briefingService.ts` expõe `ensureBriefingToken`, `getBriefingUrl` e `buildBriefingMessage`, ocultando a geração criptográfica, colisões de banco e montagem de URLs.
- **Seams e Localidade**: Manter regras de negócio de clientes e projetos em serviços e hooks dedicados, evitando acoplamento excessivo em componentes de visualização.

---

## 🧭 Relações entre Entidades

- Um **Cliente** pode ter múltiplos **Projetos**, **Orçamentos** e **Ordens de Serviço**.
- Um **Projeto** possui exatamente um **Link de Briefing** (1:1) e pode ter uma **Resposta de Briefing** (1:1).
- Um **Projeto** possui múltiplas **Etapas da Metodologia** (1:N), instanciadas a partir do template do seu **Tipo de Projeto**.
