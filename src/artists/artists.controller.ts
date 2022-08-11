import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { Response } from 'express';
import { CreateArtistDto } from './dto/create-artist.dto';
import { validate as uuidValidate } from 'uuid';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  // private readonly favoritesService: FavoritesService,
  // private readonly tracksService: TracksService,

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAllArtists() {
    return await this.artistsService.getAllArtists();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getArtistById(@Param('id') id: string, @Res() response: Response) {
    const searchedArtist = await this.artistsService.getArtistById(id);

    if (!uuidValidate(id)) {
      const error = `Error: artistId is invalid (not uuid)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else if (!searchedArtist) {
      const error = `Error: record with id === artistId doesn't exist`;
      response.status(HttpStatus.NOT_FOUND).end(error);
    } else {
      response
        .set({ 'Content-Type': 'application/json' })
        .status(HttpStatus.OK)
        .end(JSON.stringify(searchedArtist));
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createArtist(
    @Body() artist: CreateArtistDto,
    @Res() response: Response,
  ) {
    if (!artist.hasOwnProperty('grammy') || !artist.hasOwnProperty('name')) {
      const error = `Error: Artist does not contain required fields (grammy, name)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else {
      const createdArtist = await this.artistsService.createArtist(artist);

      response
        .set({ 'Content-Type': 'application/json' })
        .status(HttpStatus.CREATED)
        .end(JSON.stringify(createdArtist));
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteArtist(@Param('id') id: string, @Res() response: Response) {
    const searchedArtist = await this.artistsService.getArtistById(id);

    if (!uuidValidate(id)) {
      const error = `Error: artistId is invalid (not uuid)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else if (!searchedArtist) {
      const error = `Error: record with id === artistId doesn't exist`;
      response.status(HttpStatus.NOT_FOUND).end(error);
    } else {
      await this.artistsService.deleteArtistById(id);
      // await this.favoritesService.deleteArtistByIdFromFavorites(id);
      // await this.tracksService.updateTracksAfterDeletionArtist(id);

      response.status(HttpStatus.NO_CONTENT).end();
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateArtist(
    @Param('id') id: string,
    @Body() artist: UpdateArtistDto,
    @Res() response: Response,
  ) {
    const searchedArtist = await this.artistsService.getArtistById(id);

    if (
      !uuidValidate(id) ||
      typeof artist.name !== 'string' ||
      typeof artist.grammy !== 'boolean'
    ) {
      const error = `Error: artistId is invalid (not uuid)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else if (!searchedArtist) {
      const error = `Error: record with id === artistId doesn't exist`;
      response.status(HttpStatus.NOT_FOUND).end(error);
    } else {
      const updatedArtist = await this.artistsService.updateArtist(id, artist);
      response
        .set({ 'Content-Type': 'application/json' })
        .status(HttpStatus.OK)
        .end(JSON.stringify(updatedArtist));
    }
  }
}
