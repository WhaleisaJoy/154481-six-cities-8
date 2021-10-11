import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../pages/main/main';
import Login from '../pages/login/login';
import Favorites from '../pages/favorites/favorites';
import Property from '../pages/property/property';
import NotFoundPage from '../pages/not-found-page/not-found-page';
import { AppRoute } from '../../const';

type AppProps = {
  placeCardCount: number;
}

function App({placeCardCount}: AppProps): JSX.Element {
  // return (
  //   <Main placeCardCount={placeCardCount} />
  // );

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Main}>
          <Main placeCardCount={placeCardCount} />
        </Route>
        <Route exact path={AppRoute.Login}>
          <Login />
        </Route>
        <Route exact path={AppRoute.Favorites}>
          <Favorites />
        </Route>
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
