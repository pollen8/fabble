import { useSelector } from '@xstate/react';

import { useFabbleMachine } from '../App';

export const Composer = () => {
  const { service } = useFabbleMachine();
  const isComposer = useSelector(service, (state) => state.matches('authenticated.composer'));

  if (!isComposer) {
    return null;
  }
  return (
    <>
      <h1>Composer</h1>
      <p>this will be a drag and drop UI for building page interactions via a state machines</p>
    </>
  )
}
