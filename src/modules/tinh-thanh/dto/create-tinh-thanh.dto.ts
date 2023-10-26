import { IsNotEmpty } from 'class-validator';

export class CreateTinhThanhDto {
	@IsNotEmpty()
	ten_tinh_thanh: string;

	@IsNotEmpty()
	ma_tinh_thanh: string;
}
