import { ApiProperty } from '@nestjs/swagger';

export class SearchBookDto {
  @ApiProperty()
  public search?: string;

  // @ApiProperty()
  // public author?: string;
}
