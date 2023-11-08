import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';

export class BaseQuerySelector<T> {
	@ApiProperty()
	condition: FilterQuery<T>;
	@ApiProperty()
	options?: QueryOptions<T>;
	@ApiProperty()
	projection?: ProjectionType<T>;
}
