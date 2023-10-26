import { Module } from '@nestjs/common';
import { TinhThanhController } from './tinh-thanh.controller';
import { TinhThanhService } from './tinh-thanh.service';
import { TinhThanhRepository } from '@modules/tinh-thanh/repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { TinhThanh, TinhThanhSchema } from './entities/tinh-thanh.entity';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: TinhThanh.name, schema: TinhThanhSchema },
		]),
	],
	controllers: [TinhThanhController],
	providers: [TinhThanhService, TinhThanhRepository],
	exports: [TinhThanhService],
})
export class TinhThanhModule {}
