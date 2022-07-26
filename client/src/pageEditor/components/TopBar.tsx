
import {
  ButtonGroup,
  HStack,
} from '@chakra-ui/react';
import { useEditor } from '@craftjs/core';

import { LoadPageModal } from './LoadPage.modal';

export const Topbar = () => {
  const { actions } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
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


        </ButtonGroup>
      </HStack>
      <LoadPageModal />
    </>
  );
};
