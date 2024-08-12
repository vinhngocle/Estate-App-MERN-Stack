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
import { BookSaveDto } from '../dtos/book/BookSaveDto';
import { PageDto } from 'src/dtos/PageDto';
import { BookDto } from 'src/dtos/book/BookDto';
import { PageOptionDto } from 'src/dtos/PageOptionsDto';
import { SearchBookDto } from 'src/dtos/book/SearchBookDto';

@Controller('book')
@UseInterceptors(ClassSerializerInterceptor)
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  // @HttpCode(HttpStatus.CREATED)
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
  @HttpCode(HttpStatus.OK)
  async getBook(@Param('id') id: number): Promise<BookDto> {
    return await this.bookService.findById(id);
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
