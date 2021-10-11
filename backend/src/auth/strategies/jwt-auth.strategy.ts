import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {// 'JwtStrategy' inherit the 'PassportStartegy' method that loads from '@nestjs/passport'
  constructor(private  configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //validating the expiration time of the jwt token.
      secretOrKey: configService.get('JWT_SECRET'), //value is used for decrypting the jwt token
    });
  }

  //The 'validate' method gets invoked automatically
  async validate(payload: any) {
    return { 
        _id: payload.sub,
        username: payload.username,    //here it receives the user information as a payload from the jwt token
        name: payload.name,
        surname: payload.surname,
        age: payload.age,
        stars: payload.stars,
        gender:payload.gender,
        };
  }
}
