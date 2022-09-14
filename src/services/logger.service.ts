import {Logger} from 'tslog';
import { ILoggerService } from './logger.interface';

export class LoggerService implements ILoggerService {
    private _logger: Logger;

    constructor() {
        this._logger = new Logger({
            displayLoggerName: false,
            displayFunctionName: false,
            displayFilePath: 'hidden',
        });
    }

    public info(...args: unknown[]): void {
        this._logger.info(...args);
    }

    public warn(...args: unknown[]): void {
        this._logger.warn(...args);
    }

    public error(...args: unknown[]): void {
        this._logger.error(...args);
    }
}