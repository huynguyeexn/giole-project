import { BaseServiceAbstract } from '@common/services/base.abstract.service';
import { TinhThanhRepository } from '@modules/tinh-thanh/repositories/tinh-thanh.repository';
import { Injectable } from '@nestjs/common';
import { TinhThanh } from './entities/tinh-thanh.entity';

@Injectable()
export class TinhThanhService extends BaseServiceAbstract<TinhThanh> {
	constructor(private readonly tinh_thanh_repository: TinhThanhRepository) {
		super(tinh_thanh_repository);
	}
}
