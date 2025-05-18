import React, { useState } from 'react';
import { Link } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function Messages() {
  const { toast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch messages
  const { data: messages, isLoading } = useQuery({
    queryKey: ['/api/admin/contact-messages'],
    queryFn: async () => {
      const response = await fetch('/api/admin/contact-messages', {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Falha ao carregar mensagens');
      return response.json();
    }
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/contact-messages/${id}/read`, {
        method: 'PUT',
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Falha ao marcar mensagem como lida');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/contact-messages'] });
      toast({
        title: 'Sucesso',
        description: 'Mensagem marcada como lida.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro',
        description: error.message || 'Ocorreu um erro ao atualizar a mensagem.',
        variant: 'destructive'
      });
    }
  });

  const viewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setIsDialogOpen(true);
    
    if (!message.read) {
      markAsReadMutation.mutate(message.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando mensagens...</div>;
  }

  const unreadCount = messages?.filter((msg: ContactMessage) => !msg.read).length || 0;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mensagens de Contato</h1>
          {unreadCount > 0 && (
            <p className="text-sm mt-1">
              Você tem <Badge variant="destructive">{unreadCount}</Badge> {unreadCount === 1 ? 'mensagem não lida' : 'mensagens não lidas'}
            </p>
          )}
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/dashboard">Voltar ao Painel</Link>
        </Button>
      </div>

      {messages?.length === 0 ? (
        <div className="text-center p-8 border rounded-lg bg-muted/50">
          <h3 className="text-xl font-medium">Nenhuma mensagem recebida</h3>
          <p className="text-muted-foreground mt-2">As mensagens de contato aparecerão aqui quando os clientes enviarem.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages?.map((message: ContactMessage) => (
            <Card 
              key={message.id} 
              className={`transition-all hover:shadow-md ${!message.read ? 'border-primary' : ''}`}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-xl">{message.name}</h3>
                      {!message.read && (
                        <Badge variant="secondary">Nova</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {message.email} • {message.phone}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Serviço: {message.service}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Recebida em: {formatDate(message.createdAt)}
                    </p>
                    <p className="mt-3 line-clamp-2">{message.message}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => viewMessage(message)}>
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog para visualizar mensagem completa */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle>Mensagem de {selectedMessage.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Nome:</p>
                    <p>{selectedMessage.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Serviço de interesse:</p>
                    <p>{selectedMessage.service}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email:</p>
                    <p>{selectedMessage.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Telefone:</p>
                    <p>{selectedMessage.phone}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">Data:</p>
                    <p>{formatDate(selectedMessage.createdAt)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Mensagem:</p>
                  <div className="p-4 bg-muted rounded-md whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  asChild 
                  variant="secondary"
                >
                  <a href={`mailto:${selectedMessage.email}?subject=Re: Contato via site`} target="_blank" rel="noopener noreferrer">
                    Responder por Email
                  </a>
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>Fechar</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}