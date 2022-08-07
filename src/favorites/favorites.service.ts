import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoriteEntity } from '../schemas/favorites.entity';
import { AlbumEntity } from '../schemas/album.entity';
import { ArtistEntity } from '../schemas/artist.entity';
import { TrackEntity } from '../schemas/track.entity';

export type Favorites = {
  id: string;
  artists: Array<ArtistEntity>;
  albums: Array<AlbumEntity>;
  tracks: Array<TrackEntity>;
};

export type FavsItemsNames = 'artists' | 'albums' | 'tracks';

const successfullyRes = {
  status: 201,
  message: 'Added successfully',
};

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async getAllFavorites(): Promise<{
    albums: Array<AlbumEntity>;
    artists: Array<ArtistEntity>;
    tracks: Array<TrackEntity>;
  }> {
    return (await this.getFavorites()).toResponse();
  }

  private async getFavorites() {
    const favorites = await this.selectFavorites();

    if (!favorites) return await this.createFavorites();

    return favorites;
  }

  private async createFavorites(): Promise<FavoriteEntity> {
    const defEntity = {
      artists: [],
      albums: [],
      tracks: [],
    };
    const favorites = this.favoriteRepository.create(defEntity);
    await this.favoriteRepository.save(favorites);

    return await this.selectFavorites();
  }

  private async selectFavorites(): Promise<FavoriteEntity> {
    return await this.favoriteRepository
      .createQueryBuilder('favorites')
      .leftJoinAndSelect('favorites.artists', 'artists')
      .leftJoinAndSelect('favorites.albums', 'albums')
      .leftJoinAndSelect('favorites.tracks', 'tracks')
      .getOne();
  }

  async addToFavorites(id: string, favsItemsNames: FavsItemsNames) {
    const favs: Favorites = (await this.getFavorites()).toUpdate();
    const favsItems:
      | Array<ArtistEntity>
      | Array<AlbumEntity>
      | Array<TrackEntity> = favs[favsItemsNames];

    const itemToAdd = await this.checkItem(id, favsItemsNames);

    if (!this.isItemAlreadyInFavs(id, favsItems)) {
      favsItems.push(itemToAdd as ArtistEntity & AlbumEntity & TrackEntity);
      await this.favoriteRepository.save(favs);
    }

    return successfullyRes;
  }

  private async getItem(
    id: string,
    favsItemsNames: FavsItemsNames,
  ): Promise<ArtistEntity | AlbumEntity | TrackEntity | undefined> {
    switch (favsItemsNames) {
      case 'artists':
        return await this.artistRepository.findOneBy({ id });
      case 'albums':
        return await this.albumRepository.findOneBy({ id });
      case 'tracks':
        return await this.trackRepository.findOneBy({ id });
      default:
        return undefined;
    }
  }

  private async checkItem(id: string, favsItemsNames: FavsItemsNames) {
    const item: ArtistEntity | AlbumEntity | TrackEntity = await this.getItem(
      id,
      favsItemsNames,
    );
    if (!item) return 'Item not found';

    return item;
  }

  private isItemAlreadyInFavs(
    id: string,
    favs: Array<ArtistEntity> | Array<AlbumEntity> | Array<TrackEntity>,
  ) {
    let isItemInFavs = false;

    favs.forEach((item: { id: string }) => {
      if (item.id === id) isItemInFavs = true;
    });
    return isItemInFavs;
  }

  async getTrackByIdFromFavorites(id) {
    return dataBase.favorites.tracks.find((trackId) => trackId === id);
  }

  async getAlbumByIdFromFavorites(id) {
    return dataBase.favorites.albums.find((albumId) => albumId === id);
  }

  async getArtistByIdFromFavorites(id) {
    return dataBase.favorites.artists.find((artistId) => artistId === id);
  }

  async addTrackToFavourites(id) {
    dataBase.favorites.tracks.push(id);
  }

  async addArtistToFavourites(id) {
    dataBase.favorites.artists.push(id);
  }

  async addAlbumToFavourites(id) {
    dataBase.favorites.albums.push(id);
  }

  async deleteTrackByIdFromFavorites(id) {
    dataBase.favorites.tracks = dataBase.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  async deleteAlbumByIdFromFavorites(id) {
    dataBase.favorites.albums = dataBase.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  async deleteArtistByIdFromFavorites(id) {
    dataBase.favorites.artists = dataBase.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}
