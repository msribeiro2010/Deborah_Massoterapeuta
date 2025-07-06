# 🚀 Instruções para Deploy no GitHub Pages

## Status Atual ✅

Todos os arquivos necessários foram configurados:
- ✅ Workflow do GitHub Actions criado
- ✅ Configuração do Vite para GitHub Pages
- ✅ Nome do repositório atualizado: `Deborah_Massoterapeuta`
- ✅ Arquivos de suporte (404.html, .nojekyll)
- ✅ Configuração de API atualizada

## 🔴 IMPORTANTE: Backend Necessário

**O GitHub Pages hospeda apenas arquivos estáticos (HTML, CSS, JS).**  
Sua aplicação tem um backend Express que precisa ser hospedado separadamente.

### Opções de Hospedagem para o Backend:
1. **Vercel** (já tem arquivo vercel.json configurado)
2. **Railway** (fácil integração com GitHub)
3. **Render** (gratuito com limitações)
4. **Heroku** (pago)

## 📝 Próximos Passos

### 1. Fazer merge para o branch principal

Você está atualmente no branch: `cursor/configurar-publica-o-no-github-pages-8b2f`

```bash
# Mudar para o branch main
git checkout main

# Fazer merge das alterações
git merge cursor/configurar-publica-o-no-github-pages-8b2f

# Fazer push para o GitHub
git push origin main
```

### 2. Configurar GitHub Pages no Repositório

1. Acesse: https://github.com/msribeiro2010/Deborah_Massoterapeuta/settings/pages
2. Em **Source**, selecione: `GitHub Actions`
3. Salve as configurações

### 3. Aguardar o Deploy

1. Acesse: https://github.com/msribeiro2010/Deborah_Massoterapeuta/actions
2. Você verá o workflow "Deploy to GitHub Pages" rodando
3. Aguarde a conclusão (cerca de 2-3 minutos)

### 4. Acessar sua Aplicação

Após o deploy, acesse:
```
https://msribeiro2010.github.io/Deborah_Massoterapeuta/
```

## ⚠️ ATENÇÃO: Configurar URL do Backend

**ANTES de fazer o deploy, você PRECISA:**

1. Hospedar o backend em algum serviço (Vercel, Railway, etc)
2. Obter a URL do backend hospedado
3. Atualizar o arquivo `client/src/lib/api-config.ts`:

```typescript
export const API_URL = import.meta.env.DEV 
  ? '' 
  : 'https://URL-DO-SEU-BACKEND-AQUI'; // Ex: https://deborah-api.vercel.app
```

## 🔧 Comandos Úteis

```bash
# Testar o build localmente
npm run build:gh-pages

# Ver o status do deploy
# Acesse: https://github.com/msribeiro2010/Deborah_Massoterapeuta/actions

# Forçar novo deploy (após configurar tudo)
# Vá em Actions > Deploy to GitHub Pages > Run workflow
```

## ❓ Problemas Comuns

### "Página 404"
- Verifique se o GitHub Pages está habilitado
- Aguarde alguns minutos após o primeiro deploy
- Verifique se o workflow foi concluído com sucesso

### "API não funciona"
- O backend precisa estar hospedado separadamente
- Atualize a URL em `client/src/lib/api-config.ts`
- Faça novo build e deploy após atualizar

### "Imagens não carregam"
- Verifique se as imagens estão na pasta `client/public`
- Use caminhos relativos nas imagens

## 📞 Suporte

Se precisar de ajuda:
1. Verifique os logs em: Actions > Deploy to GitHub Pages
2. Confirme que o backend está funcionando separadamente
3. Verifique o console do navegador para erros

---

**Lembre-se**: O GitHub Pages é APENAS para o frontend. O backend precisa de hospedagem própria!