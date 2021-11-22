import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffersFavoritesAction } from '../../../store/api-action';
import { getOffersFavorite } from '../../../store/data-reducer/selectors';
import FavoritesLocation from '../../favorites-location/favorites-location';
import PageHeader from '../../page-header/page-header';

function Favorites(): JSX.Element {
  const favoritesOffers = useSelector(getOffersFavorite);

  const dispatch = useDispatch();
  useEffect(() => {
    const onOffersFavoriteFetch = () => dispatch(fetchOffersFavoritesAction());
    onOffersFavoriteFetch();
  });

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

export default Favorites;
