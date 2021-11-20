import { connect, ConnectedProps } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { RouteProps } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-reducer/selectors';
import { StateType } from '../../types/state';

type PrivateRouteProps = RouteProps & {
  render: () => JSX.Element;
  authorizationStatus: AuthorizationStatus;
}

const mapStateToProps = (state: StateType) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type connectedComponentProps = PropsFromRedux & PrivateRouteProps;

function PrivateRoute(props: connectedComponentProps):JSX.Element {
  const {exact, path, render, authorizationStatus} = props;

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.Auth
          ? render()
          : <Redirect to={AppRoute.Login} />
      )}
    />
  );
}

export {PrivateRoute};
export default connector(PrivateRoute);
