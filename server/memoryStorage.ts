import { 
  type User, 
  type UpsertUser, 
  type ContactMessage, 
  type InsertContact, 
  type Admin,
  type Service,
  type InsertService,
  type UpdateService,
  type SiteImage,
  type InsertSiteImage,
  type UpdateSiteImage
} from "@shared/schema";
import bcrypt from "bcryptjs";

// Armazenamento temporário em memória
class MemoryStorage {
  private images: SiteImage[] = [];
  private contacts: ContactMessage[] = [];
  private services: Service[] = [];
  private admins: Admin[] = [];
  private users: User[] = [];
  private nextId = 1;
  private imagesFile = './persistent_images.json';

  constructor() {
    // Criar administrador usando variáveis de ambiente
    const adminUsername = process.env.ADMIN_USERNAME || "admin";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    
    this.admins.push({
      id: 1,
      username: adminUsername,
      passwordHash: bcrypt.hashSync(adminPassword, 10),
      createdAt: new Date()
    });

    // Carregar imagens salvas
    this.loadImages();
  }

  private loadImages() {
    // Carregar as imagens reais da Deborah Santalena
    this.images = [
      {
        id: 1,
        section: "hero",
        imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        title: "Tratamento Facial Especializado",
        description: "Relaxamento e rejuvenescimento com técnicas profissionais",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        section: "about",
        imageUrl: "/src/assets/IMG_3384.JPG",
        title: "Massagem Terapêutica",
        description: "Técnicas especializadas para alívio e bem-estar",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        section: "ambiente",
        imageUrl: "/src/assets/IMG_3381.JPG",
        title: "Ambiente Profissional",
        description: "Espaço tranquilo e acolhedor para seu relaxamento",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        section: "ambiente",
        imageUrl: "/src/assets/IMG_3383.JPG",
        title: "Massagem Cervical",
        description: "Cuidado especializado para região do pescoço e ombros",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    this.nextId = 5;
  }

  private saveImages() {
    // As imagens ficam salvas na memória durante a sessão
    console.log(`Imagens salvas: ${this.images.length}`);
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const existingIndex = this.users.findIndex(user => user.id === userData.id);
    
    if (existingIndex >= 0) {
      this.users[existingIndex] = { ...this.users[existingIndex], ...userData, updatedAt: new Date() };
      return this.users[existingIndex];
    } else {
      const newUser: User = {
        id: userData.id,
        email: userData.email ?? null,
        firstName: userData.firstName ?? null,
        lastName: userData.lastName ?? null,
        profileImageUrl: userData.profileImageUrl ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.users.push(newUser);
      return newUser;
    }
  }

  // Admin operations
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return this.admins.find(admin => admin.username === username);
  }

  async verifyAdminPassword(username: string, password: string): Promise<Admin | undefined> {
    const admin = await this.getAdminByUsername(username);
    if (admin && bcrypt.compareSync(password, admin.passwordHash)) {
      return admin;
    }
    return undefined;
  }

  // Contact operations
  async createContactMessage(message: InsertContact): Promise<ContactMessage> {
    const newMessage: ContactMessage = {
      id: this.nextId++,
      ...message,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.contacts.push(newMessage);
    return newMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return [...this.contacts].reverse();
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    return this.contacts.find(msg => msg.id === id);
  }

  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const message = this.contacts.find(msg => msg.id === id);
    if (message) {
      message.read = true;
      message.updatedAt = new Date();
    }
    return message;
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    return [...this.services];
  }

  async getActiveServices(): Promise<Service[]> {
    return this.services.filter(service => service.active);
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.find(service => service.id === id);
  }

  async createService(service: InsertService): Promise<Service> {
    const newService: Service = {
      id: this.nextId++,
      ...service,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.services.push(newService);
    return newService;
  }

  async updateService(serviceData: UpdateService): Promise<Service | undefined> {
    const index = this.services.findIndex(service => service.id === serviceData.id);
    if (index >= 0) {
      this.services[index] = { 
        ...this.services[index], 
        ...serviceData, 
        updatedAt: new Date() 
      };
      return this.services[index];
    }
    return undefined;
  }

  async deleteService(id: number): Promise<boolean> {
    const index = this.services.findIndex(service => service.id === id);
    if (index >= 0) {
      this.services.splice(index, 1);
      return true;
    }
    return false;
  }

  // Site image operations
  async getSiteImages(): Promise<SiteImage[]> {
    return [...this.images];
  }

  async getSiteImagesBySection(section: string): Promise<SiteImage[]> {
    return this.images.filter(image => image.section === section);
  }

  async getSiteImage(id: number): Promise<SiteImage | undefined> {
    return this.images.find(image => image.id === id);
  }

  async createSiteImage(image: InsertSiteImage): Promise<SiteImage> {
    const newImage: SiteImage = {
      id: this.nextId++,
      section: image.section,
      imageUrl: image.imageUrl,
      title: image.title ?? null,
      description: image.description ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.images.push(newImage);
    return newImage;
  }

  async updateSiteImage(imageData: UpdateSiteImage): Promise<SiteImage | undefined> {
    const index = this.images.findIndex(image => image.id === imageData.id);
    if (index >= 0) {
      this.images[index] = { 
        ...this.images[index], 
        ...imageData, 
        updatedAt: new Date() 
      };
      return this.images[index];
    }
    return undefined;
  }

  async deleteSiteImage(id: number): Promise<boolean> {
    const index = this.images.findIndex(image => image.id === id);
    if (index >= 0) {
      this.images.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const memoryStorage = new MemoryStorage();