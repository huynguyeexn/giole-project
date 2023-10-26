import { ThonXomRepositoryInterface } from '@modules/thon-xom/repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepositoryAbstract } from '@repositories/base.abstract.repository';
import { Model } from 'mongoose';
import { ThonXom, ThonXomDocument } from '../entities/thon-xom.entity';

@Injectable()
export class ThonXomRepository
	extends BaseRepositoryAbstract<ThonXomDocument>
	implements ThonXomRepositoryInterface
{
	constructor(
		@InjectModel(ThonXom.name)
		private readonly thon_xa_model: Model<ThonXomDocument>,
	) {
		super(thon_xa_model);
	}

	async inserMany(data: Array<any>): Promise<any> {
		return this.thon_xa_model.insertMany(data);
	}

	async updateMany(condition = {}, value = {}) {
		return await this.thon_xa_model.updateMany(condition, { $set: value });
	}
}
