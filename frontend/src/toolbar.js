// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <span className="toolbar-section-label">Core</span>
        <div className="toolbar-group">
          <DraggableNode type="customInput" label="Input" icon="📥" />
          <DraggableNode type="customOutput" label="Output" icon="📤" />
          <DraggableNode type="text" label="Text" icon="📝" />
          <DraggableNode type="llm" label="LLM" icon="🤖" />
        </div>
      </div>
      <div className="toolbar-divider" />
      <div className="toolbar-section">
        <span className="toolbar-section-label">Logic</span>
        <div className="toolbar-group">
          <DraggableNode type="conditional" label="Condition" icon="🔀" />
          <DraggableNode type="math" label="Math" icon="🔢" />
          <DraggableNode type="timer" label="Timer" icon="⏱️" />
        </div>
      </div>
      <div className="toolbar-divider" />
      <div className="toolbar-section">
        <span className="toolbar-section-label">Utility</span>
        <div className="toolbar-group">
          <DraggableNode type="api" label="API" icon="🌐" />
          <DraggableNode type="note" label="Note" icon="📌" />
        </div>
      </div>
    </div>
  );
};
