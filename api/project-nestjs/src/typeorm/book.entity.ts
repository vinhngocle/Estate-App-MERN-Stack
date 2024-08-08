import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from './Abstract.entity';

@Entity({ name: 'books' })
export class Book extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  rating: string;

  @Column({ nullable: true })
  status: string;
}
