import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { UserController } from './controllers/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import { ILoggerService } from './services/logger.interface';
import { TYPES } from './types';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILoggerService) private logger: ILoggerService,
		@inject(TYPES.IUserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter
	) {
		this.app = express();
		this.port = 8080;
		this.logger = logger;
	}

	public async init(): Promise<void> {
		this.userRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.info(`The server is running on the http://localhost:${this.port}`);
	}

	private userRoutes(): void {
		this.app.use('/user', this.userController.router);
	}

	private useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}
}
