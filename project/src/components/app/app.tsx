import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../pages/main-page/main-page';
import Login from '../pages/login-page/login-page';
import Favorites from '../pages/favorites-page/favorites-page';
import Property from '../pages/property-page/property-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';

type AppProps = {
  placeCardCount: number;
}

function App({placeCardCount}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={[AppRoute.Root, AppRoute.Main]}>
          <Main placeCardCount={placeCardCount} />
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.Favorites}
          render={() => (
            <Favorites />
          )}
          authorizationStatus={AuthorizationStatus.NoAuth}
        >
        </PrivateRoute>
        <Route exact path={AppRoute.Room}>
          <Property />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
