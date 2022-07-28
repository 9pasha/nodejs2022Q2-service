import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';
import { uuid } from 'uuidv4';

@Injectable()
export class AlbumsService {
  async getAllAlbums() {
    return [...dataBase.albums];
  }

  async getAlbumById(id) {
    return dataBase.albums.find((album) => album.id === id);
  }

  async createAlbum(album) {
    const createdAlbum = { ...album, id: uuid() };

    dataBase.albums.push(createdAlbum);

    return createdAlbum;
  }

  async deleteAlbum(id) {
    dataBase.albums = dataBase.albums.filter((album) => album.id !== id);
  }

  async updateAlbum(id, album) {
    let updatedAlbum = null;

    dataBase.albums.forEach((currentAlbum) => {
      if (id === currentAlbum.id) {
        currentAlbum = { id, ...album };
        updatedAlbum = currentAlbum;
      }
    });

    return updatedAlbum;
  }
}
