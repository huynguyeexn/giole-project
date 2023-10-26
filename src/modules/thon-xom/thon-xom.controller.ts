import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { ThonXomService } from './thon-xom.service';
import { CreateThonXomDto } from './dto/create-thon-xom.dto';
import { UpdateThonXomDto } from './dto/update-thon-xom.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenGuard } from '@modules/auth/guards/jwt-access-token.guard';
import { IsPublic } from 'src/decorators/auth.decorators';

@ApiTags('Thon Xom')
@Controller('thon-xom')
@UseGuards(JwtAccessTokenGuard)
export class ThonXomController {
	constructor(private readonly thonXomService: ThonXomService) {}

	@Post()
	create(@Body() createThonXomDto: CreateThonXomDto) {
		return this.thonXomService.create(createThonXomDto);
	}

	@Get()
	@IsPublic()
	findAll() {
		return this.thonXomService.findAll();
	}

	@Get(':id')
	@IsPublic()
	findOne(@Param('id') id: string) {
		return this.thonXomService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateThonXomDto: UpdateThonXomDto) {
		return this.thonXomService.update(id, updateThonXomDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.thonXomService.remove(id);
	}
}
