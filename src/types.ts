import { AtomMap } from './AtomMap';

export interface Atom<Value> {
  type: 'atom';
  initialValue: Value;
}

export interface AtomState<Value> {
  value: Value;
}

export interface Store {
  atoms: AtomMap;
}
