import { BaseServiceAbstract } from '@common/services/base.abstract.service';
import { TinhThanhService } from '@modules/tinh-thanh/tinh-thanh.service';
import { Injectable } from '@nestjs/common';
import { QuanHuyen } from './entities/quan-huyen.entity';
import { QuanHuyenRepository } from './repositories';

@Injectable()
export class QuanHuyenService extends BaseServiceAbstract<QuanHuyen> {
	constructor(
		private readonly quan_huyen_repository: QuanHuyenRepository,
		private readonly tinh_thanh_service: TinhThanhService,
	) {
		super(quan_huyen_repository);
	}
}
