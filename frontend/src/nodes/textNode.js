// textNode.js

import { useEffect, useRef, useState } from 'react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '');
  const [variables, setVariables] = useState([]);
  const [height, setHeight] = useState(100);

  const textareaRef = useRef(null);

  // Resize text box as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setHeight(textareaRef.current.scrollHeight + 40); // add some buffer
    }
  }, [text]);

  // Detect {{variable}} patterns
  useEffect(() => {
    const matches = Array.from(text.matchAll(/\{\{(\w+)\}\}/g)).map(match => match[1]);
    setVariables([...new Set(matches)]); // unique vars only
  }, [text]);

  return (
    <BaseNode
      title="Text"
      inputs={variables.map(variable => ({ id: `${id}-var-${variable}` }))}
      outputs={[{ id: `${id}-output` }]}
      style={{ height: `${height}px` }}
    >
      <label>
        Text:
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something like {{name}} or {{city}}"
          style={{
            width: '100%',
            resize: 'none',
            fontSize: '14px',
            borderRadius: '4px',
            padding: '5px',
            border: '1px solid #ccc',
            minHeight: '40px',
            boxSizing: 'border-box',
          }}
        />
      </label>
    </BaseNode>
  );
};
