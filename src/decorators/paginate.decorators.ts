import { ApiSortType } from '@common/types.common';
import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const ApiPaginate = () => {
	return applyDecorators(
		ApiQuery({ name: 'offset', type: Number, example: 0, required: false }),
		ApiQuery({ name: 'limit', type: Number, example: 10, required: false }),
		ApiQuery({
			name: 'after_id',
			type: String,
			example: '65467d0cc96e5367b62ffa63',
			required: false,
		}),
		ApiQuery({
			name: 'sort_by',
			type: String,
			example: 'name',
			required: false,
		}),
		ApiQuery({
			name: 'sort_type',
			enum: ApiSortType,
			example: 'asc',
			required: false,
		}),
	);
};
