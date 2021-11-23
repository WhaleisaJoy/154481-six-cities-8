import { useEffect } from 'react';
import PageHeader from '../../page-header/page-header';
import CitiesList from '../../cities-list/cities-list';
import { useDispatch, useSelector } from 'react-redux';
import Places from '../../places/places';
import PlacesEmpty from '../../places-empty/places-empty';
import classNames from 'classnames';
import { fetchOfferAction } from '../../../store/api-action';
import { getDataLoadedStatus, getOffersSortedByCity } from '../../../store/data-reducer/selectors';
import { getCity } from '../../../store/interface-reducer/selectors';
import LoadWrapper from '../../load-wrapper/load-wrapper';

function Main():JSX.Element {
  const offersByCity = useSelector(getOffersSortedByCity);
  const isDataLoaded = useSelector(getDataLoadedStatus);
  const city = useSelector(getCity);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOfferAction());
  }, [dispatch]);

  const isEmpty = offersByCity.length === 0;

  const places = isEmpty
    ? <PlacesEmpty />
    : <Places offers={offersByCity} city={city} />;

  return (
    <LoadWrapper isLoad={isDataLoaded}>
      <div className={classNames(
        'page page--gray page--main',
        {
          'page__main--index-empty': isEmpty,
        },
      )}
      >
        <PageHeader />

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <CitiesList city={city} />
          <div className="cities">
            {places}
          </div>
        </main>
      </div>
    </LoadWrapper>
  );
}

export default Main;
