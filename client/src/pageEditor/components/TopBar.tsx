import copy from 'copy-to-clipboard';
import lz from 'lzutf8';
import React from 'react';

import {
  Box,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useEditor } from '@craftjs/core';

import { useFabbleMachine } from '../../App';
import { LoadPageModal } from './LoadPage.modal';

export const Topbar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const { service } = useFabbleMachine();
  console.log(service.state?.value);
  const toast = useToast();
  return (
    <>
      <Box padding={4}>
        <label>
          <input type="checkbox"
            defaultChecked={true}
            onChange={(e) => actions.setOptions((options) => options.enabled = e.target.checked)}
          /> Enable
        </label>

        <Button
          onClick={() => {
            service.send('OPEN_LOAD');
          }}
        >
          Load
        </Button>
        <Button
          onClick={() => {
            service.send('OPEN_SAVE_AS');
          }}
        >
          Save As
        </Button>
        <Button
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

      </Box>
      <LoadPageModal />
    </>
  );
};
