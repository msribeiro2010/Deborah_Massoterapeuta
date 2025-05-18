import express, { type Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  loginSchema, 
  insertServiceSchema, 
  insertSiteImageSchema 
} from "@shared/schema";
import { z } from "zod";
import session from "express-session";
import pgSession from "connect-pg-simple";
import { upload, getImageUrl } from "./upload";

// Definir tipagem para a sessão
declare module 'express-session' {
  interface SessionData {
    adminId?: number;
  }
}

const PgSessionStore = pgSession(session);
const pgSessionStore = new PgSessionStore({
  conString: process.env.DATABASE_URL,
  createTableIfMissing: false,
  tableName: "sessions",
});

// Middleware para verificar autenticação de administrador
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.adminId) {
    next();
  } else {
    res.status(401).json({ message: "Não autorizado" });
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Servir arquivos estáticos da pasta uploads
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
  
  // Configurar middleware de sessão
  app.use(
    session({
      store: pgSessionStore,
      secret: process.env.SESSION_SECRET || "sua-chave-secreta",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 dia
      },
    })
  );

  // ----- Rotas públicas -----
  
  // Rota para obter imagens por seção
  app.get("/api/images/:section", async (req, res) => {
    try {
      const { section } = req.params;
      
      if (section === "all") {
        // Retorna todas as imagens
        const images = await storage.getSiteImages();
        res.status(200).json(images);
      } else {
        // Retorna imagens por seção específica
        const images = await storage.getSiteImagesBySection(section);
        res.status(200).json(images);
      }
    } catch (error) {
      console.error("Error fetching section images:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao buscar as imagens da seção."
      });
    }
  });
  
  // Handle contact form submissions
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request data
      const validatedData = insertContactSchema.parse(req.body);
      
      // Store contact message
      const message = await storage.createContactMessage(validatedData);
      
      // Return success response
      res.status(201).json({
        message: "Mensagem recebida com sucesso",
        id: message.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          errors: error.errors
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({
          message: "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde."
        });
      }
    }
  });

  // Obter serviços ativos
  app.get("/api/services", async (req, res) => {
    try {
      const services = await storage.getActiveServices();
      res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao buscar os serviços."
      });
    }
  });

  // Obter imagens por seção
  app.get("/api/images/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const images = await storage.getSiteImagesBySection(section);
      res.status(200).json(images);
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao buscar as imagens."
      });
    }
  });

  // ----- Rotas de administração (autenticação) -----
  
  // Login de administrador
  app.post("/api/admin/login", async (req, res) => {
    try {
      // Validar dados de login
      const loginData = loginSchema.parse(req.body);
      
      // Verificar credenciais
      const admin = await storage.verifyAdminPassword(
        loginData.username, 
        loginData.password
      );
      
      if (!admin) {
        return res.status(401).json({
          message: "Credenciais inválidas."
        });
      }
      
      // Autenticar usuário
      req.session.adminId = admin.id;
      
      res.status(200).json({
        message: "Login bem-sucedido",
        admin: {
          id: admin.id,
          username: admin.username
        }
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          errors: error.errors
        });
      } else {
        console.error("Login error:", error);
        res.status(500).json({
          message: "Ocorreu um erro durante o login."
        });
      }
    }
  });
  
  // Logout de administrador
  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).json({
          message: "Ocorreu um erro ao fazer logout."
        });
      }
      
      res.status(200).json({
        message: "Logout bem-sucedido"
      });
    });
  });
  
  // Verificar status da autenticação
  app.get("/api/admin/check-auth", (req, res) => {
    if (req.session && req.session.adminId) {
      res.status(200).json({
        authenticated: true
      });
    } else {
      res.status(200).json({
        authenticated: false
      });
    }
  });

  // ----- Rotas protegidas de administração (requerem autenticação) -----
  
  // Gerenciamento de mensagens de contato
  app.get("/api/admin/contact-messages", isAdmin, async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao buscar as mensagens de contato."
      });
    }
  });
  
  app.put("/api/admin/contact-messages/:id/read", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const message = await storage.markContactMessageAsRead(Number(id));
      
      if (!message) {
        return res.status(404).json({
          message: "Mensagem não encontrada."
        });
      }
      
      res.status(200).json(message);
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao marcar a mensagem como lida."
      });
    }
  });
  
  // Gerenciamento de serviços
  app.get("/api/admin/services", isAdmin, async (req, res) => {
    try {
      const services = await storage.getServices();
      res.status(200).json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao buscar os serviços."
      });
    }
  });
  
  app.get("/api/admin/services/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const service = await storage.getService(Number(id));
      
      if (!service) {
        return res.status(404).json({
          message: "Serviço não encontrado."
        });
      }
      
      res.status(200).json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao buscar o serviço."
      });
    }
  });
  
  app.post("/api/admin/services", isAdmin, async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const newService = await storage.createService(serviceData);
      
      res.status(201).json(newService);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          errors: error.errors
        });
      } else {
        console.error("Error creating service:", error);
        res.status(500).json({
          message: "Ocorreu um erro ao criar o serviço."
        });
      }
    }
  });
  
  app.put("/api/admin/services/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const serviceData = req.body;
      
      const updatedService = await storage.updateService({
        id: Number(id),
        ...serviceData
      });
      
      if (!updatedService) {
        return res.status(404).json({
          message: "Serviço não encontrado."
        });
      }
      
      res.status(200).json(updatedService);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao atualizar o serviço."
      });
    }
  });
  
  app.delete("/api/admin/services/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteService(Number(id));
      
      if (!success) {
        return res.status(404).json({
          message: "Serviço não encontrado."
        });
      }
      
      res.status(200).json({
        message: "Serviço excluído com sucesso."
      });
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao excluir o serviço."
      });
    }
  });
  
  // Gerenciamento de imagens
  app.get("/api/admin/images", isAdmin, async (req, res) => {
    try {
      const images = await storage.getSiteImages();
      res.status(200).json(images);
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao buscar as imagens."
      });
    }
  });
  
  app.get("/api/admin/images/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const image = await storage.getSiteImage(Number(id));
      
      if (!image) {
        return res.status(404).json({
          message: "Imagem não encontrada."
        });
      }
      
      res.status(200).json(image);
    } catch (error) {
      console.error("Error fetching image:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao buscar a imagem."
      });
    }
  });
  
  // Rota para upload de imagem
  app.post("/api/admin/upload-image", isAdmin, async (req, res) => {
    try {
      console.log("Iniciando upload de imagem");
      
      const uploadMiddleware = upload.single('image');
      
      uploadMiddleware(req, res, async (err) => {
        if (err) {
          console.error("Erro no middleware de upload:", err);
          return res.status(500).json({
            message: "Erro ao processar o upload da imagem: " + err.message
          });
        }
        
        if (!req.file) {
          console.log("Nenhum arquivo enviado ou formato inválido");
          return res.status(400).json({
            message: "Nenhum arquivo enviado ou formato inválido."
          });
        }
        
        console.log("Arquivo recebido:", req.file);
        
        // Gera a URL da imagem
        const imageUrl = getImageUrl(req.file.filename);
        console.log("URL da imagem gerada:", imageUrl);
        
        res.status(201).json({
          message: "Imagem enviada com sucesso",
          imageUrl: imageUrl,
          filename: req.file.filename
        });
      });
    } catch (error) {
      console.error("Erro geral no upload:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao enviar a imagem."
      });
    }
  });
  
  app.post("/api/admin/images", isAdmin, async (req, res) => {
    try {
      const imageData = insertSiteImageSchema.parse(req.body);
      const newImage = await storage.createSiteImage(imageData);
      
      res.status(201).json(newImage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Erro de validação",
          errors: error.errors
        });
      } else {
        console.error("Error creating image:", error);
        res.status(500).json({
          message: "Ocorreu um erro ao criar a imagem."
        });
      }
    }
  });
  
  app.put("/api/admin/images/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const imageData = req.body;
      
      const updatedImage = await storage.updateSiteImage({
        id: Number(id),
        ...imageData
      });
      
      if (!updatedImage) {
        return res.status(404).json({
          message: "Imagem não encontrada."
        });
      }
      
      res.status(200).json(updatedImage);
    } catch (error) {
      console.error("Error updating image:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao atualizar a imagem."
      });
    }
  });
  
  app.delete("/api/admin/images/:id", isAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteSiteImage(Number(id));
      
      if (!success) {
        return res.status(404).json({
          message: "Imagem não encontrada."
        });
      }
      
      res.status(200).json({
        message: "Imagem excluída com sucesso."
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      res.status(500).json({
        message: "Ocorreu um erro ao excluir a imagem."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
