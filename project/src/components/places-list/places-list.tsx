import { OffersType } from '../../types/types';
import PlaceCard from '../place-card/place-card';

type PlaceListType = {
  offers: OffersType[];
  currentCardType: string;
  onActivePlaceCardMouseEnter?: (card: number) => void;
}

function PlacesList({offers, currentCardType, onActivePlaceCardMouseEnter}: PlaceListType): JSX.Element {
  return (
    <>
      {
        offers.map((offer) => (
          <PlaceCard
            offer={offer}
            currentCardType={currentCardType}
            onActivePlaceCardMouseEnter={onActivePlaceCardMouseEnter}
            key={offer.id}
          />
        ))
      }
    </>
  );
}

export default PlacesList;
