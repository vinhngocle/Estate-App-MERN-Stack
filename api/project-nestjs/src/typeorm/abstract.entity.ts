import { Exclude } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class AbstractEntity {
  @CreateDateColumn()
  @Exclude()
  public created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  public updated_at: Date;
}
