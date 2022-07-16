import {
  Button as UIButton,
  ButtonProps,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import {
  useNode,
  UserComponent,
} from '@craftjs/core';

type Props = {
  size?: ButtonProps['size'],
  text: string;
}

export const Button: UserComponent<Props> = ({
  size,
  text,
}) => {
  const { connectors: { connect, drag } } = useNode();

  return (
    <UIButton
      size={size}
      ref={(ref) => ref && connect(drag(ref))}
    >{text}</UIButton>
  );
};


const ButtonSettings = () => {
  const { actions: { setProp }, size, text } = useNode((node) => ({
    size: node.data.props.size,
    text: node.data.props.text,
  }));

  return (
    <>
      <FormControl>
        <FormLabel htmlFor='size'>Size</FormLabel>
        <Select
          defaultValue={size}

          onChange={(e) => {
            setProp((props: Props) => props.size = e.target.value);
          }}
        >
          <option value="xs">xs</option>
          <option value="sm">sm</option>
          <option value="md">md</option>
          <option value="lg">lg</option>
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='text'>Text</FormLabel>
        <Input
          id="text"
          defaultValue={text}
          onChange={(e) => setProp((props: Props) => props.text = e.target.value)} />
      </FormControl>
    </>
  );
};

Button.craft = {
  props: {
    size: 'md',
  },
  related: {
    settings: ButtonSettings,
  },
};
