import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  // id: number;
  @ApiProperty()
  public author: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public rating: string;

  @ApiProperty()
  public status: string;

  @ApiProperty()
  created_at: Date;
}
