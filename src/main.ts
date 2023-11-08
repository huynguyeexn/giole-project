import { configSwagger } from '@configs/api-docs.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { IAppConfig } from './configs/app.config';
import * as morgan from 'morgan';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {});
	app.use(helmet());
	app.use(morgan('dev'));
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			skipMissingProperties: true,
		}),
	);

	const configService = app.get(ConfigService);
	const appEnv = configService.get<IAppConfig>('app');
	configSwagger(app);

	await app.listen(appEnv.port);
	Logger.log(`Application running on port: ${appEnv.port}`);
}
bootstrap();
