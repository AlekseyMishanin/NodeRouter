import { UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from '../dao/users.repository.interface';
import { UserRegister } from '../models/user-register';
import { User } from '../models/user.entity';
import { TYPES } from '../types';
import { IUserService } from './users.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository
	) {}

	async create({ email, password, name }: UserRegister): Promise<UserModel | null> {
		const user = new User(email, name);
		const salt = this.configService.get('SALT');
		await user.setSassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}

		return this.usersRepository.save(user);
	}

	async validate({ email, name, password }: User): Promise<boolean> {
		return true;
	}
}
