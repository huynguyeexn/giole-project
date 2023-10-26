import { Module } from '@nestjs/common';
import { PhuongXaService } from './phuong-xa.service';
import { PhuongXaController } from './phuong-xa.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PhuongXa, PhuongXaSchema } from './entities/phuong-xa.entity';
import { QuanHuyenModule } from '@modules/quan-huyen/quan-huyen.module';
import { PhuongXaRepository } from './repositories';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: PhuongXa.name, schema: PhuongXaSchema },
		]),
		QuanHuyenModule,
	],
	controllers: [PhuongXaController],
	providers: [PhuongXaService, PhuongXaRepository],
	exports: [PhuongXaService],
})
export class PhuongXaModule {}
