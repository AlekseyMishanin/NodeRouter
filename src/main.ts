import {Container} from 'inversify';
import {App} from './app';
import {UserController} from './controllers/users.controller';
import {ExceptionFilter} from './errors/exception.filter';
import {IExceptionFilter} from './errors/exception.filter.interface';
import {ILoggerService} from './services/logger.interface';
import {LoggerService} from './services/logger.service';
import {TYPES} from './types';

const container = new Container();
container.bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService);
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
container.bind<App>(TYPES.App).to(App);

const app = container.get<App>(TYPES.App);
app.init();

export {app, container};