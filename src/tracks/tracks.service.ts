import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { dataBase } from '../dataBase';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from '../schemas/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly tracksRepository: Repository<TrackEntity>,
  ) {}

  async getAllTracks(): Promise<Array<TrackEntity>> {
    return await this.tracksRepository.find();
  }

  async getTrackById(id: string): Promise<TrackEntity> {
    return await this.tracksRepository.findOneBy({ id });
  }

  async createTrack(track: CreateTrackDto): Promise<TrackEntity> {
    const createdTrack: TrackEntity = new TrackEntity();

    createdTrack.id = uuid();
    createdTrack.name = track.name;
    createdTrack.duration = track.duration;
    createdTrack.artistId = track.artistId;
    createdTrack.albumId = track.albumId;

    return await this.tracksRepository.save(createdTrack);
  }

  async deleteTrackById(id: string): Promise<boolean> {
    const isDeletedTrack = true;

    await this.tracksRepository.delete(id);

    return isDeletedTrack;
  }

  async updateTrack(id: string, track: UpdateTrackDto): Promise<TrackEntity> {
    await this.tracksRepository.update(id, {
      name: track.name,
      duration: track.duration,
      artistId: track.artistId,
      albumId: track.albumId,
    });

    return await this.getTrackById(id);
  }
  // To Do
  async updateTracksAfterDeletionAlbum(albumId: string) {
    dataBase.tracks.forEach((currentTrack) => {
      if (albumId === currentTrack.albumId) {
        currentTrack.albumId = null;
      }
    });
  }
  // To Do
  async updateTracksAfterDeletionArtist(artistId: string) {
    dataBase.tracks.forEach((currentTrack) => {
      if (artistId === currentTrack.artistId) {
        currentTrack.artistId = null;
      }
    });
  }
}
