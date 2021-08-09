import { act, renderHook } from '@testing-library/react-hooks';
import { atom } from './atoms';
import { useAtomCallback, Callback, useAtom, useAtomValue } from './hooks';
import { Provider } from './Provider';

describe('useAtom', () => {
  test('returns the stored value for an atom', () => {
    const testAtom = atom(42);
    const { result } = renderHook(() => useAtom(testAtom), {
      wrapper: Provider,
    });

    expect(result.current[0]).toBe(42);
  });

  test("allows setting an atom's value", () => {
    const testAtom = atom(42);
    const { result } = renderHook(() => useAtom(testAtom), {
      wrapper: Provider,
    });

    act(() => result.current[1](0));

    expect(result.current[0]).toBe(0);
  });

  test('reacts to changes made by another component', () => {
    const testAtom = atom(42);
    const useTestHook = () => ({
      hook1: useAtom(testAtom),
      hook2: useAtom(testAtom),
    });
    const { result } = renderHook(() => useTestHook(), { wrapper: Provider });

    expect(result.current.hook1[0]).toBe(42);

    act(() => result.current.hook2[1](0));

    expect(result.current.hook1[0]).toBe(0);
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

  test('affects other components', () => {
    const testAtom = atom(42);
    const callback: Callback = ({ get, set }) => {
      set(testAtom, get(testAtom) + 1);
    };
    const useTestHook = () => ({
      useAtomValue: useAtomValue(testAtom),
      useAtomCallback: useAtomCallback(callback),
    });
    const { result } = renderHook(() => useTestHook(), { wrapper: Provider });

    expect(result.current.useAtomValue).toBe(42);

    act(() => result.current.useAtomCallback());

    expect(result.current.useAtomValue).toBe(43);
  });
});
