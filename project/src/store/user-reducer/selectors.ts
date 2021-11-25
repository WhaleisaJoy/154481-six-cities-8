import { AuthorizationStatus } from '../../const';
import { StateType } from '../../types/state';
import { NameSpace } from '../root-reducer';

type EmailType = string;

export const getAuthorizationStatus = (state: StateType): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getUserEmail = (state: StateType): EmailType => state[NameSpace.User].currentUser.email;
