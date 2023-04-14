import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Auth } from '../auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config/constants';
import { PayloadIterface } from '../payload.interface';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Auth,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(JWT_SECRET),
    });
  }

  async validate(payload: PayloadIterface) {
    const { username, email } = payload
    const user = await this.authRepository.findOne({where: [{ username: username }, { email: email }]});
    if(!user) return new UnauthorizedException(new MessageDto('Wrong Credentials'));
    return payload;
  }
}