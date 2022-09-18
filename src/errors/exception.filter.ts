import {NextFunction, Request, Response} from "express";
import {inject, injectable} from "inversify";
import {ILoggerService} from "../services/logger.interface";
import {TYPES} from "../types";
import {IExceptionFilter} from "./exception.filter.interface";
import {HTTPError} from "./http-error.class";
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
    constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {
    }

    public catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            this.logger.error(`[context:${err.context}] Error ${err.statusCode} : ${err.message}`);
            res.status(err.statusCode).send({err: err.message});
        } else {
            this.logger.error(`${err.message}`);
            res.status(500).send({err: err.message});
        }
    }
}