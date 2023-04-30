import { Product, User, Zzim, ZzimDrawer } from 'src/entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export const databseConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'ably',
  password: 'ably230422',
  database: 'ably',
  entities: [Product, User, Zzim, ZzimDrawer],
  synchronize: true,
  logging: true,
};

export default databseConfig;
