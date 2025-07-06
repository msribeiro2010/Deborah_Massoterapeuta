import { apiUrl } from "./api-config";

// Wrapper para fetch que automaticamente adiciona a URL base da API
export const apiFetch = (url: string, options?: RequestInit) => {
  return fetch(apiUrl(url), {
    ...options,
    credentials: 'include', // Sempre inclui cookies
  });
};