import lz from 'lzutf8';
import { useState } from 'react';

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { useEditor } from '@craftjs/core';
import { useSelector } from '@xstate/react';

import { useFabbleMachine } from '../../App';

export const LoadPageModal = () => {
  const { service } = useFabbleMachine();
  const { actions } = useEditor();
  const isOpen = useSelector(service, (state) => state.matches('authenticated.pageEditor.load'));
  const onClose = () => service.send('CANCEL');
  const onLoad = () => {
    service.send({ type: 'LOAD', data: { page } });
    const json = lz.decompress(lz.decodeBase64(page));
    actions.deserialize(json);
  };
  const [page, setPage] = useState('');
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea placeholder='Paste page here'
            onChange={(e) => setPage(e.target.value)} />
        </ModalBody>

        <ModalFooter>
          <Button variant='text' onClick={onClose}>Close</Button>
          <Button colorScheme='blue' mr={3} onClick={onLoad}>
            Load
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
