import { IsNotEmpty } from 'class-validator';

export class UpdateQuanHuyenDto {
	@IsNotEmpty()
	ten_quan_huyen: string;
	@IsNotEmpty()
	ma_tinh_thanh: string;
}
