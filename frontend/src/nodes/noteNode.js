// noteNode.js - A sticky note node for annotations

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const NoteNode = ({ id, data, selected }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="📌"
      selected={selected}
      handles={[
        { type: 'source', position: Position.Right, id: `${id}-output` },
      ]}
    >
      <div className="node-field">
        <label className="node-field-label">Note</label>
        <textarea
          className="node-field-textarea"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note..."
          rows={3}
        />
      </div>
    </BaseNode>
  );
};
