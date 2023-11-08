import { BaseEntity } from '@common/entity/base.entity';
import { Province } from '@modules/provinces/entities/province.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type DistrictDocument = HydratedDocument<District>;

@Schema({
	collection: 'districts',
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class District extends BaseEntity {
	@Prop({ required: true, unique: true, length: 10, index: true })
	district_code: number;

	@Prop({ required: true, length: 100 })
	name: string;

	@Prop({ required: true, length: 100 })
	unaccent_name: string;

	@Prop({ required: true, length: 100, index: true })
	slug: string;

	@Prop({ length: 10, index: true })
	province_code?: number;

	@Prop({ length: 100 })
	division_type?: string;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: Province.name,
	})
	province_id?: Province;
}

export const DistrictSchema = SchemaFactory.createForClass(District);
