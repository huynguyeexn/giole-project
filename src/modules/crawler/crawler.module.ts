import { DistrictsModule } from '@modules/districts/districts.module';
import { ProvincesModule } from '@modules/provinces/provinces.module';
import { Module, forwardRef } from '@nestjs/common';
import { CrawlerService } from './crawler.service';

@Module({
	imports: [
		forwardRef(() => ProvincesModule),
		forwardRef(() => DistrictsModule),
	],
	providers: [CrawlerService],
	exports: [CrawlerService],
})
export class CrawlerModule {}
