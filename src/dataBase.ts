import { UserInterface } from './users/interfaces/user.interface';
import { TrackInterface } from './tracks/interfaces/track.interface';
import { ArtistInterface } from './artists/interfaces/artist.interface';
import { AlbumInterface } from './albums/interfaces/album.interface';
import { FavoriteInterface } from './favorites/interfaces/favorite.interface';

interface DataBaseInterface {
  users: Array<UserInterface>;
  tracks: Array<TrackInterface>;
  artists: Array<ArtistInterface>;
  albums: Array<AlbumInterface>;
  favorites: FavoriteInterface;
}

// export const dataBase: DataBaseInterface = {
//   users: [],
//   tracks: [],
//   artists: [],
//   albums: [],
//   favorites: {
//     artists: [],
//     albums: [],
//     tracks: [],
//   }
// };

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
    { name: 'LSP', grammy: false, id: '0bbc99a3-c8d8-48d2-bf9a-676b7334f3f5' },
    {
      name: 'Oxxxymiron',
      grammy: false,
      id: 'ea2de47a-dc28-4e2f-b464-4d8706fce7db',
    },
    {
      name: 'Грязь',
      grammy: false,
      id: '19398aff-6d13-4bea-9e38-5c2591477237',
    },
    {
      name: 'Pornofilmy',
      grammy: false,
      id: '26263a4a-0fb6-4e2c-b790-d17d12630623',
    },
    { name: 'ATL', grammy: false, id: 'a420135d-50dc-43ab-9eb8-8f625ed93483' },
  ],
  albums: [
    {
      name: 'Tragic City',
      year: 2017,
      artistId: '0bbc99a3-c8d8-48d2-bf9a-676b7334f3f5',
      id: 'dbebce85-acc3-425b-88dd-e697736f2387',
    },
    {
      name: 'Magic City',
      year: 2015,
      artistId: '0bbc99a3-c8d8-48d2-bf9a-676b7334f3f5',
      id: 'fa64512b-5d9f-4db7-908e-9e7c344baabc',
    },
    {
      name: 'Горгород',
      year: 2015,
      artistId: 'ea2de47a-dc28-4e2f-b464-4d8706fce7db',
      id: '2b470a56-f192-4992-af15-b9efb189dcb5',
    },
    {
      name: 'Это пройдёт',
      year: 2020,
      artistId: '26263a4a-0fb6-4e2c-b790-d17d12630623',
      id: '841b9406-7dd6-4423-ba9d-eb3d68f619a2',
    },
  ],
  favorites: {
    artists: [],
    albums: [],
    tracks: [],
  },
};
