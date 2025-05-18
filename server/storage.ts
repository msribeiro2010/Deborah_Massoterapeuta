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

import { db } from "./db";
import { 
  users, 
  contactMessages, 
  admins,
  services,
  siteImages
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import bcrypt from "bcryptjs";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Admin operations
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  verifyAdminPassword(username: string, password: string): Promise<Admin | undefined>;
  
  // Contact operations
  createContactMessage(message: InsertContact): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: number): Promise<ContactMessage | undefined>;
  markContactMessageAsRead(id: number): Promise<ContactMessage | undefined>;
  
  // Service operations
  getServices(): Promise<Service[]>;
  getActiveServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(service: UpdateService): Promise<Service | undefined>;
  deleteService(id: number): Promise<boolean>;
  
  // Site image operations
  getSiteImages(): Promise<SiteImage[]>;
  getSiteImagesBySection(section: string): Promise<SiteImage[]>;
  getSiteImage(id: number): Promise<SiteImage | undefined>;
  createSiteImage(image: InsertSiteImage): Promise<SiteImage>;
  updateSiteImage(image: UpdateSiteImage): Promise<SiteImage | undefined>;
  deleteSiteImage(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Admin operations
  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin;
  }

  async verifyAdminPassword(username: string, password: string): Promise<Admin | undefined> {
    const admin = await this.getAdminByUsername(username);
    if (!admin) return undefined;
    
    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);
    return isPasswordValid ? admin : undefined;
  }
  
  // Contact operations
  async createContactMessage(message: InsertContact): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  }

  async getContactMessage(id: number): Promise<ContactMessage | undefined> {
    const [message] = await db.select().from(contactMessages).where(eq(contactMessages.id, id));
    return message;
  }

  async markContactMessageAsRead(id: number): Promise<ContactMessage | undefined> {
    const [updatedMessage] = await db
      .update(contactMessages)
      .set({ read: true })
      .where(eq(contactMessages.id, id))
      .returning();
    return updatedMessage;
  }
  
  // Service operations
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(desc(services.createdAt));
  }

  async getActiveServices(): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .where(eq(services.active, true))
      .orderBy(desc(services.createdAt));
  }

  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  async updateService(serviceData: UpdateService): Promise<Service | undefined> {
    const { id, ...data } = serviceData;
    const [updatedService] = await db
      .update(services)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return updatedService;
  }

  async deleteService(id: number): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id));
    return !!result;
  }
  
  // Site image operations
  async getSiteImages(): Promise<SiteImage[]> {
    return await db.select().from(siteImages).orderBy(desc(siteImages.updatedAt));
  }

  async getSiteImagesBySection(section: string): Promise<SiteImage[]> {
    return await db
      .select()
      .from(siteImages)
      .where(eq(siteImages.section, section))
      .orderBy(desc(siteImages.updatedAt));
  }

  async getSiteImage(id: number): Promise<SiteImage | undefined> {
    const [image] = await db.select().from(siteImages).where(eq(siteImages.id, id));
    return image;
  }

  async createSiteImage(image: InsertSiteImage): Promise<SiteImage> {
    const [newImage] = await db.insert(siteImages).values(image).returning();
    return newImage;
  }

  async updateSiteImage(imageData: UpdateSiteImage): Promise<SiteImage | undefined> {
    const { id, ...data } = imageData;
    const [updatedImage] = await db
      .update(siteImages)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(siteImages.id, id))
      .returning();
    return updatedImage;
  }

  async deleteSiteImage(id: number): Promise<boolean> {
    const result = await db.delete(siteImages).where(eq(siteImages.id, id));
    return !!result;
  }
}

export const storage = new DatabaseStorage();
