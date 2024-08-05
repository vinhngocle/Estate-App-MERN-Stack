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
    return await this.bookService.insert(dto);
  }

  @Get()
  async getAllBook() {
    return await this.bookService.findAll();
  }

  @Get(':id')
  async getBook(@Param('id') id: number) {
    return this.bookService.findById(id);
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
