import { User } from 'src/entities/entity.user';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'lexot',
        password: 'abc',
        database: 'NestJsBackDB',
        entities: [User],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
