import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ArtistEntity {
  // @PrimaryGeneratedColumn()
  // _id: number;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
