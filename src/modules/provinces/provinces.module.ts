import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Province, ProvinceSchema } from './entities/province.entity';
import { ProvincesController } from './provinces.controller';
import { ProvincesService } from './provinces.service';
import { ProvinceRepository } from './repositories';
import { CrawlerModule } from '@modules/crawler/crawler.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Province.name, schema: ProvinceSchema },
		]),
		forwardRef(() => CrawlerModule),
	],
	controllers: [ProvincesController],
	providers: [ProvincesService, ProvinceRepository],
	exports: [ProvincesService, ProvinceRepository],
})
export class ProvincesModule {}
