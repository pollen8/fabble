import React, {
  FC,
  useState,
} from 'react';
import ContentEditable from 'react-contenteditable';

import {
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import {
  useNode,
  UserComponent,
} from '@craftjs/core';

type Props = {
  text: string;
  fontSize?: string;
}
export const Text: UserComponent<Props> = ({
  text,
  fontSize,
}) => {
  const { connectors: { connect, drag }, hasSelectedNode, hasDraggedNode, actions: { setProp } } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
  }));
  const [editable, setEditable] = useState(false);


  return (
    <div
      onClick={() => hasSelectedNode ? setEditable(true) : setEditable(false)}
      ref={(ref) => ref && connect(drag(ref))}>
      <ContentEditable
        disabled={!editable}
        html={text}
        style={{ fontSize: `${fontSize}rem` }}
        onChange={(e) =>
          setProp((props: any) =>
            props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ''),
          )
        }
        tagName="p"
      />
    </div>
  );
};

const TextSettings = () => {
  const { actions: { setProp }, fontSize } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
  }));

  return (
    <>
      <FormLabel>Font size</FormLabel>
      <NumberInput
        step={0.2}
        min={1}
        max={50}
        defaultValue={fontSize || 7}
        onChange={(e) => {
          setProp((props: any) => props.fontSize = e);
        }}>
        <NumberInputField
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
};

Text.craft = {
  props: {
    fontSize: '1',
    text: 'Boobah',
  },
  related: {
    settings: TextSettings,
  },
};
