import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessTokenStratery } from './strategies/jwt-access-token.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		UsersModule,
		PassportModule,
		JwtModule.register({
			global: true,
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtAccessTokenStratery],
	exports: [AuthService],
})
export class AuthModule {}
