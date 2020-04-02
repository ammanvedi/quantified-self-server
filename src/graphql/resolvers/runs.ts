import { QueryResolvers } from '../../types/Schema'
import { ApolloContext } from '../../types/Apollo'

export const runsResolver: QueryResolvers<ApolloContext>['runs'] = async (
  parent,
  args,
  { dataSource },
  info
) => {
  return dataSource.strava.getActivities(args.limit);
}
