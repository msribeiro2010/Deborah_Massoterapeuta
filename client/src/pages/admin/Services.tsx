import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { AdminLayout } from '@/components/ui/admin-layout';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  duration: string;
  price: string;
  active: boolean;
}

export default function Services() {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state
  const [form, setForm] = useState({
    title: '',
    description: '',
    icon: '',
    duration: '',
    price: '',
    active: true
  });

  // Load services
  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch('/api/admin/services', {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Falha ao carregar serviços');
        }
        
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error loading services:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os serviços',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    loadServices();
  }, [toast]);

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      icon: '',
      duration: '',
      price: '',
      active: true
    });
    setEditingService(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      duration: service.duration,
      price: service.price,
      active: service.active
    });
    setIsDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setForm(prev => ({ ...prev, active: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const url = editingService 
        ? `/api/admin/services/${editingService.id}` 
        : '/api/admin/services';
      
      const method = editingService ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`Falha ao ${editingService ? 'atualizar' : 'criar'} serviço`);
      }
      
      const updatedService = await response.json();
      
      if (editingService) {
        // Update the service in the local state
        setServices(prev => 
          prev.map(s => s.id === updatedService.id ? updatedService : s)
        );
      } else {
        // Add new service to the local state
        setServices(prev => [...prev, updatedService]);
      }
      
      setIsDialogOpen(false);
      toast({
        title: 'Sucesso',
        description: `Serviço ${editingService ? 'atualizado' : 'criado'} com sucesso.`
      });
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Ocorreu um erro ao salvar',
        variant: 'destructive'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/admin/services/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Falha ao excluir serviço');
      }
      
      // Remove the service from the local state
      setServices(prev => prev.filter(s => s.id !== id));
      
      toast({
        title: 'Sucesso',
        description: 'Serviço excluído com sucesso.'
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Ocorreu um erro ao excluir',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout title="Gerenciar Serviços">
        <div className="flex justify-center p-8">Carregando serviços...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Gerenciar Serviços">
      <div className="flex justify-end mb-6">
        <Button onClick={openCreateDialog}>Adicionar Serviço</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.length === 0 ? (
          <div className="col-span-full text-center p-8 border rounded-lg bg-muted/50">
            <h3 className="text-xl font-medium">Nenhum serviço cadastrado</h3>
            <p className="text-muted-foreground mt-2">Clique em "Adicionar Serviço" para começar</p>
          </div>
        ) : (
          services.map((service) => (
            <Card key={service.id} className={!service.active ? 'opacity-70' : ''}>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-xl">{service.title}</h3>
                    <p className="text-muted-foreground">{service.duration} • {service.price}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 line-clamp-3">{service.description}</p>
                {!service.active && (
                  <p className="text-sm text-muted-foreground mb-4 italic">Serviço inativo</p>
                )}
                <div className="flex space-x-2 mt-4">
                  <Button size="sm" variant="outline" onClick={() => openEditDialog(service)}>
                    Editar
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive" 
                    onClick={() => handleDelete(service.id)}
                    disabled={isDeleting}
                  >
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Dialog para criar/editar serviço */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingService ? 'Editar Serviço' : 'Adicionar Serviço'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Título</Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="icon" className="text-right">Ícone</Label>
                <Input
                  id="icon"
                  name="icon"
                  value={form.icon}
                  onChange={handleFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">Duração</Label>
                <Input
                  id="duration"
                  name="duration"
                  value={form.duration}
                  onChange={handleFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">Preço</Label>
                <Input
                  id="price"
                  name="price"
                  value={form.price}
                  onChange={handleFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  className="col-span-3"
                  rows={3}
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="active" className="text-right">Ativo</Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={form.active}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="active" className="cursor-pointer">
                    {form.active ? 'Serviço ativo' : 'Serviço inativo'}
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}