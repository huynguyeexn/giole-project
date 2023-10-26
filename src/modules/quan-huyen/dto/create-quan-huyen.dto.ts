import { IsNotEmpty } from 'class-validator';

export class CreateQuanHuyenDto {
	@IsNotEmpty()
	ten_quan_huyen: string;
	@IsNotEmpty()
	ma_quan_huyen: string;
	@IsNotEmpty()
	ma_tinh_thanh: string;
}
