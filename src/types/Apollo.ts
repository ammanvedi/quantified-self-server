import { StravaDataSource } from '../data-source/strava/Strava'
import { TidalDataSource } from '../data-source/tidal/Tidal'

export type ApolloContext = {
  dataSource: {
    strava: StravaDataSource,
    tidal: TidalDataSource
  }
}