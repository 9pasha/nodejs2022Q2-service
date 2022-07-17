import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, FavoritesService],
})
export class ArtistsModule {}
