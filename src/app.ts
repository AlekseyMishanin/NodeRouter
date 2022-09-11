import express, { Express } from 'express';
import { Server } from 'http';
import { LoggerService } from './services/logger.service';

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;

    constructor(logger: LoggerService) {
        this.app = express();
        this.port = 8080;
        this.logger = logger;
    }

    public async init() {
        this.server = this.app.listen(this.port);
        this.logger.info(`The server is running on the http://localhost:${this.port}`);
    }
}