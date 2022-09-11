import { Router, Response } from 'express';
import { IControllerRoute } from '../model/route.interface';
import { LoggerService } from '../services/logger.service';

export abstract class BaseController {
    private readonly _router: Router;
    private _logger: LoggerService;

    constructor(logger: LoggerService) {
        this._router = Router();
        this._logger = logger;
    }

    get router() {
        return this._router;
    }

    public send<T>(res: Response, code: number, message: T) {
        res.status(code);
        return res.type('application/json').json(message);
    }

    public ok<T>(res: Response, message: T) {
        return this.send<T>(res, 200, message);
    }

    public created(res: Response) {
        return res.sendStatus(201);
    }

    protected bindRoutes(routes: IControllerRoute[]) {
        for (const route of routes) {
            this._logger.info(`[${route.method}] ${route.path}`);
            const requestHandler = route.func.bind(this);
            this.router[route.method](route.path, requestHandler);
        }
    }
}