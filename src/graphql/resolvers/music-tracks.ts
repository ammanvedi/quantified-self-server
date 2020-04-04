import { QueryResolvers } from '../../types/Schema'
import { ApolloContext } from '../../types/Apollo'

export const musicTracksResolver: QueryResolvers<
  ApolloContext
>['musicTracks'] = async (
  parent,
  args,
  { dataSource }
) => {
  return await dataSource.tidal.getFavoriteTracks(args.limit)
}
