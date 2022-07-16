import { UserInterface } from './users/interfaces/user.interface';
import { TrackInterface } from './tracks/interfaces/track.interface';
import { ArtistInterface } from './artists/interfaces/artist.interface';

interface DataBaseInterface {
  users: Array<UserInterface>;
  tracks: Array<TrackInterface>;
  artists: Array<ArtistInterface>;
}

export const dataBase: DataBaseInterface = {
  users: [],
  tracks: [
    {
      name: 'Ocean Drive',
      artistId: null,
      albumId: null,
      duration: 1200,
      id: '50363d0a-aedb-46ab-be50-92ae024cd91a',
    },
    {
      name: 'Colors',
      artistId: null,
      albumId: null,
      duration: 1200,
      id: 'a0ca3026-ff27-474e-98c7-dbc71874a72b',
    },
    {
      name: 'Beggin',
      artistId: null,
      albumId: null,
      duration: 1200,
      id: '49276ca8-2c41-4c26-8c60-fe6fab3f5968',
    },
    {
      name: 'High Hopes',
      artistId: null,
      albumId: null,
      duration: 2400,
      id: 'b1aee7e6-97f4-4ec6-8a7b-5df758d34642',
    },
  ],
  artists: [

  ]
};
