# Deploy para Vercel - Deborah Santalena

## Pré-requisitos

1. **Conta na Vercel**: Crie uma conta em https://vercel.com
2. **Banco PostgreSQL**: Configure um banco PostgreSQL (recomendado: Neon, Supabase, ou Vercel Postgres)
3. **Vercel CLI**: Instale com `npm i -g vercel`

## Passos para Deploy

### 1. Preparar o Banco de Dados

- Crie um banco PostgreSQL em um provedor cloud
- Anote a string de conexão `DATABASE_URL`
- Execute as migrações: `npm run db:push`

### 2. Configurar Variáveis de Ambiente na Vercel

No painel da Vercel, configure estas variáveis:

```
DATABASE_URL=postgresql://user:password@host:port/database
SESSION_SECRET=sua_chave_secreta_aqui
ADMIN_USERNAME=admin
ADMIN_PASSWORD=sua_senha_admin
NODE_ENV=production
```

### 3. Deploy via CLI

```bash
# Login na Vercel
vercel login

# Deploy
vercel --prod
```

### 4. Deploy via GitHub (Recomendado)

1. Faça push do código para um repositório GitHub
2. Conecte o repositório na Vercel
3. Configure as variáveis de ambiente
4. Deploy automático será feito

## Configurações Importantes

### Upload de Imagens
Na Vercel, os uploads serão salvos em `/tmp` (temporário). Para persistência, recomenda-se:
- AWS S3
- Cloudinary
- Vercel Blob

### Banco de Dados
Certifique-se que o banco suporta conexões SSL e está acessível publicamente.

### Domínio Personalizado
Após o deploy, você pode configurar um domínio personalizado no painel da Vercel.

## Estrutura do Projeto

- `vercel.json`: Configuração de deploy
- `dist/`: Build do servidor (gerado automaticamente)
- `attached_assets/`: Imagens estáticas
- `uploads/`: Uploads temporários (não persistente na Vercel)

## Problemas Comuns

1. **Erro de conexão com banco**: Verifique a `DATABASE_URL`
2. **Imagens não aparecem**: Configure storage externo
3. **Timeout**: Ajuste `maxDuration` no `vercel.json`

## Custos

- Vercel: Gratuito para projetos pessoais (com limites)
- Banco PostgreSQL: Varia por provedor
- Storage de imagens: Varia por provedor