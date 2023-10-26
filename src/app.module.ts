import { AppConfigModule } from '@configs/app.config';
import { MongooseConfig } from '@configs/database.config';
import { PhuongXaModule } from '@modules/phuong-xa/phuong-xa.module';
import { QuanHuyenModule } from '@modules/quan-huyen/quan-huyen.module';
import { ThonXomModule } from '@modules/thon-xom/thon-xom.module';
import { TinhThanhModule } from '@modules/tinh-thanh/tinh-thanh.module';
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		ConfigModule.forRoot(AppConfigModule),
		MongooseModule.forRootAsync(MongooseConfig),
		TinhThanhModule,
		QuanHuyenModule,
		PhuongXaModule,
		ThonXomModule,
		UsersModule,
		AuthModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
