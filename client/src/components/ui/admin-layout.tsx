import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
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
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/messages">Mensagens</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/">Voltar ao site</Link>
              </Button>
              <Button variant="destructive" size="sm" asChild>
                <Link href="/api/admin/logout">Sair</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
        {children}
      </main>
    </div>
  );
}