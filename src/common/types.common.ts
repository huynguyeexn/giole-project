import { User } from '@modules/users/entities/user.entity';
import { Request } from 'express';

export enum SORT_TYPE {
	'DESC' = 'desc',
	'ASC' = 'acs',
}

export type FindAllResponse<T> = {
	totalCount: number;
	limit: number;
	offset: number;
	items: T[];
};

export type SortParams = { sort_by: string; sort_type: SORT_TYPE };

export type SearchParams = { keywork: string; field: string };

export type PaginateParams = { offset: number; limit: number };

export interface RequestWithUser extends Request {
	user: User;
}

export interface JwtAccessTokenPayload {
	user: string;
	iat: string;
	exp: string;
}

export enum ApiSortType {
	asc = 'asc',
	desc = 'desc',
}
