import { QuanHuyenRepositoryInterface } from '@modules/quan-huyen/repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepositoryAbstract } from '@repositories/base.abstract.repository';
import { Model } from 'mongoose';
import { QuanHuyen, QuanHuyenDocument } from '../entities/quan-huyen.entity';

@Injectable()
export class QuanHuyenRepository
	extends BaseRepositoryAbstract<QuanHuyenDocument>
	implements QuanHuyenRepositoryInterface
{
	constructor(
		@InjectModel(QuanHuyen.name)
		private readonly tinh_thanh_model: Model<QuanHuyenDocument>,
	) {
		super(tinh_thanh_model);
	}
}
