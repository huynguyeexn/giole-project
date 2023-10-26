import {
	IsEmail,
	IsNotEmpty,
	IsStrongPassword,
	MaxLength,
} from 'class-validator';

export class SignUpDto {
	@IsNotEmpty()
	@MaxLength(50)
	username: string;

	@IsNotEmpty()
	@IsStrongPassword()
	@MaxLength(200)
	password: string;

	@IsNotEmpty()
	@IsEmail()
	@MaxLength(50)
	email: string;
}
