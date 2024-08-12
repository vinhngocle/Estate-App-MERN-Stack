import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from '../typeorm/book.entity';
import { BookSaveDto } from '../dtos/book/BookSaveDto';
import { PageDto } from 'src/dtos/PageDto';
import { BookDto } from 'src/dtos/book/BookDto';
import { PageOptionDto } from 'src/dtos/PageOptionsDto';
import { PageMetaDto } from 'src/dtos/PageMetaDto';
import { SearchBookDto } from 'src/dtos/book/SearchBookDto';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY') private _bookRepository: Repository<Book>,
  ) {}

  // async findAll(): Promise<Book[]> {
  //   return this._bookRepository.find();
  // }

  async findAll(
    pageOptionDto: PageOptionDto,
    searchBookDto: SearchBookDto,
  ): Promise<PageDto<BookDto>> {
    const queryBuilder = this._bookRepository.createQueryBuilder('book');

    if (searchBookDto?.search) {
      queryBuilder
        .where('book.name LIKE :search OR book.author LIKE :search', {
          search: `%${searchBookDto.search}%`,
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

  // async findById(id: number): Promise<Book> {
  //   const book = this._bookRepository.findOne({ where: { id } });
  //   if (!book) {
  //     throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
  //   }

  //   return book;
  // }

  async findById(id: number): Promise<BookDto> {
    const queryBuilder = this._bookRepository.createQueryBuilder('book');
    const book = queryBuilder.where('book.id = :id', { id }).getOne();
    return book;
  }

  async insert(dto: BookSaveDto) {
    const newBook = {
      author: dto.author?.trim(),
      name: dto.name?.trim(),
      rating: dto.rating,
      status: dto.status,
    };
    return await this._bookRepository.save(newBook);
  }

  async updateById(id: number, dto: BookSaveDto) {
    const book = await this._bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }

    return await this._bookRepository.update(book.id, dto);
  }

  async delete(id: number) {
    const book = await this._bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
    }
    return await this._bookRepository.delete(id);
  }
}
