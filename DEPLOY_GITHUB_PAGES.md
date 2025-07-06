# Deploy no GitHub Pages

Este guia explica como configurar e fazer deploy do frontend da aplicação no GitHub Pages.

## Configuração Inicial

### 1. Atualize o nome do repositório

Edite o arquivo `vite.config.gh-pages.ts` e substitua `'seu-repositorio'` pelo nome real do seu repositório GitHub:

```typescript
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'nome-do-seu-repositorio';
```

### 2. Configure o GitHub Pages no repositório

1. Vá para **Settings** > **Pages** no seu repositório GitHub
2. Em **Source**, selecione **GitHub Actions**

### 3. Atualize o branch no workflow (se necessário)

Se você usa um branch diferente de `main`, edite `.github/workflows/deploy-gh-pages.yml`:

```yaml
on:
  push:
    branches: [ seu-branch-principal ]
```

## Deploy Automático

O deploy acontece automaticamente quando você faz push para o branch principal. O workflow do GitHub Actions:

1. Instala as dependências
2. Faz o build do projeto
3. Publica no GitHub Pages

## Deploy Manual

Para fazer deploy manualmente:

1. Faça o build local:
   ```bash
   npm run build:gh-pages
   ```

2. Ou acione o workflow manualmente no GitHub:
   - Vá para **Actions** > **Deploy to GitHub Pages**
   - Clique em **Run workflow**

## URL da Aplicação

Após o primeiro deploy, sua aplicação estará disponível em:
```
https://[seu-usuario].github.io/[nome-do-repositorio]/
```

## Observações Importantes

- **Apenas o frontend** será hospedado no GitHub Pages
- O backend Express precisa ser hospedado em outro serviço (Vercel, Railway, Render, etc.)
- Você precisará atualizar as URLs da API no frontend para apontar para o backend hospedado

## Configuração da API no Frontend

Você precisará configurar a URL da API no frontend. Exemplo:

```javascript
// Em desenvolvimento
const API_URL = import.meta.env.DEV 
  ? 'http://localhost:3000' 
  : 'https://sua-api-backend.com';
```

## Troubleshooting

### Build falha com erro de tipos

Se o build falhar, você pode temporariamente desabilitar a checagem de tipos:

```bash
npm run build:gh-pages -- --no-tsc
```

### Página 404

Certifique-se de que:
- O GitHub Pages está habilitado nas configurações
- O nome do repositório está correto em `vite.config.gh-pages.ts`
- O deploy foi concluído com sucesso (verifique em Actions)

### Assets não carregam

Verifique se o `base` path está correto no `vite.config.gh-pages.ts`