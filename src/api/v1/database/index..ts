import { Sequelize } from 'sequelize';
import { setupModels } from '../models';
import env from 'dotenv';

env.config();

const dbName = process.env.DB_NAME ?? 'postgres';
const dbUsername = process.env.DB_USERNAME ?? 'postgres';
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST ?? 'localhost';
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;

export const sequelize = new Sequelize(
  dbName,
  dbUsername,
  dbPassword,
  {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres'
  });

setupModels(sequelize);
