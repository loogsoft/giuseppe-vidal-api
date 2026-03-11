import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesController } from 'src/controller/messages.controller';
import { MessageEntity } from 'src/entities/messages.entity';
import { MessagesService } from 'src/services/messages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt_secret_dev',
      signOptions: { expiresIn: 5 * 60 * 60 }, // 5 horas em segundos
    }),
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessageModule {}
