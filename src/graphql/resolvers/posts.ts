import { QueryResolvers } from '../../types/Schema'
import { ApolloContext } from '../../types/Apollo'

export const postsResolver: QueryResolvers<ApolloContext>['posts'] = async (
  parent,
  args,
  { dataSource },
  info
) => {
  return await dataSource.medium.getPosts(args.limit);
}