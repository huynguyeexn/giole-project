import { BaseRepositoryInterface } from '@common/repositories/base.interface.repository';
import { District } from '../entities/district.entity';

export interface DistrictRepositoryInterface
	extends BaseRepositoryInterface<District> {}
