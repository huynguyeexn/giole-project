import { ApiPaginateDto } from '@common/dto/paginate.dto';
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
import { CreateParishDto } from './dto/create-parish.dto';
import { UpdateParishDto } from './dto/update-parish.dto';
import { Parishes } from './entities/parish.entity';
import { ParishesService } from './parishes.service';

@ApiTags('Parishes')
@Controller('parishes')
export class ParishesController {
	constructor(
		private readonly parishesService: ParishesService,
		private readonly crawlerService: CrawlerService,
	) {}

	@Post()
	create(@Body() createParishesDto: CreateParishDto) {
		return this.parishesService.create(createParishesDto);
	}

	@Get()
	@ApiPaginate()
	findAll(@Query() query: ApiPaginateDto<Parishes>) {
		return this.parishesService.findAll(query);
	}

	@Get('crawler')
	crawler() {
		this.crawlerService.parishesCrawler();
		return 'Job is running!';
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.parishesService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateParishesDto: UpdateParishDto) {
		return this.parishesService.update(id, updateParishesDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.parishesService.remove(id);
	}
}
