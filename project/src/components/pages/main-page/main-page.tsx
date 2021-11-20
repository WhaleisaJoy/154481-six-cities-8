import { useEffect, useState } from 'react';
import PageHeader from '../../page-header/page-header';
import CitiesList from '../../cities-list/cities-list';
import { useDispatch, useSelector } from 'react-redux';
import { getOffersByCity } from '../../../utils';
import Places from '../../places/places';
import PlacesEmpty from '../../places-empty/places-empty';
import classNames from 'classnames';
import { fetchOfferAction } from '../../../store/api-action';
import { getDataLoadedStatus, getOffers } from '../../../store/data-reducer/selectors';
import { getCity } from '../../../store/interface-reducer/selectors';
import LoadWrapper from '../../load-wrapper/load-wrapper';

function Main():JSX.Element {
  const offers = useSelector(getOffers);
  const isDataLoaded = useSelector(getDataLoadedStatus);
  const city = useSelector(getCity);

  const dispatch = useDispatch();


  const [activePlaceCard, setActivePlaceCard] = useState<number | null>(null);

  useEffect(() => {
    const onDataFetch = () => {
      dispatch(fetchOfferAction());
    };

    onDataFetch();
  }, [dispatch]);

  function handleActivePlaceCardMouseEnter (card: number) {
    setActivePlaceCard(card);
  }

  const offersByCity = getOffersByCity(city, offers);

  const isEmpty = offersByCity.length === 0;

  const mainClassName = classNames(
    'page page--gray page--main',
    {
      'page__main--index-empty': isEmpty,
    },
  );

  const places = isEmpty
    ? <PlacesEmpty />
    : <Places offers={offersByCity} city={city} activePlaceCard={activePlaceCard} onActivePlaceCardMouseEnter={handleActivePlaceCardMouseEnter} />;

  return (
    <LoadWrapper isLoad={isDataLoaded}>
      <div className={mainClassName}>
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
