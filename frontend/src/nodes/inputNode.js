// inputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeTextField, NodeSelectField } from './BaseNode';

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      selected={selected}
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-value` },
      ]}
    >
      <NodeTextField
        label="Name"
        value={currName}
        onChange={(e) => setCurrName(e.target.value)}
      />
      <NodeSelectField
        label="Type"
        value={inputType}
        onChange={(e) => setInputType(e.target.value)}
        options={[
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' },
        ]}
      />
    </BaseNode>
  );
};
