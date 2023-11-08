import { BaseServiceAbstract } from '@common/services/base.abstract.service';
import { Injectable } from '@nestjs/common';
import { Parishes } from './entities/parish.entity';
import { ParishesRepository } from './repositories';
import { CreateParishDto } from './dto/create-parish.dto';

@Injectable()
export class ParishesService extends BaseServiceAbstract<Parishes> {
	constructor(private readonly parishRepository: ParishesRepository) {
		super(parishRepository);
	}

	// async addCrawlerData(array: CreateParishDto[]) {
	// 	try {
	// 		return await this.parishRepository.insertMany(array);
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// }
}
