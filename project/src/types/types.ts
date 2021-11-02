export type OffersType = {
  bedrooms: number,
    city: {
      location: {
        latitude: number,
        longitude: number,
        zoom: number,
      },
      name: string,
    },
    description: string,
    goods: string[],
    host: {
      avatarUrl: string,
      id: number,
      isPro: boolean,
      name: string,
    },
    id: string,
    images: string[],
    isFavorite: boolean,
    isPremium: boolean,
    location: {
      latitude: number,
      longitude: number,
      zoom: number,
    },
    maxAdults: number,
    previewImage: string,
    price: number,
    rating: number,
    title: string,
    type: string,
};

export type FavoritesLocationOffersType = [string, OffersType[]];

export type RatingSettingsType = {
  value: string,
  title: string,
};
