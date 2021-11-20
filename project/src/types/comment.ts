export type CommentsType = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    avatarUrl: string,
    id: number,
    isPro: boolean,
    name: string,
    },
};

export type CommentsServerType = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    'avatar_url': string,
    id: number,
    'is_pro': boolean,
    name: string,
    },
};

export type CommentsDataType = {
  id: number,
  comment: string,
  rating: number,
};
