import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Championships', href: '#championships' },
  { label: 'Journey', href: '#journey' },
  { label: 'Benefits', href: '#benefits' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
        scrolled
          ? 'bg-surface-default/95 navbar-blur shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 lg:h-20">
          {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg p-1 -ml-1"
              aria-label="OMNI Skills Olympiad Home"
            >
            <img src="/logo.png" alt="OMNI Skills Olympiad Logo" className="h-10 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-text-primary leading-tight">
                OMNI
              </span>
              <span className="text-xs font-medium text-text-muted tracking-widest uppercase leading-tight">
                Skills Olympiad
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="px-3.5 py-2 text-[14px] font-medium text-text-secondary hover:text-text-primary rounded-lg hover:bg-surface-hover transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#cta"
              onClick={(e) => handleClick(e, '#cta')}
              className="hidden sm:inline-flex btn-primary !py-2.5 !px-5"
            >
              Register Now
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                    mobileOpen ? 'rotate-45 translate-y-2' : ''
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                    mobileOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`block w-5 h-0.5 bg-text-primary rounded-full transition-all duration-300 ${
                    mobileOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-18 bg-surface-default z-40 transition-all duration-400 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-6 py-8 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="py-3 px-4 text-lg font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover rounded-xl transition-all duration-200"
              style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-6 pt-6 border-t border-border-hairline">
            <a
              href="#cta"
              onClick={(e) => handleClick(e, '#cta')}
              className="w-full btn-primary"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
