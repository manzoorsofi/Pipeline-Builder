// BaseNode.js
// Shared abstraction for all pipeline nodes

import { Handle } from 'reactflow';

export const BaseNode = ({ id, title, icon, handles = [], children, selected }) => {
  return (
    <div className={`base-node ${selected ? 'selected' : ''}`}>
      <div className="node-header">
        {icon && <span className="node-icon">{icon}</span>}
        <span className="node-title">{title}</span>
      </div>
      <div className="node-content">
        {children}
      </div>
      {handles.map((handle, idx) => (
        <Handle
          key={handle.id || idx}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style || {}}
          className={`node-handle handle-${handle.type}`}
        />
      ))}
    </div>
  );
};

// Reusable field components for nodes
export const NodeTextField = ({ label, value, onChange, placeholder }) => (
  <div className="node-field">
    <label className="node-field-label">{label}</label>
    <input
      type="text"
      className="node-field-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export const NodeSelectField = ({ label, value, onChange, options }) => (
  <div className="node-field">
    <label className="node-field-label">{label}</label>
    <select className="node-field-select" value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export const NodeNumberField = ({ label, value, onChange, min, max, step, placeholder }) => (
  <div className="node-field">
    <label className="node-field-label">{label}</label>
    <input
      type="number"
      className="node-field-input"
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
    />
  </div>
);

export const NodeTextArea = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div className="node-field">
    <label className="node-field-label">{label}</label>
    <textarea
      className="node-field-textarea"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
    />
  </div>
);

export const NodeInfo = ({ text }) => (
  <div className="node-info">{text}</div>
);
