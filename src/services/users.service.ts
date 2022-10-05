import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { UserRegister } from '../models/user-register';
import { User } from '../models/user.entity';
import { TYPES } from '../types';
import { IUserService } from './users.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.IConfigService) private configService: IConfigService) {}

	async create({ email, password, name }: UserRegister): Promise<User | null> {
		const user = new User(email, name);
		const salt = this.configService.get('SALT');
		await user.setSassword(password, Number(salt));
		return null;
	}

	async validate({ email, name, password }: User): Promise<boolean> {
		return true;
	}
}
