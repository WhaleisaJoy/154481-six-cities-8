import { combineReducers } from 'redux';
import { dataReducer } from './data-reducer/data-reducer';
import { interfaceReducer } from './interface-reducer/interface-reducer';
import { userReducer } from './user-reducer/user-reducer';

export enum NameSpace {
  data = 'DATA',
  user = 'USER',
  interface = 'INTERFACE',
}

export const rootReducer = combineReducers({
  [NameSpace.data]: dataReducer,
  [NameSpace.user]: userReducer,
  [NameSpace.interface]: interfaceReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
