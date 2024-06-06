import 'dotenv/config';

export interface Environment {
  dataSourceUrl: string;
  jwtSecret: string;
  appPort: number;
  loggerPort: number;
}

export function validated(): Environment {
  const { DATASOURSE_URL, JWT_SECRET, APP_PORT, LOGGER_PORT } = process.env;

  if (!DATASOURSE_URL) {
    throw new Error('Missing DATASOURSE_URL in .env');
  }

  if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in .env');
  }

  if (!APP_PORT) {
    throw new Error('Missing APP_PORT in .env');
  }

  if (!LOGGER_PORT) {
    throw new Error('Missing LOGGER_PORT in .env');
  }

  const dataSourceUrl = DATASOURSE_URL as string;
  const jwtSecret = JWT_SECRET as string;
  const appPort = Number(APP_PORT);
  const loggerPort = Number(LOGGER_PORT);

  return { dataSourceUrl, jwtSecret, appPort, loggerPort };
}

export const environments = validated();
