import {inject, injectable} from "inversify";
import {IControllerRoute} from "../controllers/route.interface";
import {HTTPError} from "../errors/http-error.class";
import {ILoggerService} from "../services/logger.interface";
import {TYPES} from "../types";
import {BaseController} from "./base.controller";
import 'reflect-metadata';

@injectable()
export class UserController extends BaseController {
    constructor(@inject(TYPES.ILoggerService) private loggerService: ILoggerService) {
        super(loggerService);
        this.bindRoutes([this.login(), this.logout(), this.register()])
    }

    private login(): IControllerRoute {
        return {
            path: '/login',
            func: (req, res, next) => this.ok(res, 'login'),
            method: 'post',
        };
    }

    private logout(): IControllerRoute {
        return {
            path: '/logout',
            func: (req, res, next) => next(new HTTPError(404, 'Not implemented', 'logout')),
            method: 'post',
        };
    }

    private register(): IControllerRoute {
        return {
            path: '/register',
            func: (req, res, next) => this.ok(res, 'register'),
            method: 'post',
        };
    }
}