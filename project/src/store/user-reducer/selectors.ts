import { AuthorizationStatus } from '../../const';
import { StateType } from '../../types/state';
import { NameSpace } from '../root-reducer';

type LoginType = string;

export const getAuthorizationStatus = (state: StateType): AuthorizationStatus => state[NameSpace.user].authorizationStatus;

export const getLogin = (state: StateType): LoginType => state[NameSpace.user].login;
