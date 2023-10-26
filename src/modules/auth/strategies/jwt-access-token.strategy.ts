import { JwtAccessTokenPayload } from '@common/types.common';
import { UsersService } from '@modules/users/users.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessTokenStratery extends PassportStrategy(Strategy) {
	constructor(private readonly userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'access_token_secret',
		});
	}

	async validate(token: JwtAccessTokenPayload) {
		return await this.userService.findOne(token.user);
	}
}
