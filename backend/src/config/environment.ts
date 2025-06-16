import { config } from 'dotenv';
import { cleanEnv, port, str, testOnly } from 'envalid';

config();

const envVars = cleanEnv(process.env, {
  NODE_ENV: str({
    devDefault: testOnly('test'),
    choices: ['development', 'production', 'test'],
  }),
  PORT: port({ devDefault: testOnly(3000) }),
  POSTGRES_CONNECTION_URL: str({ devDefault: testOnly('http://localhost:3000') }),
  JWT_SECRET: str(),
  X_REQUEST_HEADER: str(),
});

export const Configuration = {
  NODE_ENV: envVars.NODE_ENV,
  PORT: envVars.PORT,
  POSTGRES_CONNECTION_URL: envVars.POSTGRES_CONNECTION_URL,
  JWT_SECRET: envVars.JWT_SECRET,
  X_REQUEST_HEADER: envVars.X_REQUEST_HEADER,

  isProduction(): boolean {
    return envVars.NODE_ENV === 'production';
  },

  isDevelopment(): boolean {
    return envVars.NODE_ENV === 'development';
  },
};
