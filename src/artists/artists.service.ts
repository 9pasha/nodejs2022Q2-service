import { Injectable } from '@nestjs/common';
import { dataBase } from '../dataBase';
import { uuid } from 'uuidv4';

@Injectable()
export class ArtistsService {
  async getAllArtists() {
    return [...dataBase.artists];
  }

  async getArtistById(id) {
    return dataBase.artists.find((artist) => artist.id === id);
  }

  async createArtist(artist) {
    const createdArtist = { ...artist, id: uuid() };

    dataBase.artists.push(createdArtist);

    return createdArtist;
  }

  async deleteArtistById(id) {
    dataBase.artists = dataBase.artists.filter((artist) => artist.id !== id);
  }

  async updateArtist(id, artist) {
    let updatedArtist = null;

    dataBase.artists.forEach((currentArtist) => {
      if (currentArtist.id === id) {
        currentArtist = { ...artist, id };
        updatedArtist = { ...currentArtist };
      }
    });

    return updatedArtist;
  }
}
