import { UserModel } from '@prisma/client';
import { User } from '../models/user.entity';

export interface IUsersRepository {
	save: (user: User) => Promise<UserModel>;
	find: (email: string) => Promise<UserModel | null>;
}
