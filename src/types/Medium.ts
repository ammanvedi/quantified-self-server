export type MediumRSSBlogPost = {
  creator: string,
  title: string,
  link: string,
  pubDate: string,
  'content:encoded': string,
  categories: Array<string>,
  isoDate: string,
}

export type MediumRSSFeedResponse = {
  items: Array<MediumRSSBlogPost>
}