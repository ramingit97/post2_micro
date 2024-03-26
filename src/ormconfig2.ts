import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import {DataSource, DataSourceOptions} from 'typeorm';
dotenvConfig({ path: './.development.env' });

export const ormConfig: DataSourceOptions = {
  type: 'mongodb',
  host: "mongodb",
  port: parseInt(process.env.TYPEORM_PORT2),
  username:"myAdminUser",
  password: "myAdminPassword",
  database: "test",
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: false,

  // allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev
  migrations: [__dirname + '/migrations2/**/*{.ts,.js}'],
};

console.log(ormConfig);



export default registerAs('typeorm', () => ormConfig)
export const dataSource2 = new DataSource(ormConfig)
