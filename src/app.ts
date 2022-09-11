import express, {Express} from 'express';
import {Server} from 'http';
import {UserController} from './controllers/users.controller';
import { ExceptionFilter } from './errors/exception.filter';
import {LoggerService} from './services/logger.service';

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    userController: UserController;
    exceptionFilter: ExceptionFilter;

    constructor(
        logger: LoggerService,
        userController: UserController,
        exceptionFilter: ExceptionFilter
    ) {
        this.app = express();
        this.port = 8080;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
    }

    public async init() {
        this.userRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.info(`The server is running on the http://localhost:${this.port}`);
    }

    private userRoutes() {
        this.app.use('/user', this.userController.router);
    }

    private useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }
}