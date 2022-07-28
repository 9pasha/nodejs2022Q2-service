import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';

@Injectable()
export class FavoritesService {
  async getAllFavorites() {
    return { ...dataBase.favorites };
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
