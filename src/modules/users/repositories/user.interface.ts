import { BaseRepositoryInterface } from '@common/repositories/base.interface.repository';
import { User } from '../entities/user.entity';

export interface UserRepositoryInterface
	extends BaseRepositoryInterface<User> {}
