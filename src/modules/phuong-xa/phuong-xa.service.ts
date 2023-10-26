import { BaseServiceAbstract } from '@common/services/base.abstract.service';
import { QuanHuyenService } from '@modules/quan-huyen/quan-huyen.service';
import { Injectable } from '@nestjs/common';
import { PhuongXa } from './entities/phuong-xa.entity';
import { PhuongXaRepository } from './repositories';

@Injectable()
export class PhuongXaService extends BaseServiceAbstract<PhuongXa> {
	constructor(
		private readonly phuong_xa_repository: PhuongXaRepository,
		private readonly quan_huyen_service: QuanHuyenService,
	) {
		super(phuong_xa_repository);
	}
}
