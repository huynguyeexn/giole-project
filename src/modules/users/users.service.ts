import { BaseServiceAbstract } from '@common/services/base.abstract.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories';

@Injectable()
export class UsersService extends BaseServiceAbstract<User> {
	constructor(private readonly user_repository: UserRepository) {
		super(user_repository);
	}

	async getLoginInfoByUsername(username: string) {
		try {
			const user = await this.user_repository.findOneByCondition(
				{
					username,
				},
				'+password',
			);

			if (!user) {
				throw new NotFoundException();
			}

			return user;
		} catch (error) {
			throw error;
		}
	}

	async setCurrentRefreshToken(user_id: string, hashed_token: string) {
		try {
			await this.user_repository.update(user_id, {
				current_refresh_token: hashed_token,
			});
			return;
		} catch (error) {
			throw error;
		}
	}
}
