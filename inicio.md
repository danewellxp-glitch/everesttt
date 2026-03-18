Você é o desenvolvedor sênior responsável por construir do zero uma plataforma real de curso digital chamada EVEREST. Este é um projeto de produção — sem mocks, sem placeholders, sem TODOs vazios. Todo código deve funcionar, toda página deve renderizar, toda integração deve estar conectada.

Leia este documento inteiro antes de escrever qualquer linha de código.

─────────────────────────────────────────────────────────────
## 1. VISÃO GERAL DO PROJETO
─────────────────────────────────────────────────────────────

EVEREST é um curso digital de desenvolvimento pessoal baseado na metáfora de escalar uma montanha. O aluno começa no Base Camp (fundação de vida: sono, energia, saúde mental) e sobe até o Cume (autodomínio, alta performance). O produto é vendido via Hotmart e acessado em área de membros própria.

A plataforma tem dois ambientes:

AMBIENTE 1 — Site de Vendas (domínio principal)
  Arquivo: apps/site-vendas
  Rota pública. Landing page completa com copywriting real do produto, VSL, quiz interativo de altitude mental e CTAs apontando para o checkout da Hotmart.

AMBIENTE 2 — Área de Membros (subdomínio membros.)
  Arquivo: apps/area-membros
  Rota protegida. Login, dashboard do aluno, módulos, aulas com player de vídeo e PDFs.

─────────────────────────────────────────────────────────────
## 2. STACK OBRIGATÓRIA
─────────────────────────────────────────────────────────────

- Monorepo: Turborepo
- Framework: Next.js 14 (App Router) em ambas as apps
- Linguagem: TypeScript em 100% dos arquivos
- Estilização: Tailwind CSS com tema customizado para EVEREST
- Banco: PostgreSQL via Prisma ORM (client compartilhado em packages/db)
- Autenticação: NextAuth.js v5 (apenas na area-membros)
- Email: Resend SDK
- Validação: Zod
- Componentes base: shadcn/ui
- Ícones: lucide-react

─────────────────────────────────────────────────────────────
## 3. IDENTIDADE VISUAL — TEMA EVEREST
─────────────────────────────────────────────────────────────

O design deve ser sério, premium, escuro. Inspiração: montanha, altitude, conquista.
Não use azul corporativo genérico. Não use branco com texto preto padrão.

Paleta obrigatória (configure no tailwind.config.ts):

  everest-black:    #0A0A0A   — fundo principal
  everest-dark:     #111318   — cards e seções alternadas
  everest-gray:     #1C2028   — bordas e divisores
  everest-stone:    #8B949E   — texto secundário
  everest-snow:     #E6EDF3   — texto principal
  everest-red:      #E03E3E   — cor de todos os CTAs (botão vermelho conforme brief)
  everest-red-dark: #B91C1C   — hover dos CTAs
  everest-gold:     #E3B341   — destaques, badges, pontos de altitude
  everest-blue:     #1F6FEB   — links e elementos de progresso

Tipografia:
  - Títulos: font-family "Cal Sans" ou "Sora" (Google Fonts)
  - Corpo: "Inter" (Google Fonts)
  - Monospace (código/quiz): "JetBrains Mono"

Estética geral:
  - Fundo escuro em todas as seções
  - Efeito de névoa/gradiente no hero (radial gradient de azul escuro para preto)
  - Cards com borda sutil (1px everest-gray) e fundo everest-dark
  - Botões CTA: vermelho (#E03E3E), texto branco, bold, rounded-lg, com sombra
  - Todos os ícones dos camps com emoji representando altitude (conforme brief)

─────────────────────────────────────────────────────────────
## 4. ESTRUTURA DE PASTAS COMPLETA
─────────────────────────────────────────────────────────────

Crie exatamente esta estrutura:

everest-platform/
├── apps/
│   ├── site-vendas/
│   │   ├── src/app/
│   │   │   ├── layout.tsx                 # RootLayout com Google Fonts + metadata EVEREST
│   │   │   ├── page.tsx                   # Orquestra todas as seções da landing page
│   │   │   ├── globals.css
│   │   │   └── api/
│   │   │       └── quiz/route.ts          # Calcula resultado do quiz de altitude
│   │   ├── src/components/
│   │   │   ├── sections/
│   │   │   │   ├── HeroSection.tsx        # Seções 1, 2 e 3 da página
│   │   │   │   ├── VSLSection.tsx         # Seção 4 — player VSL + bullets
│   │   │   │   ├── DorSection.tsx         # Seção 6 — identificação da dor
│   │   │   │   ├── MetodoSection.tsx      # Seção 7 — apresentação do método
│   │   │   │   ├── FrameworkSection.tsx   # Seção 8 — os 6 camps em cards
│   │   │   │   ├── BeneficiosSection.tsx  # Seção 9 — benefícios com checkmarks
│   │   │   │   ├── ObjecoesSection.tsx    # Seção 11 — quebra de objeções
│   │   │   │   ├── OfertaSection.tsx      # Seção 12 — o que você vai aprender
│   │   │   │   ├── BonusSection.tsx       # Seção 14 — bônus
│   │   │   │   ├── GarantiaSection.tsx    # Seção 15 — garantia 7 dias
│   │   │   │   ├── FAQSection.tsx         # Seção 17 — FAQ com accordion
│   │   │   │   └── QuizSection.tsx        # Quiz "Teste de Altitude Mental"
│   │   │   ├── CTAButton.tsx              # Botão vermelho reutilizável
│   │   │   ├── SectionDivider.tsx         # Divisor visual entre seções
│   │   │   └── Navbar.tsx                 # Nav simples com logo + "Já sou aluno"
│   │   ├── tailwind.config.ts
│   │   ├── next.config.ts
│   │   └── package.json
│   │
│   └── area-membros/
│       ├── src/app/
│       │   ├── layout.tsx
│       │   ├── globals.css
│       │   ├── (auth)/
│       │   │   ├── login/page.tsx          # Tela de login
│       │   │   └── esqueci-senha/page.tsx  # Recuperação de senha
│       │   ├── (private)/
│       │   │   ├── layout.tsx              # Layout protegido com sidebar
│       │   │   ├── dashboard/page.tsx      # Painel do aluno com progresso
│       │   │   ├── modulos/page.tsx        # Lista de todos os módulos/camps
│       │   │   ├── modulos/[slug]/page.tsx # Aulas de um módulo específico
│       │   │   └── aula/[slug]/page.tsx    # Página da aula: vídeo + PDF + progresso
│       │   └── api/
│       │       ├── auth/[...nextauth]/route.ts
│       │       ├── hotmart/webhook/route.ts  # Recebe evento de compra
│       │       ├── progress/route.ts         # Marca aula como concluída
│       │       └── user/route.ts             # Dados do usuário logado
│       ├── src/components/
│       │   ├── Sidebar.tsx                   # Navegação lateral com camps
│       │   ├── ModuleCard.tsx                # Card de módulo com progresso
│       │   ├── LessonPlayer.tsx              # Embed do Panda Video
│       │   ├── ProgressBar.tsx               # Barra de progresso do aluno
│       │   └── AltitudeBadge.tsx             # Badge do camp atual do aluno
│       ├── src/lib/
│       │   ├── auth.ts                       # Configuração NextAuth
│       │   ├── hotmart.ts                    # Validação de assinatura do webhook
│       │   └── email.ts                      # Templates Resend (boas-vindas, senha)
│       ├── tailwind.config.ts
│       ├── next.config.ts
│       └── package.json
│
├── packages/
│   ├── db/
│   │   ├── prisma/
│   │   │   └── schema.prisma               # Schema completo (ver seção 6)
│   │   ├── src/
│   │   │   └── index.ts                    # Export do PrismaClient singleton
│   │   └── package.json
│   └── ui/
│       ├── src/
│       │   ├── Button.tsx
│       │   ├── Card.tsx
│       │   └── index.ts
│       └── package.json
│
├── .env.example                             # Todas as variáveis necessárias
├── turbo.json
├── package.json
└── README.md

─────────────────────────────────────────────────────────────
## 5. SCHEMA DO BANCO DE DADOS (packages/db/prisma/schema.prisma)
─────────────────────────────────────────────────────────────

Crie exatamente este schema:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String     @id @default(cuid())
  name          String?
  email         String     @unique
  passwordHash  String
  isActive      Boolean    @default(false)
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  purchases     Purchase[]
  progress      Progress[]
  sessions      Session[]
}

model Session {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Purchase {
  id              String   @id @default(cuid())
  userId          String
  hotmartTxId     String   @unique
  status          String   // approved | refunded | cancelled
  plan            String   // monthly | annual
  purchasedAt     DateTime @default(now())
  expiresAt       DateTime?
  user            User     @relation(fields: [userId], references: [id])
}

model Module {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  emoji       String
  campLabel   String   // BASE CAMP, CAMP 1, ..., CUME
  order       Int
  isPublished Boolean  @default(false)
  lessons     Lesson[]
  createdAt   DateTime @default(now())
}

model Lesson {
  id          String     @id @default(cuid())
  moduleId    String
  title       String
  slug        String     @unique
  description String?
  videoUrl    String?    // URL do embed Panda Video
  pdfUrl      String?    // URL do PDF para download
  order       Int
  isPublished Boolean    @default(false)
  duration    Int?       // duração em segundos
  module      Module     @relation(fields: [moduleId], references: [id])
  progress    Progress[]
  createdAt   DateTime   @default(now())
}

model Progress {
  id          String    @id @default(cuid())
  userId      String
  lessonId    String
  completed   Boolean   @default(false)
  completedAt DateTime?
  watchedSecs Int       @default(0)
  user        User      @relation(fields: [userId], references: [id])
  lesson      Lesson    @relation(fields: [lessonId], references: [id])

  @@unique([userId, lessonId])
}
```

─────────────────────────────────────────────────────────────
## 6. ARQUIVO .env.example
─────────────────────────────────────────────────────────────

Crie este arquivo na raiz com todas as variáveis:

```env
# Banco de Dados
DATABASE_URL="postgresql://user:password@localhost:5432/everest_db"

# NextAuth (area-membros)
NEXTAUTH_SECRET="gere-com-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3001"

# Hotmart Webhook
HOTMART_WEBHOOK_TOKEN="token-secreto-configurado-na-hotmart"
HOTMART_PRODUCT_ID="id-do-produto-na-hotmart"

# Resend (email transacional)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxx"
EMAIL_FROM="noreply@seudominio.com.br"

# URLs
NEXT_PUBLIC_SITE_VENDAS_URL="http://localhost:3000"
NEXT_PUBLIC_AREA_MEMBROS_URL="http://localhost:3001"
NEXT_PUBLIC_HOTMART_CHECKOUT_URL="https://pay.hotmart.com/SEU_PRODUTO_ID"

# Panda Video (opcional por enquanto)
PANDA_VIDEO_API_KEY=""
```

─────────────────────────────────────────────────────────────
## 7. LANDING PAGE — SEÇÕES COMPLETAS
─────────────────────────────────────────────────────────────

A landing page é o coração do projeto. Construa cada seção com o conteúdo real abaixo.
Não invente texto. Use exatamente o copy do brief.

### SEÇÃO 1+2+3 — HeroSection.tsx

Fundo: gradiente escuro com névoa azul (radial-gradient do centro)
Conteúdo exato:

  BADGE TOPO: pequeno badge com ⛰ "Método EVEREST"

  HEADLINE (H1, grande, branco):
    "IGNORAR O PROCESSO DOS SEUS HÁBITOS
     ESTÁ SABOTANDO A SUA VIDA"

  SUBHEADLINE (H2, menor, everest-stone):
    "A transformação da sua rotina começa quando você entende os padrões
     mentais invisíveis que estão guiando suas decisões"

  CTA PRIMÁRIO (botão vermelho, largo):
    "QUERO APRENDER A ESTRUTURAR MEUS HÁBITOS"
    → abre link para NEXT_PUBLIC_HOTMART_CHECKOUT_URL em nova aba

  Abaixo do botão, linha pequena de confiança:
    "🔒 Compra 100% segura  ·  ✅ Garantia de 7 dias  ·  ⚡ Acesso imediato"

  IMAGENS sugeridas logo abaixo: 4 ícones ou cards visuais representando
    📚 Leitura  🏃 Exercício  😴 Sono  🧘 Paz mental

### SEÇÃO 4 — VSLSection.tsx

Título da seção: "Assista ao vídeo abaixo e descubra:"

Player VSL: renderize um componente de player de vídeo. Por enquanto use um
  placeholder elegante com fundo escuro e botão de play centralizado. O componente
  deve aceitar uma prop `videoUrl?: string` — quando vazia mostra placeholder, quando
  preenchida embute o vídeo do Panda Video via iframe.

Bullets abaixo do player (lista com ícone ✦):
  - Por que disciplina não depende apenas de força de vontade
  - O erro invisível que faz você abandonar qualquer hábito
  - Como reprogramar sua mente para criar hábitos consistentes
  - Por que pequenas melhorias diárias geram resultados gigantes no longo prazo
  - Como sair da procrastinação e construir constância real

CTA após bullets: mesmo botão vermelho "QUERO APRENDER A ESTRUTURAR MEUS HÁBITOS"

### SEÇÃO 6 — DorSection.tsx

Título: "Você já tentou mudar sua vida várias vezes…"

Texto:
  "No começo parece que vai dar certo — organizar sua rotina, estudar com constância,
   acordar mais cedo ou criar hábitos melhores. Mas depois de alguns dias tudo volta
   ao mesmo padrão e os hábitos antigos retornam.

   A maioria das pessoas tenta mudar a própria vida sem uma estrutura clara de evolução,
   sem entender como criar e sustentar novos hábitos.

   O problema não é falta de disciplina. É um padrão mental invisível."

Visual: 3 cards horizontais mostrando o ciclo vicioso:
  Card 1: 🔥 "Motivação inicial" — "Você começa com energia total"
  Card 2: 📉 "Queda" — "Alguns dias depois a rotina antiga volta"
  Card 3: 🔄 "Reset" — "Você volta à estaca zero, frustrado"

### SEÇÃO 7 — MetodoSection.tsx

Badge: "O MÉTODO"
Título: "Apresentando o EVEREST"

Subtítulo: "Uma estrutura simples que mostra como construir hábitos fortes, organizar
sua rotina e evoluir com constância — melhorando um pouco todos os dias, sem extremos
ou fórmulas mágicas."

Citação destacada em bloco (borda esquerda dourada):
  "O EVEREST não é sobre chegar ao topo. É sobre se tornar a pessoa capaz de chegar lá.
   Toda grande ascensão começa com um passo… mas só quem constrói base chega ao topo."

Visual: linha do tempo vertical ou diagonal mostrando a progressão:
  Base Camp → Camp 1 → Camp 2 → Camp 3 → Camp 4 → Cume
  Com ícone de montanha crescendo da esquerda para a direita.

### SEÇÃO 8 — FrameworkSection.tsx

Badge: "O FRAMEWORK"
Título: "Cada camp é um nível de evolução"

Renderize 6 cards, um para cada camp. Cada card tem:
  - Emoji grande
  - Label do camp (ex: "🏕 BASE CAMP")
  - Título (ex: "Nenhuma grande ascensão começa sem uma base sólida")
  - Lista de tópicos do que o aluno aprende

Dados exatos dos cards:

  CARD 1:
    emoji: 🏕
    label: BASE CAMP
    titulo: "Nenhuma grande ascensão começa sem uma base sólida."
    topicos: Sono estratégico | Energia física | Exercício físico | Saúde mental | Ritmo biológico

  CARD 2:
    emoji: 🧠
    label: CAMP 1 — Clareza Mental
    titulo: "Quem controla a própria mente controla a própria vida."
    topicos: Controle da atenção | Redução de distrações | Organização mental | Controle de dopamina

  CARD 3:
    emoji: 🔁
    label: CAMP 2 — Reprogramação de Hábitos
    titulo: "A trivialidade da excelência."
    topicos: Quebra de padrões sabotadores | Motivação x Disciplina | Arquitetura comportamental

  CARD 4:
    emoji: ⚙️
    label: CAMP 3 — Constância
    titulo: "O topo pertence a quem continua subindo."
    topicos: Rotina inteligente | Produtividade | Gestão de energia | Persistência

  CARD 5:
    emoji: 🚀
    label: CAMP 4 — Expansão
    titulo: "Quem aprende mais rápido sobe mais alto."
    topicos: Estudo eficiente | Aprendizado acelerado | Desenvolvimento pessoal | Mentalidade de crescimento

  CARD 6:
    emoji: 🏔
    label: CUME — Autodomínio
    titulo: "O verdadeiro topo é o domínio de si mesmo."
    topicos: Autoconhecimento profundo | Liderança pessoal | Direção de vida | Alta performance mental

  Os cards devem ter borda com a cor de altitude:
    Base Camp: borda cinza/pedra
    Camp 1: borda azul
    Camp 2: borda laranja
    Camp 3: borda amarela/ouro
    Camp 4: borda roxa
    Cume: borda dourada brilhante

### SEÇÃO 9 — BeneficiosSection.tsx

Badge: "BENEFÍCIOS"
Título: "Dentro do EVEREST você vai aprender a:"

Lista com ícone ✔ dourado:
  ✔ Construir disciplina real
  ✔ Organizar sua rotina
  ✔ Melhorar seu sono e energia
  ✔ Desenvolver constância
  ✔ Estudar com eficiência
  ✔ Fortalecer sua saúde mental

CTA: "QUERO APRENDER O MÉTODO EVEREST" (botão vermelho)

### SEÇÃO 11 — ObjecoesSection.tsx

Título: "Talvez você esteja pensando:"

Renderize 2 cards de objeção/resposta:

  OBJEÇÃO 1:
    Pergunta: "Eu já tentei mudar hábitos antes."
    Resposta: "Eu também já passei por isso. Já estava cansado de fórmulas mágicas,
    achava que nada iria me ajudar. Até perceber algo: a diferença agora é que você
    vai entender como o cérebro realmente constrói padrões comportamentais."

  OBJEÇÃO 2:
    Pergunta: "Em quanto tempo começo a ver resultados?"
    Resposta: "Muitas pessoas começam a perceber mudanças nas primeiras semanas. Mas
    o objetivo do método não é transformação instantânea. É construir uma evolução
    consistente e sustentável."

### SEÇÃO 12 — OfertaSection.tsx

Badge: "A OFERTA"
Título: "Ao entrar no EVEREST você terá acesso a:"

Lista de itens da oferta com ícones:
  🏔 O método EVEREST completo
  🎥 Aulas práticas e objetivas
  📈 Sistema de evolução pessoal em 6 níveis
  👥 Comunidade de pessoas evoluindo juntas

Preços:
  Plano Mensal: R$ 39,90/mês
  Plano Anual: R$ 397,00/ano (economize R$ 81,80)

  Destaque visual no plano anual como "MAIS POPULAR" com badge dourado.

CTA: "COMEÇAR A MINHA TRANSFORMAÇÃO" (botão vermelho)

### SEÇÃO 14 — BonusSection.tsx

Badge: "🎁 BÔNUS EXCLUSIVO"
Título: "Checklist de Hábitos Diários — Rotina de Alta Performance"
Descrição: "Sistema simples para acompanhar sua evolução todos os dias."
Visual: mockup de um checklist com 5 itens de hábito (fictícios mas realistas)

### SEÇÃO 15 — GarantiaSection.tsx

Visual: ícone de escudo grande (Shield do lucide-react)
Título: "Garantia de 7 dias"
Texto: "Se dentro de 7 dias você sentir que o EVEREST não é para você, basta
solicitar o reembolso. Sem perguntas, sem burocracia."

CTA: "QUERO CONSTRUIR DISCIPLINA DE VERDADE" (botão vermelho)

### SEÇÃO 17 — FAQSection.tsx

Implemente accordion funcional (abrir/fechar). Perguntas reais:

  P: Quais as formas de pagamento?
  R: Cartão de crédito, Pix e PayPal. O pagamento é processado com segurança pela Hotmart.

  P: Terei quanto tempo de acesso?
  R: Você terá acesso por 1 ano no plano anual ou 1 mês no plano mensal, renovado automaticamente. Enviaremos e-mail de aviso antes da renovação.

  P: Quanto tempo preciso me dedicar por dia?
  R: As aulas são curtas e práticas. O objetivo é que você aplique pequenos ajustes diários que, ao longo do tempo, geram grandes mudanças.

  P: O EVEREST é para mim?
  R: É para quem quer construir hábitos mais saudáveis com base no conhecimento. Para quem está disposto a fazer o básico bem feito, todos os dias.

  P: Eu já tentei mudar hábitos antes. Qual a diferença?
  R: A diferença é que desta vez você vai entender o mecanismo mental por trás dos seus padrões. Não é sobre força de vontade — é sobre reprogramação comportamental.

CTA FINAL: "ENTRAR PARA O EVEREST AGORA" (botão vermelho, grande, centralizado)

### QUIZ — QuizSection.tsx

Componente interativo completo: "TESTE DE ALTITUDE MENTAL"

Subtítulo: "Descubra em qual altitude da sua evolução você está."

5 perguntas com 4 alternativas (A=1pt, B=2pt, C=3pt, D=4pt):

  Pergunta 1: "Você mantém bons hábitos por mais de 30 dias?"
    A) Nunca  B) Raramente  C) Às vezes  D) Frequentemente

  Pergunta 2: "Como está sua energia diária?"
    A) Sempre cansado  B) Baixa  C) Média  D) Alta

  Pergunta 3: "Sua rotina é organizada?"
    A) Completamente desorganizada  B) Parcialmente  C) Razoável  D) Muito organizada

  Pergunta 4: "Você tem clareza sobre seus objetivos?"
    A) Nenhuma  B) Pouca  C) Razoável  D) Total

  Pergunta 5: "Você procrastina tarefas importantes?"
    A) Sempre  B) Frequentemente  C) Às vezes  D) Quase nunca

Lógica de resultado (soma dos pontos):
  5–9 pts   → 🔴 BASE CAMP: "Você ainda está construindo sua base. Foco: sono, energia, organização."
  10–14 pts → 🟠 CAMP 1: "Você começou a subir, mas ainda luta com foco, distrações e procrastinação."
  15–17 pts → 🟡 CAMP 2: "Você já entende hábitos, mas precisa consolidar disciplina."
  18–19 pts → 🔵 CAMP 3: "Você já tem consistência. Agora precisa acelerar o crescimento."
  20 pts    → 🟣 CUME: "Você está entre as pessoas mais disciplinadas. O desafio agora é expansão."

Após o resultado, mostrar CTA:
  "Independente do seu nível atual, o EVEREST foi feito para você subir."
  Botão vermelho: "QUERO COMEÇAR MINHA ESCALADA"

State management: useState local no componente.
UX: mostrar uma pergunta por vez com animação de transição. Barra de progresso no topo (ex: "Pergunta 2 de 5").

─────────────────────────────────────────────────────────────
## 8. ÁREA DE MEMBROS — PÁGINAS COMPLETAS
─────────────────────────────────────────────────────────────

### Login — (auth)/login/page.tsx

Layout: tela dividida. Lado esquerdo: visual da montanha com quote do método.
Lado direito: formulário de login.

Formulário com:
  - Campo email (validado com Zod)
  - Campo senha (com toggle mostrar/ocultar)
  - Botão "Entrar na minha escalada" (vermelho)
  - Link "Esqueci minha senha"
  - Sem opção de cadastro (acesso apenas via webhook Hotmart)

Mensagem abaixo: "Não tem acesso? Adquira o EVEREST → [link para site de vendas]"

Integração real com NextAuth credentials provider.

### Dashboard — (private)/dashboard/page.tsx

Saudação: "Bem-vindo de volta, [nome do aluno]! ⛰"

Componentes:
  1. Card de progresso geral: "Você completou X de 30 aulas" com barra de progresso
  2. Badge de altitude atual: qual camp o aluno está (baseado nas aulas concluídas)
  3. Grid de 6 módulos, cada um mostrando:
     - Emoji + nome do camp
     - X/5 aulas concluídas
     - Barra de progresso
     - Botão "Continuar" ou "Começar"
  4. Próxima aula sugerida: card destacado com "Continue daqui"

### Módulos — (private)/modulos/[slug]/page.tsx

Busca o módulo pelo slug no banco. Renderiza:
  - Header do módulo: emoji, nome do camp, descrição
  - Lista de 5 aulas em cards verticais, cada um com:
    - Número da aula
    - Título
    - Duração (se preenchida)
    - Badge "Concluída" se progress.completed = true
    - Botão "Assistir"

### Aula — (private)/aula/[slug]/page.tsx

Busca a aula pelo slug. Renderiza:
  - Breadcrumb: Dashboard > [Módulo] > [Aula]
  - Player de vídeo: iframe do Panda Video (prop videoUrl do banco)
    Se videoUrl for null: placeholder elegante com mensagem "Aula em breve"
  - Título e descrição da aula
  - Botão download PDF (se pdfUrl existir no banco)
  - Botão "Marcar como concluída" — chama POST /api/progress
  - Navegação: "← Aula anterior" e "Próxima aula →"

### Sidebar — components/Sidebar.tsx

Logo EVEREST no topo.
Links de navegação:
  - 🏠 Dashboard
  - ⛰ Meus Módulos
  - 👤 Meu Perfil

Abaixo: progress indicator compacto mostrando em qual camp o aluno está.

─────────────────────────────────────────────────────────────
## 9. INTEGRAÇÕES REAIS
─────────────────────────────────────────────────────────────

### Webhook Hotmart — /api/hotmart/webhook/route.ts

Implemente o handler completo:

1. Receba o POST da Hotmart
2. Valide o header `x-hotmart-webhook-token` contra process.env.HOTMART_WEBHOOK_TOKEN
3. Se inválido: retorne 401
4. Parse o body JSON da Hotmart (evento PURCHASE_COMPLETE ou PURCHASE_APPROVED)
5. Extraia: buyerEmail, buyerName, transactionId, productId, offerId (mensal/anual)
6. Verifique se usuário já existe no banco pelo email
7. Se não existe: crie o usuário com senha temporária aleatória (12 chars), isActive = true
8. Se existe: apenas atualize isActive = true
9. Crie registro em Purchase com status "approved" e plan derivado do offerId
10. Calcule expiresAt: agora + 30 dias (mensal) ou agora + 365 dias (anual)
11. Dispare email de boas-vindas via Resend com a senha temporária
12. Retorne 200 { success: true }

### Email de boas-vindas — lib/email.ts

Template real em HTML com:
  - Header com logo/nome EVEREST
  - "Bem-vindo ao EVEREST, [nome]! Sua escalada começa agora."
  - Credenciais de acesso: email e senha temporária
  - Botão "Acessar minha área de membros" apontando para NEXT_PUBLIC_AREA_MEMBROS_URL/login
  - Instrução para trocar a senha no primeiro acesso
  - Rodapé com informações do produto

### API de progresso — /api/progress/route.ts

POST: recebe { lessonId, completed, watchedSecs }
  - Valida sessão do usuário (NextAuth session)
  - Upsert em Progress: se já existe atualiza, se não existe cria
  - Retorna { success: true, progress }

GET: retorna todo o progresso do usuário logado

─────────────────────────────────────────────────────────────
## 10. SEED DO BANCO DE DADOS
─────────────────────────────────────────────────────────────

Crie packages/db/prisma/seed.ts com os 6 módulos reais do EVEREST:

```typescript
const modules = [
  {
    title: "Base Camp",
    slug: "base-camp",
    description: "Nenhuma grande ascensão começa sem uma base sólida. Aqui você constrói a fundação: sono, energia e saúde como pilares de tudo.",
    emoji: "🏕",
    campLabel: "BASE CAMP",
    order: 1,
    lessons: [
      { title: "Por que o sono é o hábito número 1", slug: "sono-habito-numero-1", order: 1 },
      { title: "Como otimizar sua energia ao longo do dia", slug: "otimizar-energia", order: 2 },
      { title: "A ciência do exercício físico e hábitos", slug: "ciencia-exercicio", order: 3 },
      { title: "Saúde mental como base da produtividade", slug: "saude-mental-base", order: 4 },
      { title: "Entendendo seu ritmo biológico", slug: "ritmo-biologico", order: 5 },
    ]
  },
  {
    title: "Camp 1 — Clareza Mental",
    slug: "camp-1-clareza-mental",
    description: "Quem controla a própria mente controla a própria vida. Aprenda a focar, eliminar distrações e organizar o caos mental.",
    emoji: "🧠",
    campLabel: "CAMP 1",
    order: 2,
    lessons: [
      { title: "Como funciona o controle da atenção", slug: "controle-da-atencao", order: 1 },
      { title: "Técnicas de redução de distrações", slug: "reducao-de-distracoes", order: 2 },
      { title: "Organização mental e clareza de prioridades", slug: "organizacao-mental", order: 3 },
      { title: "Dopamina: o combustível dos hábitos", slug: "dopamina-combustivel", order: 4 },
      { title: "Construindo um sistema de foco diário", slug: "sistema-foco-diario", order: 5 },
    ]
  },
  {
    title: "Camp 2 — Reprogramação de Hábitos",
    slug: "camp-2-reprogramacao",
    description: "A trivialidade da excelência. Quebre os padrões sabotadores e construa novos comportamentos que funcionam de verdade.",
    emoji: "🔁",
    campLabel: "CAMP 2",
    order: 3,
    lessons: [
      { title: "Como identificar padrões sabotadores", slug: "padroes-sabotadores", order: 1 },
      { title: "Motivação vs Disciplina: a verdade", slug: "motivacao-vs-disciplina", order: 2 },
      { title: "Arquitetura comportamental na prática", slug: "arquitetura-comportamental", order: 3 },
      { title: "O loop do hábito e como quebrá-lo", slug: "loop-do-habito", order: 4 },
      { title: "Reprogramando crenças limitantes", slug: "reprogramando-crencas", order: 5 },
    ]
  },
  {
    title: "Camp 3 — Constância",
    slug: "camp-3-constancia",
    description: "O topo pertence a quem continua subindo. Aqui você constrói a rotina inteligente que sustenta resultados no longo prazo.",
    emoji: "⚙️",
    campLabel: "CAMP 3",
    order: 4,
    lessons: [
      { title: "Construindo uma rotina inteligente", slug: "rotina-inteligente", order: 1 },
      { title: "Produtividade sem esgotamento", slug: "produtividade-sem-esgotamento", order: 2 },
      { title: "Gestão de energia (não de tempo)", slug: "gestao-de-energia", order: 3 },
      { title: "A arte da persistência estratégica", slug: "persistencia-estrategica", order: 4 },
      { title: "Como manter hábitos nos dias difíceis", slug: "habitos-dias-dificeis", order: 5 },
    ]
  },
  {
    title: "Camp 4 — Expansão",
    slug: "camp-4-expansao",
    description: "Quem aprende mais rápido sobe mais alto. Acelere sua curva de aprendizado e desenvolva uma mentalidade de crescimento real.",
    emoji: "🚀",
    campLabel: "CAMP 4",
    order: 5,
    lessons: [
      { title: "Técnicas de estudo eficiente", slug: "estudo-eficiente", order: 1 },
      { title: "Aprendizado acelerado na prática", slug: "aprendizado-acelerado", order: 2 },
      { title: "Desenvolvimento pessoal com intenção", slug: "desenvolvimento-pessoal", order: 3 },
      { title: "Mentalidade de crescimento (Growth Mindset)", slug: "growth-mindset", order: 4 },
      { title: "Construindo uma biblioteca mental", slug: "biblioteca-mental", order: 5 },
    ]
  },
  {
    title: "Cume — Autodomínio",
    slug: "cume-autodominio",
    description: "O verdadeiro topo é o domínio de si mesmo. Autoconhecimento profundo, liderança pessoal e direção de vida.",
    emoji: "🏔",
    campLabel: "CUME",
    order: 6,
    lessons: [
      { title: "O caminho do autoconhecimento profundo", slug: "autoconhecimento-profundo", order: 1 },
      { title: "Liderança pessoal: lidere a si mesmo primeiro", slug: "lideranca-pessoal", order: 2 },
      { title: "Encontrando sua direção de vida", slug: "direcao-de-vida", order: 3 },
      { title: "Alta performance mental sustentável", slug: "alta-performance-mental", order: 4 },
      { title: "Sua escalada não termina aqui", slug: "escalada-continua", order: 5 },
    ]
  }
]
```

─────────────────────────────────────────────────────────────
## 11. TURBO.JSON E CONFIGURAÇÕES
─────────────────────────────────────────────────────────────

turbo.json:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "db:generate": {
      "cache": false
    },
    "db:push": {
      "cache": false
    },
    "db:seed": {
      "cache": false
    }
  }
}
```

package.json raiz (workspaces):
```json
{
  "name": "everest-platform",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "db:generate": "turbo db:generate",
    "db:push": "cd packages/db && npx prisma db push",
    "db:seed": "cd packages/db && npx ts-node prisma/seed.ts",
    "site": "cd apps/site-vendas && npm run dev",
    "membros": "cd apps/area-membros && npm run dev"
  }
}
```

─────────────────────────────────────────────────────────────
## 12. NAVBAR DO SITE DE VENDAS
─────────────────────────────────────────────────────────────

Navbar.tsx — fixo no topo com blur:
  - Logo: "⛰ EVEREST" em branco bold
  - Lado direito: link "Já sou aluno →" que abre NEXT_PUBLIC_AREA_MEMBROS_URL/login
  - Fundo: backdrop-blur com fundo semi-transparente everest-black
  - Sem outros links — não distrair o visitante

─────────────────────────────────────────────────────────────
## 13. ORDEM DE EXECUÇÃO
─────────────────────────────────────────────────────────────

Execute nesta ordem exata:

1. Crie a estrutura do monorepo com Turborepo
2. Configure packages/db com Prisma + schema completo
3. Instale e configure shadcn/ui em ambas as apps
4. Configure tailwind.config.ts em ambas as apps com a paleta EVEREST
5. Configure Google Fonts (Sora + Inter) no layout.tsx de cada app
6. Construa o site-vendas: todas as seções na ordem do brief
7. Construa a area-membros: auth, dashboard, módulos, aulas
8. Implemente o webhook Hotmart completo
9. Implemente os templates de email com Resend
10. Crie o seed com os 6 módulos e 30 aulas
11. Crie o .env.example completo
12. Crie README.md com instruções de setup

─────────────────────────────────────────────────────────────
## 14. REGRAS ABSOLUTAS
─────────────────────────────────────────────────────────────

- TypeScript estrito em 100% dos arquivos. Sem `any`.
- Nenhum dado fake que não seja os dados reais do EVEREST descritos neste prompt.
- Todos os textos da landing page devem ser exatamente os do brief — não resuma, não reescreva.
- Todos os botões CTA devem ser vermelhos (#E03E3E) com texto branco.
- O link de todos os CTAs de compra deve usar process.env.NEXT_PUBLIC_HOTMART_CHECKOUT_URL.
- O link "Já sou aluno" deve usar process.env.NEXT_PUBLIC_AREA_MEMBROS_URL.
- O webhook deve validar o token antes de processar qualquer dado.
- Nenhuma rota da area-membros pode ser acessada sem sessão válida (middleware.ts).
- O seed deve ser idempotente: rodar duas vezes não duplica dados (use upsert).
- Commits semânticos ao final de cada fase: feat(site-vendas): ..., feat(area-membros): ...

─────────────────────────────────────────────────────────────
## 15. ENTREGÁVEIS FINAIS
─────────────────────────────────────────────────────────────

Ao final, o projeto deve estar rodando com:
  npm run dev → sobe as duas apps em paralelo
  site-vendas em localhost:3000
  area-membros em localhost:3001

A landing page deve ter todas as 18 seções renderizando com conteúdo real.
O quiz deve funcionar com cálculo de pontuação e resultado correto.
O login deve autenticar contra o banco.
O dashboard deve mostrar progresso real do usuário logado.
O webhook deve criar usuários e disparar email ao receber evento da Hotmart.

Comece agora. Construa tudo.
