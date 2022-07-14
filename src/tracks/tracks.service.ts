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
    tracksDataBase.tracks.filter((track) => track.id === id);

    return true;
  }

  async updateTrack(id, track) {
    tracksDataBase.tracks.forEach((currentTrack) => {
      if (id === currentTrack.id) {

      }
    });
  }
}
