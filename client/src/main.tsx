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
import { QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import { Button } from './theme/Button';
import { Input } from './theme/Input';
import { Modal } from './theme/Modal';
import { queryClient } from './utils/queryClient';

const theme = extendTheme({
  components: {
    Button,
    Modal,
    Input,
  },

  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
  },
  styles: {
    global: () => ({
      'html': {
        fontSize: '12px',
        height: '100%',

      },
      '#root': {
        height: '100%',
      },
      'body': {
        height: '100%',
        bg: 'gray.700',
        color: 'whiteAlpha.800',
      },
    }),
  },
});


ReactDOM.render(
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </QueryClientProvider>,
    document.getElementById('root'),
);
