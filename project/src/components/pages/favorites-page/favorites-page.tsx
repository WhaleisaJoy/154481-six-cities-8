import classNames from 'classnames';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffersFavoritesAction } from '../../../store/api-action';
import { getOffersFavorite } from '../../../store/data-reducer/selectors';
import FavoritesListEmpty from '../../favorites-list-empty/favorites-list-empty';
import FavoritesList from '../../favorites-list/favorites-list';
import PageFooter from '../../page-footer/page-footer';
import PageHeader from '../../page-header/page-header';

function Favorites(): JSX.Element {
  const favoritesOffers = useSelector(getOffersFavorite);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOffersFavoritesAction());
  }, [dispatch]);

  const isEmpty = favoritesOffers.length === 0;

  const favoritesList = isEmpty
    ? <FavoritesListEmpty />
    : <FavoritesList offers={favoritesOffers} />;

  return (
    <div className="page">
      <PageHeader />

      <main
        className={classNames(
          'page__main page__main--favorites',
          {
            'page__main--favorites-empty': isEmpty,
          },
        )}
      >
        <div className="page__favorites-container container">
          {favoritesList}
        </div>
      </main>

      <PageFooter />
    </div>
  );
}

export default Favorites;
