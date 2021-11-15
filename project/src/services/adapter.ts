import { OfferServerType, OffersType } from '../types/types';

export const adaptToClient = (offer: OfferServerType): OffersType => {
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
