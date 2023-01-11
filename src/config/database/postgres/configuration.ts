import { registerAs } from '@nestjs/config';
export default registerAs('postgres', () => ({
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
}));
