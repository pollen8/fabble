import AceEditor from 'react-ace';
// import 'ace-builds/webpack-resolver';
// Note these imports must be after AceEditor
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-clouds_midnight';

import React, { FC } from 'react';

export type Props = {
  onChange: (v: string) => void;
  value?: string;
}

export const MeshEditor: FC<Props> = ({
  onChange,
  value,
}) => {
  return <AceEditor
    mode="yaml"
    theme="clouds_midnight"
    width="auto"
    height="12.5rem"
    showGutter={true}
    enableBasicAutocompletion={true}
    enableLiveAutocompletion={true}
    value={value}
    onChange={onChange}
    setOptions={{ enableSnippets: true }}
    name="meshEditor"
  />;
};
