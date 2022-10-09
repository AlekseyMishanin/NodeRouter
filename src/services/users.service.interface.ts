import { UserModel } from '@prisma/client';
import { UserRegister } from '../models/user-register';
import { User } from '../models/user.entity';

export interface IUserService {
	create: (userCreateRequest: UserRegister) => Promise<UserModel | null>;
}
