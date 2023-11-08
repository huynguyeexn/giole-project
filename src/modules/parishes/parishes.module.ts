import { DistrictsModule } from '@modules/districts/districts.module';
import { ProvincesModule } from '@modules/provinces/provinces.module';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Parishes, ParishesSchema } from './entities/parish.entity';
import { ParishesController } from './parishes.controller';
import { ParishesService } from './parishes.service';
import { ParishesRepository } from './repositories';
import { CrawlerModule } from '@modules/crawler/crawler.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Parishes.name, schema: ParishesSchema },
		]),
		forwardRef(() => ProvincesModule),
		forwardRef(() => CrawlerModule),
		forwardRef(() => DistrictsModule),
	],
	controllers: [ParishesController],
	providers: [ParishesService, ParishesRepository],
	exports: [ParishesService, ParishesRepository],
})
export class ParishesModule {}
