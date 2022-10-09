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
import { ValidateMiddleware } from './middlewares/validate.middleware';
import { UsersRepository } from '../dao/users.repository';
import { UserLoginValidateMiddleware } from './middlewares/user.login.validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILoggerService) private loggerService: ILoggerService,
		@inject(TYPES.IUserService) private userService: IUserService,
		@inject(TYPES.UsersRepository) private usersRepository: UsersRepository,
		@inject(TYPES.IConfigService) private configService: IConfigService
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				func: this.login,
				method: 'post',
				middlewares: [
					new ValidateMiddleware(UserLogin),
					new UserLoginValidateMiddleware(usersRepository),
				],
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
				middlewares: [new ValidateMiddleware(UserRegister)],
			},
		]);
	}

	async login(req: Request<{}, {}, UserLogin>, res: Response, next: NextFunction): Promise<void> {
		const jwt = await this.signJWT(req.body.email, this.configService.get('SECRET'));
		this.ok(res, { jwt });
	}

	async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
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

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				}
			);
		});
	}
}
