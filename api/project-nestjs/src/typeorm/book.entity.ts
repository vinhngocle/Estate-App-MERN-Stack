import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  author: string;

  @Column('text')
  name: string;

  @Column()
  rating: string;

  @Column()
  status: string;
}
