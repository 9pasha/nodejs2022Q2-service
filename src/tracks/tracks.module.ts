import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../schemas/album.entity';
import { ArtistEntity } from '../schemas/artist.entity';
import { TrackEntity } from '../schemas/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity, AlbumEntity, ArtistEntity])],
  controllers: [TracksController],
  providers: [TracksService, FavoritesService],
})
export class TracksModule {}
