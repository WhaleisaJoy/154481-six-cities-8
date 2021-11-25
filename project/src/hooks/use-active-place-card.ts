import { useState } from 'react';

type ResultActivePlaceCard = [number | null, (card: number) => void, () => void];

export const useActivePlaceCard = (): ResultActivePlaceCard => {
  const [activePlaceCard, setActivePlaceCard] = useState<number | null>(null);

  const handleActivePlaceCardMouseEnter = (card: number) => {
    setActivePlaceCard(card);
  };

  const handleActivePlaceCardMouseLeave = () => {
    setActivePlaceCard(null);
  };

  return [activePlaceCard, handleActivePlaceCardMouseEnter, handleActivePlaceCardMouseLeave];
};
