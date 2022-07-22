import copy from 'copy-to-clipboard';
import lz from 'lzutf8';
import {
  IoFolderOpenOutline,
  IoSaveOutline,
} from 'react-icons/io5';

import {
  Button,
  ButtonGroup,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { useEditor } from '@craftjs/core';

import { useFabbleMachine } from '../../App';
import { LoadPageModal } from './LoadPage.modal';

export const Topbar = () => {
  const { actions, query } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const { service } = useFabbleMachine();
  const toast = useToast();
  return (
    <>
      <HStack padding={2} paddingTop={0}>
        <label>
          <input type="checkbox"
            defaultChecked={true}
            onChange={(e) => actions.setOptions((options) => options.enabled = e.target.checked)}
          /> Enable
        </label>
        <ButtonGroup size='sm' isAttached>
          <Button
            leftIcon={<IoFolderOpenOutline />}
            onClick={() => {
              service.send('OPEN_LOAD');
            }}
          >
          Load
          </Button>
          <Button
            leftIcon={<IoSaveOutline />}
            onClick={() => {
              service.send('OPEN_SAVE_AS');
            }}
          >
          Save As
          </Button>

          <Button
            leftIcon={<IoSaveOutline />}
            onClick={() => {
              const json = query.serialize();
              copy(lz.encodeBase64(lz.compress(json)));
              toast({
                title: 'State copied to clipboard',
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
            }}>
          Save
          </Button>
        </ButtonGroup>
      </HStack>
      <LoadPageModal />
    </>
  );
};
