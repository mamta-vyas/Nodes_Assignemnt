// src/submit.js

import { useStore } from './store';
import axios from 'axios';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const payload = {
        nodes: nodes.map((node) => ({ id: node.id })),
        edges: edges.map((edge) => ({
          source: edge.source,
          target: edge.target,
        })),
      };

      const response = await axios.post('http://localhost:8000/pipelines/parse', payload);

      const { num_nodes, num_edges, is_dag } = response.data;

      alert(`✅ Pipeline Info:
- Nodes: ${num_nodes}
- Edges: ${num_edges}
- Is DAG: ${is_dag ? 'Yes' : 'No'}`);
    } catch (error) {
      console.error('❌ Error submitting pipeline:', error);
      alert('Something went wrong. Please check console.');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',padding: '20px' }}>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};
