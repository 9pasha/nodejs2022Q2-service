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
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './tracks.service';
import { validate as uuidValidate } from 'uuid';
import { Response } from 'express';
import { TrackEntity } from '../schemas/track.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  // private readonly favoritesService: FavoritesService,

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAllTracks(): Promise<Array<TrackEntity>> {
    return await this.tracksService.getAllTracks();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTrackById(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<void> {
    const searchedTrack = await this.tracksService.getTrackById(id);

    if (!uuidValidate(id)) {
      const error = `Error: trackId is invalid (not uuid)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else if (!searchedTrack) {
      const error = `Error: record with id === trackId doesn't exist`;
      response.status(HttpStatus.NOT_FOUND).end(error);
    } else {
      response
        .set({ 'Content-Type': 'application/json' })
        .status(HttpStatus.OK)
        .end(JSON.stringify(searchedTrack));
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTrack(
    @Body() track: CreateTrackDto,
    @Res() response: Response,
  ): Promise<void> {
    if (
      !track.hasOwnProperty('name') ||
      !track.hasOwnProperty('artistId') ||
      !track.hasOwnProperty('albumId') ||
      !track.hasOwnProperty('duration')
    ) {
      const error = `Error: body does not contain required fields`;
      response.status(HttpStatus.BAD_REQUEST).end(error);

      return;
    }

    const createdTrack = await this.tracksService.createTrack(track);

    if (createdTrack) {
      response
        .set({ 'Content-Type': 'application/json' })
        .status(HttpStatus.CREATED)
        .end(JSON.stringify(createdTrack));
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTrackById(@Param('id') id: string, @Res() response: Response) {
    const isDeletedTrack = await this.tracksService.deleteTrackById(id);

    if (isDeletedTrack) {
      // await this.favoritesService.deleteTrackByIdFromFavorites(id);

      response.status(HttpStatus.NO_CONTENT).end();
    } else if (!uuidValidate(id)) {
      const error = `Error: trackId is invalid (not uuid)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else {
      const error = `Error: record with id === trackId doesn't exist`;
      response.status(HttpStatus.NOT_FOUND).end(error);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTrack(
    @Param('id') id: string,
    @Body() track: CreateTrackDto,
    @Res() response: Response,
  ) {
    const trackBeforeUpdating = await this.tracksService.getTrackById(id);
    let updatedTrack = null;

    if (!uuidValidate(id) || track.name === null) {
      const error = `Error: trackId is invalid (not uuid)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else if (!trackBeforeUpdating) {
      const error = `Error: record with id === trackId doesn't exist`;
      response.status(HttpStatus.NOT_FOUND).end(error);
    } else {
      updatedTrack = await this.tracksService.updateTrack(id, track);
      response
        .set({ 'Content-Type': 'application/json' })
        .status(HttpStatus.OK)
        .end(JSON.stringify(updatedTrack));
    }
  }
}
