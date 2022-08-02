import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../schemas/album.entity';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumsRepository: Repository<AlbumEntity>,
  ) {}

  async getAllAlbums(): Promise<Array<AlbumEntity>> {
    return await this.albumsRepository.find();
  }

  async getAlbumById(id: string): Promise<AlbumEntity> {
    return await this.albumsRepository.findOneBy({ id });
  }

  async createAlbum(album: CreateAlbumDto): Promise<AlbumEntity> {
    const createdAlbum: AlbumEntity = new AlbumEntity();

    createdAlbum.id = uuid();
    createdAlbum.name = album.name;
    createdAlbum.year = album.year;
    createdAlbum.artistId = album.artistId;

    return await this.albumsRepository.save(createdAlbum);
  }

  async deleteAlbum(id: string): Promise<void> {
    await this.albumsRepository.delete(id);
  }

  async updateAlbum(id: string, album: UpdateAlbumDto): Promise<AlbumEntity> {
    await this.albumsRepository.update(id, {
      name: album.name,
      year: album.year,
      artistId: album.artistId,
    });

    return await this.getAlbumById(id);
  }
}
