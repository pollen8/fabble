import type { ComponentStyleConfig } from '@chakra-ui/theme';

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
export const Modal: ComponentStyleConfig = {
  baseStyle: (props) => ({
    dialog: {
      bg: 'gray.500',
    },
  }),

};
