import { Logger } from 'tslog';

export interface ILoggerService {
	info: (...args: unknown[]) => void;
	warn: (...args: unknown[]) => void;
	error: (...args: unknown[]) => void;
}
