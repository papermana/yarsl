import { AtomState } from '../types';

export const propagateAtomValueChange = <Value>(
  atomState: AtomState<Value>,
): void => {
  atomState.componentDependencies.forEach((setLocalState) =>
    setLocalState(atomState.value),
  );
};
