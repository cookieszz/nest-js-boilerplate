import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import UserEntity from '@v1/users/schemas/user.entity';
import authConstants from '../auth-constants';

import { JwtStrategyValidate } from '../interfaces/jwt-strategy-validate.interface';

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(Strategy, 'accessToken') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('ACCESS_TOKEN') || '<%= config.accessTokenSecret %>',
    });
  }

  async validate(payload: UserEntity): Promise<JwtStrategyValidate> {
    return {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
  }
}
