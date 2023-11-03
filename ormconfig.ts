import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  migrations: [__dirname + '/src/_migrations/**/*{.ts,.js}'],
  entities: [__dirname + '/src/_entities/*{.ts,.js}'],
  migrationsTableName: 'typeorm_migrations',
  migrationsTransactionMode: 'all',
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Database error', err);
  });
