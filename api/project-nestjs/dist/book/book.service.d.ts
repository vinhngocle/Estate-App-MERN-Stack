import { Repository } from 'typeorm';
import { Book } from '../typeorm/book.entity';
import { BookSaveDto } from '../interfaces/BookSaveDto';
import { PageDto } from 'src/dtos/PageDto';
import { BookDto } from 'src/dtos/BookDto';
import { PageOptionDto } from 'src/dtos/PageOptionsDto';
export declare class BookService {
    private bookRepository;
    constructor(bookRepository: Repository<Book>);
    findAll(pageOptionDto: PageOptionDto): Promise<PageDto<BookDto>>;
    findById(id: number): Promise<Book>;
    insert(dto: BookSaveDto): Promise<{
        author: string;
        name: string;
        rating: string;
        status: string;
    } & Book>;
    updateById(id: number, dto: BookSaveDto): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
