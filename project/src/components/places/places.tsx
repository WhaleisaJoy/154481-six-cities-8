import { connect, ConnectedProps } from 'react-redux';
import { cardType } from '../../const';
import { StateType } from '../../types/state';
import { OffersType } from '../../types/types';
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

const mapStateToProps = ({currentSort}: StateType) => ({
  currentSort,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & PlacesProps;

function Places({offers, city, activePlaceCard, onActivePlaceCardMouseEnter, currentSort}: ConnectedComponentProps): JSX.Element {
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

export {Places};
export default connector(Places);
