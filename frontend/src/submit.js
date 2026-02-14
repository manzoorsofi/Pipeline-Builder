// submit.js
// Part 4: Submit pipeline to backend for DAG analysis

import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState, useEffect } from 'react';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

// Custom modal alert component
const ResultModal = ({ data, error, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Glow effect */}
        <div className="modal-glow" />

        {error ? (
          <>
            <div className="modal-icon modal-icon-error">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h2 className="modal-title">Connection Error</h2>
            <p className="modal-subtitle">{error}</p>
          </>
        ) : (
          <>
            <div className={`modal-icon ${data.is_dag ? 'modal-icon-success' : 'modal-icon-warning'}`}>
              {data.is_dag ? (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              ) : (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              )}
            </div>
            <h2 className="modal-title">Pipeline Analysis</h2>
            <p className="modal-subtitle">
              {data.is_dag
                ? 'Your pipeline is a valid directed acyclic graph.'
                : 'Warning: Your pipeline contains cycles.'}
            </p>

            <div className="modal-stats">
              <div className="modal-stat">
                <span className="modal-stat-value">{data.num_nodes}</span>
                <span className="modal-stat-label">Nodes</span>
              </div>
              <div className="modal-stat-divider" />
              <div className="modal-stat">
                <span className="modal-stat-value">{data.num_edges}</span>
                <span className="modal-stat-label">Edges</span>
              </div>
              <div className="modal-stat-divider" />
              <div className="modal-stat">
                <span className={`modal-stat-value ${data.is_dag ? 'text-success' : 'text-warning'}`}>
                  {data.is_dag ? 'Yes' : 'No'}
                </span>
                <span className="modal-stat-label">Is DAG</span>
              </div>
            </div>
          </>
        )}

        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
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
      setResult(data);
      setShowModal(true);
    } catch (err) {
      setError(err.message);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="submit-area">
        <div className="submit-stats">
          <div className="stat-chip">
            <span className="stat-dot stat-dot-nodes" />
            <span className="stat-count">{nodes.length}</span>
            <span className="stat-label">nodes</span>
          </div>
          <div className="stat-chip">
            <span className="stat-dot stat-dot-edges" />
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              Submit
            </>
          )}
        </button>
      </div>

      {showModal && (
        <ResultModal
          data={result}
          error={error}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};
