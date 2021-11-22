import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { requireLogout } from '../../store/action';
import { getLogin } from '../../store/user-reducer/selectors';

function NavLogout(): JSX.Element {
  const login = useSelector(getLogin);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(requireLogout());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to="/favorites">
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{login}</span>
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
