import dotenv from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  NODE_ENV: str({ 
    choices: ['development', 'production', 'test'],
    default: 'development' 
  }),
  DATABASE_URL: str({ devDefault: 'mongodb://localhost:27017/ev-charging' }),
});