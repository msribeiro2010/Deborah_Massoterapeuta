// Configuração da URL da API
// Ajuste a URL de produção para apontar para onde seu backend estará hospedado

export const API_URL = import.meta.env.DEV 
  ? '' // Em desenvolvimento, usa proxy do Vite (mesma origem)
  : 'https://sua-api-backend.com'; // Em produção, aponta para o backend hospedado

// Função helper para construir URLs da API
export const apiUrl = (path: string) => {
  const base = API_URL || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};

// Exemplo de uso:
// fetch(apiUrl('/api/login'), { ... })
// fetch(apiUrl('/api/services'), { ... })