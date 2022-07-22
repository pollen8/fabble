import { useSelector } from '@xstate/react';

import {
  selectActiveApp,
  useFabbleMachine,
} from '../App';
import { BoxContext } from '../common/BoxContext';
import { ThemSelector } from './ThemeSelector';

export const Composer = () => {
  const { service } = useFabbleMachine();
  const isComposer = useSelector(service, (state) => state.matches('authenticated.editingApp.composer'));

  const activeApp = useSelector(service, selectActiveApp);
  if (!isComposer) {
    return null;
  }
  return (
    <BoxContext paddingTop={4}>
      <h1>Composer for {activeApp.name}</h1>
      <ThemSelector />
      <p>this will be a drag and drop UI for building page interactions via a state machines</p>
    </BoxContext>
  );
};
