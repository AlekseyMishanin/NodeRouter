import { Container, ContainerModule } from 'inversify';
import { App } from './app';
import { UserController } from './controllers/users.controller';
import { IUserController } from './controllers/users.controller.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILoggerService } from './services/logger.interface';
import { LoggerService } from './services/logger.service';
import { TYPES } from './types';

export interface IBootstrapReturn {
	container: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind) => {
	bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService);
	bind<IUserController>(TYPES.IUserController).to(UserController);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<App>(TYPES.App).to(App);
});

function bootstrap(): IBootstrapReturn {
	const container = new Container();
	container.load(appBindings);
	const app = container.get<App>(TYPES.App);
	app.init();
	return { container, app };
}

export const { app, container } = bootstrap();
