import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendVerificationCode(email: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Código de verificação - Sistema da Loja',
      html: `
        <h2>Seu código de verificação é:</h2>
        <h1>${code}</h1>
        <p>Ele expira em 5 minutos.</p>
      `,
    });

    console.log(`Código de verificação enviado para ${email}: ${code}`);
  }
}