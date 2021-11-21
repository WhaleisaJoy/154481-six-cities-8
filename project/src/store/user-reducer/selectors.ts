import { AuthorizationStatus } from '../../const';
import { StateType } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getAuthorizationStatus = (state: StateType): AuthorizationStatus => state[NameSpace.user].authorizationStatus;
