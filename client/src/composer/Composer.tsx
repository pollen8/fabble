import {
  Grid,
  Heading,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import {
  selectActiveApp,
  useFabbleMachine,
} from '../App';
import { BoxContext } from '../common/BoxContext';
import { Card } from '../common/Card';
import { PageList } from './PageList';
import { ThemSelector } from './ThemeSelector';

export type TPage = {
  id?: string;
  name?: string;
}

export const Composer = () => {
  const { service } = useFabbleMachine();
  const isComposer = useSelector(service, (state) => state.matches('authenticated.editingApp.composer'));

  const activeApp = useSelector(service, selectActiveApp);
  if (!isComposer) {
    return null;
  }
  return (
    <BoxContext paddingTop={4}>
      <h1>Composer for {activeApp?.name}</h1>
      {/* <ThemSelector /> */}
      <p>this will be a drag and drop UI for building page interactions via a state machines</p>
      <Grid templateColumns="2fr 1fr" columnGap={2}>
        <Card>
          <Heading as="h1" size="md">Pages</Heading>
          <PageList />
        </Card>
      </Grid>
    </BoxContext>
  );
};
