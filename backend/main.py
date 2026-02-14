from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from collections import defaultdict, deque

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NodeData(BaseModel):
    id: str
    type: str = ""
    data: dict = {}


class EdgeData(BaseModel):
    source: str
    target: str


class PipelineRequest(BaseModel):
    nodes: List[NodeData]
    edges: List[EdgeData]


class PipelineResponse(BaseModel):
    num_nodes: int
    num_edges: int
    is_dag: bool


def is_dag(nodes: List[NodeData], edges: List[EdgeData]) -> bool:
    """Check if the graph formed by nodes and edges is a DAG using Kahn's algorithm."""
    if not nodes:
        return True

    node_ids = {n.id for n in nodes}
    adj = defaultdict(list)
    in_degree = defaultdict(int)

    for nid in node_ids:
        in_degree[nid] = 0

    for edge in edges:
        adj[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    # Kahn's algorithm (topological sort via BFS)
    queue = deque([nid for nid in node_ids if in_degree[nid] == 0])
    visited_count = 0

    while queue:
        node = queue.popleft()
        visited_count += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(node_ids)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest) -> PipelineResponse:
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return PipelineResponse(
        num_nodes=num_nodes,
        num_edges=num_edges,
        is_dag=dag,
    )
