import { BookService } from './book.service';
import { BookSaveDto } from '../interfaces/BookSaveDto';
import { PageDto } from 'src/dtos/PageDto';
import { BookDto } from 'src/dtos/BookDto';
import { PageOptionDto } from 'src/dtos/PageOptionsDto';
export declare class BookController {
    private bookService;
    constructor(bookService: BookService);
    createBook(dto: BookSaveDto): Promise<{
        author: string;
        name: string;
        rating: string;
        status: string;
    } & import("../typeorm/book.entity").Book>;
    getAllBook(pageOptionDto: PageOptionDto): Promise<PageDto<BookDto>>;
    getBook(id: number): Promise<import("../typeorm/book.entity").Book>;
    update(id: number, dto: BookSaveDto): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
