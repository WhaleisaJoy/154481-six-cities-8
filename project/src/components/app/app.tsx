import { Switch, Route } from 'react-router-dom';
import Main from '../pages/main-page/main-page';
import Login from '../pages/login-page/login-page';
import Favorites from '../pages/favorites-page/favorites-page';
import Property from '../pages/property-page/property-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../../const';
import { useSelector } from 'react-redux';
import LoadingPage from '../pages/loading-page/loading-page';
import { isCheckedAuth } from '../../utils';
import { getAuthorizationStatus } from '../../store/user-reducer/selectors';

function App(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if(isCheckedAuth(authorizationStatus)) {
    return <LoadingPage />;
  }

  return (
    <Switch>
      <Route exact path={[AppRoute.Root, AppRoute.Main]}>
        <Main />
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
      >
      </PrivateRoute>
      <Route exact path={AppRoute.Room}>
        <Property />
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}

export default App;
