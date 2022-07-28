import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ArtistEntity } from './artist.entity';

@Entity()
export class AlbumEntity {
  // @PrimaryGeneratedColumn()
  // _id: number;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @OneToOne(() => ArtistEntity)
  @JoinColumn()
  artist: ArtistEntity;
}
