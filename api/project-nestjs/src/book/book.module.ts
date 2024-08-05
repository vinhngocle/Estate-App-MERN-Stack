import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { DatabaseModule } from '../database/database.module';
import { photoProviders } from '../book/book.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [...photoProviders, BookService],
})
export class BookModule {}
