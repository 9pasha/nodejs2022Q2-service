import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from './schemas/user.entity';
import { ArtistEntity } from './schemas/artist.entity';
import { AlbumEntity } from './schemas/album.entity';
import { TrackEntity } from './schemas/track.entity';
import { FavoritesModule } from './favorites/favorites.module';
import { FavoriteEntity } from './schemas/favorites.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432, // +(process.env.POSTGRES_PORT as string) as number,
      username: 'admin',
      password: 'root',
      database: 'music_service',
      entities: [
        UserEntity,
        ArtistEntity,
        AlbumEntity,
        TrackEntity,
        FavoriteEntity,
      ],
      synchronize: true,
      retryAttempts: 10,
    }),
    UsersModule,
    TracksModule,
    ArtistsModule,
    AlbumsModule,
    FavoritesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
