import './globals.css'

export const metadata = {
  title: 'FreeToolbox Blog - Premium Tools & Insights',
  description: 'Detailed guides and articles for the best free online tools.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="hero-pattern" />
        <nav style={{
          borderBottom: '1px solid var(--card-border)',
          backdropFilter: 'blur(10px)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div className="container" style={{
            height: 'var(--header-height)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <a href="/" style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              Free<span className="gradient-text">Toolbox</span> Blog
            </a>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="/" style={{ color: '#fff', fontWeight: '500' }}>Home</a>
              <a href="/#categories" style={{ color: '#aaa', fontWeight: '500' }}>Categories</a>
              <a href="https://freetoolbox.app" target="_blank" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>
                Open App
              </a>
            </div>
          </div>
        </nav>
        <main style={{ minHeight: 'calc(100vh - var(--header-height) - 100px)' }}>
          {children}
        </main>
        <footer style={{
          borderTop: '1px solid var(--card-border)',
          padding: '4rem 0',
          marginTop: '6rem',
          textAlign: 'center',
          color: '#666'
        }}>
          <div className="container">
            <p>&copy; {new Date().getFullYear()} FreeToolbox Blog. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
