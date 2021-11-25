import { MAX_REVIEWS_LENGTH, SendingCommentStatus } from '../../const';
import { CommentsType } from '../../types/comment';
import { OffersType } from '../../types/offer';
import { StateType } from '../../types/state';
import { getOffersByCity, sortCommentsByDate } from '../../utils';
import { NameSpace } from '../root-reducer';

export const getOffersSortedByCity = (state: StateType): OffersType[] => {
  const offers = state[NameSpace.Data].offers;
  const city = state[NameSpace.Interface].city;

  return getOffersByCity(city, offers);
};

export const getCurrentOffer = (state: StateType): OffersType => state[NameSpace.Data].currentOffer;

export const getOffersNearby = (state: StateType): OffersType[] => state[NameSpace.Data].offersNearby;

export const getOffersFavorite = (state: StateType): OffersType[] => state[NameSpace.Data].offersFavorite;

export const getComments = (state: StateType): CommentsType[] => {
  const comments = [...state[NameSpace.Data].comments].sort(sortCommentsByDate);
  return comments.slice(0, MAX_REVIEWS_LENGTH);
};

export const getDataLoadedStatus = (state: StateType): boolean => state[NameSpace.Data].isDataLoaded;

export const getCurrentOfferLoadedStatus = (state: StateType): boolean => state[NameSpace.Data].isCurrentOfferLoaded;

export const getSendingCommentStatus = (state: StateType): SendingCommentStatus => state[NameSpace.Data].sendingCommentStatus;
