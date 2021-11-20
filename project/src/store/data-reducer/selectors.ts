import { SendingCommentStatus } from '../../const';
import { CommentsType } from '../../types/comment';
import { OffersType } from '../../types/offer';
import { StateType } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getOffers = (state: StateType): OffersType[] => state[NameSpace.data].offers;

export const getCurrentOffer = (state: StateType): OffersType => state[NameSpace.data].currentOffer;

export const getOffersNearby = (state: StateType): OffersType[] => state[NameSpace.data].offersNearby;

export const getComments = (state: StateType): CommentsType[] => state[NameSpace.data].comments;

export const getDataLoadedStatus = (state: StateType): boolean => state[NameSpace.data].isDataLoaded;

export const getCurrentOfferLoadedStatus = (state: StateType): boolean => state[NameSpace.data].isCurrentOfferLoaded;

export const getSendingCommentStatus = (state: StateType): SendingCommentStatus => state[NameSpace.data].sendingCommentStatus;
