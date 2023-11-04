import { ProvincesModule } from '@modules/provinces/provinces.module';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DistrictsController } from './districts.controller';
import { DistrictsService } from './districts.service';
import { District, DistrictSchema } from './entities/district.entity';
import { DistrictRepository } from './repositories';
import { CrawlerModule } from '@modules/crawler/crawler.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: District.name, schema: DistrictSchema },
		]),
		forwardRef(() => CrawlerModule),
		ProvincesModule,
	],
	controllers: [DistrictsController],
	providers: [DistrictsService, DistrictRepository],
	exports: [DistrictsService, DistrictRepository],
})
export class DistrictsModule {}
