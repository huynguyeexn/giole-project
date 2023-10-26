import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuanHuyenDto } from './dto/create-quan-huyen.dto';
import { UpdateQuanHuyenDto } from './dto/update-quan-huyen.dto';
import { QuanHuyenService } from './quan-huyen.service';
import { JwtAccessTokenGuard } from '@modules/auth/guards/jwt-access-token.guard';
import { IsPublic } from 'src/decorators/auth.decorators';

@ApiTags('Quan Huyen')
@Controller('quan-huyen')
@UseGuards(JwtAccessTokenGuard)
export class QuanHuyenController {
	constructor(private readonly quanHuyenService: QuanHuyenService) {}

	@Post()
	create(@Body() createQuanHuyenDto: CreateQuanHuyenDto) {
		return this.quanHuyenService.create(createQuanHuyenDto);
	}

	@Get()
	@IsPublic()
	findAll() {
		return this.quanHuyenService.findAll();
	}

	@Get(':id')
	@IsPublic()
	findOne(@Param('id') id: string) {
		return this.quanHuyenService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateQuanHuyenDto: UpdateQuanHuyenDto,
	) {
		return this.quanHuyenService.update(id, updateQuanHuyenDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.quanHuyenService.remove(id);
	}
}
