import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from '../typeorm/book.entity';
import { BookSaveDto } from '../dto/BookSaveDto';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY') private bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findById(id: number): Promise<Book> {
    const book = this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return book;
  }

  async insert(dto: BookSaveDto) {
    const newBook = {
      author: dto.author,
      name: dto.name,
      rating: dto.rating,
      status: dto.status,
    };
    return await this.bookRepository.save(newBook);
  }

  async updateById(id: number, dto: BookSaveDto) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return await this.bookRepository.update(book.id, dto);
  }

  async delete(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    console.log(book);
    if (!book) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return await this.bookRepository.delete(id);
  }
}
