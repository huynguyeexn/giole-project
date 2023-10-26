import { BaseEntity } from '@common/entity/base.entity';
import { PhuongXa } from '@modules/phuong-xa/entities/phuong-xa.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ThonXomDocument = HydratedDocument<ThonXom>;

@Schema({
	collection: 'thon-xom',
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class ThonXom extends BaseEntity {
	@Prop({ required: true })
	ten_thon_xom: string;

	@Prop({ required: true, unique: true })
	ma_thon_xom: string;

	@Prop({ required: true })
	ma_phuong_xa: string;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: PhuongXa.name,
	})
	phuong_xa: PhuongXa;
}

export const ThonXomSchema = SchemaFactory.createForClass(ThonXom);
