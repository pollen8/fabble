import type { ComponentStyleConfig } from '@chakra-ui/theme';

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
export const Input: ComponentStyleConfig = {
  // The styles all inputs have in common
  baseStyle: {
    field: {
      border: '1px solid',
      borderColor: 'whiteAlpha.200',
      background: 'blackAlpha.400',
    },
  },

};
