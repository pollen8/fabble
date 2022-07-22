import { FC } from 'react';

import { Box } from '@chakra-ui/react';

export const SideBox: FC = ({
  children,
}) => <Box bg="gray.800" borderRadius={5} padding={5}>
  {children}
</Box>;
