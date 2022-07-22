import {
  IoCloseCircleOutline,
  IoPencilOutline,
} from 'react-icons/io5';

import {
  ButtonGroup,
  Flex,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import {
  selectApps,
  useFabbleMachine,
} from '../App';

export const AppList = () => {
  const { service, send } = useFabbleMachine();
  const apps = useSelector(service, selectApps);
  return (
    <>
      {
        apps.map((app) => <Flex key={app.id} m={4} ml={0} p={2}
          style={{ cursor: 'pointer' }}
          rounded='md'
          _hover={{
            bg: 'whiteAlpha.200',
          }}
          onClick={() => send({ type: 'LOAD_APP', app })}
          justifyContent="space-between">
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
        </Flex>)
      }
    </>
  );
};
