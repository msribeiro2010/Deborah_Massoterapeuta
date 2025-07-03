# Configuração do GitHub Pages

Este guia explica como configurar este projeto para ser publicado no GitHub Pages.

## Pré-requisitos

1. Repositório público no GitHub (GitHub Pages gratuito só funciona com repositórios públicos)
2. O projeto deve estar no branch `main`

## Configuração

### 1. Habilitar GitHub Pages no Repositório

1. Vá para o seu repositório no GitHub
2. Clique em **Settings** (Configurações)
3. Role para baixo até a seção **Pages**
4. Em **Source**, selecione **GitHub Actions**

### 2. Arquivos de Configuração

Os seguintes arquivos foram criados/modificados para suportar o GitHub Pages:

- `.github/workflows/deploy.yml` - Workflow do GitHub Actions para build e deploy
- `vite.config.gh-pages.ts` - Configuração específica do Vite para GitHub Pages
- `package.json` - Adicionado script `build:gh-pages`

### 3. Deploy

O deploy acontece automaticamente quando você:

1. Faz push para o branch `main`
2. Cria um Pull Request para o branch `main`
3. Executa manualmente o workflow (workflow_dispatch)

### 4. Acessando o Site

Após o primeiro deploy bem-sucedido, seu site estará disponível em:
```
https://{seu-usuario}.github.io/{nome-do-repositorio}/
```

### 5. Comandos Locais

Para testar o build localmente antes do deploy:

```bash
# Instalar dependências
npm install

# Build para GitHub Pages
npm run build:gh-pages

# O resultado estará na pasta dist/public
```

### 6. Configuração do Base Path

O arquivo `vite.config.gh-pages.ts` configura automaticamente o base path baseado no nome do repositório. Isso garante que todos os assets (CSS, JS, imagens) sejam carregados corretamente no GitHub Pages.

## Diferenças entre Desenvolvimento e Produção

- **Desenvolvimento local**: Roda o full-stack (frontend + backend)
- **GitHub Pages**: Serve apenas o frontend construído (arquivos estáticos)

Se sua aplicação depende de APIs do backend, você precisará:
1. Hospedar o backend separadamente (Vercel, Netlify, Railway, etc.)
2. Atualizar as URLs das APIs no frontend para apontar para o backend hospedado

## Troubleshooting

### Build falha
- Verifique se todas as dependências estão instaladas
- Confirme que o projeto compila localmente com `npm run build:gh-pages`

### Assets não carregam
- Verifique se o base path está configurado corretamente
- Confirme que todos os caminhos de assets são relativos

### 404 em rotas
- GitHub Pages serve apenas arquivos estáticos
- Para SPAs com roteamento, você pode precisar configurar um arquivo `404.html` que redirecione para `index.html`