import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './artists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from '../schemas/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
