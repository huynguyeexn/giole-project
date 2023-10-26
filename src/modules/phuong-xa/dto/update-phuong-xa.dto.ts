import { IsNotEmpty } from 'class-validator';

export class UpdatePhuongXaDto {
	@IsNotEmpty()
	ten_phuong_xa: string;

	@IsNotEmpty()
	ten_quan_huyen: string;
}
