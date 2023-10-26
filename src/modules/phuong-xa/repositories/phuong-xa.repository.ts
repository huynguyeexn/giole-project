import { PhuongXaRepositoryInterface } from '@modules/phuong-xa/repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepositoryAbstract } from '@repositories/base.abstract.repository';
import { Model } from 'mongoose';
import { PhuongXa, PhuongXaDocument } from '../entities/phuong-xa.entity';

@Injectable()
export class PhuongXaRepository
	extends BaseRepositoryAbstract<PhuongXaDocument>
	implements PhuongXaRepositoryInterface
{
	constructor(
		@InjectModel(PhuongXa.name)
		private readonly phuong_xa_model: Model<PhuongXaDocument>,
	) {
		super(phuong_xa_model);
	}

	async inserMany(data: Array<any>): Promise<any> {
		return this.phuong_xa_model.insertMany(data);
	}

	async updateMany(condition = {}, value = {}) {
		return this.phuong_xa_model.updateMany(condition, { $set: value });
	}
}
