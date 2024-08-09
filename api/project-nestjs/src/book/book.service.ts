import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from '../typeorm/book.entity';
import { BookSaveDto } from '../interfaces/BookSaveDto';
import { PageDto } from 'src/dtos/PageDto';
import { BookDto } from 'src/dtos/BookDto';
import { PageOptionDto } from 'src/dtos/PageOptionsDto';
import { PageMetaDto } from 'src/dtos/PageMetaDto';
import { SearchBookDto } from 'src/dtos/SearchBookDto';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY') private bookRepository: Repository<Book>,
  ) {}

  // async findAll(): Promise<Book[]> {
  //   return this.bookRepository.find();
  // }

  async findAll(
    pageOptionDto: PageOptionDto,
    searchBookDto: SearchBookDto,
  ): Promise<PageDto<BookDto>> {
    const queryBuilder = this.bookRepository.createQueryBuilder('book');

    if (searchBookDto?.name) {
      queryBuilder
        .where('book.name LIKE :name', {
          name: `%${searchBookDto.name}%`,
        })
        .getMany();
    }

    if (searchBookDto?.author) {
      queryBuilder
        .where('book.author LIKE :author', {
          author: `%${searchBookDto.author}%`,
        })
        .getMany();
    }

    queryBuilder
      .orderBy('book.updated_at', pageOptionDto.order)
      .skip(pageOptionDto.skip)
      .take(pageOptionDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionDto, itemCount });

    return new PageDto(entities, pageMetaDto);
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
      author: dto.author?.trim(),
      name: dto.name?.trim(),
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
    if (!book) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return await this.bookRepository.delete(id);
  }
}
