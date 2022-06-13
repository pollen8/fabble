import React from 'react';

import { useEditor } from '@craftjs/core';

export const Topbar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled
  }));

  return (
    <div>
     <label>
          <input type="checkbox"
          defaultChecked={true}
          onChange={(e) => actions.setOptions(options => options.enabled = e.target.checked)}
          /> Enable
       </label>
          <button 
          
            onClick={() => {
              console.log(query.serialize())
            }}
          >
              Serialize JSON to console
          </button>
       
    </div>
  )
};
