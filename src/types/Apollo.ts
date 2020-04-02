import { StravaDataSource } from '../data-source/strava/Strava'

export type ApolloContext = {
  dataSource: {
    strava: StravaDataSource,
  }
}