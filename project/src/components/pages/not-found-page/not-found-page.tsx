import PageHeader from '../../page-header/page-header';

function NotFoundPage():JSX.Element {
  return (
    <div className="page page--gray page--main">
      <PageHeader />

      <main className="page__main page__main--index">
        <div className="container">
          <h1>404 Page not found</h1>
          <a className="header__nav-link" href="/">
            <span className="header__signout">Вернуться на главную страницу</span>
          </a>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
