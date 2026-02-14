# Pipeline Builder

A visual pipeline builder built with **React** and **React Flow**, featuring a drag-and-drop node editor with a **FastAPI** backend for pipeline analysis.

Inspired by [VectorShift](https://vectorshift.ai/).

## Features

### Node Abstraction
- Reusable `BaseNode` component with shared layout, handles, and field components
- 9 node types: **Input**, **Output**, **Text**, **LLM**, **Note**, **API**, **Timer**, **Condition**, **Math**
- Extensible architecture — create new nodes in minutes

### Dynamic Text Node
- Auto-resizing textarea that grows with content
- Variable detection: type `{{ variableName }}` to dynamically create input handles

### Modern UI
- Dark theme inspired by VectorShift's design language
- Gradient accents, smooth transitions, and polished interactions
- Categorized toolbar, live node/edge stats, and canvas hint text

### Backend Integration
- Submit pipeline to FastAPI backend for analysis
- DAG validation using Kahn's topological sort algorithm
- Returns `num_nodes`, `num_edges`, and `is_dag`

## Tech Stack

| Layer    | Technology               |
| -------- | ------------------------ |
| Frontend | React, React Flow, Zustand |
| Backend  | Python, FastAPI, Pydantic  |
| Styling  | Custom CSS with design tokens |

## Getting Started

### Frontend
```bash
cd frontend
npm install
npm start
```
Open [http://localhost:3000](http://localhost:3000)

### Backend
```bash
cd backend
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
```
API runs at [http://localhost:8000](http://localhost:8000)

## Project Structure

```
├── frontend/
│   └── src/
│       ├── nodes/
│       │   ├── BaseNode.js        # Shared node abstraction
│       │   ├── inputNode.js       # Input node
│       │   ├── outputNode.js      # Output node
│       │   ├── llmNode.js         # LLM node
│       │   ├── textNode.js        # Text node (dynamic handles)
│       │   ├── noteNode.js        # Note node
│       │   ├── apiNode.js         # API node
│       │   ├── timerNode.js       # Timer node
│       │   ├── conditionalNode.js # Condition node
│       │   └── mathNode.js        # Math node
│       ├── App.js
│       ├── toolbar.js
│       ├── draggableNode.js
│       ├── ui.js
│       ├── store.js
│       ├── submit.js
│       └── index.css
└── backend/
    └── main.py
```
