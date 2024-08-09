import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookSaveDto } from '../interfaces/BookSaveDto';
import { PageDto } from 'src/dtos/PageDto';
import { BookDto } from 'src/dtos/BookDto';
import { PageOptionDto } from 'src/dtos/PageOptionsDto';
import { SearchBookDto } from 'src/dtos/SearchBookDto';

@Controller('book')
@UseInterceptors(ClassSerializerInterceptor)
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async createBook(@Body() dto: BookSaveDto) {
    return await this.bookService.insert(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllBook(
    @Query() pageOptionDto: PageOptionDto,
    @Query() searchBookDto?: SearchBookDto,
  ): Promise<PageDto<BookDto>> {
    return await this.bookService.findAll(pageOptionDto, searchBookDto);
  }

  @Get(':id')
  async getBook(@Param('id') id: number) {
    const book = this.bookService.findById(id);
    return book;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: BookSaveDto) {
    return await this.bookService.updateById(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.bookService.delete(id);
  }
}
