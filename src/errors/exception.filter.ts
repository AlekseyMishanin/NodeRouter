import {NextFunction, Request, Response} from "express";
import {LoggerService} from "../services/logger.service";
import {IExceptionFilter} from "./exception.filter.interface";
import {HTTPError} from "./http-error.class";

export class ExceptionFilter implements IExceptionFilter {
    private _logger: LoggerService;

    constructor(logger: LoggerService) {
        this._logger = logger;
    }

    public catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            this._logger.error(`[context:${err.context}] Error ${err.statusCode} : ${err.message}`);
            res.status(err.statusCode).send({err: err.message});
        } else {
            this._logger.error(`${err.message}`);
            res.status(500).send({err: err.message});
        }
    }
}