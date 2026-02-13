import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export default class EmailServico {

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false, // true se porta 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  /**
   * Envia o username gerado para o cliente
   * @param {string} emailDestinatario 
   * @param {string} username 
   * @param {string} nomeCliente 
   */
  async enviarUsername(emailDestinatario, username, nomeCliente) {
    const mailOptions = {
      from: `"Banco Digital" <${process.env.EMAIL_USER}>`,
      to: emailDestinatario,
      subject: "Seja bem-vindo ao Banco Digital",
      text: `Olá ${nomeCliente},\n\nSeu cadastro foi realizado com sucesso.\nSeu username para login é: ${username}\n\nUse sua senha cadastrada para acessar a plataforma.\n\nAtenciosamente,\nBanco Digital.`,
      html: `
        <p>Olá <strong>${nomeCliente}</strong>,</p>
        <p>Seu cadastro foi realizado com sucesso.</p>
        <p><strong>Username:</strong> ${username}</p>
        <p>Use a mesma senha que cadastrou para acessar a plataforma.</p>
        <br>
        <p>Atenciosamente,<br>Banco Digital</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email enviado`);
    } catch (erro) {
      console.error("Erro ao enviar email:", erro);
      throw new Error("Não foi possível enviar email com o username.");
    }
  }
}
