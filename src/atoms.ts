import { Atom } from './types';

export const atom = <Value>(initialValue: Value): Atom<Value> => ({
  type: 'atom',
  initialValue,
});
