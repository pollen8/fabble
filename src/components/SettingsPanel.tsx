import React from 'react';

import { Button } from '@chakra-ui/react';
import { useEditor } from '@craftjs/core';

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
      selected
    }
  });
  console.log('selected', selected);
  return selected ? (
    <div>

      <p>Selected</p>
      {selected.name}

      {
        selected.settings && React.createElement(selected.settings)
      }
      <Button
        onClick={() => {
          actions.delete(selected.id);
        }}
      >
        Delete
      </Button>

    </div>
  ) : null
}
