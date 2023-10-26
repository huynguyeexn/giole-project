import { QuanHuyenRepository } from '@modules/quan-huyen/repositories';
import { TinhThanhModule } from '@modules/tinh-thanh/tinh-thanh.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuanHuyen, QuanHuyenSchema } from './entities/quan-huyen.entity';
import { QuanHuyenController } from './quan-huyen.controller';
import { QuanHuyenService } from './quan-huyen.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: QuanHuyen.name, schema: QuanHuyenSchema },
		]),
		TinhThanhModule,
	],
	controllers: [QuanHuyenController],
	providers: [QuanHuyenService, QuanHuyenRepository],
	exports: [QuanHuyenService],
})
export class QuanHuyenModule {}
