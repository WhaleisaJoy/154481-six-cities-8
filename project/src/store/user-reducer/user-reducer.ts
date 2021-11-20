import { AuthorizationStatus } from '../../const';
import { Actions, ActionType } from '../../types/action';
import { UserReducerType } from '../../types/state';

const initialState: UserReducerType = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

const userReducer = (state = initialState, action: Actions): UserReducerType => {
  switch (action.type) {
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NoAuth};
    default:
      return state;
  }
};

export {userReducer};
