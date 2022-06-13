import { FC } from 'react';

import {
  Element,
  NodeRules,
  useNode,
  UserComponent,
} from '@craftjs/core';

import { Button } from './Button';
import { Container } from './Container';
import { Text } from './Text';

export const CardTop: UserComponent<{}> = ({
  children,
}) => {
  const { connectors: {connect} } = useNode();

  return (
    <div ref={(ref) => ref && connect(ref)}>
      {children}
    </div>
  )
}

CardTop.craft = {
  rules: {
    // Only accept Text
    canMoveIn: (incomingNodes) => {
      console.log(incomingNodes);
      return incomingNodes.every(incomingNode => incomingNode.data.type === Text)
    }
  } as Partial<NodeRules>
}

export const CardBottom: UserComponent<{}> = ({children}) => {
  const { connectors: {connect} } = useNode();
  return (
     <div ref={(ref) => ref && connect(ref)}>
      {children}
    </div>
  )
}

CardBottom.craft = {
  rules: {
    // Only accept Buttons
    canMoveIn : (incomingNodes) => incomingNodes.every(incomingNode => incomingNode.data.type === Button)
 
  } as Partial<NodeRules>
}
export const Card: FC = () => {
  const { connectors: {connect, drag} } = useNode();

  return (
    <Container>
    <Element is={CardTop} id="text" canvas> 
      <Text text="Title" />
      <Text text="Subtitle" />
    </Element>
    <Element is={CardBottom} id="buttons" canvas>  
      <Button size="sm" text="Learn more" />
    </Element>
  </Container>
  )
}
