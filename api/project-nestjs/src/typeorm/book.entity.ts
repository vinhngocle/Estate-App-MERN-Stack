import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
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
