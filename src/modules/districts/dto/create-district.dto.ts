import {
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator';

export class CreateDistrictDto {
	@IsNotEmpty()
	@IsNumber()
	@MaxLength(100)
	district_code: number;

	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	name: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	unaccent_name: string;

	@IsNotEmpty()
	@IsString()
	@MaxLength(100)
	slug: string;

	@IsOptional()
	@IsString()
	@MaxLength(100)
	division_type: string;

	@IsOptional()
	@IsString()
	@MaxLength(100)
	province_code?: number;
}
