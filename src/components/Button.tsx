import { FC } from 'react';

import { Button as UIButton } from '@chakra-ui/react';
import { useNode } from '@craftjs/core';

type Props = {
  size?: 'sm',
  text: string;
}
export const Button: FC<Props> = ({
  size,
  text,
}) => {
  const { connectors: {connect, drag} } = useNode();

  return (
    <UIButton
    ref={ref => ref && connect(drag(ref))}
    >{text}</UIButton>
  )
}
