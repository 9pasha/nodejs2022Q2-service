import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';

@Module({
  providers: [AlbumsService, FavoritesService, TracksService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
