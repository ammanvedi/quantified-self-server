import { MediumRSSBlogPost } from '../../types/Medium'
import sanitize from 'sanitize-html'
import { BlogPost } from '../../types/Schema'

const PREVIEW_LENGTH = 150;

export const mediumBlogPostToGQLType = (post: MediumRSSBlogPost): BlogPost => ({
  categories: post.categories,
  contentHTML: post['content:encoded'],
  publishedDate: post.isoDate,
  title: post.title,
  url: post.link,
  contentPreview: sanitize(post['content:encoded'], {
    allowedTags: [],
    allowedAttributes: {}
  }).slice(0, PREVIEW_LENGTH)
})