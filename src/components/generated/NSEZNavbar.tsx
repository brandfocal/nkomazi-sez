import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Menu } from 'lucide-react';
const NAV_LINKS = [{
  id: 'nav-invest',
  label: 'Investor Hub',
  href: '/investor-hub'
}, {
  id: 'nav-business',
  label: 'Enterprise Hub',
  href: '/enterprise-hub'
}, {
  id: 'nav-media',
  label: 'Media',
  section: 'media'
}, {
  id: 'nav-careers',
  label: 'Careers & Community',
  href: '/careers'
}, {
  id: 'nav-oss',
  label: 'One-Stop-Shop',
  section: 'oss'
}];
const LANGUAGES = [{
  id: 'lang-en',
  label: 'EN'
}, {
  id: 'lang-pt',
  label: 'PT'
}, {
  id: 'lang-zh',
  label: '中文'
}];
const SECTIONS = ['hero', 'stakeholders', 'kpi', 'advantages', 'tools', 'procurement', 'footer'];
export function NSEZNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeLang, setActiveLang] = useState('lang-en');
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(scrollY > 40);
      setScrollProgress(docHeight > 0 ? scrollY / docHeight * 100 : 0);
      const total = document.documentElement.scrollHeight;
      const bands = [0, 0.13, 0.25, 0.38, 0.55, 0.7, 0.88];
      const ratio = scrollY / total;
      let active = SECTIONS[0];
      for (let i = bands.length - 1; i >= 0; i--) {
        if (ratio >= bands[i]) {
          active = SECTIONS[i];
          break;
        }
      }
      setActiveSection(active);
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const activeLinkId = (() => {
    if (activeSection === 'invest' || activeSection === 'hero') return 'nav-invest';
    if (activeSection === 'smme' || activeSection === 'stakeholders') return 'nav-business';
    return null;
  })();
  return <React.Fragment>
      {/* Sticky navbar */}
      <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      transition: 'background-color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
      backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.25)' : 'none'
    }} role="banner">
        <nav style={{
        maxWidth: '1440px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '40px',
        paddingRight: '40px',
        paddingTop: '18px',
        paddingBottom: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box'
      }} role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 flex items-center no-underline" aria-label="Nkomazi SEZ – Home">
            <img src="/nsez-logo-white.png" alt="Nkomazi SEZ" className="h-12 w-auto object-contain max-w-none" />
          </a>

          {/* Desktop nav links */}
          <ul style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          listStyle: 'none',
          margin: 0,
          padding: 0
        }} className="hidden lg:flex">
            {NAV_LINKS.map(link => {
            const isActive = activeLinkId === link.id;
            return <li key={link.id}>
                  <a href={link.href || "#"} onClick={e => {
                if (!link.href) e.preventDefault();
              }} style={{
                display: 'inline-block',
                color: isActive ? '#ED8E0B' : 'rgba(255,255,255,0.55)',
                fontSize: '11px',
                fontWeight: isActive ? 700 : 500,
                textDecoration: 'none',
                letterSpacing: '0.06em',
                fontFamily: '"IBM Plex Mono", monospace',
                textTransform: 'uppercase',
                padding: '7px 13px',
                borderRadius: '7px',
                backgroundColor: isActive ? 'rgba(237,142,11,0.12)' : 'transparent',
                border: isActive ? '1px solid rgba(237,142,11,0.3)' : '1px solid transparent',
                transition: 'all 0.2s ease'
              }} onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF';
              }} onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)';
              }}>
                    {link.label}
                  </a>
                </li>;
          })}
          </ul>

          {/* Right: Lang + CTA + mobile trigger */}
          <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
            {/* Language pills */}
            <div style={{
            display: 'flex',
            gap: '3px'
          }} className="hidden sm:flex">
              {LANGUAGES.map(lang => <button key={lang.id} onClick={() => setActiveLang(lang.id)} style={{
              padding: '4px 9px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: 600,
              fontFamily: '"IBM Plex Mono", monospace',
              letterSpacing: '0.05em',
              backgroundColor: activeLang === lang.id ? '#ED8E0B' : 'rgba(255,255,255,0.07)',
              color: activeLang === lang.id ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
              transition: 'all 0.2s ease'
            }} aria-pressed={activeLang === lang.id} aria-label={`Switch to ${lang.label}`}>
                  {lang.label}
                </button>)}
            </div>

            {/* Invest Now CTA */}
            <a href="#" onClick={e => e.preventDefault()} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ED8E0B',
            color: '#FFFFFF',
            padding: '9px 18px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 700,
            textDecoration: 'none',
            fontFamily: '"IBM Plex Mono", monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.2s ease, transform 0.2s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = '1';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
          }} className="hidden sm:inline-flex">
              <span>Invest Now</span>
              <ArrowRight size={11} strokeWidth={2.5} aria-hidden="true" />
            </a>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease'
          }} aria-label="Toggle mobile menu" aria-expanded={mobileOpen} className="lg:hidden">
              {mobileOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {/* Scroll progress bar */}
        <div aria-hidden="true" style={{
        height: '2px',
        backgroundColor: 'rgba(237,142,11,0.15)',
        width: '100%'
      }}>
          <div style={{
          height: '100%',
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, rgba(237,142,11,0.5), #ED8E0B)',
          transition: 'width 0.1s linear'
        }} />
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && <motion.div key="mobile-menu" initial={{
        opacity: 0,
        y: -8
      }} animate={{
        opacity: 1,
        y: 0
      }} exit={{
        opacity: 0,
        y: -8
      }} transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1]
      }} style={{
        position: 'fixed',
        top: '68px',
        left: '16px',
        right: '16px',
        zIndex: 99,
        backgroundColor: '#171717',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.5)'
      }}>
            <ul style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
              {NAV_LINKS.map(link => <li key={link.id}>
                  <a href={link.href || "#"} onClick={e => {
              if (!link.href) e.preventDefault();
              setMobileOpen(false);
            }} style={{
              display: 'block',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '12px',
              fontWeight: 600,
              textDecoration: 'none',
              fontFamily: '"IBM Plex Mono", monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '12px 14px',
              borderRadius: '10px',
              transition: 'background-color 0.15s ease, color 0.15s ease'
            }} onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(237,142,11,0.1)';
              (e.currentTarget as HTMLAnchorElement).style.color = '#ED8E0B';
            }} onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)';
            }}>
                    {link.label}
                  </a>
                </li>)}
            </ul>

            <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          marginTop: '12px',
          paddingTop: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
              <div style={{
            display: 'flex',
            gap: '6px'
          }}>
                {LANGUAGES.map(lang => <button key={lang.id} onClick={() => setActiveLang(lang.id)} style={{
              padding: '6px 12px',
              borderRadius: '7px',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 600,
              fontFamily: '"IBM Plex Mono", monospace',
              backgroundColor: activeLang === lang.id ? '#ED8E0B' : 'transparent',
              color: activeLang === lang.id ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
              transition: 'all 0.2s ease'
            }}>
                    {lang.label}
                  </button>)}
              </div>
              <a href="#" onClick={e => e.preventDefault()} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            backgroundColor: '#ED8E0B',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 700,
            textDecoration: 'none',
            fontFamily: '"IBM Plex Mono", monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
                <span>Invest Now</span>
                <ArrowRight size={11} strokeWidth={2.5} aria-hidden="true" />
              </a>
            </div>
          </motion.div>}
      </AnimatePresence>
    </React.Fragment>;
}