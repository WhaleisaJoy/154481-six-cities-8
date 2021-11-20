import { CommentsServerType, CommentsType } from '../types/comment';
import { OfferServerType, OffersType } from '../types/offer';

export const adaptOffersToClient = (offer: OfferServerType): OffersType => {
  const adaptedOffer = Object.assign(
    {},
    offer,
    {
      host: {
        ...offer.host,
        avatarUrl: offer.host['avatar_url'],
        isPro: offer.host['is_pro'],
      },
      isFavorite: offer['is_favorite'],
      isPremium: offer['is_premium'],
      maxAdults: offer['max_adults'],
      previewImage: offer['preview_image'],
    },
  );

  // delete adaptedOffer['preview_image'];

  return adaptedOffer;
};

export const adaptCommentsToClient = (comment: CommentsServerType): CommentsType => {
  const adaptedComment = Object.assign(
    {},
    comment,
    {
      // date: new Date(comment['date']),
      user: {
        ...comment.user,
        avatarUrl: comment.user['avatar_url'],
        isPro: comment.user['is_pro'],
      },
    },
  );

  return adaptedComment;
};

