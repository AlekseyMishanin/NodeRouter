import { Response, Router } from 'express';
import { injectable } from 'inversify';
import { IControllerRoute, ResponseReturnType } from '../controllers/route.interface';
import { ILoggerService } from '../services/logger.interface';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	private _logger: ILoggerService;

	constructor(logger: ILoggerService) {
		this._router = Router();
		this._logger = logger;
	}

	get router(): Router {
		return this._router;
	}

	get logger(): ILoggerService {
		return this._logger;
	}

	public send<T>(res: Response, code: number, message: T): ResponseReturnType {
		res.status(code);
		return res.type('application/json').json(message);
	}

	public ok<T>(res: Response, message: T): ResponseReturnType {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): ResponseReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this._logger.info(`[${route.method}] ${route.path}`);
			const requestHandler = route.func.bind(this);
			this.router[route.method](route.path, requestHandler);
		}
	}
}
