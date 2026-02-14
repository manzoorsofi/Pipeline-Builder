import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app-brand">
          <svg className="app-logo" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="url(#logo-grad)" />
            <path d="M8 8L14 20L20 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 14H17" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="28" y2="28">
                <stop stopColor="#7c3aed" />
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
