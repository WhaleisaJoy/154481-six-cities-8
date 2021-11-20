import { connect, ConnectedProps } from 'react-redux';
import { getOffers } from '../../../store/data-reducer/selectors';
import { StateType } from '../../../types/state';
import FavoritesLocation from '../../favorites-location/favorites-location';
import PageHeader from '../../page-header/page-header';

const mapStateToProps = (state: StateType) => ({
  offers: getOffers(state),
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Favorites({offers}: PropsFromRedux): JSX.Element {
  const favoritesOffers = offers.filter((offer) => offer.isFavorite);

  const cityNames = favoritesOffers.map((offer) => offer.city.name);
  const cityNamesUnique = new Set(cityNames);

  return (
    <div className="page">
      <PageHeader />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                Array.from(cityNamesUnique).map((city) => <FavoritesLocation city={city} offers={favoritesOffers} key={city} />)
              }
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export {Favorites};
export default connector(Favorites);
