import { AtomState } from './types';

export const createAtomState = <Value>(value: Value): AtomState<Value> => ({
  value,
  componentDependencies: new Set(),
});
