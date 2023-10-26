import { User } from '@modules/users/entities/user.entity';
import { UsersService } from '@modules/users/users.service';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
	private SALT_ROUND = 10;
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async signUp(sign_up_dto: SignUpDto) {
		try {
			const existed_user = await this.userService.findOneByCondition({
				$or: [
					{
						username: sign_up_dto.username,
					},
					{
						email: sign_up_dto.email,
					},
				],
			});

			if (existed_user) {
				if (existed_user.username === sign_up_dto.username) {
					throw new ConflictException('Username already existed!!');
				} else if (existed_user.email === sign_up_dto.email) {
					throw new ConflictException('Email already existed!!');
				}
			}

			const hashed_password = await bcrypt.hash(
				sign_up_dto.password,
				this.SALT_ROUND,
			);

			const payload: Partial<User> = {
				username: sign_up_dto.username,
				password: hashed_password,
				email: sign_up_dto.email,
			};

			const user = await this.userService.create(payload);
			const user_id = user._id.toString();
			const refresh_token = this.generateRefreshToken(user_id);

			await this.storeRefreshToken(user_id, refresh_token);

			return {
				access_token: this.generateAccessToken(user_id),
				refresh_token,
			};
		} catch (error) {
			throw error;
		}
	}

	async signIn(user_id: string) {
		try {
			const access_token = this.generateAccessToken(user_id);
			const refresh_token = this.generateRefreshToken(user_id);

			await this.storeRefreshToken(user_id, refresh_token);

			return {
				access_token,
				refresh_token,
			};
		} catch (error) {
			throw error;
		}
	}

	async getAuthenticatedUser(
		username: string,
		password: string,
	): Promise<User> {
		try {
			const user: User =
				await this.userService.getLoginInfoByUsername(username);
			if (!user) {
				throw new UnauthorizedException();
			}

			await this.verifyPlainContentWithHashedContent(password, user.password);
			return user;
		} catch (error) {
			throw error;
		}
	}

	async getUserIfRefreshTokenMatched(
		user_id: string,
		refresh_token: string,
	): Promise<User> {
		try {
			const user = await this.userService.findOneByCondition({
				_id: user_id,
			});

			if (!user) {
				throw new UnauthorizedException();
			}

			await this.verifyPlainContentWithHashedContent(
				refresh_token,
				user.current_refresh_token,
			);

			return user;
		} catch (error) {
			throw error;
		}
	}

	private async verifyPlainContentWithHashedContent(
		plain_password: string,
		hashed_password: string,
	) {
		try {
			const result = await bcrypt.compare(plain_password, hashed_password);
			if (!result) {
				throw new BadRequestException('Wrong credentials!!');
			}
			return;
		} catch (error) {
			throw error;
		}
	}

	async storeRefreshToken(user_id: string, token: string): Promise<void> {
		try {
			const hashed_token = await bcrypt.hash(token, this.SALT_ROUND);
			await this.userService.setCurrentRefreshToken(user_id, hashed_token);
			return;
		} catch (error) {
			throw error;
		}
	}

	generateAccessToken(payload: string) {
		const options: JwtSignOptions = {
			secret: 'access_token_secret',
			expiresIn: Number(
				this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
			),
		};
		const token = this.jwtService.sign({ user: payload }, options);
		return token;
	}

	generateRefreshToken(payload: string) {
		const options: JwtSignOptions = {
			secret: 'refresh_token_secret',
			expiresIn: `${this.configService.get<string>(
				'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
			)}s`,
		};
		const result = this.jwtService.sign({ user: payload }, options);
		return result;
	}
}
