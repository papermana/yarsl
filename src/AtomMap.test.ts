import { AtomMap } from './AtomMap';

import { atom } from './atoms';

describe('AtomMap', () => {
  test('allows setting and getting atom values', () => {
    const atomMap = new AtomMap();
    const testAtom = atom(42);
    const testAtomState = { value: 42 };

    expect(atomMap.has(testAtom)).toBe(false);
    expect(atomMap.get(testAtom)).toBe(undefined);

    atomMap.set(testAtom, testAtomState);
    expect(atomMap.has(testAtom)).toBe(true);
    expect(atomMap.get(testAtom)).toBe(testAtomState);
  });
});
