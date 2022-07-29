import React from 'react';

import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import { useFabbleMachine } from '../../App';
import { MenuItem } from './MenuItem';

export const MainMenu = () => {
  const { service, send } = useFabbleMachine();
  const isLoggedIn = useSelector(service, (state) => state.matches('authenticated'));
  const isEditingApp = useSelector(service, (state) => state.matches('authenticated.editingApp'));
  return (
    <Flex padding="5"
      borderBottom="1px solid" borderColor="gray.600">
      <Box flex="1">
        <Heading as="h1"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            if (!isLoggedIn) {
              return;
            }
            window.history.pushState({}, '', '/');
            service.send('TO_APPS');
          }}
        >Fabble
        </Heading>
        <small>Stateful app builder</small>
      </Box>
      <Stack
        spacing={8}
        align="center"
        justify={['center', 'space-between', 'flex-end', 'flex-end']}
        direction={['column', 'row', 'row', 'row']}
        pt={[4, 4, 0, 0]}
      >
        {
          isEditingApp && <>

            <MenuItem slug="/api">
              API
            </MenuItem>
            <MenuItem slug="/composer">
              Composer
            </MenuItem>
            <MenuItem slug="/page-editor">
              Page editor
            </MenuItem>
          </>
        }
        {
          !isLoggedIn &&
            <MenuItem slug="/sign-in">
              Sign in
            </MenuItem>
        }
        {
          isLoggedIn && <>
            <MenuItem slug="/account">
              Account
            </MenuItem>
            <Button onClick={() => send('SIGN_OUT')}>Sign out</Button>
          </>
        }

      </Stack>
    </Flex>
  );
};
