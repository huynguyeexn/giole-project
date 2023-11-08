import { DistrictsModule } from '@modules/districts/districts.module';
import { ProvincesModule } from '@modules/provinces/provinces.module';
import { Module, forwardRef } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { ParishesModule } from '@modules/parishes/parishes.module';

@Module({
	imports: [
		forwardRef(() => ProvincesModule),
		forwardRef(() => DistrictsModule),
		forwardRef(() => ParishesModule),
	],
	providers: [CrawlerService],
	exports: [CrawlerService],
})
export class CrawlerModule {}
