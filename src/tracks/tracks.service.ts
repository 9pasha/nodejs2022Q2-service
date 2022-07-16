import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { dataBase } from '../dataBase';

@Injectable()
export class TracksService {
  async getAllTracks() {
    return dataBase.tracks;
  }

  async getTrackById(id) {
    return dataBase.tracks.find((track) => track.id === id);
  }

  async createTrack(track) {
    const createdTrack = { ...track, id: uuid() };

    dataBase.tracks.push(createdTrack);

    return createdTrack;
  }

  async deleteTrackById(id) {
    let isDeletedTrack = false;

    dataBase.tracks.filter((track) => {
      if (track.id === id) {
        isDeletedTrack = true;
      }

      return track.id !== id;
    });

    return isDeletedTrack;
  }

  async updateTrack(id, track) {
    let updatedTrack = null;

    dataBase.tracks.forEach((currentTrack) => {
      if (id === currentTrack.id) {
        currentTrack = { ...track };
        currentTrack.id = id;

        updatedTrack = currentTrack;
      }
    });

    return updatedTrack;
  }
}
