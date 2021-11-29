import { AuthorizationStatus, defaultUser } from '../../const';
import { UserReducerType } from '../../types/state';
import { makeFakeUser } from '../../utils/mock';
import { dropCurrentUser, requireAuthorization, requireLogout, saveCurrentUser } from '../action';
import { userReducer } from './user-reducer';

const initialState: UserReducerType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  currentUser: defaultUser,
};
const user = makeFakeUser();

describe('Reducer: userReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(userReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.NoAuth,
    };
    expect(userReducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({
        ...state,
        authorizationStatus: AuthorizationStatus.Auth,
      });
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.Auth,
    };
    expect(userReducer(state, requireLogout()))
      .toEqual({
        ...state,
        authorizationStatus: AuthorizationStatus.NoAuth,
      });
  });

  it('should update currentUser to specific user', () => {
    const state = {...initialState};
    expect(userReducer(state, saveCurrentUser(user)))
      .toEqual({
        ...state,
        currentUser: user,
      });
  });

  it('should update currentUser to defaultUser', () => {
    const state = {
      ...initialState,
      currentUser: user,
    };
    expect(userReducer(state, dropCurrentUser()))
      .toEqual({
        ...state,
        currentUser: defaultUser,
      });
  });
});
