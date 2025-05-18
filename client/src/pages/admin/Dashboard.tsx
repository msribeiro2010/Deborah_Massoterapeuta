import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const { toast } = useToast();
  const [location, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/admin/check-auth', {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Falha ao verificar autenticação');
        }
        
        const data = await response.json();
        
        if (!data.authenticated) {
          navigate('/admin/login');
          return;
        }
        
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/admin/login');
      } finally {
        setIsLoading(false);
      }
    }
    
    checkAuth();
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Falha ao fazer logout');
      }
      
      toast({
        title: 'Logout realizado',
        description: 'Você saiu do painel administrativo com sucesso.'
      });
      
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao fazer logout.',
        variant: 'destructive'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Verificando autenticação...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login page via useEffect
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-bold">Painel Administrativo</h1>
            <nav className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/services">Serviços</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/images">Imagens</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/">Voltar ao site</Link>
              </Button>
              <Button variant="destructive" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Serviços</CardTitle>
              <CardDescription>Adicione, edite ou remova serviços oferecidos</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/services">Gerenciar Serviços</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Imagens</CardTitle>
              <CardDescription>Atualize as imagens exibidas no site</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/images">Gerenciar Imagens</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Voltar ao Site</CardTitle>
              <CardDescription>Visualizar o site como visitante</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full" variant="outline">
                <Link href="/">Visualizar Site</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}