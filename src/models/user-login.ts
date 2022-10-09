import { IsEmail, IsString } from 'class-validator';

export class UserLogin {
	@IsEmail({}, { message: 'Invalid email' })
	email: string;

	@IsString()
	password: string;
}
