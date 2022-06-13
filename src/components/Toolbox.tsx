import React from 'react';

import { Button as UIButton } from '@chakra-ui/react';
import {
  Element,
  useEditor,
} from '@craftjs/core';

import { Button } from './Button';
import { Card } from './Card';
import { Container } from './Container';
import { Text } from './Text';

export const Toolbox = () => {
  const { connectors, query } = useEditor();

  return (
      <div style={{display: 'grid'}}>
          <div>Drag to add</div>
        <div>
          <UIButton ref={(ref)=> ref && connectors.create(ref, <Button text="Click me" />)}>Button</UIButton>
        </div>
        <div>
          <UIButton ref={(ref)=> ref && connectors.create(ref, <Text text="Hi world" />)}>Text</UIButton>
        </div>
        <div>
          <UIButton ref={(ref)=> ref && connectors.create(ref, <Element is={Container} canvas />)}>Container</UIButton>
        </div>
        <div>
          <UIButton ref={(ref)=> ref &&connectors.create(ref, <Card />)}>Card</UIButton>
        </div>
      </div>
  )
};
