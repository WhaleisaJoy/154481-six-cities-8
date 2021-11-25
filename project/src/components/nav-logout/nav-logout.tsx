import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-action';
import { getUserEmail } from '../../store/user-reducer/selectors';

function NavLogout(): JSX.Element {
  const email = useSelector(getUserEmail);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to="/favorites">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{email}</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" to="/">
            <span
              className="header__signout"
              onClick={handleLogout}
            >
              Sign out
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavLogout;
