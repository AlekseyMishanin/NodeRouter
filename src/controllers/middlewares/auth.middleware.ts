import { IMiddleware } from './middleware.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction) {
		if (req.headers.authorization) {
			const jwt = req.headers.authorization.split(' ')[1];
			verify(jwt, this.secret, (err, payload) => {
				if (!err && payload) {
					req.user = (payload as JwtPayload).email;
				}
			});
		}
		next();
	}
}
