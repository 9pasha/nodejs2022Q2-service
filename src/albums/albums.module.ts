import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from '../schemas/album.entity';
import { ArtistEntity } from '../schemas/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, ArtistEntity])],
  providers: [AlbumsService, FavoritesService, TracksService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
