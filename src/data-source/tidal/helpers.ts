import { TidalAPIAlbum, TidalAPIArtist, TidalAPITrack, TidalFavoriteTracksResponse } from '../../types/Tidal'
import { ArtistType, MusicAlbum, MusicArtist, MusicCoverUrls, MusicTrack } from '../../types/Schema'

const DEVICE_TYPE = 'BROWSER'

export const buildLoginUrl = (endpoint: string, webToken: string) =>
  `${endpoint}/login/username?token=${webToken}&deviceType=${DEVICE_TYPE}`

export const buildFavoritesUrl = (
  endpoint: string,
  webToken: string,
  offset: number,
  limit: number,
  sessionId: string,
  userId: number
) =>
  `${endpoint}/users/${userId.toString()}/favorites/tracks?token=${webToken}&deviceType=${DEVICE_TYPE}&offset=${offset.toString()}&limit=${limit.toString()}&sessionId=${sessionId}&order=DATE&orderDirection=DESC&locale=en_US&countryCode=GB`

export const buildAlbumArtUrls = (uuid: string): MusicCoverUrls => {
  const url = `https://resources.tidal.com/images/${uuid.replace(/-/g, '/')}`;
  return {
    small: `${url}/160x160.jpg`,
    medium: `${url}/320x320.jpg`,
    large: `${url}/640x640.jpg`,
    extraLarge: `${url}/1280x1280.jpg`,
  }
}

export const tidalAPIArtistToGQLType = (
  artist: TidalAPIArtist
): MusicArtist => ({
  name: artist.name,
  type: artist.type as ArtistType,
})

export const tidalAPIAlbumToGQLType = (
  album: TidalAPIAlbum
): MusicAlbum => ({
  coverUrls: buildAlbumArtUrls(album.cover),
  title: album.title,
})

export const tidalAPITrackToGQLType = (
  { item: track }: TidalAPITrack
): MusicTrack => ({
  title: track.title,
  duration: track.duration,
  url: track.url,
  explicit: track.explicit,
  artist: tidalAPIArtistToGQLType(track.artist),
  artists: track.artists.map(tidalAPIArtistToGQLType),
  album: tidalAPIAlbumToGQLType(track.album),
})