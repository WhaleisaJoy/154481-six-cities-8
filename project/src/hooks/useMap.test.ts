import {renderHook} from '@testing-library/react-hooks';
import { makeFakeLocation } from '../utils/mock';
import useMap from './useMap';

const fakeLocation = makeFakeLocation();

describe('Hook: useMap', () => {
  it('should return map', () => {
    const mapRef = {current: document.createElement('div')};
    const {result} = renderHook(() =>
      useMap(mapRef, fakeLocation),
    );
    const map = result.current;

    expect(map).not.toBe(null);
    expect(map?.getCenter().lat).toBe(fakeLocation.latitude);
    expect(map?.getCenter().lng).toBe(fakeLocation.longitude);
  });
});
