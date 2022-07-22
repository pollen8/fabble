import { FC } from 'react';

import {
  FormLabel,
  Select,
} from '@chakra-ui/react';

import { useFabbleMachine } from '../App';
import { SideBox } from '../common/SideBox';

export const ThemSelector: FC = () => {
  const { send } = useFabbleMachine();
  return (
    <SideBox>
      <FormLabel>Theme</FormLabel>
      <Select onChange={() => send('SET_APP_THEME')}>
        <option value="default">Default</option>
        <option value="primary">Primary</option>
        <option value="muted">Muted</option>
      </Select>
    </SideBox>
  );
};
