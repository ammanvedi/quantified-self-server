import { BlogPost } from '../../types/Schema'
import RSSParser  from 'rss-parser';
import { MediumRSSFeedResponse } from '../../types/Medium'
import { parse } from 'graphql'
import { mediumBlogPostToGQLType } from './helpers'

export class MediumDataSource {

  private readonly parser: RSSParser = new RSSParser();

  constructor(private readonly rssEndpoint: string) {}

  public async getPosts(limit: number): Promise<Array<BlogPost>> {
    const parseResult = await this.parser.parseURL(this.rssEndpoint) as MediumRSSFeedResponse;
    return parseResult.items.map(mediumBlogPostToGQLType).slice(0, limit)
  }
}