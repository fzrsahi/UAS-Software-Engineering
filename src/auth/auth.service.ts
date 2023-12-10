import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLoginDto } from './dto/auth.dto';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}
  async userLogin(dto: UserLoginDto) {
    const user = await this.prisma.users.findFirst({
      where: {
        username: dto.username,
      },
    });

    try {
      if (!user) throw new ForbiddenException('Account Not Found!');
      const pwMatches = await bcrypt.compare(dto.password, user.password);
      if (!pwMatches) throw new ForbiddenException('Account Not Found!');
      delete user.password;
      const token = await this.signToken(user.id, user.username);
      return {
        statusCode: 200,
        message: 'Log In!',
        data: user,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  async signToken(id: string, email: string): Promise<string> {
    const payload = { sub: id, email };
    return this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.config.get('SECRET_TOKEN'),
    });
  }
}
