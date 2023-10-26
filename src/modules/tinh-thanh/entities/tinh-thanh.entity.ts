import { BaseEntity } from '@common/entity/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TinhThanhDocument = HydratedDocument<TinhThanh>;

@Schema({
	collection: 'tinh-thanh',
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class TinhThanh extends BaseEntity {
	@Prop({ required: true })
	ten_tinh_thanh: string;

	@Prop({ required: true, unique: true })
	ma_tinh_thanh: string;
}

export const TinhThanhSchema = SchemaFactory.createForClass(TinhThanh);
