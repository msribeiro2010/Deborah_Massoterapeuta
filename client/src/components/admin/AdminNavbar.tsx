import React from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function AdminNavbar() {
  const [location] = useLocation();
  const { logout, logoutLoading } = useAuth();
  const { toast } = useToast();

  const isActive = (path: string) => {
    return location === path;
  };

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast({
          title: 'Logout realizado',
          description: 'Você saiu do painel administrativo.'
        });
      },
      onError: () => {
        toast({
          title: 'Erro',
          description: 'Ocorreu um erro ao fazer logout.',
          variant: 'destructive'
        });
      }
    });
  };

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-1">
            <Link href="/admin/dashboard">
              <a className="text-xl font-bold">Painel Administrativo</a>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={isActive('/admin/dashboard') ? 'default' : 'ghost'}
              asChild
              size="sm"
            >
              <Link href="/admin/dashboard">Dashboard</Link>
            </Button>
            <Button
              variant={isActive('/admin/services') ? 'default' : 'ghost'}
              asChild
              size="sm"
            >
              <Link href="/admin/services">Serviços</Link>
            </Button>
            <Button
              variant={isActive('/admin/images') ? 'default' : 'ghost'}
              asChild
              size="sm"
            >
              <Link href="/admin/images">Imagens</Link>
            </Button>
            <Button
              variant={isActive('/admin/messages') ? 'default' : 'ghost'}
              asChild
              size="sm"
            >
              <Link href="/admin/messages">Mensagens</Link>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              asChild
            >
              <Link href="/">Ver Site</Link>
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={handleLogout}
              disabled={logoutLoading}
            >
              {logoutLoading ? 'Saindo...' : 'Sair'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}