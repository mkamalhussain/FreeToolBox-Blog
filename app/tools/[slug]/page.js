import Link from 'next/link';
import { notFound } from 'next/navigation';
import tools from '../../../data/tools.json';
import { generateArticle } from '../../../utils/contentGenerator';

// Static params for SSG
export async function generateStaticParams() {
    return tools.map((tool) => ({
        slug: tool.slug,
    }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const tool = tools.find((t) => t.slug === slug);
    if (!tool) return { title: 'Not Found' };

    return {
        title: `${tool.name} - Detailed Guide & Review`,
        description: tool.description,
    };
}

export default async function ToolPage({ params }) {
    const { slug } = await params;
    const tool = tools.find((t) => t.slug === slug);
    if (!tool) notFound();

    const article = generateArticle(tool);
    const relatedTools = tools
        .filter(t => t.category === tool.category && t.id !== tool.id)
        .slice(0, 3);

    // Deterministic gradient for hero
    const getGradient = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const c1 = Math.floor(Math.abs(Math.sin(hash) * 360));
        const c2 = (c1 + 60) % 360;
        return `linear-gradient(120deg, hsl(${c1}, 70%, 15%) 0%, hsl(${c2}, 70%, 5%) 100%)`;
    };

    return (
        <article>
            {/* Hero Header */}
            <section style={{
                background: getGradient(tool.name),
                padding: '5rem 0',
                borderBottom: '1px solid var(--card-border)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <Link href="/" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', display: 'inline-block' }}>
                        &larr; Back to Tools
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <span style={{
                            padding: '0.3rem 0.8rem',
                            borderRadius: '20px',
                            background: 'rgba(255,255,255,0.1)',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: '#fff'
                        }}>
                            {tool.category}
                        </span>
                    </div>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#fff' }}>{tool.name}</h1>
                    <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.8)', maxWidth: '700px' }}>
                        {tool.description}
                    </p>
                    <div style={{ marginTop: '2.5rem' }}>
                        <a href={tool.link} target="_blank" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
                            Use Tool Now
                        </a>
                    </div>
                </div>
            </section>

            {/* Content Body */}
            <div className="container article-content">
                <div className="glass-card" style={{ padding: '3rem', background: 'rgba(0,0,0,0.2)' }}>

                    <section style={{ marginBottom: '4rem' }}>
                        <div dangerouslySetInnerHTML={{
                            __html: article.intro.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #fff">$1</strong>')
                        }} style={{ fontSize: '1.2rem', lineHeight: '1.8' }} />
                    </section>

                    <section style={{ marginBottom: '4rem' }}>
                        <h2>Key Features</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                            {article.features.map((feature, i) => (
                                <div key={i} style={{
                                    padding: '1.5rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    borderRadius: '8px',
                                    borderLeft: '3px solid var(--secondary)'
                                }}>
                                    <p style={{ margin: 0, color: '#ddd' }}>{feature}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section style={{ marginBottom: '4rem' }}>
                        <h2>Why Use {tool.name}?</h2>
                        <p>{article.whyUse}</p>
                    </section>

                    <section style={{ marginBottom: '4rem' }}>
                        <h2>How to Use</h2>
                        <div style={{
                            background: '#111',
                            borderRadius: '12px',
                            padding: '2rem',
                            border: '1px solid var(--card-border)'
                        }}>
                            <ol style={{ paddingLeft: '1.5rem' }}>
                                {article.howTo.map((step, i) => (
                                    <li key={i} style={{ marginBottom: '1.5rem', color: '#ccc', fontSize: '1.1rem' }}>
                                        <span dangerouslySetInnerHTML={{ __html: step }} />
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </section>

                    <section>
                        <h2>Conclusion</h2>
                        <p>{article.conclusion}</p>
                    </section>
                </div>
            </div>

            {/* Related Tools */}
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '5rem 0', marginTop: '5rem' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: '3rem', border: 'none' }}>Similar Tools</h2>
                    <div className="grid-cols-3">
                        {relatedTools.map(t => (
                            <Link key={t.id} href={`/tools/${t.slug}`} className="glass-card" style={{ textDecoration: 'none' }}>
                                <h4 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{t.name}</h4>
                                <p style={{ fontSize: '0.9rem', marginBottom: 0 }}>{t.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
