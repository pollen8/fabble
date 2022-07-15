import { FC } from 'react';
import {
  Event,
  SingleOrArray,
} from 'xstate';

import {
  Button,
  Link,
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
      history.pushState({}, '', slug)
      service.send(to);
    }}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Button>
  )
}
