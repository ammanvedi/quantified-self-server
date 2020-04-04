import { StravaDataSource } from '../data-source/strava/Strava'
import { TidalDataSource } from '../data-source/tidal/Tidal'
import { MediumDataSource } from '../data-source/medium/Medium'

export type ApolloContext = {
  dataSource: {
    strava: StravaDataSource,
    tidal: TidalDataSource,
    medium: MediumDataSource
  }
}