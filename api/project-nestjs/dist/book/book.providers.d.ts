import { DataSource } from 'typeorm';
import { Book } from '../typeorm/book.entity';
export declare const photoProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Book>;
    inject: string[];
}[];
