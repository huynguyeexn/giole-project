import { TinhThanhRepositoryInterface } from '@modules/tinh-thanh/repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepositoryAbstract } from '@repositories/base.abstract.repository';
import { Model } from 'mongoose';
import { TinhThanh, TinhThanhDocument } from '../entities/tinh-thanh.entity';

@Injectable()
export class TinhThanhRepository
	extends BaseRepositoryAbstract<TinhThanhDocument>
	implements TinhThanhRepositoryInterface
{
	constructor(
		@InjectModel(TinhThanh.name)
		private readonly tinh_thanh_model: Model<TinhThanhDocument>,
	) {
		super(tinh_thanh_model);
	}
}
