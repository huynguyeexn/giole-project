import { ProvinceRepositoryInterface } from '@modules/provinces/repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepositoryAbstract } from '@repositories/base.abstract.repository';
import { Model } from 'mongoose';
import { Province, ProvinceDocument } from '../entities/province.entity';

@Injectable()
export class ProvinceRepository
	extends BaseRepositoryAbstract<ProvinceDocument>
	implements ProvinceRepositoryInterface
{
	constructor(
		@InjectModel(Province.name)
		private readonly provinceModel: Model<ProvinceDocument>,
	) {
		super(provinceModel);
	}
}
