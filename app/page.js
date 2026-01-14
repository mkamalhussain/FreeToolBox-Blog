import Link from 'next/link';
import Image from 'next/image';
import ToolGrid from '../components/ToolGrid';
import tools from '../data/tools.json';

export default function Home() {
  // Use "PDF Compressor" as the default hero article for now
  const heroTool = tools.find(t => t.id === 'pdf-compressor') || tools[0];
  const allTools = tools.filter(t => t.id !== heroTool.id);

  return (
    <div>
      {/* Editorial Hero Section */}
      <section style={{ padding: '4rem 0', borderBottom: '1px solid var(--card-border)' }}>
        <div className="container">
          <Link href={`/tools/${heroTool.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div style={{ height: '500px', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
                <Image
                  src="/images/hero-pdf.png"
                  alt="Featured Tool"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div>
                <div style={{ textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  Featured Article
                </div>
                <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '1.5rem', color: '#fff' }}>
                  {heroTool.name}
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#aaa', marginBottom: '2rem', lineHeight: '1.6' }}>
                  {heroTool.description} Discover how to optimize your workflow with our top-rated secure document processing tool.
                </p>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#666' }}>
                  <span>Oct 24, 2024</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Main Grid Section */}
      <section id="categories" style={{ padding: '6rem 0' }}>
        <div className="container">
          <ToolGrid tools={allTools} />
        </div>
      </section>
    </div>
  );
}
