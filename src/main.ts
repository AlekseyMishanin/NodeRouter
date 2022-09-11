import { App } from './app';
import { UsersController } from './controllers/users.controller';
import { LoggerService } from './services/logger.service';

async function bootstrap() {
    const logger = new LoggerService();

    const app = new App(logger, new UsersController(logger));
    await app.init();
}

bootstrap();