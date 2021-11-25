import { StateType } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getCity = (state: StateType): string => state[NameSpace.Interface].city;

export const getCurrentSort = (state: StateType): string => state[NameSpace.Interface].currentSort;
