import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly auth_service: AuthService) {
		super();
	}

	async validate(username: string, password: string) {
		try {
			const user = await this.auth_service.getAuthenticatedUser(
				username,
				password,
			);

			if (!user) {
				throw new UnauthorizedException();
			}

			return user;
		} catch (error) {
			throw error;
		}
	}
}
