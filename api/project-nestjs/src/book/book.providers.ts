import { DataSource } from 'typeorm';
import { Book } from '../typeorm/book.entity';

export const photoProviders = [
  {
    provide: 'BOOK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Book),
    inject: ['DATA_SOURCE'],
  },
];
