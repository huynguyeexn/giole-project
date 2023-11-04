import { AppConfigModule } from '@configs/app.config';
import { BullMQConfigModule } from '@configs/bullmq.config';
import { MongooseConfig } from '@configs/database.config';
import { WinstonConfigs } from '@configs/winston.config';
import { CrawlerModule } from '@modules/crawler/crawler.module';
import { CrawlerService } from '@modules/crawler/crawler.service';
import { DistrictsModule } from '@modules/districts/districts.module';
import { ProvincesModule } from '@modules/provinces/provinces.module';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule } from 'nest-winston';

@Module({
	imports: [
		ConfigModule.forRoot(AppConfigModule),
		MongooseModule.forRootAsync(MongooseConfig),
		BullModule.forRootAsync(BullMQConfigModule),
		WinstonModule.forRoot(WinstonConfigs),
		ScheduleModule.forRoot(),
		// UsersModule,
		// AuthModule,
		ProvincesModule,
		DistrictsModule,
		CrawlerModule,
	],
	controllers: [],
	providers: [CrawlerService],
})
export class AppModule {}
