import { BaseEntity } from '@common/entity/base.entity';
import { TinhThanh } from '@modules/tinh-thanh/entities/tinh-thanh.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type QuanHuyenDocument = HydratedDocument<QuanHuyen>;

@Schema({
	collection: 'quan-huyen',
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class QuanHuyen extends BaseEntity {
	@Prop({ required: true })
	ten_quan_huyen: string;

	@Prop({ required: true, unique: true })
	ma_quan_huyen: string;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: TinhThanh.name,
	})
	tinh_thanh: TinhThanh;
}

export const QuanHuyenSchema = SchemaFactory.createForClass(QuanHuyen);
