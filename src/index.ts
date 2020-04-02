import { importSchema } from 'graphql-import'
import { config } from 'dotenv'
import { ProcessEnvars } from './types/Environment'
import { ApolloServer } from 'apollo-server'
import { Resolvers } from './types/Schema'
import { ApolloContext } from './types/Apollo'
import { runsResolver } from './graphql/resolvers/runs'
import { StravaDataSource } from './data-source/strava/Strava'
import { logSucc } from './lib/logging'

config()

const envars: ProcessEnvars = {
  STRAVA_API_ENDPOINT: process.env.STRAVA_API_ENDPOINT,
  STRAVA_CLIENT_ID: process.env.STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET: process.env.STRAVA_CLIENT_SECRET,
  STRAVA_REFRESH_TOKEN: process.env.STRAVA_REFRESH_TOKEN,
  PORT: parseInt(process.env.PORT),
}

const typeDefs = importSchema('graphql/schema.graphql')

const resolvers: Resolvers<ApolloContext> = {
  Query: {
    runs: runsResolver,
  },
}

const stravaDataSource = new StravaDataSource(
  envars.STRAVA_API_ENDPOINT,
  envars.STRAVA_REFRESH_TOKEN,
  envars.STRAVA_CLIENT_ID,
  envars.STRAVA_CLIENT_SECRET
)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (): ApolloContext => ({
    dataSource: {
      strava: stravaDataSource,
    },
  }),
})

server.listen(envars.PORT).then(({ url }) => {
  logSucc(`Quantified Self Server. Live at ${url}`)
})
