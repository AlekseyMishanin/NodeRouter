import { IsEmail, IsString } from 'class-validator';

export class UserRegister {
	@IsEmail({}, { message: 'Invalid email' })
	email: string;
	@IsString()
	password: string;
	@IsString()
	name: string;
}
