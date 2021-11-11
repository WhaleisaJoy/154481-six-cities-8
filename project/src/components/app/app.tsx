import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../pages/main-page/main-page';
import Login from '../pages/login-page/login-page';
import Favorites from '../pages/favorites-page/favorites-page';
import Property from '../pages/property-page/property-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { CommentsType, OffersType } from '../../types/types';
import { StateType } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'react';
import { Actions } from '../../types/action';
import { getOffers } from '../../store/actions';
import { offersData } from '../../mock/offers';

type AppProps = {
  comments: CommentsType[];
}

const mapStateToProps = ({offers}: StateType) => ({
  offers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onGetOffers(offers: OffersType[]) {
    dispatch(getOffers(offers));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = AppProps & PropsFromRedux;

function App({offers, comments, onGetOffers}: ConnectedComponentProps): JSX.Element {
  onGetOffers(offersData);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={[AppRoute.Root, AppRoute.Main]}>
          <Main offers={offers} />
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => (
            <Favorites offers={offers} />
          )}
          authorizationStatus={AuthorizationStatus.Auth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Room}>
          <Property offers={offers} comments={comments} />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export {App};
export default connector(App);
