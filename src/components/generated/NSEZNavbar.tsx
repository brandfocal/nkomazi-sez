import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const BODY_FONT = "'DM Sans', system-ui, sans-serif";

const ArrowUpRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M4.22748 12.7119C3.93459 13.0048 3.93459 13.4796 4.22748 13.7725C4.52038 14.0654 4.99525 14.0654 5.28814 13.7725L4.75781 13.2422L4.22748 12.7119ZM4.75781 13.2422L5.28814 13.7725L13.7734 5.28724L13.2431 4.75691L12.7128 4.22658L4.22748 12.7119L4.75781 13.2422Z" fill="currentColor" />
    <path d="M6.87891 4.75781H13.2429V11.1218" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.58844 6.47511C2.29705 6.47511 2.06083 6.71132 2.06083 7.00271C2.06083 7.2941 2.29705 7.53032 2.58844 7.53032V7.00271V6.47511ZM2.58844 7.00271V7.53032H11.0301V7.00271V6.47511H2.58844V7.00271Z" fill="currentColor" />
    <path d="M7.86448 3.83709L11.0301 7.00271L7.86448 10.1683" stroke="currentColor" strokeWidth="1.05521" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;

const GreenButton = ({
  label
}: {
  label: string;
}) => <motion.a href="/contact" className="group flex h-[44px] items-stretch no-underline relative overflow-hidden rounded-lg" whileHover={{
  y: -2,
  scale: 1.015
}} whileTap={{
  scale: 0.97
}} transition={{
  duration: 0.2,
  ease: 'easeOut'
}}>
    <div className="flex items-center justify-center px-5 bg-[#1A3C2E] text-white text-[15px] font-medium overflow-hidden rounded-l-lg tracking-[0.01em]" style={{
    fontFamily: BODY_FONT
  }}>{label}</div>
    <div className="flex items-center justify-center w-[44px] bg-[#1A3C2E] text-white rounded-r-lg flex-shrink-0"><ArrowRightIcon /></div>
    <div className="pointer-events-none absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 ease-in-out" style={{
    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)'
  }} />
  </motion.a>;

const NAV_SECTORS = ['Agro-Processing & Agriculture', 'Manufacturing', 'Green Economy', 'Logistics & Warehousing'];

const SectorsHoverDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1.5 text-white text-[15px] font-medium rounded-lg px-3 py-2.5 tracking-[0.01em] hover:bg-white/10 transition-all duration-300" style={{
      fontFamily: BODY_FONT,
      borderBottom: '2px solid transparent',
      transition: 'background 0.2s ease, border-color 0.2s ease'
    }} onMouseEnter={e => {
      (e.currentTarget as HTMLButtonElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
    }} onMouseLeave={e => {
      (e.currentTarget as HTMLButtonElement).style.borderBottomColor = 'transparent';
    }} aria-haspopup="true" aria-expanded={open}>
        Sectors
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 11 6" fill="none" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M9.63082 1.26563L6.37082 4.52563C5.98582 4.91063 5.35582 4.91063 4.97082 4.52563L1.71082 1.26562" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence>
        {open && <motion.div initial={{
        opacity: 0,
        y: -8,
        scale: 0.97
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: -8,
        scale: 0.97
      }} transition={{
        duration: 0.18,
        ease: 'easeOut'
      }} className="absolute top-full left-0 mt-2 z-[999]" style={{
        minWidth: '240px'
      }}>
            <div className="bg-[#1A3C2E] rounded-[8px] p-2.5 flex flex-col gap-0.5" style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        }}>
              {NAV_SECTORS.map(item => <a key={item} href="#" onClick={e => e.preventDefault()} className="block text-white text-[14px] font-medium rounded-lg px-3 py-2 transition-all duration-200 whitespace-nowrap no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#E8521A';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
          }}>{item}</a>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

export function NSEZNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NAV_SIMPLE_LINKS = [
    { label: 'About Us', href: '/#sec-about' },
    { label: 'Investor Hub', href: '/investor-hub' },
    { label: 'SMME Hub', href: '/enterprise-hub' },
    { label: 'Careers & Community', href: '/careers' },
    { label: 'Compliance Portal', href: '/compliance-portal' },
    { label: 'Contact', href: '/contact' }
  ];

  return <nav className="fixed top-0 left-0 right-0 z-[9999] px-4 sm:px-6" style={{
    paddingTop: scrolled ? '0px' : '20px',
    transition: 'padding 0.35s ease'
  }}>
      <div className="absolute inset-0" style={{
      opacity: scrolled ? 1 : 0,
      background: 'rgba(10, 24, 16, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      boxShadow: scrolled ? '0 1px 0 rgba(200,168,75,0.15)' : 'none',
      transition: 'background 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease'
    }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{
      background: 'linear-gradient(90deg, transparent, rgba(200,168,75,0.4), transparent)',
      opacity: scrolled ? 1 : 0,
      transition: 'opacity 0.35s ease'
    }} />
      <div className="relative flex justify-center">
        <div className="flex items-center justify-between w-full max-w-[1372px]" style={{
        paddingTop: scrolled ? '14px' : '0px',
        paddingBottom: scrolled ? '14px' : '0px',
        transition: 'padding 0.35s ease'
      }}>
          {/* ── Logo ── */}
          <a href="/" className="flex-shrink-0 flex items-center no-underline">
            <img src="/NSEZ-logo.jpg" alt="Nkomazi SEZ" className="h-8 sm:h-10 w-auto object-contain rounded-md" />
          </a>
          <div className="hidden lg:flex items-center gap-0 backdrop-blur-[26px] bg-white/10 border border-white/20 rounded-xl p-[4.6px]">
            <a href="/#sec-about" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT,
            borderBottom: '2px solid transparent',
            transition: 'background 0.2s ease, border-color 0.2s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
          }}>About Us</a>
            <SectorsHoverDropdown />
            <a href="/investor-hub" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT,
            borderBottom: '2px solid transparent',
            transition: 'background 0.2s ease, border-color 0.2s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
          }}>Investor Hub</a>
            <a href="/enterprise-hub" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT,
            borderBottom: '2px solid transparent',
            transition: 'background 0.2s ease, border-color 0.2s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
          }}>SMME Hub</a>
            <a href="/careers" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT,
            borderBottom: '2px solid transparent',
            transition: 'background 0.2s ease, border-color 0.2s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
          }}>Careers &amp; Community</a>
            <a href="/compliance-portal" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT,
            borderBottom: '2px solid transparent',
            transition: 'background 0.2s ease, border-color 0.2s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
          }}>Compliance Portal</a>
            <a href="/contact" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT,
            borderBottom: '2px solid transparent',
            transition: 'background 0.2s ease, border-color 0.2s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
          }}>Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden lg:block"><GreenButton label="Invest Now" /></div>
            <button className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full bg-[#1A3C2E] text-white flex-shrink-0" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.25
      }} className="relative lg:hidden mt-2 rounded-2xl bg-[#0F2419]/95 backdrop-blur-md overflow-hidden">
            <div className="p-4 flex flex-col gap-2">
              {NAV_SIMPLE_LINKS.map(link => <a key={link.label} href={link.href} onClick={e => {
                setMobileMenuOpen(false);
              }} className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 no-underline" style={{
                fontFamily: BODY_FONT
              }}>{link.label}</a>)}
              <div className="border-t border-white/10 pt-2 mt-1">
                <p className="text-white/40 text-xs font-semibold px-3 pb-1 uppercase tracking-widest" style={{
              fontFamily: BODY_FONT
            }}>Sectors</p>
                {NAV_SECTORS.map(s => <a key={s} href="#" onClick={e => {
              e.preventDefault();
              setMobileMenuOpen(false);
            }} className="block text-white/80 text-sm rounded-lg px-3 py-2 hover:bg-white/10 no-underline" style={{
              fontFamily: BODY_FONT
            }}>{s}</a>)}
              </div>
              <div className="pt-2"><GreenButton label="Invest Now" /></div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
}