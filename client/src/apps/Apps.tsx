import {
  Grid,
  Heading,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import { useFabbleMachine } from '../App';
import { BoxContext } from '../common/BoxContext';
import { Card } from '../common/Card';
import { TPage } from '../composer/Composer';
import { AppForm } from './AppForm';
import { AppList } from './AppList';
import { ConfirmDeleteApp } from './ConfirmDeleteApp.modal';

export type TApp = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  config: {
    pages: TPage[];
  };
}

export const Apps = () => {
  const { service } = useFabbleMachine();
  const isApps = useSelector(service, (state) => state.matches('authenticated.apps'));
  if (!isApps) {
    return null;
  }

  return (
    <BoxContext paddingTop={4}>
      <Grid templateColumns="2fr 1fr" columnGap={2}>
        <Card>
          <Heading as="h1" size="md">My apps</Heading>
          <AppList />
        </Card>
        <Card>
          <AppForm />
        </Card>
      </Grid>
      <ConfirmDeleteApp />
    </BoxContext>
  );
};
