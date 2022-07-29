import {
  IoCloseCircleOutline,
  IoPencilOutline,
} from 'react-icons/io5';

import {
  ButtonGroup,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import {
  selectApps,
  useFabbleMachine,
} from '../App';
import { ListItem } from '../common/ListItem';

export const AppList = () => {
  const { service, send } = useFabbleMachine();
  const apps = useSelector(service, selectApps);
  return (
    <>
      {
        apps.map((app, index) => <ListItem key={app.id}
          onClick={() => {
            window.history.pushState({}, '', '/composer');
            send({ type: 'LOAD_APP', index });
          }}
        >
          <Text fontSize="lg">{app.name}</Text>
          <ButtonGroup gap='1'>
            <IconButton
              aria-label="Edit app"
              size="sm"

              icon={<IoPencilOutline />}
              onClick={() => {
                service.send({ type: 'SET_EDITING_APP', app });
              }}
            />
            <IconButton
              size="sm"
              aria-label="Delete app"
              _hover={{
                bg: 'red.500',
              }}
              icon={<IoCloseCircleOutline />}
              onClick={() => {
                service.send({ type: 'OPEN_DELETE_APP', app });
              }}
            />
          </ButtonGroup>
        </ListItem>)
      }
    </>
  );
};
