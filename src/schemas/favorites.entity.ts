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
export class FavoriteEntity {
  // @PrimaryGeneratedColumn('uuid')
  // id: uuid;

  @PrimaryColumn()
  id: string;

  @ManyToMany(() => ArtistEntity, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinTable()
  artists: Relation<Array<ArtistEntity>>;

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
  tracks: Relation<Array<TrackEntity>>;

  toResponse() {
    const { artists, albums, tracks } = this;
    return { artists, albums, tracks };
  }

  toUpdate() {
    const { id, artists, albums, tracks } = this;
    return { id, artists, albums, tracks };
  }
}

//
// export type Favorites = {
//   id: uuid;
//   artists: Artist[];
//   albums: Album[];
//   tracks: Track[];
// };
// export type FavsItemsNames = 'artists' | 'albums' | 'tracks';
// export type FavsItemsArr = Artist[] | Album[] | Track[];
// export type FavsItems = Artist | Album | Track;
//
// export type FavsRes = { status: number; message: string };
// const successfullyRes: FavsRes = {
//   status: 201,
//   message: 'Added successfully',
// };
//
// @Injectable()
// export class FavoritesService {
//   constructor(
//     @InjectRepository(Favorite)
//     private favoritesRepository: Repository<Favorite>,
//     @InjectRepository(Album)
//     private albumsRepository: Repository<Album>,
//     @InjectRepository(Artist)
//     private artistsRepository: Repository<Artist>,
//     @InjectRepository(Track)
//     private tracksRepository: Repository<Track>,
//   ) {}
//
//   async getAll() {
//     return (await this.getFavs()).toResponse();
//   }
//
//   async addToFavs(id: uuid, favsItemsNames: FavsItemsNames) {
//     const favs: Favorites = (await this.getFavs()).toUpdate();
//     const favsItems: FavsItemsArr = favs[favsItemsNames];
//
//     const itemToAdd = await this.checkItem(id, favsItemsNames);
//
//     if (!this.isItemAlreadyInFavs(id, favsItems)) {
//       favsItems.push(itemToAdd as Artist & Album & Track);
//       await this.favoritesRepository.save(favs);
//     }
//
//     return successfullyRes;
//   }
//
//   async deleteFromFavs(id: uuid, favsItemsNames: FavsItemsNames) {
//     const favs: Favorites = (await this.getFavs()).toUpdate();
//     const favsItems: FavsItemsArr = favs[favsItemsNames];
//
//     await this.checkItem(id, favsItemsNames);
//
//     if (!this.isItemAlreadyInFavs(id, favsItems))
//       throw new NotFoundException('Item is not favorite');
//
//     favs[favsItemsNames] = this.filterItems(id, favsItems);
//
//     await this.favoritesRepository.save(favs);
//   }
//
//   private async getFavs() {
//     const favs = await this.selectFavs();
//
//     if (!favs) return await this.createFavs();
//
//     return favs;
//   }
//
//   private async createFavs(): Promise<Favorite> {
//     const defEntity = {
//       artists: [],
//       albums: [],
//       tracks: [],
//     };
//     const favs = this.favoritesRepository.create(defEntity);
//     await this.favoritesRepository.save(favs);
//
//     return await this.selectFavs();
//   }
//
//   private async selectFavs(): Promise<Favorite> {
//     return await this.favoritesRepository
//       .createQueryBuilder('favorites')
//       .leftJoinAndSelect('favorites.artists', 'artists')
//       .leftJoinAndSelect('favorites.albums', 'albums')
//       .leftJoinAndSelect('favorites.tracks', 'tracks')
//       .getOne();
//   }
//
//   private async getItem(
//     id: uuid,
//     favsItemsNames: FavsItemsNames,
//   ): Promise<FavsItems | undefined> {
//     switch (favsItemsNames) {
//       case 'artists':
//         return await this.artistsRepository.findOneBy({ id });
//       case 'albums':
//         return await this.albumsRepository.findOneBy({ id });
//       case 'tracks':
//         return await this.tracksRepository.findOneBy({ id });
//       default:
//         return undefined;
//     }
//   }
//
//   private async checkItem(id: uuid, favsItemsNames: FavsItemsNames) {
//     const item: FavsItems = await this.getItem(id, favsItemsNames);
//     if (!item) throw new UnprocessableEntityException('Item not found');
//
//     return item;
//   }
//
//   private isItemAlreadyInFavs(id: uuid, favs: FavsItemsArr) {
//     let isItemInFavs = false;
//
//     favs.forEach((item: { id: uuid }) => {
//       if (item.id === id) isItemInFavs = true;
//     });
//     return isItemInFavs;
//   }
//
//   private filterItems(id: uuid, favsItems: FavsItemsArr) {
//     const filteredItems = (favsItems as { id: uuid }[]).filter(
//       (item: { id: uuid }) => item.id !== id,
//     );
//     return filteredItems as Artist[] & Album[] & Track[];
//   }
// }
