import { BookService } from './book.service';
import { BookSaveDto } from '../dto/BookSaveDto';
export declare class BookController {
    private bookService;
    constructor(bookService: BookService);
    createBook(dto: BookSaveDto): Promise<{
        author: string;
        name: string;
        rating: string;
        status: string;
    } & import("../typeorm/book.entity").Book>;
    getAllBook(): Promise<import("../typeorm/book.entity").Book[]>;
    getBook(id: number): Promise<import("../typeorm/book.entity").Book>;
    update(id: number, dto: BookSaveDto): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
