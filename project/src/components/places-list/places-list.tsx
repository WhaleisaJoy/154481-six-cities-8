import { OffersType } from '../../types/types';
import PlaceCard from '../place-card/place-card';

type PlaceListType = {
  offers: OffersType[];
  onActivePlaceCardMouseEnter: (arg0: string) => void;
}

function PlacesList({offers, onActivePlaceCardMouseEnter}: PlaceListType): JSX.Element {
  const placeCards = offers.map((offer) => <PlaceCard offer={offer} key={offer.id} onActivePlaceCardMouseEnter={onActivePlaceCardMouseEnter} />);

  return (
    <div className="cities__places-list places__list tabs__content">
      { placeCards }
    </div>
  );
}

export default PlacesList;
