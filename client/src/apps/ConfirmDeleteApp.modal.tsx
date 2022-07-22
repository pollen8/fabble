import { FC } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useSelector } from '@xstate/react';

import {
  selectAppToDelete,
  useFabbleMachine,
} from '../App';

export const ConfirmDeleteApp: FC = () => {
  const { service, send } = useFabbleMachine();
  const isOpen = useSelector(service, (state) => state.matches('authenticated.apps.confirmDelete'));
  const app = useSelector(service, selectAppToDelete);
  const onClose = () => service.send('CANCEL');
  const onDelete = () => {
    if (!app) {
      return;
    }
    send({ type: 'DELETE_APP', id: app.id });
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete app</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete {app?.name} ?
        </ModalBody>
        <ModalFooter>
          <Button variant='text' onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='red' mr={3} onClick={onDelete}
            leftIcon={<IoCloseCircleOutline />}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
