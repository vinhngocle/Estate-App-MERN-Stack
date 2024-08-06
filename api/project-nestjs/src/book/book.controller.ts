import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from './book.service';
import { BookSaveDto } from '../dto/BookSaveDto';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  async createBook(@Body() dto: BookSaveDto) {
    console.log('insert controller');
    return await this.bookService.insert(dto);
  }

  @Get()
  async getAllBook() {
    const books = await this.bookService.findAll();
    return books;
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
