import { ArtistInterface } from '../../artists/interfaces/artist.interface';
import { AlbumInterface } from '../../albums/interfaces/album.interface';
import { TrackInterface } from '../../tracks/interfaces/track.interface';

export interface AllFavoritesResponseDto {
  artists: Array<ArtistInterface>;
  albums: Array<AlbumInterface>;
  tracks: Array<TrackInterface>;
}
