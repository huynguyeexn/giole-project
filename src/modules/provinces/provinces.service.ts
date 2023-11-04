import { BaseServiceAbstract } from '@common/services/base.abstract.service';
import { Injectable } from '@nestjs/common';
import { Province } from './entities/province.entity';
import { ProvinceRepository } from './repositories';
import { CreateProvinceDto } from './dto/create-province.dto';

@Injectable()
export class ProvincesService extends BaseServiceAbstract<Province> {
	constructor(private readonly provinceRepository: ProvinceRepository) {
		super(provinceRepository);
	}

	async addCrawlerData(array: CreateProvinceDto[]) {
		try {
			return await this.provinceRepository.insertMany(array);
		} catch (error) {
			throw error;
		}
	}
}
