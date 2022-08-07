import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from '../schemas/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistsRepository: Repository<ArtistEntity>,
  ) {}

  async getAllArtists(): Promise<Array<ArtistEntity>> {
    return await this.artistsRepository.find();
  }

  async getArtistById(id: string): Promise<ArtistEntity> {
    return await this.artistsRepository.findOneBy({ id });
  }

  async createArtist(artist: CreateArtistDto): Promise<ArtistEntity> {
    const createdArtist: ArtistEntity = new ArtistEntity();

    createdArtist.id = uuid();
    createdArtist.name = artist.name;
    createdArtist.grammy = artist.grammy;

    return await this.artistsRepository.save(createdArtist);
  }

  async deleteArtistById(id: string): Promise<void> {
    await this.artistsRepository.delete(id);
  }

  async updateArtist(
    id: string,
    artist: CreateArtistDto,
  ): Promise<ArtistEntity> {
    await this.artistsRepository.update(id, {
      grammy: artist.grammy,
      name: artist.name,
    });

    return await this.getArtistById(id);
  }
}
