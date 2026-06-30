import dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: port({ default: 5001 }),
  NODE_ENV: str({ 
    choices: ['development', 'production', 'test'],
    default: 'development' 
  }),
  DATABASE_URL: str({ devDefault: 'mongodb://localhost:27017/ev-charging' }),
  JWT_SECRET: str({ devDefault: 'dev-jwt-secret-change-in-production' }),
  CLIENT_URL: str({ default: 'http://localhost:5173' }),
});