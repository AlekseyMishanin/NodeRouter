import { compare } from 'bcryptjs';
import { Request, Response, NextFunction, Router } from 'express';
import { IUsersRepository } from '../../dao/users.repository.interface';
import { UserLogin } from '../../models/user-login';
import { IMiddleware } from './middleware.interface';

export class UserLoginValidateMiddleware implements IMiddleware {
	private usersRepository: IUsersRepository;

	constructor(usersRepository: IUsersRepository) {
		this.usersRepository = usersRepository;
	}

	execute({ body }: Request, res: Response, next: NextFunction) {
		this.validate(body).then((isValid) => {
			if (isValid) {
				next();
			} else {
				res.status(400).send('Bad credentials');
			}
		});
	}

	async validate({ email, password }: UserLogin): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return false;
		}

		return await compare(password, existedUser.password);
	}
}
