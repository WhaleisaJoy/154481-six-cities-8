import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, defaultUser } from '../../const';
import { UserReducerType } from '../../types/state';
import { dropCurrentUser, requireAuthorization, requireLogout, saveCurrentUser } from '../action';

const initialState: UserReducerType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  currentUser: defaultUser,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(saveCurrentUser, (state, action) => {
      state.currentUser = action.payload;
    })
    .addCase(dropCurrentUser, (state) => {
      state.currentUser = defaultUser;
    });
});

export {userReducer};
