// submit.js
// Part 4: Submit pipeline to backend for DAG analysis

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nodes: nodes.map((n) => ({ id: n.id, type: n.type, data: n.data })),
          edges: edges.map((e) => ({ source: e.source, target: e.target })),
        }),
      });

      const data = await response.json();
      alert(
        `Pipeline Analysis\n\n` +
        `  Nodes: ${data.num_nodes}\n` +
        `  Edges: ${data.num_edges}\n` +
        `  Is DAG: ${data.is_dag ? 'Yes ✓' : 'No ✗'}`
      );
    } catch (error) {
      alert(`Error submitting pipeline: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-area">
      <div className="submit-stats">
        <div className="stat-chip">
          <span className="stat-dot stat-dot-nodes"></span>
          <span className="stat-count">{nodes.length}</span>
          <span className="stat-label">nodes</span>
        </div>
        <div className="stat-chip">
          <span className="stat-dot stat-dot-edges"></span>
          <span className="stat-count">{edges.length}</span>
          <span className="stat-label">edges</span>
        </div>
      </div>
      <button
        className="submit-button"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="submit-spinner" />
            Analyzing...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 2L7 14L5 8L2 7L14 2Z" fill="currentColor" />
            </svg>
            Deploy
          </>
        )}
      </button>
    </div>
  );
};
