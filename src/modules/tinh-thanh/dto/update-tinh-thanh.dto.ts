import { OmitType, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateTinhThanhDto } from './create-tinh-thanh.dto';

export class UpdateTinhThanhDto extends PartialType(
	OmitType(CreateTinhThanhDto, []),
) {
	@IsOptional()
	ten_tinh_thanh?: string;

	@IsOptional()
	ma_tinh_thanh?: string;
}
