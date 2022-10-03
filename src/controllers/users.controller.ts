import { inject, injectable } from 'inversify';
import { HTTPError } from '../errors/http-error.class';
import { ILoggerService } from '../services/logger.interface';
import { TYPES } from '../types';
import { BaseController } from './base.controller';
import { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import { IUserController } from './users.controller.interface';
import { UserLogin } from '../models/user-login';
import { UserRegister } from '../models/user-register';
import { User } from '../models/user.entity';
import { IUserService } from '../services/users.service.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILoggerService) private loggerService: ILoggerService,
		@inject(TYPES.IUserService) private userService: IUserService
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				func: this.login,
				method: 'post',
			},
			{
				path: '/logout',
				func: this.logout,
				method: 'post',
			},
			{
				path: '/register',
				func: this.register,
				method: 'post',
			},
		]);
	}

	login(req: Request<{}, {}, UserLogin>, res: Response, next: NextFunction): void {
		this.logger.info(req.body);
		this.ok(res, 'login');
	}

	logout(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(404, 'Not implemented', 'logout'));
	}

	async register(
		{ body }: Request<{}, {}, UserRegister>,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const user = await this.userService.create(body);
		if (!user) {
			return next(new HTTPError(400, 'User exists'));
		}
		this.ok(res, user);
	}
}
