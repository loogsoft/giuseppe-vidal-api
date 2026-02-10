import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendVerificationCode(email: string, code: string) {
    await this.mailerService.sendMail({
      to: 'andersonmendesdesouza2007@gmail.com',
      subject: 'Código de verificação - Sistema da Loja',
      html: `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 0;">
    <div style="
      max-width: 500px;
      margin: auto;
      background: #ffffff;
      padding: 30px;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.08);
    ">
      
      <h2 style="color: #8B4513; margin-bottom: 10px;">
      Controle de gestão - Giuseppe Vidal 
      </h2>
      
      <p style="color: #555; font-size: 16px;">
        Use o código abaixo para confirmar sua conta:
      </p>

      <p style="color: #555; font-size: 12px;">
        Acesso pedido por: ${email}
      </p>

      <div style="
        background: #f8f1e9;
        padding: 20px;
        margin: 25px 0;
        border-radius: 8px;
      ">
        <span style="
          font-size: 32px;
          letter-spacing: 8px;
          font-weight: bold;
          color: #8B4513;
        ">
          ${code}
        </span>
      </div>

      <p style="color: #777; font-size: 14px;">
        Este código expira em 5 minutos.
      </p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />

      <p style="font-size: 12px; color: #999;">
        Se você não solicitou este código, ignore este email.
      </p>

    </div>
  </div>
`,
    });

    console.log(`Código de verificação enviado para: ${email}`);
  }
}
