import {
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import { ArtistEntity } from './artist.entity';
import { AlbumEntity } from './album.entity';
import { TrackEntity } from './track.entity';

@Entity()
export class FavouriteEntity {
  // @PrimaryGeneratedColumn('uuid')
  // id: uuid;

  @PrimaryColumn()
  id: string;

  @ManyToMany(() => ArtistEntity, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinTable()
  artists: Array<ArtistEntity>;

  @ManyToMany(() => AlbumEntity, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinTable()
  albums: Relation<Array<AlbumEntity>>;

  @ManyToMany(() => TrackEntity, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinTable()
  tracks: Relation<TrackEntity[]>;

  toResponse() {
    const { artists, albums, tracks } = this;
    return { artists, albums, tracks };
  }

  toUpdate() {
    const { id, artists, albums, tracks } = this;
    return { id, artists, albums, tracks };
  }
}
