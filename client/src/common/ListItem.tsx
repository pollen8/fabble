import {
  FC,
  HTMLAttributes,
} from 'react';

import { Flex } from '@chakra-ui/react';

export const ListItem: FC<HTMLAttributes<HTMLDivElement>> = ({ children, style, ...rest }) => <Flex m={4} ml={0} p={2}
  style={{ cursor: 'pointer' }}
  rounded='md'
  _hover={{
    bg: 'whiteAlpha.200',
  }}

  justifyContent="space-between"
  {...rest}>
  {children}
</Flex>;
