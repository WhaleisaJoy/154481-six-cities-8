import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../pages/main-page/main-page';
import Login from '../pages/login-page/login-page';
import Favorites from '../pages/favorites-page/favorites-page';
import Property from '../pages/property-page/property-page';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { AppRoute, AuthorizationStatus } from '../../const';
import { StateType } from '../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import LoadingPage from '../pages/loading-page/loading-page';

const mapStateToProps = ({isDataLoaded}: StateType) => ({
  isDataLoaded,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App({isDataLoaded}: PropsFromRedux): JSX.Element {
  if(!isDataLoaded) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
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
          authorizationStatus={AuthorizationStatus.Auth}
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

export {App};
export default connector(App);
