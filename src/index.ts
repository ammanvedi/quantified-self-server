import { importSchema } from 'graphql-import'
import { config } from 'dotenv'
import { ProcessEnvars } from './types/Environment'
import { ApolloServer } from 'apollo-server'
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { Resolvers } from './types/Schema'
import { ApolloContext } from './types/Apollo'
import { runsResolver } from './graphql/resolvers/runs'
import { StravaDataSource } from './data-source/strava/Strava'
import { logSucc } from './lib/logging'
import { TidalDataSource } from './data-source/tidal/Tidal'
import { musicTracksResolver } from './graphql/resolvers/music-tracks'
import { MediumDataSource } from './data-source/medium/Medium'
import { postsResolver } from './graphql/resolvers/posts'

config()

const envars: ProcessEnvars = {
  PORT: parseInt(process.env.PORT),
  STRAVA_API_ENDPOINT: process.env.STRAVA_API_ENDPOINT,
  STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET,
  STRAVA_REFRESH_TOKEN: process.env.STRAVA_REFRESH_TOKEN,
  TIDAL_API_ENDPOINT: process.env.TIDAL_API_ENDPOINT,
  TIDAL_PASSWORD: process.env.TIDAL_PASSWORD,
  TIDAL_USERNAME: process.env.TIDAL_USERNAME,
  TIDAL_WEB_TOKEN: process.env.TIDAL_WEB_TOKEN,
  MEDIUM_RSS_ENDPOINT: process.env.MEDIUM_RSS_ENDPOINT,
}

const typeDefs = importSchema('graphql/schema.graphql')

const resolvers: Resolvers<ApolloContext> = {
  Query: {
    runs: runsResolver,
    musicTracks: musicTracksResolver,
    posts: postsResolver
  },
}

const mediumDataSource = new MediumDataSource(
  envars.MEDIUM_RSS_ENDPOINT
)

const stravaDataSource = new StravaDataSource(
  envars.STRAVA_API_ENDPOINT,
  envars.STRAVA_REFRESH_TOKEN,
  envars.STRAVA_CLIENT_ID,
  envars.STRAVA_CLIENT_SECRET
)

const tidalDataSource = new TidalDataSource(
  envars.TIDAL_API_ENDPOINT,
  envars.TIDAL_USERNAME,
  envars.TIDAL_PASSWORD,
  envars.TIDAL_WEB_TOKEN
)


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [responseCachePlugin()],
  cacheControl: {
    defaultMaxAge: 60 * 30
  },
  context: (): ApolloContext => ({
    dataSource: {
      strava: stravaDataSource,
      tidal: tidalDataSource,
      medium: mediumDataSource,
    },
  }),
})

server.listen(envars.PORT).then(({ url }) => {
  logSucc(`Quantified Self Live at ${url}`)
})
