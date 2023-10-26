import {
	IsEmail,
	IsNotEmpty,
	IsStrongPassword,
	MaxLength,
} from 'class-validator';

export class CreateUserDto {
	@IsNotEmpty()
	@MaxLength(50)
	username: string;

	@IsNotEmpty()
	@IsStrongPassword()
	@MaxLength(200)
	password: string;

	@IsNotEmpty()
	@IsEmail()
	@MaxLength(20)
	email: string;
}
