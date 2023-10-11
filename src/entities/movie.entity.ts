import { BeforeInsert, OneToMany, Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { SharedEntity } from '../common/model/sharedEntity';

@Entity()
export class Movie extends SharedEntity{
 @Column()
  title: string;

  @Column()
  year: string;

  @Column('text', { array: true, nullable: true, default: [] })
  images: string[];

  @Column({nullable: true})
  code: string

}
