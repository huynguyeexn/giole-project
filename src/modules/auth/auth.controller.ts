import { RequestWithUser } from '@common/types.common';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtRefreshTokenGuard } from './guards/jwt-refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('sign-up')
	async signUp(@Body() sign_up_dto: SignUpDto) {
		return await this.authService.signUp(sign_up_dto);
	}

	@UseGuards(LocalAuthGuard)
	@Post('sign-in')
	@ApiBody({ type: SignInDto })
	async signIn(@Req() request: RequestWithUser) {
		const { user } = request;
		return await this.authService.signIn(user._id.toString());
	}

	@UseGuards(JwtRefreshTokenGuard)
	@Post('refresh')
	async refreshAccessToken(@Req() request: RequestWithUser) {
		const { user } = request;

		const access_token = this.authService.generateAccessToken(
			user._id.toString(),
		);

		return {
			access_token,
		};
	}
}
