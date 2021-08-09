import { act, renderHook } from '@testing-library/react-hooks';
import { atom } from './atoms';
import { useAtomCallback, Callback, useAtom } from './hooks';
import { Provider } from './Provider';

describe('useAtom', () => {
  test('returns the stored value for an atom', () => {
    const testAtom = atom(42);
    const { result } = renderHook(() => useAtom(testAtom), {
      wrapper: Provider,
    });

    expect(result.current[0]).toBe(42);
  });

  test.skip("allows setting an atom's value", () => {
    const testAtom = atom(42);
    const { result } = renderHook(() => useAtom(testAtom), {
      wrapper: Provider,
    });

    act(() => result.current[1](0));

    // This will not work for now
    expect(result.current[0]).toBe(0);
  });
});

describe('useAtomCallback', () => {
  test('can read and write to atoms', () => {
    const testAtom1 = atom(42);
    const testAtom2 = atom('foo');
    const callback: Callback = ({ get, set }) => {
      const atomState1 = get(testAtom1);

      set(testAtom2, 'bar');

      const atomState2 = get(testAtom2);

      return [atomState1, atomState2];
    };
    const { result } = renderHook(() => useAtomCallback(callback), {
      wrapper: Provider,
    });

    expect(result.current()).toEqual([42, 'bar']);
  });

  test('optionally, can accept an argument', () => {
    const callback: Callback<number> = ({ input }) => input;
    const { result } = renderHook(() => useAtomCallback(callback), {
      wrapper: Provider,
    });

    expect(result.current(42)).toEqual(42);
  });
});
