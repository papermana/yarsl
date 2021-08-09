import { AtomMap } from './AtomMap';

export interface Atom<Value> {
  type: 'atom';
  initialValue: Value;
}

export type ComponentDependency<Value> = (newValue: Value) => void;

export interface AtomState<Value> {
  value: Value;
  componentDependencies: Set<ComponentDependency<Value>>;
}

export interface Store {
  atoms: AtomMap;
}
