// conditionalNode.js - If/Else branching node

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeTextField, NodeSelectField } from './BaseNode';

export const ConditionalNode = ({ id, data, selected }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  const [operator, setOperator] = useState(data?.operator || 'equals');

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon="🔀"
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-true`, style: { top: '35%' } },
        { type: 'source', position: Position.Right, id: `${id}-false`, style: { top: '65%' } },
      ]}
    >
      <NodeSelectField
        label="Operator"
        value={operator}
        onChange={(e) => setOperator(e.target.value)}
        options={[
          { value: 'equals', label: 'Equals' },
          { value: 'not_equals', label: 'Not Equals' },
          { value: 'contains', label: 'Contains' },
          { value: 'greater_than', label: 'Greater Than' },
          { value: 'less_than', label: 'Less Than' },
        ]}
      />
      <NodeTextField
        label="Value"
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        placeholder="Compare value"
      />
      <div className="node-handle-labels">
        <span className="handle-label-right" style={{ top: '35%' }}>True</span>
        <span className="handle-label-right" style={{ top: '65%' }}>False</span>
      </div>
    </BaseNode>
  );
};
