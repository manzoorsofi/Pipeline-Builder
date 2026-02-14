// outputNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeTextField, NodeSelectField } from './BaseNode';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-value` },
      ]}
    >
      <NodeTextField
        label="Name"
        value={currName}
        onChange={(e) => setCurrName(e.target.value)}
      />
      <NodeSelectField
        label="Type"
        value={outputType}
        onChange={(e) => setOutputType(e.target.value)}
        options={[
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' },
        ]}
      />
    </BaseNode>
  );
};
