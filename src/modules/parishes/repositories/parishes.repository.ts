import { ParishesRepositoryInterface } from '@modules/parishes/repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepositoryAbstract } from '@repositories/base.abstract.repository';
import { Model } from 'mongoose';
import { Parishes, ParishesDocument } from '../entities/parish.entity';

@Injectable()
export class ParishesRepository
	extends BaseRepositoryAbstract<ParishesDocument>
	implements ParishesRepositoryInterface
{
	constructor(
		@InjectModel(Parishes.name)
		private readonly parishModel: Model<ParishesDocument>,
	) {
		super(parishModel);
	}
}
