'use client';

import { useState } from 'react';
import ToolCard from './ToolCard';

export default function ToolGrid({ tools }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools = activeCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === activeCategory);

  const categories = ['All', 'Image', 'Audio', 'Video', 'PDF'];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', margin: 0, border: 'none' }}>Latest Articles</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? '#fff' : 'transparent',
                color: activeCategory === cat ? '#000' : '#888',
                border: '1px solid',
                borderColor: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.1)',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.2s'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-cols-3">
        {filteredTools.map(tool => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </>
  );
}
