import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from 'src/interfaces/PageMetaDtoParameters';

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextpage: boolean;

  constructor({ pageOptionDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionDto.page;
    this.take = pageOptionDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextpage = this.page < this.pageCount;
  }
}
