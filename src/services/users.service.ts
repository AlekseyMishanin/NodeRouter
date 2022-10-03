import { injectable } from 'inversify';
import { UserRegister } from '../models/user-register';
import { User } from '../models/user.entity';
import { IUserService } from './users.service.interface';

@injectable()
export class UserService implements IUserService {
	async create({ email, password, name }: UserRegister): Promise<User | null> {
		const user = new User(email, name);
		await user.setSassword(password);
		return null;
	}

	async validate({ email, name, password }: User): Promise<boolean> {
		return true;
	}
}
