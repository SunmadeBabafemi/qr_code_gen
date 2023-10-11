import { Column, Entity } from 'typeorm';
import { SharedEntity } from '../common/model/sharedEntity';

@Entity()
export class QrCode extends SharedEntity {
  @Column({ nullable: false })
  code: string;

  @Column('jsonb', { array: true, nullable: true, default: [] })
  movies: object[];

}
