import { UserRepositoryInterface } from '@modules/users/repositories';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepositoryAbstract } from '@repositories/base.abstract.repository';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities/user.entity';

@Injectable()
export class UserRepository
	extends BaseRepositoryAbstract<UserDocument>
	implements UserRepositoryInterface
{
	constructor(
		@InjectModel(User.name)
		private readonly tinh_thanh_model: Model<UserDocument>,
	) {
		super(tinh_thanh_model);
	}
}
