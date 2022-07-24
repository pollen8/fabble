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

            <MenuItem to={{ type: 'TO_DATA' }} matches="authenticated.editingApp.data" slug="data">
              Data
            </MenuItem>
            <MenuItem to={{ type: 'TO_COMPOSER' }} matches="authenticated.editingApp.composer" slug="composer">
              Composer
            </MenuItem>
            <MenuItem to={{ type: 'TO_PAGE_EDITOR' }} matches="authenticated.editingApp.pageEditor" slug="page-editor">
              Page editor
            </MenuItem>
          </>
        }
        {
          !isLoggedIn &&
            <MenuItem to={{ type: 'TO_SIGN_IN' }} matches="" slug="sign-in">
              Sign in
            </MenuItem>
        }
        {
          isLoggedIn && <>
            <MenuItem to={{ type: 'TO_ACCOUNT' }} matches="" slug="account">
              Account
            </MenuItem>
            <Button onClick={() => send('SIGN_OUT')}>Sign out</Button>
          </>
        }

      </Stack>
    </Flex>
  );
};
