import { APIRoute } from '../const';
import { adaptToClient } from '../services/adapter';
import { ThunkActionResult } from '../types/action';
import { OfferServerType } from '../types/types';
import { loadOffers } from './action';

export const fetchOfferAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferServerType[]>(APIRoute.Offers);
    const adaptedData = data.map(adaptToClient);

    dispatch(loadOffers(adaptedData));
  };
