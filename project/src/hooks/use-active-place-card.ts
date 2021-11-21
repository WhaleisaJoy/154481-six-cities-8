import { useState } from 'react';

type ResultActivePlaceCard = [number | null, (card: number) => void];

export const useActivePlaceCard = (): ResultActivePlaceCard => {
  const [activePlaceCard, setActivePlaceCard] = useState<number | null>(null);

  const handleActivePlaceCardMouseEnter = (card: number) => {
    setActivePlaceCard(card);
  };

  return [activePlaceCard, handleActivePlaceCardMouseEnter];
};
