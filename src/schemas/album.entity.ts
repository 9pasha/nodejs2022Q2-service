import { Column, Entity, ManyToOne, PrimaryColumn, Relation } from 'typeorm';
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

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    cascade: ['insert', 'update', 'remove'],
    onDelete: 'SET NULL',
  })
  artist: Relation<ArtistEntity>;

  @Column({ nullable: true })
  artistId: string | null;
}
