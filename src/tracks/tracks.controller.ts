import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './tracks.service';
import { TrackInterface } from './interfaces/track.interface';

@Controller('tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async getAllTracks(): Promise<Array<TrackInterface>> {
    return await this.tracksService.getAllTracks();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string): Promise<TrackInterface> {
    return await this.tracksService.getTrackById(id);
  }

  @Post()
  async createTrack(@Body() track: CreateTrackDto): Promise<TrackInterface> {
    return await this.tracksService.createTrack(track);
  }

  @Delete(':id')
  async deleteTrackById(@Param('id') id: string) {
    return await this.tracksService.deleteTrackById(id);
  }

  @Put(':id')
  async updateTrack(@Param('id') id: string, @Body() track: CreateTrackDto) {
    return await this.tracksService.updateTrack(id, track);
  }
}
