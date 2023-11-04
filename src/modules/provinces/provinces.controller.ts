import { CrawlerService } from '@modules/crawler/crawler.service';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { ProvincesService } from './provinces.service';

@ApiTags('Provinces')
@Controller('provinces')
export class ProvincesController {
	constructor(
		private readonly provincesService: ProvincesService,
		private readonly crawlerService: CrawlerService,
	) {}

	@Post()
	create(@Body() createProvinceDto: CreateProvinceDto) {
		return this.provincesService.create(createProvinceDto);
	}

	@Get()
	findAll() {
		return this.provincesService.findAll();
	}

	@Get('crawler')
	crawler() {
		return this.crawlerService.provincesCrawler();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.provincesService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateProvinceDto: UpdateProvinceDto,
	) {
		return this.provincesService.update(id, updateProvinceDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.provincesService.remove(id);
	}
}
