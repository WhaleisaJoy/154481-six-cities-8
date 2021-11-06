import { MAX_RATING } from './const';

export const toPercent = (num: number): number => Math.round(num) / MAX_RATING * 100;
