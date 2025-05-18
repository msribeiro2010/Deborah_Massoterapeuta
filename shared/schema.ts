import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Usuários do site (clientes)
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Administradores do site
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: varchar("username").notNull().unique(),
  passwordHash: varchar("password_hash").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Serviços oferecidos
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  icon: varchar("icon").notNull(),
  duration: varchar("duration").notNull(),
  price: varchar("price").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Imagens do site
export const siteImages = pgTable("site_images", {
  id: serial("id").primaryKey(),
  section: varchar("section").notNull(),
  imageUrl: text("image_url").notNull(),
  title: varchar("title"),
  description: text("description"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Mensagens de contato
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone").notNull(),
  service: varchar("service").notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Esquemas de inserção
export const insertContactSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  phone: true,
  service: true,
  message: true,
});

export const insertServiceSchema = createInsertSchema(services).pick({
  title: true,
  description: true,
  icon: true,
  duration: true,
  price: true,
  active: true,
});

export const insertSiteImageSchema = createInsertSchema(siteImages).pick({
  section: true,
  imageUrl: true,
  title: true,
  description: true,
});

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Nome de usuário é obrigatório" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

// Tipos exportados
export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;

export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = typeof admins.$inferInsert;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type UpdateService = Partial<InsertService> & { id: number };

export type SiteImage = typeof siteImages.$inferSelect;
export type InsertSiteImage = z.infer<typeof insertSiteImageSchema>;
export type UpdateSiteImage = Partial<InsertSiteImage> & { id: number };

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
