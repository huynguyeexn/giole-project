import { ApiPaginate } from '@decorators/paginate.decorators';
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
import { QueryOptions } from 'mongoose';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Province } from './entities/province.entity';
import { ProvincesService } from './provinces.service';
import { ApiPaginateDto } from '@common/dto/paginate.dto';

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
	@ApiPaginate()
	findAll(@Query() query: ApiPaginateDto<Province>) {
		return this.provincesService.findAll(query);
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
