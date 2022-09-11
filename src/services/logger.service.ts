import { Logger } from 'tslog';

export class LoggerService {
    private _logger: Logger;

    constructor() {
        this._logger = new Logger({
            displayLoggerName: false,
            displayFunctionName: false,
            displayFilePath: 'hidden',
        });
    }

    get logger() {
        return this._logger;
    }

    set logget(logger: Logger) {
        this._logger = logger;
    }

    public info(... args: unknown[]): void {
        this._logger.info(...args);
    }

    public warn(... args: unknown[]): void {
        this._logger.warn(...args);
    }

    public error(... args: unknown[]): void {
        this._logger.error(...args);
    }
}