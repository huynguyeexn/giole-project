import { BaseEntity } from '@common/entity/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProvinceDocument = HydratedDocument<Province>;

@Schema({
	collection: 'provinces',
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class Province extends BaseEntity {
	@Prop({ required: true, unique: true, length: 10 })
	province_code: number;

	@Prop({ required: true, unique: true, length: 100 })
	name: string;

	@Prop({ required: true, unique: true, length: 100 })
	unaccent_name: string;

	@Prop({ required: true, unique: true, length: 100 })
	slug: string;

	@Prop({ length: 100 })
	division_type?: string;
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);
