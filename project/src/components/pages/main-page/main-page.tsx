import { useState } from 'react';
import PageHeader from '../../page-header/page-header';
import CitiesList from '../../cities-list/cities-list';
import { StateType } from '../../../types/state';
import { connect, ConnectedProps } from 'react-redux';
import { getOffersByCity } from '../../../utils';
import Places from '../../places/places';
import PlacesEmpty from '../../places-empty/places-empty';
import classNames from 'classnames';

const mapStateToProps = ({city, offers}: StateType) => ({
  city,
  offers,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Main({offers, city}: PropsFromRedux):JSX.Element {
  const [activePlaceCard, setActivePlaceCard] = useState<number | null>(null);

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
  );
}

export {Main};
export default connector(Main);
