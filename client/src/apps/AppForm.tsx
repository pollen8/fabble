import { FormEvent } from 'react';

import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import { useFabbleMachine } from '../App';
import { FormActions } from '../common/FormActions';
import { supabase } from '../supabaseClient';
import { TApp } from './Apps';

export const AppForm = () => {
  const { service, send } = useFabbleMachine();
  const editingApp = useSelector(service, ({ context }) => context.editingApp);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    const app: Partial<TApp> = {
      ...editingApp,
      user_id: supabase.auth.user()?.id ?? '',
    };
    send({ type: 'SAVE_APP', app });
  };


  return (
    <form onSubmit={save}>
      <FormControl isRequired>
        <FormLabel htmlFor='text'>
                Name
        </FormLabel>
        <Input
          id="text"
          variant="fabble"
          value={editingApp.name ?? ''}
          onChange={(e) => send({ type: 'UPDATE_EDITING_APP', data: { name: e.target.value } })} />
      </FormControl>
      <FormActions>
        <ButtonGroup>
          {
            editingApp.id &&
                <Button type="button"
                  onClick={() => send('CANCEL_EDIT_APP')}
                >
                  Cancel
                </Button>
          }
          <Button type="submit"
            name="submit">
            {editingApp.id ? 'Edit app' : 'Create app'}
          </Button>
        </ButtonGroup>
      </FormActions>
    </form>
  );
};
