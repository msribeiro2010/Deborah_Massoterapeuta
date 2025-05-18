import React, { useState } from 'react';
import { Link } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface SiteImage {
  id: number;
  section: string;
  imageUrl: string;
  title: string | null;
  description: string | null;
}

export default function Images() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<SiteImage | null>(null);

  // Form state
  const [form, setForm] = useState({
    section: '',
    imageUrl: '',
    title: '',
    description: ''
  });

  // Fetch images
  const { data: images, isLoading } = useQuery({
    queryKey: ['/api/admin/images'],
    queryFn: async () => {
      const response = await fetch('/api/admin/images', {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Falha ao carregar imagens');
      return response.json();
    }
  });

  // Create/update mutation
  const saveMutation = useMutation({
    mutationFn: async (image: Partial<SiteImage>) => {
      const url = editingImage ? `/api/admin/images/${editingImage.id}` : '/api/admin/images';
      const method = editingImage ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(image),
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Falha ao salvar imagem');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/images'] });
      setIsDialogOpen(false);
      toast({
        title: 'Sucesso',
        description: `Imagem ${editingImage ? 'atualizada' : 'adicionada'} com sucesso.`
      });
      resetForm();
    },
    onError: (error: any) => {
      toast({
        title: 'Erro',
        description: error.message || 'Ocorreu um erro ao salvar a imagem.',
        variant: 'destructive'
      });
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/images/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) throw new Error('Falha ao excluir imagem');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/images'] });
      toast({
        title: 'Sucesso',
        description: 'Imagem excluída com sucesso.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro',
        description: error.message || 'Ocorreu um erro ao excluir a imagem.',
        variant: 'destructive'
      });
    }
  });

  const resetForm = () => {
    setForm({
      section: '',
      imageUrl: '',
      title: '',
      description: ''
    });
    setEditingImage(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (image: SiteImage) => {
    setEditingImage(image);
    setForm({
      section: image.section,
      imageUrl: image.imageUrl,
      title: image.title || '',
      description: image.description || ''
    });
    setIsDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (value: string) => {
    setForm(prev => ({ ...prev, section: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(form);
  };

  const handleDelete = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta imagem?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Carregando imagens...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gerenciar Imagens</h1>
        <div className="space-x-2">
          <Button variant="outline" asChild>
            <Link href="/admin/dashboard">Voltar ao Painel</Link>
          </Button>
          <Button onClick={openCreateDialog}>Adicionar Imagem</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images?.map((image: SiteImage) => (
          <Card key={image.id}>
            <CardContent className="p-6">
              <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-md">
                <img 
                  src={image.imageUrl} 
                  alt={image.title || 'Imagem do site'} 
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl">{image.title || 'Sem título'}</h3>
                  <p className="text-sm text-muted-foreground">Seção: {image.section}</p>
                  {image.description && <p className="mt-2 line-clamp-2">{image.description}</p>}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => openEditDialog(image)}>
                    Editar
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(image.id)}>
                    Excluir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog para criar/editar imagem */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{editingImage ? 'Editar Imagem' : 'Adicionar Imagem'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="section" className="text-right">Seção</Label>
                <Select 
                  value={form.section} 
                  onValueChange={handleSectionChange}
                  required
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione a seção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero (Topo)</SelectItem>
                    <SelectItem value="about">Sobre</SelectItem>
                    <SelectItem value="gallery">Galeria</SelectItem>
                    <SelectItem value="testimonials">Depoimentos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">URL da Imagem</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleFormChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Título</Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  className="col-span-3"
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
                />
              </div>
              {form.imageUrl && (
                <div className="border rounded-md p-2 mt-2">
                  <p className="text-sm mb-2 text-muted-foreground">Pré-visualização:</p>
                  <img 
                    src={form.imageUrl} 
                    alt="Pré-visualização"
                    className="w-full h-48 object-cover rounded-md"
                    onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Imagem+inválida'}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? 'Salvando...' : 'Salvar'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}