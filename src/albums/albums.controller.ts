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
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Response } from 'express';
import { validate as uuidValidate } from 'uuid';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAllAlbums() {
    return await this.albumsService.getAllAlbums();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getAlbumById(@Param('id') id: string, @Res() response: Response) {
    const searchedAlbum = await this.albumsService.getAlbumById(id);

    if (!uuidValidate(id)) {
      const error = `Error: albumId is invalid (not uuid)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else if (!searchedAlbum) {
      const error = `Error: record with id === albumId doesn't exist`;
      response.status(HttpStatus.NOT_FOUND).end(error);
    } else {
      response
        .set({ 'Content-Type': 'application/json' })
        .status(HttpStatus.OK)
        .end(JSON.stringify(searchedAlbum));
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createAlbum(@Body() album: CreateAlbumDto, @Res() response: Response) {
    if (
      !album.hasOwnProperty('name') ||
      !album.hasOwnProperty('year') ||
      !album.hasOwnProperty('artistId')
    ) {
      const error = `Error: Album does not contain required fields (name, year or artistId)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else {
      const createdAlbum = await this.albumsService.createAlbum(album);
      response
        .set({ 'Content-Type': 'application/json' })
        .status(HttpStatus.CREATED)
        .end(JSON.stringify(createdAlbum));
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteAlbum(@Param('id') id: string, @Res() response: Response) {
    const searchedAlbum = await this.albumsService.getAlbumById(id);

    if (!uuidValidate(id)) {
      const error = `Error: albumId is invalid (not uuid)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else if (!searchedAlbum) {
      const error = `Error: record with id === albumId doesn't exist`;
      response.status(HttpStatus.NOT_FOUND).end(error);
    } else {
      await this.albumsService.deleteAlbum(id);
      // await this.favoritesService.deleteAlbumByIdFromFavorites(id);
      // await this.tracksService.updateTracksAfterDeletionAlbum(id);

      response.status(HttpStatus.NO_CONTENT).end();
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateAlbum(
    @Param('id') id: string,
    @Body() album: UpdateAlbumDto,
    @Res() response: Response,
  ) {
    const searchedAlbum = await this.albumsService.getAlbumById(id);

    if (
      !uuidValidate(id) ||
      typeof album.year !== 'number' ||
      typeof album.name !== 'string'
    ) {
      const error = `Error: albumId is invalid (not uuid)`;
      response.status(HttpStatus.BAD_REQUEST).end(error);
    } else if (!searchedAlbum) {
      const error = `Error: record with id === albumId doesn't exist`;
      response.status(HttpStatus.NOT_FOUND).end(error);
    } else {
      const updatedAlbum = await this.albumsService.updateAlbum(id, album);
      response
        .set({ 'Content-Type': 'application/json' })
        .status(HttpStatus.OK)
        .end(JSON.stringify(updatedAlbum));
    }
  }
}
