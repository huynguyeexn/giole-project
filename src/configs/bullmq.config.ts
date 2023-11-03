import { SharedBullAsyncConfiguration } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';

export const BullMQConfigModule: SharedBullAsyncConfiguration = {
	inject: [ConfigService],
	useFactory: async (configService: ConfigService) => ({
		connection: {
			host: configService.get('REDIS_HOST'),
			port: configService.get('REDIS_PORT'),
		},
	}),
};
