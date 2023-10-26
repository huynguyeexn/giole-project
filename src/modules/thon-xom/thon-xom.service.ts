import { BaseServiceAbstract } from '@common/services/base.abstract.service';
import { PhuongXaService } from '@modules/phuong-xa/phuong-xa.service';
import { Injectable } from '@nestjs/common';
import { ThonXom } from './entities/thon-xom.entity';
import { ThonXomRepository } from './repositories';

@Injectable()
export class ThonXomService extends BaseServiceAbstract<ThonXom> {
	constructor(
		private readonly thon_xom_repository: ThonXomRepository,
		private readonly phuong_xa_service: PhuongXaService,
	) {
		super(thon_xom_repository);
	}
}
