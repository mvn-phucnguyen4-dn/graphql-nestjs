import * as dotenv from 'dotenv';

dotenv.config();

export default {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../models/**/entities/*.entity{.ts,.js}'],
  factories: [__dirname + '/../database/factories/*.factory{.ts,.js}'],
  seeds: [__dirname + '/../database/seeds/*{.ts,.js}'],
  logging: false,
};
