import { cardType } from '../../const';
import { OffersType } from '../../types/types';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';

type PlacesProps = {
  offers: OffersType[];
  city: string;
  activePlaceCard: number | null;
  onActivePlaceCardMouseEnter: (card: number) => void;
};

function Places({offers, city, activePlaceCard, onActivePlaceCardMouseEnter}: PlacesProps): JSX.Element {
  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offers.length} places to stay in {city}</b>

        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
                  Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>Popular</li>
            <li className="places__option" tabIndex={0}>Price: low to high</li>
            <li className="places__option" tabIndex={0}>Price: high to low</li>
            <li className="places__option" tabIndex={0}>Top rated first</li>
          </ul>
        </form>

        <div className="cities__places-list places__list tabs__content">
          <PlacesList offers={offers} currentCardType={cardType.CITIES} onActivePlaceCardMouseEnter={onActivePlaceCardMouseEnter} />
        </div>

      </section>
      <div className="cities__right-section">
        <Map offers={offers} activePlaceCard={activePlaceCard} />
      </div>
    </div>
  );
}

export default Places;
