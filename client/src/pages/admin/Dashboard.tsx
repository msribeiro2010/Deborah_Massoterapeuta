import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminNavbar from '@/components/admin/AdminNavbar';

export default function Dashboard() {
  return (
    <>
      <AdminNavbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
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
              <CardTitle>Mensagens de Contato</CardTitle>
              <CardDescription>Visualize mensagens recebidas dos clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/admin/messages">Ver Mensagens</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}