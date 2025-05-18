import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { loginSchema } from "@shared/schema";
import { z } from "zod";

interface AuthResponse {
  authenticated: boolean;
}

export function useAuth() {
  const { data, isLoading } = useQuery<AuthResponse>({
    queryKey: ["/api/admin/check-auth"],
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: z.infer<typeof loginSchema>) => {
      return await apiRequest("POST", "/api/admin/login", credentials);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/check-auth"] });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest("POST", "/api/admin/logout");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/check-auth"] });
    },
  });

  return {
    isAuthenticated: data?.authenticated ?? false,
    isLoading,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    loginLoading: loginMutation.isPending,
    logoutLoading: logoutMutation.isPending,
    loginError: loginMutation.error,
  };
}