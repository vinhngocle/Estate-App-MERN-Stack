import { ApiProperty } from '@nestjs/swagger';

export class SearchBookDto {
  @ApiProperty()
  public name?: string;

  @ApiProperty()
  public author?: string;
}
