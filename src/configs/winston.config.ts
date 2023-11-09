import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

export const WinstonConfigs: WinstonModuleOptions = {
	format: winston.format.combine(
		winston.format.timestamp(),
		winston.format.json(),
		// winston.format.prettyPrint(),
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			dirname: './log/debug/',
			filename: 'debug.log',
			level: 'debug',
		}),
		new winston.transports.File({
			dirname: './log/error/',
			filename: 'error.log',
			level: 'error',
		}),
	],
};
