import { BaseEntity } from '@common/entity/base.entity';
import { District } from '@modules/districts/entities/district.entity';
import { Province } from '@modules/provinces/entities/province.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ParishAddressDocument = HydratedDocument<ParishAddress>;
@Schema({ _id: false, autoIndex: false, excludeIndexes: true })
export class ParishAddress {
	@Prop({ type: String })
	streetNumber: string;

	@Prop({ type: String })
	wards: string;

	@Prop({ type: Province, ref: Province.name })
	province?: Province;

	@Prop({ type: District, ref: District.name })
	district?: District;
}
export const ParishAddressSchema = SchemaFactory.createForClass(ParishAddress);

export type ParishMassTimesDocument = HydratedDocument<ParishMassTimes>;
@Schema({ _id: false })
export class ParishMassTimes {
	@Prop({ type: [String] })
	normalDay?: string[];

	@Prop({ type: [String] })
	saturday?: string[];

	@Prop({ type: [String] })
	sunday?: string[];
}
export const ParishMassTimesSchema =
	SchemaFactory.createForClass(ParishMassTimes);

export type ParishesDocument = HydratedDocument<Parishes>;
@Schema({
	collection: 'parishes',
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class Parishes extends BaseEntity {
	@Prop({ required: true, unique: true, length: 10, index: true })
	parish_code: number;

	@Prop()
	is_church: boolean;

	@Prop({ required: true, length: 500 })
	name: string;

	@Prop({ required: true, length: 500 })
	unaccent_name: string;

	@Prop({ required: true, length: 100, index: true })
	slug: string;

	@Prop()
	note?: string;

	@Prop({ type: ParishAddress, ref: ParishAddress.name })
	address?: ParishAddress;

	@Prop({ type: ParishMassTimes, ref: ParishMassTimes.name })
	mass_time?: ParishMassTimes;
}

export const ParishesSchema = SchemaFactory.createForClass(Parishes);
