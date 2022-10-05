import { Container, ContainerModule } from 'inversify';
import { App } from './app';
import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.service.interface';
import { UserController } from './controllers/users.controller';
import { IUserController } from './controllers/users.controller.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILoggerService } from './services/logger.interface';
import { LoggerService } from './services/logger.service';
import { PrismaService } from './services/prisma.service';
import { UserService } from './services/users.service';
import { IUserService } from './services/users.service.interface';
import { TYPES } from './types';

export interface IBootstrapReturn {
	container: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind) => {
	bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService).inSingletonScope();
	bind<IUserService>(TYPES.IUserService).to(UserService).inSingletonScope();
	bind<IUserController>(TYPES.IUserController).to(UserController).inSingletonScope();
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<App>(TYPES.App).to(App).inSingletonScope();
});

function bootstrap(): IBootstrapReturn {
	const container = new Container();
	container.load(appBindings);
	const app = container.get<App>(TYPES.App);
	app.init();
	return { container, app };
}

export const { app, container } = bootstrap();
