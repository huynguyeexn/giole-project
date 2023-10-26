import { BaseEntity } from '@common/entity/base.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
	collection: 'users',
	timestamps: {
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
})
export class User extends BaseEntity {
	@Prop({ required: true, unique: true, max: 50 })
	username: string;

	@Prop({ required: true, select: false, max: 200 })
	@Exclude()
	password: string;

	@Prop({
		required: true,
		unique: true,
		max: 50,
		match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
	})
	email: string;

	@Prop()
	@Exclude()
	current_refresh_token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
