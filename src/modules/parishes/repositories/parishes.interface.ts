import { BaseRepositoryInterface } from '@common/repositories/base.interface.repository';
import { Parishes } from '../entities/parish.entity';

export interface ParishesRepositoryInterface
	extends BaseRepositoryInterface<Parishes> {}
