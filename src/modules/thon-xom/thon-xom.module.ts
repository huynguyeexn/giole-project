import { Module } from '@nestjs/common';
import { ThonXomService } from './thon-xom.service';
import { ThonXomController } from './thon-xom.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ThonXom, ThonXomSchema } from './entities/thon-xom.entity';
import { ThonXomRepository } from './repositories';
import { PhuongXaModule } from '@modules/phuong-xa/phuong-xa.module';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: ThonXom.name, schema: ThonXomSchema }]),
		PhuongXaModule,
	],
	controllers: [ThonXomController],
	providers: [ThonXomService, ThonXomRepository],
	exports: [ThonXomService],
})
export class ThonXomModule {}
