import { ApiProperty } from '@nestjs/swagger';

export class BookSaveDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  author: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  rating: string;

  @ApiProperty()
  status: string;
}
