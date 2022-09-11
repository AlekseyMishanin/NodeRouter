import { IControllerRoute } from "../model/route.interface";
import { LoggerService } from "../services/logger.service";
import { BaseController } from "./base.controller";
import * as path from "path";

export class UsersController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([this.login(), this.register()])
    }

    private login(): IControllerRoute {
        return {
            path: '/login',
            func: (req, res, next) => this.ok(res, 'login'),
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