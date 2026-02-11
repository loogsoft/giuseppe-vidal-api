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
      .setSubject('Código de verificação – Sistema da Loja').setHtml(`
        <p>Seu código de verificação é:</p>
        <h2>${code}</h2>
      `);

    try {
      await this.mailerSend.email.send(emailParams);
      console.log('✅ Email enviado com sucesso');
    } catch (err) {
      console.error('❌ Erro ao enviar email via MailerSend:', err);
    }
  }
}
