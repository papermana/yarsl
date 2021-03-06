import { Atom, AtomState } from './types';

export class AtomMap extends WeakMap<Atom<any>, AtomState<any>> {
  get<Value>(key: Atom<Value>): AtomState<Value> {
    return super.get(key) as AtomState<Value>;
  }

  set<Value>(key: Atom<Value>, value: AtomState<Value>) {
    return super.set(key, value);
  }
}
