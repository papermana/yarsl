import { AtomMap } from '../AtomMap';
import { Store, Atom } from '../types';
import { getOrInitializeAtom } from './getOrInitializeAtom';

export const createStore = (): Store => ({ atoms: new AtomMap() });

export const getAtomValue = <Value>(store: Store, atom: Atom<Value>): Value => {
  if (atom.type === 'atom') {
    return getOrInitializeAtom(store, atom).value;
  }

  throw new Error('Unknown Atom type.');
};

export const setAtomValue = <Value>(
  store: Store,
  atom: Atom<Value>,
  value: Value,
): void => {
  const atomState = getOrInitializeAtom(store, atom);

  atomState.value = value;
};
