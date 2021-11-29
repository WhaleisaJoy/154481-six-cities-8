import {renderHook} from '@testing-library/react-hooks';
import { useActivePlaceCard } from './use-active-place-card';

describe('Hook: useActivePlaceCard', () => {

  it('should return array with 3 elements where activePlaceCard is null', () => {
    const {result} = renderHook(() =>
      useActivePlaceCard(),
    );

    const [activePlaceCard, handleActivePlaceCardMouseEnter, handleActivePlaceCardMouseLeave] = result.current;

    expect(result.current).toHaveLength(3);
    expect(activePlaceCard).toBeNull();
    expect(handleActivePlaceCardMouseEnter).toBeInstanceOf(Function);
    expect(handleActivePlaceCardMouseLeave).toBeInstanceOf(Function);
  });
});
