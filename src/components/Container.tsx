import React, { FC } from 'react';

import { Element } from '@craftjs/core';

type Props = {
  padding?: number;
}

export const Container: FC<Props> =({ 
  children,
padding = 1,
 }) => {
  return (
    <Element is="div" id="container" canvas
    style={{border: '1px solid', margin: '1rem', padding: `${padding}rem`}}>{children}</Element>
  )
}
