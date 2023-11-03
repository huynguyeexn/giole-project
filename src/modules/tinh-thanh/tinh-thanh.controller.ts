import { JwtAccessTokenGuard } from '@modules/auth/guards/jwt-access-token.guard';
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
import { IsPublic } from 'src/decorators/auth.decorators';
import { CreateTinhThanhDto } from './dto/create-tinh-thanh.dto';
import { UpdateTinhThanhDto } from './dto/update-tinh-thanh.dto';
import { TinhThanhService } from './tinh-thanh.service';

@ApiTags('Tinh Thanh')
@Controller('tinh-thanh')
@UseGuards(JwtAccessTokenGuard)
export class TinhThanhController {
	constructor(private readonly tinhThanhService: TinhThanhService) {}

	@Post()
	create(@Body() createTinhThanhDto: CreateTinhThanhDto) {
		return this.tinhThanhService.create(createTinhThanhDto);
	}

	@Get()
	@IsPublic()
	findAll() {
		return this.tinhThanhService.findAll();
	}

	@Get(':id')
	@IsPublic()
	findOne(@Param('id') id: string) {
		return this.tinhThanhService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updateTinhThanhDto: UpdateTinhThanhDto,
	) {
		return this.tinhThanhService.update(id, updateTinhThanhDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.tinhThanhService.remove(id);
	}
}
