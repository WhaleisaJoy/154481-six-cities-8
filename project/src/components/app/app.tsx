import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../pages/main-page/main-page';
import Login from '../pages/login-page/login-page';
import Favorites from '../pages/favorites-page/favorites-page';
import Property from '../pages/property-page/property-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { CommentsType, OffersType } from '../../types/types';

type AppProps = {
  placeCardCount: number;
  offers: OffersType[];
  comments: CommentsType[];
}

function App({placeCardCount, offers, comments}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={[AppRoute.Root, AppRoute.Main]}>
          <Main placeCardCount={placeCardCount} offers={offers} />
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

export default App;
