// Configuração da URL da API
// IMPORTANTE: Atualize a URL de produção para apontar para onde seu backend estará hospedado
// Exemplos: https://api.seudominio.com, https://seu-app.herokuapp.com, https://seu-app.onrender.com

export const API_URL = import.meta.env.DEV 
  ? '' // Em desenvolvimento, usa proxy do Vite (mesma origem)
  : ''; // ATENÇÃO: Configure aqui a URL do seu backend em produção!

// Função helper para construir URLs da API
export const apiUrl = (path: string) => {
  const base = API_URL || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};

// Exemplo de uso:
// fetch(apiUrl('/api/login'), { ... })
// fetch(apiUrl('/api/services'), { ... })