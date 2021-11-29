import { address, datatype, date, helpers, image, internet, lorem, name } from 'faker';
import { Cities } from '../database';
import { AuthData, UserAuthData, UserAuthDataServer } from '../types/auth-data';
import { CommentsDataType, CommentsServerType, CommentsType } from '../types/comment';
import { LocationType, OfferServerType, OffersType } from '../types/offer';

export const makeFakeOffer = (): OffersType => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: +address.latitude(),
      longitude: +address.longitude(),
      zoom: datatype.number(),
    },
    name: helpers.randomize(Object.values(Cities)),
  },
  description: lorem.sentences(),
  goods: [''],
  host: {
    avatarUrl: image.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.number(),
  images: [image.image()],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: +address.latitude(),
    longitude: +address.longitude(),
    zoom: datatype.number(),
  },
  maxAdults: datatype.number(),
  previewImage: image.image(),
  price: datatype.number(),
  rating: datatype.number(5),
  title: '',
  type: '',
} as OffersType);

export const makeFakeServerOffer = (): OfferServerType => ({
  bedrooms: datatype.number(),
  city: {
    location: {
      latitude: +address.latitude(),
      longitude: +address.longitude(),
      zoom: datatype.number(),
    },
    name: helpers.randomize(Object.values(Cities)),
  },
  description: lorem.sentences(),
  goods: [''],
  host: {
    'avatar_url': image.avatar(),
    id: datatype.number(),
    'is_pro': datatype.boolean(),
    name: '',
  },
  id: datatype.number(),
  images: [image.image()],
  'is_favorite': datatype.boolean(),
  'is_premium': datatype.boolean(),
  location: {
    latitude: +address.latitude(),
    longitude: +address.longitude(),
    zoom: datatype.number(),
  },
  'max_adults': datatype.number(),
  'preview_image': image.image(),
  price: datatype.number(),
  rating: datatype.number(5),
  title: '',
  type: '',
} as OfferServerType);

export const makeFakeComment = (): CommentsType => ({
  comment: lorem.text(),
  date: date.recent().toISOString(),
  id: datatype.number(),
  rating: datatype.number(5),
  user: {
    avatarUrl: image.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
} as CommentsType);

export const makeFakeServerComment = (): CommentsServerType => ({
  comment: lorem.text(),
  date: date.recent().toISOString(),
  id: datatype.number(),
  rating: datatype.number(5),
  user: {
    'avatar_url': image.avatar(),
    id: datatype.number(),
    'is_pro': datatype.boolean(),
    name: name.firstName(),
  },
} as CommentsServerType);

export const makeFakeDataComment = (): CommentsDataType => ({
  id: datatype.number(),
  comment: lorem.text(),
  rating: datatype.number(5),
} as CommentsDataType);

export const makeFakeUser = (): UserAuthData => ({
  avatarUrl: image.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: lorem.word(),
} as UserAuthData);

export const makeFakeServerUser = (): UserAuthDataServer => ({
  'avatar_url': image.avatar(),
  email: internet.email(),
  id: datatype.number(),
  'is_pro': datatype.boolean(),
  name: name.firstName(),
  token: lorem.word(),
} as UserAuthDataServer);

export const makeFakeAuthData = (): AuthData => ({
  login: internet.email(),
  password: lorem.word(),
} as AuthData);

export const makeFakeLocation = ():LocationType => ({
  latitude: +address.latitude(),
  longitude: +address.longitude(),
  zoom: datatype.number(),
} as LocationType);
