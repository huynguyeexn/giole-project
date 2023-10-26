import { ConfigFactory, ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

export interface IDatabaseConfig {
	host: string;
	port: number;
	uri: string;
}

export interface IAppConfig {
	port: number;
	docsPath: string;
}

const LoadEnv: ConfigFactory = () => {
	const database: IDatabaseConfig = {
		host: process.env.DATABASE_HOST,
		port: parseInt(process.env.DATABASE_PORT || '', 10),
		uri: process.env.DATABASE_URI,
	};
	const app: IAppConfig = {
		port: parseInt(process.env.APP_PORT || '', 10),
		docsPath: process.env.SWAGGER_PATH,
	};

	return {
		database,
		app,
	};
};

const validationSchema = Joi.object({
	NODE_ENV: Joi.string()
		.valid('development', 'production', 'test', 'provision', 'staging')
		.default('production'),
	PORT: Joi.number().default(3000),
});

export const AppConfigModule: ConfigModuleOptions = {
	isGlobal: true,
	envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
	load: [LoadEnv],
	cache: true,
	expandVariables: true,
	validationSchema,
	validationOptions: {
		abortEarly: false,
	},
};
