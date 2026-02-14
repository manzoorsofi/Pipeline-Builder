// timerNode.js - Delay/Timer node

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeNumberField, NodeSelectField } from './BaseNode';

export const TimerNode = ({ id, data, selected }) => {
  const [duration, setDuration] = useState(data?.duration || 1);
  const [unit, setUnit] = useState(data?.unit || 'seconds');

  return (
    <BaseNode
      id={id}
      title="Timer"
      icon="⏱️"
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-trigger` },
        { type: 'source', position: Position.Right, id: `${id}-done` },
      ]}
    >
      <NodeNumberField
        label="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        min={0}
        step={1}
        placeholder="1"
      />
      <NodeSelectField
        label="Unit"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        options={[
          { value: 'ms', label: 'Milliseconds' },
          { value: 'seconds', label: 'Seconds' },
          { value: 'minutes', label: 'Minutes' },
        ]}
      />
    </BaseNode>
  );
};
