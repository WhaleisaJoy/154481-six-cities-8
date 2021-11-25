import { OffersType } from '../../types/offer';
import PlaceCard from '../place-card/place-card';

type PlaceListType = {
  offers: OffersType[];
  currentCardType: string;
  onActivePlaceCardMouseEnter?: (card: number) => void;
  onActivePlaceCardMouseLeave?: () => void;
}

function PlacesList({offers, currentCardType, onActivePlaceCardMouseEnter, onActivePlaceCardMouseLeave}: PlaceListType): JSX.Element {
  return (
    <>
      {
        offers.map((offer) => (
          <PlaceCard
            offer={offer}
            currentCardType={currentCardType}
            onActivePlaceCardMouseEnter={onActivePlaceCardMouseEnter}
            onActivePlaceCardMouseLeave={onActivePlaceCardMouseLeave}
            key={offer.id}
          />
        ))
      }
    </>
  );
}

export default PlacesList;
