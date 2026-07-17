export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skill Championships', href: '#championships' },
    { label: 'Journey', href: '#journey' },
    { label: 'Benefits', href: '#benefits' },
  ];

  const moreLinks = [
    { label: 'Ecosystem', href: '#ecosystem' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Register', href: '#cta' },
  ];

  return (
    <footer id="footer" className="border-t border-surface-dark bg-bg-inverse">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-brand-primary flex items-center justify-center">
                <span className="text-text-inverse font-bold text-sm">O</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-text-inverse leading-tight">OMNI</span>
                <span className="text-xs font-medium text-text-muted tracking-widest uppercase leading-tight">
                  Skills Olympiad
                </span>
              </div>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              India's Largest Skills Olympiad. Empowering learners through hands-on competitions, innovation, and industry collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-text-muted uppercase tracking-[0.15em] mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-sm text-text-muted hover:text-text-inverse transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="text-xs font-bold text-text-muted uppercase tracking-[0.15em] mb-5">Explore</h4>
            <ul className="space-y-3">
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-sm text-text-muted hover:text-text-inverse transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-xs font-bold text-text-muted uppercase tracking-[0.15em] mb-5">Connect</h4>
            <p className="text-sm text-text-muted mb-5">
              Follow us on social media for updates.
            </p>
            <div className="flex gap-3">
              {/* Twitter / X */}
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-surface-dark flex items-center justify-center text-text-secondary hover:bg-brand-primary/10 hover:text-brand-primary transition-all duration-200"
                aria-label="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-surface-dark flex items-center justify-center text-text-secondary hover:bg-brand-primary/10 hover:text-brand-primary transition-all duration-200"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-surface-dark flex items-center justify-center text-text-secondary hover:bg-brand-primary/10 hover:text-brand-primary transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-surface-dark flex items-center justify-center text-text-secondary hover:bg-brand-primary/10 hover:text-brand-primary transition-all duration-200"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-surface-dark flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            © {currentYear} OMNI Skills Olympiad. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-text-secondary hover:text-text-inverse transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-text-secondary hover:text-text-inverse transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
