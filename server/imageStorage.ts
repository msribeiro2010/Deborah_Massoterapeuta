import fs from 'fs-extra';
import path from 'path';
import type { SiteImage, InsertSiteImage, UpdateSiteImage } from '@shared/schema';

const IMAGES_FILE = path.join(process.cwd(), 'data', 'images.json');

// Garantir que o diretório existe
fs.ensureDirSync(path.dirname(IMAGES_FILE));

export class PersistentImageStorage {
  private nextId = 1;

  constructor() {
    // Carregar dados existentes ou criar arquivo inicial
    this.loadData();
  }

  private loadData(): SiteImage[] {
    try {
      if (fs.existsSync(IMAGES_FILE)) {
        const data = fs.readJsonSync(IMAGES_FILE);
        if (data.images && Array.isArray(data.images)) {
          this.nextId = Math.max(...data.images.map((img: SiteImage) => img.id), 0) + 1;
          return data.images;
        }
      }
    } catch (error) {
      console.warn('Erro ao carregar arquivo de imagens:', error);
    }
    
    // Se não existir ou houver erro, criar estrutura inicial
    const initialData = { images: [] };
    fs.writeJsonSync(IMAGES_FILE, initialData);
    return [];
  }

  private saveData(images: SiteImage[]): void {
    try {
      fs.writeJsonSync(IMAGES_FILE, { images });
    } catch (error) {
      console.error('Erro ao salvar arquivo de imagens:', error);
    }
  }

  async getSiteImages(): Promise<SiteImage[]> {
    return this.loadData();
  }

  async getSiteImagesBySection(section: string): Promise<SiteImage[]> {
    const images = this.loadData();
    return images.filter(img => img.section === section);
  }

  async getSiteImage(id: number): Promise<SiteImage | undefined> {
    const images = this.loadData();
    return images.find(img => img.id === id);
  }

  async createSiteImage(imageData: InsertSiteImage): Promise<SiteImage> {
    const images = this.loadData();
    const newImage: SiteImage = {
      id: this.nextId++,
      section: imageData.section,
      imageUrl: imageData.imageUrl,
      title: imageData.title ?? null,
      description: imageData.description ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    images.push(newImage);
    this.saveData(images);
    return newImage;
  }

  async updateSiteImage(imageData: UpdateSiteImage): Promise<SiteImage | undefined> {
    const images = this.loadData();
    const index = images.findIndex(img => img.id === imageData.id);
    
    if (index === -1) return undefined;
    
    images[index] = {
      ...images[index],
      ...imageData,
      updatedAt: new Date()
    };
    
    this.saveData(images);
    return images[index];
  }

  async deleteSiteImage(id: number): Promise<boolean> {
    const images = this.loadData();
    const index = images.findIndex(img => img.id === id);
    
    if (index === -1) return false;
    
    images.splice(index, 1);
    this.saveData(images);
    return true;
  }
}

export const persistentImageStorage = new PersistentImageStorage();