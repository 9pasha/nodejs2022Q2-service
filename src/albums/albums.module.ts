import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  providers: [AlbumsService, FavoritesService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
