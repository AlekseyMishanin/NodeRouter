import express, {Express} from 'express';
import {Server} from 'http';
import {UsersController} from './controllers/users.controller';
import {LoggerService} from './services/logger.service';

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    usersController: UsersController;

    constructor(
        logger: LoggerService,
        usersController: UsersController
    ) {
        this.app = express();
        this.port = 8080;
        this.logger = logger;
        this.usersController = usersController;
    }

    public async init() {
        this.userRoutes();
        this.server = this.app.listen(this.port);
        this.logger.info(`The server is running on the http://localhost:${this.port}`);
    }

    private userRoutes() {
        this.app.use('/user', this.usersController.router);
    }
}