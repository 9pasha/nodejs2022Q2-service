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
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './tracks.service';
import { TrackInterface } from './interfaces/track.interface';
import { validate as uuidValidate } from 'uuid';
import { Response } from 'express';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTracks(): Promise<Array<TrackInterface>> {
    return await this.tracksService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<TrackInterface> {
    const searchedTrack = await this.tracksService.getTrackById(id);

    if (searchedTrack) {
      response.status(HttpStatus.CREATED).end(searchedTrack);
    } else if (!uuidValidate(id)) {
      response.status(HttpStatus.BAD_REQUEST).end(null);
    } else {
      response.status(HttpStatus.NOT_FOUND).end(null);
    }

    return searchedTrack;
  }

  @Post()
  async createTrack(
    @Body() track: CreateTrackDto,
    @Res() response: Response,
  ): Promise<TrackInterface> {
    if (
      track.hasOwnProperty('name') &&
      track.hasOwnProperty('artistId') &&
      track.hasOwnProperty('albumId') &&
      track.hasOwnProperty('duration')
    ) {
      response.status(HttpStatus.BAD_REQUEST).end(null);

      return null;
    }

    const createdTrack = await this.tracksService.createTrack(track);

    if (createdTrack) {
      response.status(HttpStatus.CREATED).end(createdTrack);
    }

    return createdTrack;
  }

  @Delete(':id')
  async deleteTrackById(@Param('id') id: string, @Res() response: Response) {
    const isDeletedTrack = await this.tracksService.deleteTrackById(id);

    if (isDeletedTrack) {
      response.status(HttpStatus.NO_CONTENT).end();
    } else if (!uuidValidate(id)) {
      response.status(HttpStatus.BAD_REQUEST).end(false);

      return false;
    } else {
      response.status(HttpStatus.NOT_FOUND).end(false);

      return false;
    }

    return isDeletedTrack;
  }

  @Put(':id')
  async updateTrack(
    @Param('id') id: string,
    @Body() track: CreateTrackDto,
    @Res() response: Response,
  ) {
    const trackBeforeUpdating = await this.tracksService.getTrackById(id);
    let updatedTrack = null;

    if (!uuidValidate(id)) {
      response.status(HttpStatus.BAD_REQUEST).end();

      return null;
    } else if (!trackBeforeUpdating) {
      response.status(HttpStatus.NOT_FOUND).end();

      return null;
    } else {
      updatedTrack = await this.tracksService.updateTrack(id, track);
      response.status(HttpStatus.OK).end(updatedTrack);
    }

    return updatedTrack;
  }
}
