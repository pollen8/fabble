import {
  FC,
  HTMLAttributes,
} from 'react';

import { Flex } from '@chakra-ui/react';

import { useClickPreventionOnDoubleClick } from '../utils/useClickPreventionOnDoubleClick';

export const ListItem: FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  onClick = () => ({}),
  onDoubleClick = () => ({}),
  style,
  ...rest
}) => {
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
      onClick,
      onDoubleClick,
  );


  return (
    <Flex m={4} ml={0} p={2}
      style={{ cursor: 'pointer' }}
      rounded='md'
      _hover={{
        bg: 'whiteAlpha.200',
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      justifyContent="space-between"
      {...rest}>
      {children}
    </Flex>
  );
};
