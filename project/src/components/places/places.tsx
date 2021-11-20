import { useSelector } from 'react-redux';
import { cardType } from '../../const';
import { getCurrentSort } from '../../store/interface-reducer/selectors';
import { OffersType } from '../../types/offer';
import { sortOffers } from '../../utils';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import Sort from '../sort/sort';

type PlacesProps = {
  offers: OffersType[];
  city: string;
  activePlaceCard: number | null;
  onActivePlaceCardMouseEnter: (card: number) => void;
};

function Places({offers, city, activePlaceCard, onActivePlaceCardMouseEnter}: PlacesProps): JSX.Element {
  const currentSort = useSelector(getCurrentSort);

  const sortedOffers = sortOffers(offers, currentSort);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {city}</b>

        <Sort />

        <div className="cities__places-list places__list tabs__content">
          <PlacesList offers={sortedOffers} currentCardType={cardType.CITIES} onActivePlaceCardMouseEnter={onActivePlaceCardMouseEnter} />
        </div>

      </section>
      <div className="cities__right-section">
        <Map offers={offers} activePlaceCard={activePlaceCard} />
      </div>
    </div>
  );
}

export default Places;
