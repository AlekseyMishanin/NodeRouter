import { Request, Response, NextFunction, Router } from 'express';
import { IMiddleware } from './middlewares/middleware.interface';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
	middlewares?: IMiddleware[];
}

export type ResponseReturnType = Response<any, Record<string, any>>;
