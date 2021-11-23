import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-reducer/selectors';
import NavLogin from '../nav-login/nav-login';
import NavLogout from '../nav-logout/nav-logout';

type PageHeaderType = {
  isNav?: boolean;
}

function PageHeader({isNav = true}: PageHeaderType): JSX.Element {
  const authStatus = useSelector(getAuthorizationStatus);

  const nav = authStatus === AuthorizationStatus.NoAuth
    ? <NavLogin />
    : <NavLogout />;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>

          {isNav && nav}

        </div>
      </div>
    </header>
  );
}

export default PageHeader;
