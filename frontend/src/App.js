import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-brand">
          <svg className="app-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="url(#logo-grad)" />
            <path d="M9 9L16 22L23 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 15.5H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="16" cy="9" r="2" fill="rgba(255,255,255,0.6)" />
            <circle cx="9" cy="9" r="1.5" fill="rgba(255,255,255,0.4)" />
            <circle cx="23" cy="9" r="1.5" fill="rgba(255,255,255,0.4)" />
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32">
                <stop stopColor="#7c3aed" />
                <stop offset="0.5" stopColor="#6366f1" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>
          <span className="app-brand-text">Pipeline Builder</span>
        </div>
        <div className="app-header-right">
          <SubmitButton />
        </div>
      </header>
      <PipelineToolbar />
      <PipelineUI />
    </div>
  );
}

export default App;
