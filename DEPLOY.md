# 🏔️ EVEREST Platform — Guia de Deploy no Ubuntu Server

> **Stack**: Next.js 14 · TypeScript · PostgreSQL · Prisma · Nginx · PM2  
> **Arquitetura**: Monorepo Turborepo com 2 apps (`site-vendas` :3000 e `area-membros` :3001)

---

## 📋 Pré-requisitos

- Ubuntu 22.04 LTS (ou superior)
- Acesso `sudo` ou root
- Domínio apontando para o IP do servidor (ex: `seudominio.com.br` e `membros.seudominio.com.br`)

---

## 1. Atualizar o sistema

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git openssl ufw
```

---

## 2. Instalar o Node.js 20 (LTS)

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # deve mostrar v20.x.x
npm -v    # deve mostrar 10.x.x
```

---

## 3. Instalar o PostgreSQL 15

```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

### Criar banco e usuário

```bash
sudo -u postgres psql
```

Dentro do psql:

```sql
CREATE USER everest_user WITH PASSWORD 'senha_segura_aqui';
CREATE DATABASE everest_db OWNER everest_user;
GRANT ALL PRIVILEGES ON DATABASE everest_db TO everest_user;
\q
```

---

## 4. Instalar PM2 e Turbo globalmente

```bash
sudo npm install -g pm2 turbo
pm2 startup   # siga a instrução que aparece na tela para habilitar no boot
```

---

## 5. Instalar o Nginx

```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

## 6. Clonar o repositório

```bash
cd /var/www
sudo git clone https://github.com/SEU_USUARIO/SEU_REPO.git everest
sudo chown -R $USER:$USER /var/www/everest
cd /var/www/everest
```

---

## 7. Configurar variáveis de ambiente

```bash
cp .env.example .env
nano .env
```

Preencha **todas** as variáveis:

| Variável | Valor |
|---|---|
| `DATABASE_URL` | `postgresql://everest_user:senha_segura_aqui@localhost:5432/everest_db` |
| `NEXTAUTH_SECRET` | Gere com: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://membros.seudominio.com.br` |
| `HOTMART_WEBHOOK_TOKEN` | Token configurado na Hotmart |
| `HOTMART_PRODUCT_ID` | ID do produto na Hotmart |
| `RESEND_API_KEY` | Chave da API do Resend |
| `EMAIL_FROM` | `noreply@seudominio.com.br` |
| `NEXT_PUBLIC_SITE_VENDAS_URL` | `https://seudominio.com.br` |
| `NEXT_PUBLIC_AREA_MEMBROS_URL` | `https://membros.seudominio.com.br` |
| `NEXT_PUBLIC_HOTMART_CHECKOUT_URL` | `https://pay.hotmart.com/ID_DO_PRODUTO` |

> **Gerar o NEXTAUTH_SECRET:**
> ```bash
> openssl rand -base64 32
> ```

---

## 8. Instalar dependências do projeto

```bash
cd /var/www/everest
npm install
```

---

## 9. Configurar o banco de dados (Prisma)

```bash
# Gerar o cliente Prisma
npm run db:generate

# Aplicar o schema no banco
npm run db:push

# (Opcional) Popular com dados iniciais
npm run db:seed
```

---

## 10. Build de produção

```bash
npm run build
```

> Isso executa o build de todos os apps via Turborepo. Aguarde — pode levar 2 a 5 minutos.

---

## 11. Iniciar os apps com PM2

```bash
cd /var/www/everest

# Iniciar área de membros (porta 3001)
pm2 start "npm run start --workspace=apps/area-membros" --name "everest-membros" --cwd /var/www/everest

# Iniciar site de vendas (porta 3000)
pm2 start "npm run start --workspace=apps/site-vendas" --name "everest-site" --cwd /var/www/everest

# Salvar lista de processos para sobreviver a reboots
pm2 save
```

### Verificar se subiram

```bash
pm2 list
pm2 logs everest-membros --lines 20
pm2 logs everest-site --lines 20
```

---

## 12. Configurar o Nginx como proxy reverso

### Site de vendas (`seudominio.com.br`)

```bash
sudo nano /etc/nginx/sites-available/everest-site
```

```nginx
server {
    listen 80;
    server_name seudominio.com.br www.seudominio.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Área de membros (`membros.seudominio.com.br`)

```bash
sudo nano /etc/nginx/sites-available/everest-membros
```

```nginx
server {
    listen 80;
    server_name membros.seudominio.com.br;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Ativar os sites

```bash
sudo ln -s /etc/nginx/sites-available/everest-site /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/everest-membros /etc/nginx/sites-enabled/

sudo nginx -t          # testa a configuração
sudo systemctl reload nginx
```

---

## 13. HTTPS com Certbot (SSL gratuito)

```bash
sudo apt install -y certbot python3-certbot-nginx

sudo certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
sudo certbot --nginx -d membros.seudominio.com.br

# Renovação automática (já configurada pelo certbot, mas verifique)
sudo certbot renew --dry-run
```

---

## 14. Configurar Firewall (UFW)

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'   # libera 80 e 443
sudo ufw enable
sudo ufw status
```

---

## 15. Atualizar o projeto (deploy futuro)

```bash
cd /var/www/everest

git pull origin main
npm install
npm run db:generate
npm run db:push
npm run build

pm2 restart all
```

---

## 🩺 Comandos úteis

```bash
# Ver status dos processos
pm2 list

# Ver logs em tempo real
pm2 logs

# Reiniciar um app específico
pm2 restart everest-membros
pm2 restart everest-site

# Ver uso de CPU/memória
pm2 monit

# Status do PostgreSQL
sudo systemctl status postgresql

# Status do Nginx
sudo systemctl status nginx

# Testar config do Nginx
sudo nginx -t
```

---

## 🗂️ Estrutura de portas

| Serviço | Porta | Acesso |
|---|---|---|
| PostgreSQL | 5432 | interno |
| site-vendas (Next.js) | 3000 | interno (via Nginx) |
| area-membros (Next.js) | 3001 | interno (via Nginx) |
| Nginx HTTP | 80 | público |
| Nginx HTTPS | 443 | público |

---

## ⚠️ Troubleshooting

**Build falha com erro de memória:**
```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

**App não inicia — ver logs:**
```bash
pm2 logs everest-membros --lines 50
```

**Erro de conexão com o banco:**
```bash
# Testar a DATABASE_URL manualmente
psql postgresql://everest_user:senha@localhost:5432/everest_db
```

**Nginx retorna 502 Bad Gateway:**
- Verifique se o PM2 está rodando (`pm2 list`)
- Confirme a porta no bloco `proxy_pass`
- Veja os logs com `pm2 logs`
