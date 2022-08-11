import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res, UseGuards
} from "@nestjs/common";
import { FavoritesService } from './favorites.service';
import { FavouriteTypeEnum } from './enums/favourite-type.enum';
import { TracksService } from '../tracks/tracks.service';
import { validate as uuidValidate } from 'uuid';
import { Response } from 'express';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllFavorites(@Res() response: Response) {
    const favorites = await this.favoritesService.getAllFavorites();

    response
      .set({ 'Content-Type': 'application/json' })
      .status(HttpStatus.OK)
      .end(JSON.stringify(favorites));
  }

  @Post('/:type/:id')
  @UseGuards(JwtAuthGuard)
  async addToFavorites(
    @Param('id') id: string,
    @Param('type')
    type:
      | FavouriteTypeEnum.track
      | FavouriteTypeEnum.album
      | FavouriteTypeEnum.artist,
    @Res() response: Response,
  ) {
    switch (type) {
      case FavouriteTypeEnum.album:
        const searchedAlbum = await this.albumsService.getAlbumById(id);

        if (!uuidValidate(id)) {
          const error = `Error: albumId is invalid (not uuid)`;
          response.status(HttpStatus.BAD_REQUEST).end(error);
        } else if (!searchedAlbum) {
          const error = `Error: record with id === albumId doesn't exist`;
          response.status(HttpStatus.UNPROCESSABLE_ENTITY).end(error);
        } else {
          await this.favoritesService.addAlbumToFavourites(id);

          const message = `Artist with id === albumId exists`;
          response.status(HttpStatus.CREATED).end(message);
        }

        break;
      case FavouriteTypeEnum.artist:
        const searchedArtist = await this.artistsService.getArtistById(id);

        if (!uuidValidate(id)) {
          const error = `Error: artistId is invalid (not uuid)`;
          response.status(HttpStatus.BAD_REQUEST).end(error);
        } else if (!searchedArtist) {
          const error = `Error: record with id === artistId doesn't exist`;
          response.status(HttpStatus.UNPROCESSABLE_ENTITY).end(error);
        } else {
          await this.favoritesService.addArtistToFavourites(id);

          const message = `Artist with id === artistId exists`;
          response.status(HttpStatus.CREATED).end(message);
        }

        break;
      case FavouriteTypeEnum.track:
        const searchedTrack = await this.tracksService.getTrackById(id);

        if (!uuidValidate(id)) {
          const error = `Error: trackId is invalid (not uuid)`;
          response.status(HttpStatus.BAD_REQUEST).end(error);
        } else if (!searchedTrack) {
          const error = `Error: record with id === trackId doesn't exist`;
          response.status(HttpStatus.UNPROCESSABLE_ENTITY).end(error);
        } else {
          await this.favoritesService.addTrackToFavourites(id);

          const message = `Track with id === trackId exists`;
          response.status(HttpStatus.CREATED).end(message);
        }

        break;
      default:
        break;
    }
  }

  @Delete('/:type/:id')
  @UseGuards(JwtAuthGuard)
  async deleteFromFavorites(
    @Param('id') id: string,
    @Param('type')
    type:
      | FavouriteTypeEnum.track
      | FavouriteTypeEnum.album
      | FavouriteTypeEnum.artist,
    @Res() response: Response,
  ) {
    switch (type) {
      case FavouriteTypeEnum.album:
        const searchedAlbum =
          await this.favoritesService.getAlbumByIdFromFavorites(id);

        if (!uuidValidate(id)) {
          const error = `Error: albumId is invalid (not uuid)`;
          response.status(HttpStatus.BAD_REQUEST).end(error);
        } else if (!searchedAlbum) {
          const error = `Error: record with id === albumId is not favorite`;
          response.status(HttpStatus.UNPROCESSABLE_ENTITY).end(error);
        } else {
          await this.favoritesService.deleteAlbumByIdFromFavorites(id);

          response.status(HttpStatus.NO_CONTENT).end();
        }

        break;
      case FavouriteTypeEnum.artist:
        const searchedArtist =
          await this.favoritesService.getArtistByIdFromFavorites(id);

        if (!uuidValidate(id)) {
          const error = `Error: artistId is invalid (not uuid)`;
          response.status(HttpStatus.BAD_REQUEST).end(error);
        } else if (!searchedArtist) {
          const error = `Error: record with id === artistId is not favorite`;
          response.status(HttpStatus.UNPROCESSABLE_ENTITY).end(error);
        } else {
          await this.favoritesService.deleteArtistByIdFromFavorites(id);

          response.status(HttpStatus.NO_CONTENT).end();
        }

        break;
      case FavouriteTypeEnum.track:
        const searchedTrack =
          await this.favoritesService.getTrackByIdFromFavorites(id);

        if (!uuidValidate(id)) {
          const error = `Error: trackId is invalid (not uuid)`;
          response.status(HttpStatus.BAD_REQUEST).end(error);
        } else if (!searchedTrack) {
          const error = `Error: record with id === trackId is not favorite`;
          response.status(HttpStatus.UNPROCESSABLE_ENTITY).end(error);
        } else {
          await this.favoritesService.deleteTrackByIdFromFavorites(id);

          response.status(HttpStatus.NO_CONTENT).end();
        }

        break;
      default:
        break;
    }
  }
}
