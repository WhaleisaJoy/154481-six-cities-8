import { defaultOffer, SendingCommentStatus } from '../../const';
import { Actions, ActionType } from '../../types/action';
import { DataReducerType } from '../../types/state';

const initialState: DataReducerType = {
  offers: [],
  currentOffer: defaultOffer,
  offersNearby: [],
  comments: [],
  isDataLoaded: false,
  isCurrentOfferLoaded: false,
  sendingCommentStatus: SendingCommentStatus.NotSent,
};

const dataReducer = (state = initialState, action: Actions): DataReducerType => {
  switch (action.type) {
    case ActionType.LoadOffers:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
      };
    case ActionType.LoadCurrentOffer:
      return {
        ...state,
        currentOffer: action.payload,
        isCurrentOfferLoaded: true,
      };
    case ActionType.LoadOffersNearby:
      return {...state, offersNearby: action.payload};
    case ActionType.LoadComments:
      return {...state, comments: action.payload};
    case ActionType.ChangeSendingCommentStatus:
      return {...state, sendingCommentStatus: action.payload};
    default:
      return state;
  }
};

export {dataReducer};
