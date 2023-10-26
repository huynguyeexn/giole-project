import { BaseEntity } from '@common/entity/base.entity';
import { QuanHuyen } from '@modules/quan-huyen/entities/quan-huyen.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PhuongXaDocument = HydratedDocument<PhuongXa>;

@Schema({
	collection: 'phuong-xa',
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class PhuongXa extends BaseEntity {
	@Prop({ required: true })
	ten_phuong_xa: string;

	@Prop({ required: true, unique: true })
	ma_phuong_xa: string;

	@Prop({ required: true })
	ma_quan_huyen: string;

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: QuanHuyen.name,
	})
	quan_huyen: QuanHuyen;
}

export const PhuongXaSchema = SchemaFactory.createForClass(PhuongXa);
