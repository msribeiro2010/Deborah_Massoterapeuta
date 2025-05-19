import nodemailer from 'nodemailer';
import { type InsertContact } from '@shared/schema';

const RECIPIENT_EMAIL = 'deborah_santalena@hotmail.com';

// Configuração do serviço de email
// Se não tivermos credenciais, criaremos uma conta de teste (apenas para desenvolvimento)
let transporter: nodemailer.Transporter;

// Inicialização do transporter com base nas credenciais disponíveis
if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  // Usar credenciais fornecidas
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Use um provedor SMTP
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
} else {
  // Para ambiente de desenvolvimento, usar uma conta de teste
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'ethereal.user@ethereal.email', // conta fictícia
      pass: 'ethereal.password'
    }
  });
  
  console.warn('Usando conta de email de teste. Os emails não serão realmente enviados em produção sem credenciais reais.');
}

// Função para enviar email de contato
export async function sendContactEmail(contactData: InsertContact): Promise<boolean> {
  try {
    // Converte o serviço para o nome completo em português
    let serviceName = "";
    switch (contactData.service) {
      case "relaxing": serviceName = "Massagem Relaxante"; break;
      case "modeling": serviceName = "Massagem Modeladora"; break;
      case "lymphatic": serviceName = "Drenagem Linfática"; break;
      case "hotstone": serviceName = "Massagem com Pedras Quentes"; break;
      case "shiatsu": serviceName = "Shiatsu"; break;
      case "myofascial": serviceName = "Liberação Miofascial"; break;
      default: serviceName = contactData.service;
    }

    // Configuração do email
    const mailOptions = {
      from: '"Site Deborah Santalena" <noreply@deborahsantalena.com>',
      to: RECIPIENT_EMAIL,
      subject: `Nova mensagem de contato de ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e1e1e1; border-radius: 5px;">
          <h2 style="color: #4A7C91; border-bottom: 1px solid #e1e1e1; padding-bottom: 10px;">Nova mensagem de contato</h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Nome:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Telefone:</strong> ${contactData.phone}</p>
            <p><strong>Serviço de interesse:</strong> ${serviceName}</p>
          </div>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
            <h3 style="color: #4A7C91; margin-top: 0;">Mensagem:</h3>
            <p style="white-space: pre-line;">${contactData.message}</p>
          </div>
          
          <p style="font-size: 12px; color: #888; margin-top: 30px; text-align: center;">
            Esta mensagem foi enviada através do formulário de contato do site.
          </p>
        </div>
      `
    };

    // Enviando o email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return false;
  }
}

// Função para verificar a conexão com o servidor de email
export async function verifyEmailConnection(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('Erro na conexão de email:', error);
    return false;
  }
}