import { CrawlerService } from '@modules/crawler/crawler.service';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { DistrictsService } from './districts.service';
import { ApiPaginateDto } from '@common/dto/paginate.dto';
import { District } from './entities/district.entity';
import { ApiPaginate } from '@decorators/paginate.decorators';

@ApiTags('Districts')
@Controller('districts')
export class DistrictsController {
	constructor(
		private readonly districtsService: DistrictsService,
		private readonly crawlerService: CrawlerService,
	) {}

	@Post()
	create(@Body() createDistrictDto: CreateDistrictDto) {
		return this.districtsService.create(createDistrictDto);
	}

	@Get()
	@ApiPaginate()
	findAll(@Query() query: ApiPaginateDto<District>) {
		return this.districtsService.findAll(query);
	}

	@Get('crawler')
	crawler() {
		return this.crawlerService.districtsCrawler();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.districtsService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateDistrictDto: UpdateDistrictDto,
	) {
		return this.districtsService.update(id, updateDistrictDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.districtsService.remove(id);
	}
}
