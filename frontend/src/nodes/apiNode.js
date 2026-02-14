// apiNode.js - API Call node

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode, NodeTextField, NodeSelectField } from './BaseNode';

export const APINode = ({ id, data, selected }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  return (
    <BaseNode
      id={id}
      title="API"
      icon="🌐"
      selected={selected}
      handles={[
        { type: 'target', position: Position.Left, id: `${id}-input` },
        { type: 'source', position: Position.Right, id: `${id}-response` },
      ]}
    >
      <NodeSelectField
        label="Method"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        options={[
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' },
        ]}
      />
      <NodeTextField
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://api.example.com"
      />
    </BaseNode>
  );
};
