import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  const [location, navigate] = useLocation();
  const [images, setImages] = useState<SiteImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<SiteImage | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Form state
  const [form, setForm] = useState({
    section: '',
    imageUrl: '',
    title: '',
    description: ''
  });

  // Check authentication
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
        loadImages();
      } catch (error) {
        console.error('Authentication error:', error);
        navigate('/admin/login');
      }
    }
    
    checkAuth();
  }, [navigate]);

  // Load images
  async function loadImages() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/images', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Falha ao carregar imagens');
      }
      
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error loading images:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as imagens',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const url = editingImage 
        ? `/api/admin/images/${editingImage.id}` 
        : '/api/admin/images';
      
      const method = editingImage ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`Falha ao ${editingImage ? 'atualizar' : 'adicionar'} imagem`);
      }
      
      const updatedImage = await response.json();
      
      if (editingImage) {
        // Update the image in the local state
        setImages(prev => 
          prev.map(img => img.id === updatedImage.id ? updatedImage : img)
        );
      } else {
        // Add new image to the local state
        setImages(prev => [...prev, updatedImage]);
      }
      
      setIsDialogOpen(false);
      toast({
        title: 'Sucesso',
        description: `Imagem ${editingImage ? 'atualizada' : 'adicionada'} com sucesso.`
      });
      resetForm();
    } catch (error) {
      console.error('Error saving image:', error);
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
    if (!confirm('Tem certeza que deseja excluir esta imagem?')) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      const response = await fetch(`/api/admin/images/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Falha ao excluir imagem');
      }
      
      // Remove the image from the local state
      setImages(prev => prev.filter(img => img.id !== id));
      
      toast({
        title: 'Sucesso',
        description: 'Imagem excluída com sucesso.'
      });
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: 'Erro',
        description: error instanceof Error ? error.message : 'Ocorreu um erro ao excluir',
        variant: 'destructive'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Carregando...</div>
      </div>
    );
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Gerenciar Imagens</h2>
          <Button onClick={openCreateDialog}>Adicionar Imagem</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.length === 0 ? (
            <div className="col-span-full text-center p-8 border rounded-lg bg-muted/50">
              <h3 className="text-xl font-medium">Nenhuma imagem cadastrada</h3>
              <p className="text-muted-foreground mt-2">Clique em "Adicionar Imagem" para começar</p>
            </div>
          ) : (
            images.map((image) => (
              <Card key={image.id}>
                <CardHeader>
                  <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-md">
                    <img 
                      src={image.imageUrl} 
                      alt={image.title || 'Imagem do site'} 
                      className="w-full h-48 object-cover"
                      onError={(e) => (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Imagem+inválida'}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{image.title || 'Sem título'}</h3>
                    <p className="text-sm text-muted-foreground">Seção: {image.section}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  {image.description && <p className="mb-4">{image.description}</p>}
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(image)}>
                      Editar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleDelete(image.id)}
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
                  <div className="col-span-3">
                    <Select 
                      value={form.section} 
                      onValueChange={handleSectionChange}
                      required
                    >
                      <SelectTrigger>
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
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? 'Salvando...' : 'Salvar'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}