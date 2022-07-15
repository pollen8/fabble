import { send } from 'xstate/lib/actions';

import {
  Button,
  Stack,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import { useFabbleMachine } from '../../App';
import { MenuItem } from './MenuItem';

export const MainMenu = () => {
  const {service, send} = useFabbleMachine();
  const isLoggedIn = useSelector(service, (state) => state.matches('authenticated'))
  return (
    <Stack
      spacing={8}
      align="center"
      justify={["center", "space-between", "flex-end", "flex-end"]}
      direction={["column", "row", "row", "row"]}
      pt={[4, 4, 0, 0]}
    >
      {
        isLoggedIn && <>
        <MenuItem to={{type: 'TO_DATA'}} slug="data">
          Data
        </MenuItem>
        <MenuItem to={{type: 'TO_COMPOSER'}} slug="composer">
          Composer
        </MenuItem>
        <MenuItem to={{type: 'TO_PAGE_EDITOR'}} slug="page-editor">
          Page editor
        </MenuItem>
        </>
      }
      
      {
      !isLoggedIn && 
      <MenuItem to={{type: 'TO_SIGN_IN'}} slug="sign-in">
        Sign in
      </MenuItem>
    }
{
  isLoggedIn && <>
      <MenuItem to={{type: 'TO_ACCOUNT'}} slug="account">
      Account
    </MenuItem>
    <Button onClick={() => send('SIGN_OUT')}>Sign out</Button>
</>
}
      
    </Stack>
  )
}
