import { combineReducers } from 'redux';
import { dataReducer } from './data-reducer/data-reducer';
import { interfaceReducer } from './interface-reducer/interface-reducer';
import { userReducer } from './user-reducer/user-reducer';

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  Interface = 'INTERFACE',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataReducer,
  [NameSpace.User]: userReducer,
  [NameSpace.Interface]: interfaceReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
