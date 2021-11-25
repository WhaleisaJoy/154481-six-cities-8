import { UserAuthData, UserAuthDataServer } from '../types/auth-data';
import { CommentsServerType, CommentsType } from '../types/comment';
import { OfferServerType, OffersType } from '../types/offer';

export const adaptOffersToClient = (offer: OfferServerType): OffersType => {
  const adaptedOffer = {
    ...offer,
    host: {
      ...offer.host,
      avatarUrl: offer.host['avatar_url'],
      isPro: offer.host['is_pro'],
    },
    isFavorite: offer['is_favorite'],
    isPremium: offer['is_premium'],
    maxAdults: offer['max_adults'],
    previewImage: offer['preview_image'],
  };

  delete adaptedOffer.host['avatar_url'];
  delete adaptedOffer.host['is_pro'];
  delete adaptedOffer['is_favorite'];
  delete adaptedOffer['is_premium'];
  delete adaptedOffer['max_adults'];
  delete adaptedOffer['preview_image'];

  return adaptedOffer as OffersType;
};

export const adaptCommentsToClient = (comment: CommentsServerType): CommentsType => {
  const adaptedComment = {
    ...comment,
    user: {
      ...comment.user,
      avatarUrl: comment.user['avatar_url'],
      isPro: comment.user['is_pro'],
    },
  };

  delete adaptedComment.user['avatar_url'];
  delete adaptedComment.user['is_pro'];

  return adaptedComment as CommentsType;
};

export const adaptUserAuthDataToClient = (user: UserAuthDataServer): UserAuthData => {
  const adaptedData = {
    ...user,
    avatarUrl: user['avatar_url'],
    isPro: user['is_pro'],
  };

  delete adaptedData['avatar_url'];
  delete adaptedData['is_pro'];

  return adaptedData as UserAuthData;
};
