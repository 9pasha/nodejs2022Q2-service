import { Injectable } from '@nestjs/common';
import { tracksDataBase } from './tracksDataBase';
import { uuid } from 'uuidv4';

@Injectable()
export class TracksService {
  async getAllTracks() {
    return tracksDataBase.tracks;
  }

  async getTrackById(id) {
    return tracksDataBase.tracks.find((track) => track.id === id);
  }

  async createTrack(track) {
    const createdTrack = { ...track };
    createdTrack.id = uuid();

    tracksDataBase.tracks.push(createdTrack);

    return createdTrack;
  }

  async deleteTrackById(id) {
    let isDeletedTrack = false;
    tracksDataBase.tracks.filter((track) => {
      if (track.id === id) {
        isDeletedTrack = true;
      }

      return track.id !== id;
    });

    return isDeletedTrack;
  }

  async updateTrack(id, track) {
    let updatedTrack = null;

    tracksDataBase.tracks.forEach((currentTrack) => {
      if (id === currentTrack.id) {
        currentTrack = { ...track };
        currentTrack.id = id;

        updatedTrack = currentTrack;
      }
    });

    return updatedTrack;
  }
}
