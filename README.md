# ⛰ EVEREST Platform

Plataforma de curso digital EVEREST — monorepo com site de vendas e área de membros.

## Setup

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar variáveis de ambiente
```bash
cp .env.example .env
# Edite .env com suas credenciais reais
```

### 3. Configurar banco de dados
```bash
npm run db:push    # Cria tabelas no PostgreSQL
npm run db:seed    # Popula com os 6 módulos e 30 aulas
```

### 4. Rodar em desenvolvimento
```bash
npm run dev
# site-vendas: http://localhost:3000
# area-membros: http://localhost:3001
```

## Estrutura

- `apps/site-vendas` — Landing page pública
- `apps/area-membros` — Área de membros protegida
- `packages/db` — Prisma schema e cliente compartilhado
- `packages/ui` — Componentes compartilhados

## Integrações

- **Hotmart Webhook**: `POST /api/hotmart/webhook` — Cria usuário e envia email de boas-vindas
- **NextAuth**: Autenticação por credenciais (email/senha)
- **Resend**: Email transacional de boas-vindas
- **Panda Video**: Player de vídeo via iframe

## Variáveis de Ambiente

Ver `.env.example` para todas as variáveis necessárias.
