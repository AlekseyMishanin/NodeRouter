import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILoggerService } from './logger.interface';

@injectable()
export class PrismaService {
	private _client: PrismaClient;

	constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {
		this._client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this._client.$connect();
			this.logger.info('[PrismaService]', 'node.db connected successfully');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[PrismaService]', 'Connection error:', e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		await this._client.$disconnect();
		this.logger.info('[PrismaService]', 'node.db disconnected successfully');
	}

	get client() {
		return this._client;
	}
}
