import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { extractTokenFromHeader } from '@common/utils.common';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
	Strategy,
	'refresh_token',
) {
	constructor(private readonly auth_servicce: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'refresh_token_secret',
			passReqToCallback: true,
		});
	}

	async validate(request: Request, user_id: string) {
		const token = extractTokenFromHeader(request) || '';
		return await this.auth_servicce.getUserIfRefreshTokenMatched(
			user_id,
			token,
		);
	}
}
