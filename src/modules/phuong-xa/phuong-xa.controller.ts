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
import { CreatePhuongXaDto } from './dto/create-phuong-xa.dto';
import { UpdatePhuongXaDto } from './dto/update-phuong-xa.dto';
import { PhuongXaService } from './phuong-xa.service';
import { JwtAccessTokenGuard } from '@modules/auth/guards/jwt-access-token.guard';
import { IsPublic } from 'src/decorators/auth.decorators';

@ApiTags('Phuong Xa')
@Controller('phuong-xa')
@UseGuards(JwtAccessTokenGuard)
export class PhuongXaController {
	constructor(private readonly phuongXaService: PhuongXaService) {}

	@Post()
	create(@Body() createPhuongXaDto: CreatePhuongXaDto) {
		return this.phuongXaService.create(createPhuongXaDto);
	}

	@Get()
	@IsPublic()
	findAll() {
		return this.phuongXaService.findAll();
	}

	@IsPublic()
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.phuongXaService.findOne(id);
	}

	@Patch(':id')
	update(
		@Param('id') id: string,
		@Body() updatePhuongXaDto: UpdatePhuongXaDto,
	) {
		return this.phuongXaService.update(id, updatePhuongXaDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.phuongXaService.remove(id);
	}
}
