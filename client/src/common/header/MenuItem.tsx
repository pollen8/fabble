import React, { FC } from 'react';
import {
  Event,
  SingleOrArray,
} from 'xstate';

import {
  Button,
  Text,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import { useFabbleMachine } from '../../App';
import { Events } from '../../fabble.machine';

type Props = {
  isLast?: boolean;
  to: SingleOrArray<Event<Events>>;
  slug: string;
  matches: string;
}

export const MenuItem: FC<Props> = ({ children, isLast, slug, matches, to, ...rest }) => {
  const { service } = useFabbleMachine();
  const isActive = useSelector(service, (s) => s.matches(matches));
  return (
    <Button
      isActive={isActive}
      onClick={() => {
        window.history.pushState({}, '', slug);
        service.send(to);
      }}>
      <Text display="inline" {...rest}>
        {children}
      </Text>
    </Button>
  );
};
