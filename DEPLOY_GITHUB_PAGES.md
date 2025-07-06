# Deploy da Aplicação Deborah Massoterapeuta no GitHub Pages

## 📋 Análise do Projeto

Esta aplicação é um projeto **full-stack** construído com:
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express 
- **Database**: PostgreSQL/Neon
- **Styling**: Tailwind CSS + Radix UI

### 🔍 Configuração Atual

O projeto **já está configurado** para deploy no GitHub Pages com as seguintes configurações:

#### 1. **Scripts do Package.json**
```json
{
  "build:gh-pages": "NODE_ENV=production vite build",
  "predeploy": "npm run build:gh-pages", 
  "deploy": "gh-pages -d dist"
}
```

#### 2. **Configuração do Vite**
```typescript
// vite.config.ts
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Deborah_Massoterapeuta/' : '/',
  // ...
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
});
```

#### 3. **Configuração SPA (Single Page App)**
- ✅ `client/404.html` - Configurado para redirecionamento de rotas
- ✅ `client/index.html` - Com script para roteamento SPA
- ✅ GitHub Actions workflow configurado

## 🚀 Como Fazer o Deploy

### **Método 1: GitHub Actions (Recomendado)**

#### Pré-requisitos:
1. **Repositório no GitHub** com o nome `Deborah_Massoterapeuta`
2. **GitHub Pages habilitado** no repositório

#### Passos:

1. **Habilitar GitHub Pages:**
   ```
   Repositório → Settings → Pages → Source: GitHub Actions
   ```

2. **Push para branch main:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **O workflow será executado automaticamente** e fará o deploy em:
   ```
   https://[seu-usuario].github.io/Deborah_Massoterapeuta/
   ```

### **Método 2: Deploy Manual**

```bash
# Instalar dependências
npm install

# Build para produção
npm run build:gh-pages

# Deploy manual (usando gh-pages)
npm run deploy
```

## ⚠️ Considerações Importantes

### **Limitações do GitHub Pages:**

1. **Apenas conteúdo estático** - O backend Express **NÃO funcionará**
2. **Sem banco de dados** - Funcionalidades que dependem do PostgreSQL não funcionarão
3. **Sem APIs server-side** - Endpoints da API não estarão disponíveis

### **Funcionalidades que funcionarão:**
- ✅ Interface React (frontend)
- ✅ Roteamento client-side
- ✅ Componentes visuais
- ✅ Animações e interações
- ✅ Formulários (interface apenas)

### **Funcionalidades que NÃO funcionarão:**
- ❌ Autenticação/login
- ❌ Salvamento de dados
- ❌ Upload de arquivos
- ❌ Envio de emails
- ❌ APIs do backend

## 🛠️ Soluções Alternativas

### **Para uma aplicação full-stack completa, considere:**

1. **Vercel** (já configurado)
   - Já existe `vercel.json` e `DEPLOY_VERCEL.md`
   - Suporta backend Node.js
   - Suporta banco de dados

2. **Netlify**
   - Suporta Functions (backend)
   - Formulários nativos

3. **Railway/Render**
   - Hosting full-stack
   - Banco de dados PostgreSQL

## 📁 Estrutura do Build

Após o build, a estrutura será:
```
dist/
└── public/
    ├── index.html
    ├── 404.html
    ├── assets/
    │   ├── *.css
    │   └── *.js
    └── [outros arquivos estáticos]
```

## 🔧 Configuração do GitHub Actions

O workflow `.github/workflows/static.yml` já está configurado e:
- ✅ Executa no push para `main`
- ✅ Instala dependências
- ✅ Faz build da aplicação
- ✅ Copia o arquivo 404.html
- ✅ Faz deploy automático

## 📝 Checklist de Deploy

- [ ] Repositório GitHub criado com nome `Deborah_Massoterapeuta`
- [ ] GitHub Pages habilitado (Source: GitHub Actions)
- [ ] Push do código para branch `main`
- [ ] Workflow executado com sucesso
- [ ] Site acessível em `https://[usuario].github.io/Deborah_Massoterapeuta/`
- [ ] Teste de navegação e roteamento

## 🌐 URL Final

Se o seu usuário GitHub for `meuusuario`, o site estará disponível em:
```
https://meuusuario.github.io/Deborah_Massoterapeuta/
```

## 📞 Suporte

Para funcionalidades completas com backend, considere usar o deploy no **Vercel** que já está configurado no projeto.