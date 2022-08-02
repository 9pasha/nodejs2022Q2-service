import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
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

  // Artist id
  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'SET NULL',
  })
  artist: Relation<ArtistEntity>;

  @Column({ nullable: true })
  artistId: string | null;

  // Album id
  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    nullable: true,
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'SET NULL',
  })
  album: Relation<AlbumEntity>;

  @Column({ nullable: true })
  albumId: string | null;
}
