import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useAuth } from "@/hooks/useAuth";

// Lazy loading das páginas de administração
const AdminLogin = lazy(() => import("@/pages/admin/Login"));
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const AdminServices = lazy(() => import("@/pages/admin/Services"));
const AdminImages = lazy(() => import("@/pages/admin/Images"));
const AdminMessages = lazy(() => import("@/pages/admin/Messages"));

// Componente para proteger rotas de administração
function AdminRoute({ component: Component, ...rest }: { component: React.ComponentType<any>, path: string }) {
  const { isAuthenticated, isLoading } = useAuth();
  const [location, navigate] = useLocation();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  // Usamos um efeito para redirecionar de forma segura
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/admin/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  // Renderiza o componente apenas se estiver autenticado
  if (!isAuthenticated) {
    return <div className="flex items-center justify-center min-h-screen">Redirecionando...</div>;
  }

  return <Component {...rest} />;
}

function Router() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Carregando...</div>}>
      <Switch>
        {/* Rotas públicas */}
        <Route path="/" component={Home} />
        
        {/* Rotas de administração */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin/dashboard">
          {(params) => <AdminRoute component={AdminDashboard} path="/admin/dashboard" />}
        </Route>
        <Route path="/admin/services">
          {(params) => <AdminRoute component={AdminServices} path="/admin/services" />}
        </Route>
        <Route path="/admin/images">
          {(params) => <AdminRoute component={AdminImages} path="/admin/images" />}
        </Route>
        <Route path="/admin/messages">
          {(params) => <AdminRoute component={AdminMessages} path="/admin/messages" />}
        </Route>
        
        {/* Rota 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
