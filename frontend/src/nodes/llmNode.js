// llmNode.js

import { Position } from 'reactflow';
import { BaseNode, NodeInfo } from './BaseNode';

export const LLMNode = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100 / 3}%` } },
        { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
    >
      <NodeInfo text="This is a LLM." />
    </BaseNode>
  );
};
