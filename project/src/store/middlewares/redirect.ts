import { Middleware } from 'redux';
import browserHistory from '../../browser-history';
import { ActionType } from '../../types/action';
import { StateType } from '../../types/state';

export const redirect: Middleware<unknown, StateType> =
  (_store) =>
    (next) =>
      (action) => {
        if(action.type === ActionType.RedirectToRoute) {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
