import React from 'react';

import {
  Button as UIButton,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import {
  Element,
  useEditor,
} from '@craftjs/core';

import { Button } from './Button';
import { Card } from './Card';
import { Container } from './Container';
import { DataTable } from './DataTable';
import { Text } from './Text';

export const Toolbox = () => {
  const { connectors, query } = useEditor();

  return (
    <Grid>
      <div>Drag to add</div>
      <GridItem>
        <UIButton ref={(ref) => ref && connectors.create(ref, <Button text="Click me" />)}>Button</UIButton>
      </GridItem>
      <GridItem>
        <UIButton ref={(ref) => ref && connectors.create(ref, <Text text="Hi world" />)}>Text</UIButton>
      </GridItem>
      <GridItem>
        <UIButton ref={(ref) => ref && connectors.create(ref, <Element is={Container} canvas />)}>Container</UIButton>
      </GridItem>
      <GridItem>
        <UIButton ref={(ref) => ref && connectors.create(ref, <Card />)}>Card</UIButton>
      </GridItem>
      <GridItem>
        <UIButton ref={(ref) => ref && connectors.create(ref, <DataTable />)}>DataTable</UIButton>
      </GridItem>

    </Grid>
  )
};
