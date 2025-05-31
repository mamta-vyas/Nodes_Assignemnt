// src/nodes/BaseNode.jsx

import { Handle, Position } from 'reactflow';

export const BaseNode = ({ title, inputs = [], outputs = [], children, style = {} }) => {
  return (
    <div style={{
      width: 240,
      minHeight: 120,
      border: '2px solid #d0d0d0',
      borderRadius: '10px',
      padding: '10px',
      backgroundColor: '#fffbea',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
      ...style
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: 10, fontSize: 16, color: '#1c2536' }}>
        {title}
      </div>

      {inputs.map((input, i) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={input.id}
          style={{ top: `${(i + 1) * 30}px` }}
        />
      ))}

      <div>{children}</div>

      {outputs.map((output, i) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={output.id}
          style={{ top: `${(i + 1) * 30}px` }}
        />
      ))}
    </div>
  );
};
