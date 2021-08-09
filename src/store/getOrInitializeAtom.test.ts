import { AtomMap } from '../AtomMap';
import { atom } from '../atoms';
import { createAtomState } from '../testUtils';
import { getOrInitializeAtom } from './getOrInitializeAtom';

describe('getOrInitializeAtom', () => {
  test('returns existing atom state if available', () => {
    const store = { atoms: new AtomMap() };
    const testAtom = atom(42);
    const atomState = createAtomState(42);
    store.atoms.set(testAtom, atomState);

    expect(getOrInitializeAtom(store, testAtom)).toBe(atomState);
  });

  test('initializes atom state if necessary', () => {
    const store = { atoms: new AtomMap() };
    const testAtom = atom(42);

    expect(getOrInitializeAtom(store, testAtom)).toEqual({
      value: 42,
      componentDependencies: new Set(),
    });
  });
});
