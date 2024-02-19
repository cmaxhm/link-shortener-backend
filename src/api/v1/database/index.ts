import env from 'dotenv';
import { DataSource } from 'typeorm';
import { Link } from '../models/link.model';
import { User } from '../models/user.model';

env.config();

export const AppDataSource: DataSource = new DataSource({
  type: process.env.DB_DIALECT as any ?? 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME ?? 'postgres',
  logging: false,
  entities: [User, Link],
  migrations: ['dist/src/api/v1/database/migrations/*.js']
});

AppDataSource.initialize()
  .then(() => console.log('Connected to database.'))
  .catch((error) => console.log(error));
