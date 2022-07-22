import React from 'react';

import {
  Button,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { useEditor } from '@craftjs/core';

import { SideBox } from '../../common/SideBox';

export const SettingsPanel = () => {
  const { selected, actions } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
    };
  });
  return (
    <SideBox>
      <Heading size="md" as="h4">Properties</Heading>
      {
        selected ?
        <VStack
          align="stretch"
          spacing={5}>

          <strong>{selected.name}</strong>

          {
            selected.settings && React.createElement(selected.settings)
          }
          <div>
            <Button
              onClick={() => {
                actions.delete(selected.id);
              }}
            >
          Delete
            </Button>
          </div>
        </VStack> :
      <p>Select a page element to edit</p>
      }
    </SideBox>
  );
};
