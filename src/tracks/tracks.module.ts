import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { FavoritesService } from '../favorites/favorites.service';

@Module({
  controllers: [TracksController],
  providers: [TracksService, FavoritesService],
})
export class TracksModule {}
