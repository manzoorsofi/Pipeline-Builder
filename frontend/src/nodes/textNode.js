// textNode.js
// Part 3: Auto-resizing text area + dynamic variable handles

import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  // Parse variables from text: matches {{ validJsVarName }}
  const variables = useMemo(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const vars = [];
    const seen = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
      if (!seen.has(match[1])) {
        seen.add(match[1]);
        vars.push(match[1]);
      }
    }
    return vars;
  }, [currText]);

  // Auto-resize the textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Calculate min width based on text content
  const minWidth = Math.max(200, Math.min(currText.length * 7, 400));

  return (
    <div className={`base-node ${selected ? 'selected' : ''}`} style={{ minWidth }}>
      <div className="node-header">
        <span className="node-icon">📝</span>
        <span className="node-title">Text</span>
      </div>
      <div className="node-content">
        <div className="node-field">
          <label className="node-field-label">Text</label>
          <textarea
            ref={textareaRef}
            className="node-field-textarea"
            value={currText}
            onChange={handleTextChange}
            placeholder="Enter text... Use {{ varName }} for variables"
            rows={1}
            style={{ resize: 'none', overflow: 'hidden' }}
          />
        </div>
        {variables.length > 0 && (
          <div className="node-variables">
            {variables.map((v) => (
              <span key={v} className="node-variable-tag">
                {v}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic input handles for variables */}
      {variables.map((varName, idx) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ top: `${((idx + 1) / (variables.length + 1)) * 100}%` }}
          className="node-handle handle-target"
        />
      ))}

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="node-handle handle-source"
      />
    </div>
  );
};
