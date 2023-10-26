import { IsNotEmpty, MaxLength } from 'class-validator';

export class SignInDto {
	@IsNotEmpty()
	@MaxLength(50)
	username: string;

	@IsNotEmpty()
	@MaxLength(200)
	password: string;
}
