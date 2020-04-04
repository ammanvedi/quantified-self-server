export type TidalAPIArtist = {
  "id": number,
  "name": string,
  "type": string
}

export type TidalAPIAlbum = {
  "id": number,
  "title": string,
  "cover": string,
}

export type TidalAPITrack = {
  "created": string,
  "item": {
    "id": number,
    "title": string,
    "duration": number,
    "replayGain": number, // float
    "peak": number, // float
    "allowStreaming": boolean,
    "streamReady": boolean,
    "streamStartDate": string,
    "premiumStreamingOnly": boolean,
    "trackNumber": number,
    "volumeNumber": number,
    "version": null,
    "popularity": number,
    "copyright": string,
    "url": string,
    "isrc": string,
    "editable": boolean,
    "explicit": boolean,
    "audioQuality": string,
    "audioModes": Array<string>,
    "artist": TidalAPIArtist,
    "artists": Array<TidalAPIArtist>,
    "album": TidalAPIAlbum
  }
}

export type TidalFavoriteTracksResponse = {
  limit: number,
  offset: number,
  totalNumberOfItems: number,
  items: Array<TidalAPITrack>
}

export type TidalLoginResponse = {
  userId: number,
  sessionId: string,
  countryCode: string,
}