import { types } from 'features/feed';

export type Article = types.Article;

export type ArticleResponse = Readonly<{
  article: types.Article;
}>;

export type PageGateType = Readonly<{
  params: any;
}>;

export type Comment = Readonly<{
  author: types.Author;
  body: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}>;

export type getCommentsFxDone = Readonly<{
  comments: readonly Comment[];
}>;
