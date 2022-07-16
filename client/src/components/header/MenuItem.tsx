import React, { FC } from 'react';
import {
  Event,
  SingleOrArray,
} from 'xstate';

import {
  Button,
  Text,
} from '@chakra-ui/react';

import { useFabbleMachine } from '../../App';
import { Events } from '../../fabble.machine';

type Props = {
  isLast?: boolean;
  to: SingleOrArray<Event<Events>>;
  slug: string;
}

export const MenuItem: FC<Props> = ({ children, isLast, slug, to, ...rest }) => {
  const { service } = useFabbleMachine();
  return (
    <Button onClick={() => {
      window.history.pushState({}, '', slug);
      service.send(to);
    }}>
      <Text display="inline" {...rest}>
        {children}
      </Text>
    </Button>
  );
};
