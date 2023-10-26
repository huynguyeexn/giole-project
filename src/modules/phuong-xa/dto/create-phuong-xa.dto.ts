import { IsNotEmpty } from 'class-validator';

export class CreatePhuongXaDto {
	@IsNotEmpty()
	ten_phuong_xa: string;

	@IsNotEmpty()
	ma_phuong_xa: string;

	@IsNotEmpty()
	ma_quan_huyen: string;

	@IsNotEmpty()
	ten_quan_huyen: string;
}
