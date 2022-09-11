import { App } from './app';
import { UserController } from './controllers/users.controller';
import { LoggerService } from './services/logger.service';

async function bootstrap() {
    const logger = new LoggerService();

    const app = new App(logger, new UserController(logger));
    await app.init();
}

bootstrap();