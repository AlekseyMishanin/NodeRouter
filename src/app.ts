import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { UserController } from './controllers/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { ILoggerService } from './services/logger.interface';
import { json } from 'body-parser';
import { TYPES } from './types';
import 'reflect-metadata';
import { PrismaService } from './services/prisma.service';
import { AuthMiddleware } from './controllers/middlewares/auth.middleware';
import { IConfigService } from './services/config.service.interface';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILoggerService) private logger: ILoggerService,
		@inject(TYPES.IUserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.IConfigService) private configService: IConfigService
	) {
		this.app = express();
		this.port = 8080;
		this.logger = logger;
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.info(`The server is running on the http://localhost:${this.port}`);
	}

	private useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	private useRoutes(): void {
		this.app.use('/user', this.userController.router);
	}

	private useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}
}
