import { Store, Atom, AtomState } from '../types';

export const getOrInitializeAtom = <Value>(
  store: Store,
  atom: Atom<Value>,
): AtomState<Value> => {
  if (!store.atoms.has(atom)) {
    store.atoms.set(atom, {
      value: atom.initialValue,
      componentDependencies: new Set(),
    });
  }

  return store.atoms.get(atom);
};
