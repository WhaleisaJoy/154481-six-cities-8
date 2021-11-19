import { Link } from 'react-router-dom';
import PageHeader from '../../page-header/page-header';

function NotFoundPage():JSX.Element {
  return (
    <div className="page page--gray page--main">
      <PageHeader />

      <main className="page__main page__main--index">
        <div className="container">
          <h1>404 Page not found</h1>
          <Link className="header__nav-link" to="/">
            <span className="header__signout">Вернуться на главную страницу</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
