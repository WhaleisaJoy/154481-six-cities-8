import {renderHook} from '@testing-library/react-hooks';
import { useActivePlaceCard } from './use-active-place-card';

describe('Hook: useActivePlaceCard', () => {

  it('should return array with 3 elements', () => {
    const {result} = renderHook(() =>
      useActivePlaceCard(),
    );

    // const activePlaceCardNull = null;
    // const activePlaceCardNumber = 0;

    const [, handleActivePlaceCardMouseEnter, handleActivePlaceCardMouseLeave] = result.current;

    // eslint-disable-next-line no-console
    // console.log(typeof activePlaceCard);

    expect(result.current).toHaveLength(3);
    // expect(activePlaceCard).toBeInstanceOf(null);
    expect(handleActivePlaceCardMouseEnter).toBeInstanceOf(Function);
    expect(handleActivePlaceCardMouseLeave).toBeInstanceOf(Function);
  });
});
