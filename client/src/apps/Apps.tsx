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
    /** graphQL mesh YAML config */
    data: string,
    pages: TPage[];
  };
}

export type TAppCreateDTO = {
  id?: string;
  user_id: string;
  name: string;
  config: {
    data: string;
    pages: TPage[];
  };
}

export const Apps = () => {
  return (
    <BoxContext paddingTop={4}>
      <Grid templateColumns="2fr 1fr" columnGap={2} rowGap={4}>
        <Card>
          <Heading as="h1" size="md">My apps</Heading>
          <AppList />
        </Card>
        <Card>
          <AppForm />
        </Card>
        <Card>
          <Heading as="h2" size="md">So what is Fabble?</Heading>
          <p>Fabble is an opinionated low code web app creator,
            aimed at streamlining communication between a team to produce
            accurate apps with low developer friction.
          </p>
          <Heading as="h3" size="sm">For designers</Heading>
          <ul>
            <li>Build site layouts</li>
            <li>Design page layouts with a drag and drop interface (figma/webflow)</li>
            <li>Control logic via drag n drop state machine designer</li>
            <li>Atomic design - create re-usable composable components</li>
          </ul>
          <Heading as="h3" size="sm">For product managers</Heading>
          <ul>
            <li>Use the state machine visualizer to map app flow to requirements</li>
          </ul>
          <Heading as="h3" size="sm">For developers</Heading>
          <ul>
            <li>Work in tandem with designers on component creation</li>
          </ul>
          <Heading as="h3" size="sm">For QA</Heading>
          <ul>
            <li>Jest tests?</li>
            <li>visual regression</li>
            <li>state based tests</li>
          </ul>

        </Card>
      </Grid>

      <ConfirmDeleteApp />
    </BoxContext>
  );
};
