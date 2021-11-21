import { SendingCommentStatus } from '../../const';
import { CommentsType } from '../../types/comment';
import { OffersType } from '../../types/offer';
import { StateType } from '../../types/state';
import { getOffersByCity } from '../../utils';
import { NameSpace } from '../root-reducer';

export const getOffers = (state: StateType): OffersType[] => state[NameSpace.data].offers;

export const getOffersSortedByCity = (state: StateType): OffersType[] => {
  const offers = state[NameSpace.data].offers;
  const city = state[NameSpace.interface].city;

  return getOffersByCity(city, offers);
};

export const getCurrentOffer = (state: StateType): OffersType => state[NameSpace.data].currentOffer;

export const getOffersNearby = (state: StateType): OffersType[] => state[NameSpace.data].offersNearby;

export const getComments = (state: StateType): CommentsType[] => state[NameSpace.data].comments;

export const getDataLoadedStatus = (state: StateType): boolean => state[NameSpace.data].isDataLoaded;

export const getCurrentOfferLoadedStatus = (state: StateType): boolean => state[NameSpace.data].isCurrentOfferLoaded;

export const getSendingCommentStatus = (state: StateType): SendingCommentStatus => state[NameSpace.data].sendingCommentStatus;
