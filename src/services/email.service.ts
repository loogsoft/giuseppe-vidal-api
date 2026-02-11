import { Injectable } from '@nestjs/common';
import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

@Injectable()
export class EmailService {
  private mailerSend: MailerSend;

  constructor() {
    this.mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY || '',
    });
  }

  async sendVerificationCode(email: string, code: string) {
    const sentFrom = new Sender(
      'no-reply@test-r6ke4n1jvo3gon12.mlsender.net',
      'Sistema da Loja',
    );

    const recipients = [new Recipient('loogsoftware@gmail.com', 'Usuário')];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject('Código de verificação – Giuseppe Vidal').setHtml(`
  <div style="
    font-family: Arial, Helvetica, sans-serif;
    background-color: #f5f6f8;
    padding: 24px;
  ">
    <div style="
      max-width: 480px;
      margin: 0 auto;
      background: #ffffff;
      padding: 32px;
      border-radius: 8px;
      text-align: center;
    ">
      <h1 style="
        font-size: 20px;
        color: #222;
        margin-bottom: 12px;
      ">
        Código de verificação
      </h1>

      <p style="
        font-size: 14px;
        color: #555;
        margin-bottom: 24px;
      ">
        Use o código abaixo para confirmar seu acesso:
      </p>

      <div style="
        font-size: 28px;
        font-weight: bold;
        letter-spacing: 6px;
        color: #000;
        background: #f0f2f5;
        padding: 16px 0;
        border-radius: 6px;
        margin-bottom: 24px;
      ">
        ${code}
      </div>

      <p style="
        font-size: 12px;
        color: #888;
        margin: 0;
      ">
        Se você não solicitou este código, pode ignorar este email.
      </p>

      <p style="
        font-size: 12px;
        color: #aaa;
        margin-top: 24px;
      ">
        Giuseppe Vidal
      </p>
    </div>
  </div>
`);

    try {
      await this.mailerSend.email.send(emailParams);
      console.log('✅ Email enviado com sucesso');
    } catch (err) {
      console.error('❌ Erro ao enviar email via MailerSend:', err);
    }
  }
}
