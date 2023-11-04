import { BaseServiceAbstract } from '@common/services/base.abstract.service';
import { Injectable } from '@nestjs/common';
import { District } from './entities/district.entity';
import { DistrictRepository } from './repositories';
import { CreateDistrictDto } from './dto/create-district.dto';
import { ProvinceRepository } from '@modules/provinces/repositories';

@Injectable()
export class DistrictsService extends BaseServiceAbstract<District> {
	constructor(
		private readonly districtRepository: DistrictRepository,
		private readonly provinceRepository: ProvinceRepository,
	) {
		super(districtRepository);
	}

	async addCrawlerData(array: CreateDistrictDto[]) {
		try {
			return await this.districtRepository.insertMany(array);
		} catch (error) {
			throw error;
		}
	}
}
