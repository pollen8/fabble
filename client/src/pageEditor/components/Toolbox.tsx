import React, {
  forwardRef,
  ReactNode,
} from 'react';

import {
  Box,
  Grid,
  GridItem,
  Heading,
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

type Props = {
  children: ReactNode
}
const DragElement = forwardRef<HTMLDivElement, Props>(function dragElement(props, ref) {
  return <Box
    ref={ref}
    padding={5}
    bg="gray.900"
    marginBottom="2"
    cursor="move">
    {props.children}
  </Box>;
});

export const Toolbox = () => {
  const { connectors } = useEditor();

  return (
    <Grid>
      <Box bg="gray.800" borderRadius={5} padding={5}>
        <Heading as="h4">Elements</Heading>
        <small>Drag to add</small>
        <GridItem>
          <DragElement
            ref={(ref) => ref && connectors.create(ref, <Button text="Click me" />)}>
            Button
          </DragElement>
        </GridItem>
        <GridItem>
          <DragElement
            ref={(ref) => ref && connectors.create(ref, <Text text="Hi world" />)}>
            Text
          </DragElement>
        </GridItem>
        <GridItem>
          <DragElement
            ref={(ref) => ref && connectors.create(ref, <Element is={Container} canvas />)}>
              Container
          </DragElement>
        </GridItem>
        <GridItem>
          <DragElement
            ref={(ref) => ref && connectors.create(ref, <Card />)}>
              Card</DragElement>
        </GridItem>
        <GridItem>
          <DragElement
            ref={(ref) => ref && connectors.create(ref, <DataTable />)}>
              DataTable</DragElement>
        </GridItem>
      </Box>
    </Grid>
  );
};
