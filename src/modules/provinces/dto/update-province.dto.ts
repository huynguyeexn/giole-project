import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProvinceDto } from './create-province.dto';

export class UpdateProvinceDto extends PartialType(
	OmitType(CreateProvinceDto, []),
) {}
