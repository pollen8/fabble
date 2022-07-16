import type { ComponentStyleConfig } from '@chakra-ui/theme'

// You can also use the more specific type for
// a single part component: ComponentSingleStyleConfig
export const Button: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 'base', // <-- border radius is same for all variants and sizes
    _focus: {
      boxShadow: "0 0 4px #fff",
    },
    _focusVisible: {

    },
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: 'sm',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
     md: {
      height: 10,
      lineHeight: 10,
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 3, // <-- these values are tokens from the design system
    },
  },
  // Two variants: outline and solid
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'purple.500',
      color: 'purple.500',
    },
    solid: {
      _active: {
        bg: 'green.300',
      },
      bg: 'green.400',
      _hover: {
        bg: 'green.500',
      },
      color: 'white',
     
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'solid',
    ringColor: 'white.500',
    ringOffsetColor: 'red.500',
    focusBorderColor: 'white.500',
  },
}
