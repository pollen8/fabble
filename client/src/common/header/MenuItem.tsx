import React, { FC } from 'react';

import {
  Button,
  Text,
} from '@chakra-ui/react';

import { useFabbleMachine } from '../../App';
import { useGetRouteFromSlug } from '../../utils/routes';

type Props = {
  isLast?: boolean;
  slug: string;
}

export const MenuItem: FC<Props> = ({
  children,
  isLast,
  slug,
  ...rest
}) => {
  const { service } = useFabbleMachine();
  const { to, isActive } = useGetRouteFromSlug(slug);
  return (
    <Button
      isActive={isActive}
      onClick={() => {
        window.history.pushState({}, '', slug);
        service.send(to as any);
      }}>
      <Text display="inline" {...rest}>
        {children}
      </Text>
    </Button>
  );
};
