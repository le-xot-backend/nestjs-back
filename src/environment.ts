import 'dotenv/config';

export interface Environment {
  dataSourceUrl: string;
  jwtSecret: string;
  port: number;
}

export function validated(): Environment {
  const { DATASOURSE_URL, JWT_SECRET, PORT } = process.env;

  if (!DATASOURSE_URL) {
    throw new Error('Missing DATASOURSE_URL in .env');
  }

  if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in .env');
  }

  if (!PORT) {
    throw new Error('Missing PORT in .env');
  }

  const dataSourceUrl = DATASOURSE_URL as string;
  const jwtSecret = JWT_SECRET as string;
  const port = Number(PORT);

  return { dataSourceUrl, jwtSecret, port };
}

export const environments = validated();
