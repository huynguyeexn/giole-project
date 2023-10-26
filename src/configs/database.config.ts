import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const MongooseConfig: MongooseModuleAsyncOptions = {
	imports: [ConfigModule],
	useFactory: async (configService: ConfigService) => ({
		uri: configService.get<string>('DATABASE_URI'),
		dbName: configService.get<string>('DATABASE_NAME'),
	}),
	inject: [ConfigService],
};
