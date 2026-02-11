import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserRequestDto } from 'src/dtos/request/user-request.dto';
import { UserResponseDto } from 'src/dtos/response/user-response.dto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from 'src/dtos/request/login-request.dto';
import { LoginResponseDto } from 'src/dtos/response/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from './email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async create(dto: UserRequestDto): Promise<UserResponseDto> {
    const userExists = await this.repo.findOne({
      where: { email: dto.email },
    });

    if (userExists) {
      throw new Error('Email já cadastrado');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const userSave = this.repo.create({
      name: dto.name,
      email: dto.email,
      password: passwordHash,
      userType: dto.userType,
    });

    const savedUser = await this.repo.save(userSave);

    return plainToInstance(UserResponseDto, savedUser, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.repo.find();
    return plainToInstance(UserResponseDto, users);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.repo.findOne({
      where: { id },
    });
    return plainToInstance(UserResponseDto, user);
  }
  async update(id: string, dto: UserRequestDto): Promise<UserResponseDto> {
    const user = await this.repo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (dto.name) {
      user.name = dto.name;
    }

    if (dto.email) {
      user.email = dto.email;
    }

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 10);
    }

    const updatedUser = await this.repo.save(user);

    return plainToInstance(UserResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<string> {
    const user = await this.repo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.repo.remove(user);

    return `Usuario ${user.name}`;
  }

  async verifyEmail(dto: LoginRequestDto): Promise<{ message: string }> {
    const user = await this.repo.findOne({
      where: { email: dto.email.toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    const code = this.generateCode();

    user.verificationCode = code;
    user.codeExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.repo.save(user);

    this.emailService.sendVerificationCode(user.email, code);

    return { message: 'Código de verificação enviado para o email' };
  }

  async validateUser(email: string, code: string): Promise<LoginResponseDto> {
    const user = await this.repo.findOne({ where: { email } });

    // console.log("code", user?.verificationCode, "Codigo",code);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    if (!user.verificationCode) {
      throw new UnauthorizedException('Nenhum código gerado');
    }

    if (user.codeExpiresAt && user.codeExpiresAt < new Date()) {
      throw new UnauthorizedException('Código expirado');
    }

    if (user.verificationCode !== code) {
      throw new UnauthorizedException('Código inválido');
    }

    user.verificationCode = null;
    user.codeExpiresAt = null;

    await this.repo.save(user);

    const payload = { sub: user.id, email: user.email };

    const token = this.jwtService.sign(payload, {
      expiresIn: 5 * 60 * 60,
    });

    return {
      token,
      expiresIn: 5 * 60 * 60, // 5 horas em segundos
    };
  }
}
