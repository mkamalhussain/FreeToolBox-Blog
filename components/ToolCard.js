'use client'; // Needed for onError

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function ToolCard({ tool }) {
    // Upscale for high density
    const [src, setSrc] = useState(`https://picsum.photos/seed/${tool.slug}/800/600`);
    const [errored, setErrored] = useState(false);

    const getImage = (category) => {
        switch (category) {
            case 'Image': return '/images/hero-image.png';
            case 'Audio': return '/images/hero-audio.png';
            case 'Video': return '/images/hero-video.png';
            case 'PDF': return '/images/hero-pdf.png';
            default: return '/images/hero-image.png';
        }
    };

    const getRandomReadTime = (name) => {
        return (name.length % 5) + 3; // Deterministic 3-8 mins
    };

    return (
        <Link href={`/tools/${tool.slug}`} className="glass-card tool-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', padding: 0, overflow: 'hidden', background: '#0a0a0a', border: 'none' }}>
            {/* Thumbnail Area */}
            <div style={{
                height: '220px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Image
                    src={errored ? getImage(tool.category) : src}
                    alt={tool.name}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    className="card-image"
                    unoptimized={!errored} // Picsum external needs unoptimized, local fallbacks are fine standard
                    onError={() => {
                        setErrored(true);
                    }}
                />
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.6)', padding: '4px 10px', borderRadius: '4px', backdropFilter: 'blur(4px)' }}>
                    <span style={{ fontSize: '0.7rem', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase' }}>{tool.category}</span>
                </div>
            </div>

            {/* Content Area */}
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: '#666', marginBottom: '0.8rem' }}>
                    <span>2 hours ago</span>
                    <span>•</span>
                    <span>{getRandomReadTime(tool.name)} min read</span>
                </div>
                <h3 style={{
                    fontSize: '1.4rem',
                    margin: '0 0 0.75rem 0',
                    fontFamily: 'var(--font-display)',
                    color: '#fff',
                    lineHeight: '1.2'
                }}>
                    {tool.name}
                </h3>
                <p style={{ fontSize: '0.95rem', margin: 0, lineHeight: '1.5', color: '#999', marginBottom: '1.5rem', flex: 1 }}>
                    {tool.description}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--secondary)', fontSize: '0.9rem', fontWeight: '600' }}>
                    Read Article <span style={{ marginLeft: '5px' }}>→</span>
                </div>
            </div>
        </Link>
    );
}
