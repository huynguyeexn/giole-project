import { DistrictRepositoryInterface } from '@modules/districts/repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepositoryAbstract } from '@repositories/base.abstract.repository';
import { Model } from 'mongoose';
import { District, DistrictDocument } from '../entities/district.entity';

@Injectable()
export class DistrictRepository
	extends BaseRepositoryAbstract<DistrictDocument>
	implements DistrictRepositoryInterface
{
	constructor(
		@InjectModel(District.name)
		private readonly districtModel: Model<DistrictDocument>,
	) {
		super(districtModel);
	}
}
