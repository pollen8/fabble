import './index.css';
import 'focus-visible/dist/focus-visible';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';

import React from 'react';
import ReactDOM from 'react-dom';

import {
  ChakraProvider,
  extendTheme,
} from '@chakra-ui/react';

import App from './App';
import { Button } from './theme/Button';

const theme = extendTheme({
  components: {
    Button,
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  styles: {
    global: () => ({
      html: {
        fontSize: '12px',
      },
      body: {
        bg: 'gray.700',
        color: 'whiteAlpha.800',
      },
    }),
  },
});


ReactDOM.render(
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>,
    document.getElementById('root'),
);
