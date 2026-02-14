// mathNode.js - Math operation node

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeNumberField, NodeSelectField } from './BaseNode';

export const MathNode = ({ id, data, selected }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');
  const [value, setValue] = useState(data?.value || 0);

  return (
    <BaseNode
      id={id}
      title="Math"
      icon="🔢"
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-a`, style: { top: '35%' } },
        { type: 'target', position: Position.Left, id: `${id}-b`, style: { top: '65%' } },
        { type: 'source', position: Position.Right, id: `${id}-result` },
      ]}
    >
      <NodeSelectField
        label="Operation"
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        options={[
          { value: 'add', label: 'Add (+)' },
          { value: 'subtract', label: 'Subtract (−)' },
          { value: 'multiply', label: 'Multiply (×)' },
          { value: 'divide', label: 'Divide (÷)' },
          { value: 'modulo', label: 'Modulo (%)' },
          { value: 'power', label: 'Power (^)' },
        ]}
      />
      <NodeNumberField
        label="Constant"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="0"
      />
    </BaseNode>
  );
};
