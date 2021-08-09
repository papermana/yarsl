import { useCallback, useContext, useEffect, useState } from 'react';
import { StoreContext } from './Provider';
import {
  getAtomValue,
  setAtomValue,
  subscribeToAtom,
  unsubscribeFromAtom,
} from './store';
import { Atom, Store } from './types';

const useStore = (): Store => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('Store needs to be defined for hooks to work.');
  }

  return store;
};

export const useAtomValue = <Value>(atom: Atom<Value>): Value => {
  const store = useStore();
  const [localState, setLocalState] = useState(getAtomValue(store, atom));

  useEffect(() => {
    subscribeToAtom(store, atom, setLocalState);

    return () => unsubscribeFromAtom(store, atom, setLocalState);
  }, []);

  return localState;
};

type Setter<Value> = (value: Value) => void;

export const useAtomSetter = <Value>(atom: Atom<Value>): Setter<Value> => {
  const store = useStore();

  return useCallback(
    (value) => setAtomValue(store, atom, value),
    [atom, store],
  );
};

export const useAtom = <Value>(atom: Atom<Value>): [Value, Setter<Value>] => [
  useAtomValue(atom),
  useAtomSetter(atom),
];

export type Callback<Input = never> = (options: {
  get: Get;
  set: Set;
  input: Input;
}) => void;
export type CallbackResult<Input = never> = (
  ...input: Input extends never ? never : [input: Input]
) => void;
export type Get = <Value>(atom: Atom<Value>) => Value;
export type Set = <Value>(atom: Atom<Value>, newValue: Value) => void;

export const useAtomCallback = <Input>(
  callback: Callback<Input>,
): CallbackResult<Input> => {
  const store = useStore();

  return useCallback(
    (input) => {
      const get: Get = (atom) => getAtomValue(store, atom);
      const set: Set = (atom, value) => setAtomValue(store, atom, value);

      return callback({ get, set, input });
    },
    [callback, store],
  );
};
