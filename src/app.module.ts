import { AppConfigModule } from '@configs/app.config';
import { BullMQConfigModule } from '@configs/bullmq.config';
import { MongooseConfig } from '@configs/database.config';
import { WinstonConfigs } from '@configs/winston.config';
import { AuthModule } from '@modules/auth/auth.module';
import { CrawlerService } from '@modules/crawler/crawler.service';
import { PhuongXaModule } from '@modules/phuong-xa/phuong-xa.module';
import { QuanHuyenModule } from '@modules/quan-huyen/quan-huyen.module';
import { ThonXomModule } from '@modules/thon-xom/thon-xom.module';
import { TinhThanhModule } from '@modules/tinh-thanh/tinh-thanh.module';
import { UsersModule } from '@modules/users/users.module';
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
		TinhThanhModule,
		QuanHuyenModule,
		PhuongXaModule,
		ThonXomModule,
		UsersModule,
		AuthModule,
	],
	controllers: [],
	providers: [CrawlerService],
})
export class AppModule {}
