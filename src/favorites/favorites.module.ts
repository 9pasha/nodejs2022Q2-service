import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteEntity } from '../schemas/favorites.entity';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { ArtistEntity } from '../schemas/artist.entity';
import { AlbumEntity } from '../schemas/album.entity';
import { TrackEntity } from '../schemas/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoriteEntity,
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
    ]),
  ],
  providers: [FavoritesService, ArtistsService, AlbumsService, TracksService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
