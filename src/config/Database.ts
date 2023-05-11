import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const databseConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: 'saka',
  entities: [`${__dirname}/../entity/*.js`, `${__dirname}/../entity/*.ts`],
  synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
  logging: true,
};

export default databseConfig;
