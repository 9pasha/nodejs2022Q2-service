import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouriteEntity } from '../schemas/favorites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavouriteEntity])],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
