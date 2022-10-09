import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILoggerService } from '../services/logger.interface';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.ILoggerService) private loggerService: ILoggerService) {
		const envResult: DotenvConfigOutput = config();
		if (envResult.error) {
			loggerService.error('.env not found');
		} else {
			loggerService.info('.env has loaded successfully');
			this.config = envResult.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	}
}
