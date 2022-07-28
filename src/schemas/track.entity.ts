import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { ArtistEntity } from './artist.entity';
import { AlbumEntity } from './album.entity';

@Entity()
export class TrackEntity {
  // @PrimaryGeneratedColumn()
  // _id: number;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  duration: number;

  @OneToOne(() => ArtistEntity)
  @JoinColumn()
  artist: ArtistEntity;

  @OneToOne(() => AlbumEntity)
  @JoinColumn()
  album: AlbumEntity;
}
