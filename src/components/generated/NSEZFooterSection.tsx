import React, { useState } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, Globe, Shield, BookOpen } from 'lucide-react';
type TenderItem = {
  id: string;
  number: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  category: string;
  closingDate: string;
  status: 'open' | 'closing-soon';
  description: string;
};
type AnnouncementItem = {
  id: string;
  number: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  date: string;
  tag: string;
  description: string;
};
type FooterLink = {
  id: string;
  label: string;
};
type ContactItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string;
};
type HeadingWord = {
  id: string;
  text: string;
  trailingSpace: boolean;
};
type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
};
const CORNER_BG = '#F2F5F9';
const TENDERS: TenderItem[] = [{
  id: 'tender-001',
  number: '01.',
  imageSrc: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  imageAlt: 'Civil engineering road construction works for Phase 1B infrastructure',
  title: 'Civil Engineering Works – Phase 1B Road Infrastructure',
  closingDate: '15 August 2026',
  category: 'Infrastructure',
  status: 'open',
  description: 'Procurement of civil engineering services for road construction and grading works across Phase 1B of the NSEZ development corridor. Registered contractors only.'
}, {
  id: 'tender-002',
  number: '02.',
  imageSrc: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
  imageAlt: 'Solar PV panel installation on industrial rooftop',
  title: 'Supply & Installation of Solar PV Systems – Industrial Zone',
  closingDate: '02 September 2026',
  category: 'Green Energy',
  status: 'open',
  description: 'Design, supply and installation of a grid-tied solar photovoltaic system for the NSEZ industrial precinct. Minimum 500kW capacity. CIDB Grade 6EP required.'
}, {
  id: 'tender-003',
  number: '03.',
  imageSrc: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
  imageAlt: 'Security perimeter fencing and access control gate at an industrial zone',
  title: 'Security Services Contract – NSEZ Perimeter & Access Points',
  closingDate: '29 July 2026',
  category: 'Security',
  status: 'closing-soon',
  description: 'Provision of armed and unarmed security personnel, CCTV monitoring, and access control management across all NSEZ perimeter and entry points.'
}];
const ANNOUNCEMENTS: AnnouncementItem[] = [{
  id: 'ann-001',
  number: '01.',
  imageSrc: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
  imageAlt: 'Infrastructure development and construction progress at the NSEZ site',
  title: 'Update on Phase 1 Infrastructure Development',
  date: '18 July 2026',
  tag: 'Infrastructure',
  description: 'Phase 1 bulk infrastructure works are 68% complete. Road grading, stormwater management and perimeter fencing installations are on schedule for Q4 2026 handover.'
}, {
  id: 'ann-002',
  number: '02.',
  imageSrc: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
  imageAlt: 'Business leaders signing strategic partnership agreement documents',
  title: 'NSEZ Strategic Partnership Agreements 2026',
  date: '04 July 2026',
  tag: 'Partnerships',
  description: 'NSEZ has concluded three new strategic partnership agreements with regional and international investors in the agro-processing and logistics sectors.'
}, {
  id: 'ann-003',
  number: '03.',
  imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  imageAlt: 'Digital portal dashboard for business registration and one-stop-shop access',
  title: 'One-Stop-Shop Portal Launch: Streamlined Business Registration',
  date: '22 June 2026',
  tag: 'Operations',
  description: 'The NSEZ One-Stop-Shop digital portal is now live, enabling investors and operators to complete business registration, licencing and compliance filing in a single workflow.'
}];
const FOOTER_LINKS: FooterLink[] = [{
  id: 'fl-invest',
  label: 'Invest'
}, {
  id: 'fl-business',
  label: 'Business (SMME)'
}, {
  id: 'fl-media',
  label: 'Media'
}, {
  id: 'fl-careers',
  label: 'Careers'
}, {
  id: 'fl-oss',
  label: 'One-Stop-Shop'
}, {
  id: 'fl-about',
  label: 'About NSEZ'
}, {
  id: 'fl-contact',
  label: 'Contact'
}, {
  id: 'fl-tenders',
  label: 'Tenders'
}];
const CONTACTS: ContactItem[] = [{
  id: 'contact-investor',
  icon: <Mail size={14} strokeWidth={1.5} aria-hidden="true" />,
  label: 'Investor Relations',
  value: 'invest@nsez.co.za'
}, {
  id: 'contact-smme',
  icon: <Phone size={14} strokeWidth={1.5} aria-hidden="true" />,
  label: 'SMME Support Desk',
  value: '+27 (0)13 000 1200'
}, {
  id: 'contact-general',
  icon: <Globe size={14} strokeWidth={1.5} aria-hidden="true" />,
  label: 'General Inquiries',
  value: 'info@nsez.co.za'
}];
const LANGUAGES = [{
  id: 'lang-en',
  label: 'English',
  code: 'EN'
}, {
  id: 'lang-pt',
  label: 'Portuguese',
  code: 'PT'
}, {
  id: 'lang-zh',
  label: 'Mandarin',
  code: '中文'
}];
const LEGAL_LINKS = ['Privacy Policy', 'Terms of Use', 'Accessibility'];
const SOCIAL_LINKS: SocialLink[] = [{
  id: 'social-linkedin',
  label: 'LinkedIn',
  href: '#',
  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
}, {
  id: 'social-x',
  label: 'X (Twitter)',
  href: '#',
  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
}, {
  id: 'social-facebook',
  label: 'Facebook',
  href: '#',
  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
}, {
  id: 'social-youtube',
  label: 'YouTube',
  href: '#',
  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
}];

// social icon stagger variant
const socialIconVariants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: 10
  },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.7 + i * 0.08
    }
  })
};

/* ── Heading word arrays (outside component) ── */
const PROCUREMENT_HEADING_WORDS: HeadingWord[] = [{
  id: 'ph-tenders',
  text: 'Tenders,',
  trailingSpace: true
}, {
  id: 'ph-announcements',
  text: 'Announcements',
  trailingSpace: true
}, {
  id: 'ph-and',
  text: '&',
  trailingSpace: true
}, {
  id: 'ph-updates',
  text: 'Updates',
  trailingSpace: false
}];

/* ── Animation variants ─────────────────────────────────── */
const sectionVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.97
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
const captionVariants = {
  hidden: {
    opacity: 0,
    y: 12
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
const headingVariants = {
  hidden: {
    opacity: 0,
    y: 22
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1
    }
  }
};
const gridVariants = {
  enter: {
    opacity: 0,
    y: 18
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

/* Stagger container for headings */
const headingContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07
    }
  }
};
const headingWordVariants = {
  hidden: {
    y: '110%',
    opacity: 0
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Enhanced staggered footer column variants — slide up + fade + subtle x drift
const footerColVariants = {
  hidden: {
    opacity: 0,
    y: 48,
    x: -8
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.15 + i * 0.14
    }
  })
};

// Stagger wrapper for footer columns
const footerRowVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1
    }
  }
};

// Individual footer nav link stagger
const footerLinkVariants = {
  hidden: {
    opacity: 0,
    x: -12
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.4 + i * 0.055
    }
  })
};

// Contact item stagger
const contactItemVariants = {
  hidden: {
    opacity: 0,
    y: 14
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.5 + i * 0.1
    }
  })
};

// Badge variants
const badgeVariants = {
  hidden: {
    opacity: 0,
    x: -16
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.6 + i * 0.1
    }
  })
};

// Bottom bar line
const bottomBarVariants = {
  hidden: {
    opacity: 0,
    y: 16
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.6
    }
  }
};

// Divider line reveal
const dividerVariants = {
  hidden: {
    scaleX: 0
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1
    }
  }
};
export function NSEZFooterSection() {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const footerRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.05
  });
  const isFooterInView = useInView(footerRef, {
    once: true,
    amount: 0.08
  });
  const {
    scrollYProgress: headerScrollY
  } = useScroll({
    target: headerRef,
    offset: ['start end', 'end start']
  });
  const rawHeaderY = useTransform(headerScrollY, [0, 1], ['-6%', '6%']);
  const headerParallaxY = useSpring(rawHeaderY, {
    stiffness: 55,
    damping: 18,
    mass: 0.8
  });
  const [activeLang, setActiveLang] = useState('lang-en');
  const [emailInput, setEmailInput] = useState('');
  const [activeTab, setActiveTab] = useState<'tenders' | 'announcements'>('tenders');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  return <div ref={sectionRef} style={{
    width: '100%',
    backgroundColor: CORNER_BG
  }}>

      {/* ── Procurement & Media Center ── */}
      <section style={{
      width: '100%'
    }} aria-label="Procurement and Media Center">
        <div style={{
        maxWidth: '1440px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '96px',
        paddingBottom: '96px',
        boxSizing: 'border-box'
      }} className="px-5 sm:px-10 md:px-20">
          <div ref={headerRef}>
            {/* Section header */}
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '16px',
            textAlign: 'center',
            marginBottom: '56px'
          }}>
              <motion.div style={{
              y: headerParallaxY
            }} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={captionVariants}>
                <div style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '10px',
                fontFamily: '"IBM Plex Mono", monospace',
                color: '#101218',
                fontSize: '14px',
                lineHeight: '19.8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                backgroundColor: CORNER_BG,
                borderRadius: '6px',
                padding: '4px 12px',
                border: '1px solid #e4e4e7'
              }}>
                  <span style={{
                  backgroundColor: '#ED8E0B',
                  width: '10px',
                  height: '10px',
                  borderRadius: '2px',
                  flexShrink: 0,
                  display: 'inline-block'
                }} aria-hidden="true" />
                  <span>Procurement &amp; Media Center</span>
                </div>
              </motion.div>

              <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={headingContainerVariants} aria-label="Tenders, Announcements &amp; Updates">
                <h2 style={{
                margin: 0,
                fontWeight: 600,
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: 1.16,
                color: '#101218',
                letterSpacing: '-0.5px',
                maxWidth: '560px'
              }}>
                  {PROCUREMENT_HEADING_WORDS.map(word => <span key={word.id} style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  verticalAlign: 'bottom'
                }}>
                      <motion.span variants={headingWordVariants} style={{
                    display: 'inline-block'
                  }}>
                        {word.text}
                      </motion.span>
                      {word.trailingSpace ? '\u00a0' : ''}
                    </span>)}
                </h2>
              </motion.div>

              <motion.p initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={headingVariants} style={{
              margin: 0,
              fontSize: '16px',
              lineHeight: 1.65,
              color: '#696E77',
              maxWidth: '480px'
            }}>
                Stay informed on open procurement opportunities and the latest news from the Nkomazi SEZ.
              </motion.p>

              {/* Toggle tabs */}
              <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={headingVariants} style={{
              display: 'flex',
              gap: '4px',
              backgroundColor: '#e4e4e7',
              borderRadius: '12px',
              padding: '4px',
              marginTop: '8px',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }} role="tablist" aria-label="Toggle between tenders and announcements">
                <motion.button role="tab" aria-selected={activeTab === 'tenders'} onClick={() => setActiveTab('tenders')} whileTap={{
                scale: 0.96
              }} style={{
                padding: '9px 22px',
                borderRadius: '9px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: '"IBM Plex Mono", monospace',
                letterSpacing: '0.03em',
                transition: 'all 0.25s ease',
                backgroundColor: activeTab === 'tenders' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'tenders' ? '#101218' : '#696E77',
                boxShadow: activeTab === 'tenders' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'
              }}>
                  Active Tenders
                </motion.button>
                <motion.button role="tab" aria-selected={activeTab === 'announcements'} onClick={() => setActiveTab('announcements')} whileTap={{
                scale: 0.96
              }} style={{
                padding: '9px 22px',
                borderRadius: '9px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: '"IBM Plex Mono", monospace',
                letterSpacing: '0.03em',
                transition: 'all 0.25s ease',
                backgroundColor: activeTab === 'announcements' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'announcements' ? '#101218' : '#696E77',
                boxShadow: activeTab === 'announcements' ? '0 1px 4px rgba(0,0,0,0.08)' : 'none'
              }}>
                  Latest Announcements
                </motion.button>
              </motion.div>
            </div>

            {/* Cards grid */}
            <AnimatePresence mode="wait">
              {activeTab === 'tenders' && <motion.div key="tenders-grid" initial="enter" animate="visible" exit="exit" variants={gridVariants}>
                  <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={sectionVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {TENDERS.map(tender => <motion.article key={tender.id} variants={cardVariants} onMouseEnter={() => setHoveredId(tender.id)} onMouseLeave={() => setHoveredId(null)} whileHover={{
                  y: -6
                }} transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 22
                }} style={{
                  position: 'relative',
                  borderRadius: '30px',
                  overflow: 'hidden',
                  height: '500px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '32px 32px 60px 32px',
                  cursor: 'pointer',
                  backgroundColor: '#171717'
                }} aria-label={tender.title}>
                        <img src={tender.imageSrc} alt={tender.imageAlt} loading="lazy" style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '30px',
                    transform: hoveredId === tender.id ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.65s cubic-bezier(0.22,1,0.36,1)',
                    zIndex: 0
                  }} />
                        <span aria-hidden="true" style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '30px',
                    backgroundColor: 'rgb(0,0,0)',
                    opacity: 0.62,
                    zIndex: 1,
                    display: 'block'
                  }} />

                        {/* Number + status row */}
                        <div style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '0.8px solid rgba(255,255,255,0.4)',
                    paddingBottom: '15px'
                  }}>
                          <h6 style={{
                      margin: 0,
                      fontSize: '12px',
                      lineHeight: '12px',
                      fontWeight: 600,
                      color: '#ED8E0B',
                      letterSpacing: '0.04em'
                    }}>
                            {tender.number}
                          </h6>
                          {tender.status === 'closing-soon' && <span style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      color: 'rgb(254,100,100)',
                      backgroundColor: 'rgba(239,68,68,0.18)',
                      padding: '3px 9px',
                      borderRadius: '5px'
                    }}>
                              Closing Soon
                            </span>}
                        </div>

                        {/* Main content */}
                        <div style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                          <div style={{
                      marginBottom: '12px'
                    }}>
                            <span style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.5)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '3px 10px',
                        borderRadius: '5px'
                      }}>
                              {tender.category}
                            </span>
                          </div>
                          <div style={{
                      marginBottom: '10px'
                    }}>
                            <h4 style={{
                        margin: 0,
                        fontSize: 'clamp(18px, 2vw, 26px)',
                        lineHeight: '1.2',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        letterSpacing: '-0.5px'
                      }}>
                              {tender.title}
                            </h4>
                          </div>
                          <div style={{
                      marginBottom: '16px'
                    }}>
                            <p style={{
                        margin: 0,
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: 'rgba(255,255,255,0.6)'
                      }}>
                              {tender.description}
                            </p>
                          </div>
                          <a href="#" onClick={e => e.preventDefault()} style={{
                      display: 'inline-block',
                      fontSize: '12px',
                      lineHeight: '24px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      position: 'relative',
                      width: 'fit-content',
                      fontFamily: '"IBM Plex Mono", monospace',
                      letterSpacing: '0.02em'
                    }} aria-label={`Closing ${tender.closingDate}`}>
                            <span>Closing: {tender.closingDate}</span>
                            <span style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '1px',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        width: hoveredId === tender.id ? '100%' : '0%',
                        transition: 'width 0.35s cubic-bezier(0.47, 0.05, 0.5, 0.94)',
                        display: 'block'
                      }} aria-hidden="true" />
                          </a>
                        </div>

                        {/* Corner decoration */}
                        <div aria-hidden="true" style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '60px',
                    height: '60px',
                    backgroundColor: CORNER_BG,
                    borderRadius: '30px 0 0 0',
                    zIndex: 3
                  }} />
                        <div aria-hidden="true" style={{
                    position: 'absolute',
                    right: '60px',
                    bottom: '0px',
                    width: '30px',
                    height: '30px',
                    backgroundColor: CORNER_BG,
                    clipPath: 'path("M 30 0 Q 30 30 0 30 L 30 30 Z")',
                    zIndex: 3
                  }} />
                        <div aria-hidden="true" style={{
                    position: 'absolute',
                    right: '0px',
                    bottom: '60px',
                    width: '30px',
                    height: '30px',
                    backgroundColor: CORNER_BG,
                    clipPath: 'path("M 30 0 Q 30 30 0 30 L 30 30 Z")',
                    zIndex: 3,
                    transform: 'rotate(-90deg)'
                  }} />

                        <motion.a href="#" onClick={e => e.preventDefault()} aria-label={`View tender: ${tender.title}`} whileHover={{
                    scale: 1.1
                  }} whileTap={{
                    scale: 0.92
                  }} style={{
                    position: 'absolute',
                    right: '5px',
                    bottom: '5px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 4,
                    textDecoration: 'none',
                    flexShrink: 0
                  }}>
                          <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: '#101218',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                            <ArrowUpRight size={18} color="#FFFFFF" strokeWidth={2} aria-hidden="true" />
                          </div>
                        </motion.a>
                      </motion.article>)}
                  </motion.div>
                </motion.div>}

              {activeTab === 'announcements' && <motion.div key="announcements-grid" initial="enter" animate="visible" exit="exit" variants={gridVariants}>
                  <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={sectionVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {ANNOUNCEMENTS.map(ann => <motion.article key={ann.id} variants={cardVariants} onMouseEnter={() => setHoveredId(ann.id)} onMouseLeave={() => setHoveredId(null)} whileHover={{
                  y: -6
                }} transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 22
                }} style={{
                  position: 'relative',
                  borderRadius: '30px',
                  overflow: 'hidden',
                  height: '500px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '32px 32px 60px 32px',
                  cursor: 'pointer',
                  backgroundColor: '#171717'
                }} aria-label={ann.title}>
                        <img src={ann.imageSrc} alt={ann.imageAlt} loading="lazy" style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '30px',
                    transform: hoveredId === ann.id ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.65s cubic-bezier(0.22,1,0.36,1)',
                    zIndex: 0
                  }} />
                        <span aria-hidden="true" style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '30px',
                    backgroundColor: 'rgb(0,0,0)',
                    opacity: 0.62,
                    zIndex: 1,
                    display: 'block'
                  }} />

                        <div style={{
                    position: 'relative',
                    zIndex: 2,
                    borderBottom: '0.8px solid rgba(255,255,255,0.4)',
                    paddingBottom: '15px'
                  }}>
                          <h6 style={{
                      margin: 0,
                      fontSize: '12px',
                      lineHeight: '12px',
                      fontWeight: 600,
                      color: '#ED8E0B',
                      letterSpacing: '0.04em'
                    }}>
                            {ann.number}
                          </h6>
                        </div>

                        <div style={{
                    position: 'relative',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                          <div style={{
                      marginBottom: '12px',
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap',
                      alignItems: 'center'
                    }}>
                            <span style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '10px',
                        fontWeight: 700,
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.5)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '3px 10px',
                        borderRadius: '5px'
                      }}>
                              {ann.tag}
                            </span>
                            <span style={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        fontSize: '10px',
                        color: 'rgba(255,255,255,0.35)'
                      }}>
                              {ann.date}
                            </span>
                          </div>
                          <div style={{
                      marginBottom: '10px'
                    }}>
                            <h4 style={{
                        margin: 0,
                        fontSize: 'clamp(18px, 2vw, 26px)',
                        lineHeight: '1.2',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        letterSpacing: '-0.5px'
                      }}>
                              {ann.title}
                            </h4>
                          </div>
                          <div style={{
                      marginBottom: '16px'
                    }}>
                            <p style={{
                        margin: 0,
                        fontSize: '14px',
                        lineHeight: '1.6',
                        color: 'rgba(255,255,255,0.6)'
                      }}>
                              {ann.description}
                            </p>
                          </div>
                          <a href="#" onClick={e => e.preventDefault()} style={{
                      display: 'inline-block',
                      fontSize: '14px',
                      lineHeight: '24px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      textDecoration: 'none',
                      position: 'relative',
                      width: 'fit-content'
                    }} aria-label={`Read more: ${ann.title}`}>
                            <span>Read more</span>
                            <span style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '1px',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        width: hoveredId === ann.id ? '100%' : '0%',
                        transition: 'width 0.35s cubic-bezier(0.47, 0.05, 0.5, 0.94)',
                        display: 'block'
                      }} aria-hidden="true" />
                          </a>
                        </div>

                        {/* Corner decoration */}
                        <div aria-hidden="true" style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: '60px',
                    height: '60px',
                    backgroundColor: CORNER_BG,
                    borderRadius: '30px 0 0 0',
                    zIndex: 3
                  }} />
                        <div aria-hidden="true" style={{
                    position: 'absolute',
                    right: '60px',
                    bottom: '0px',
                    width: '30px',
                    height: '30px',
                    backgroundColor: CORNER_BG,
                    clipPath: 'path("M 30 0 Q 30 30 0 30 L 30 30 Z")',
                    zIndex: 3
                  }} />
                        <div aria-hidden="true" style={{
                    position: 'absolute',
                    right: '0px',
                    bottom: '60px',
                    width: '30px',
                    height: '30px',
                    backgroundColor: CORNER_BG,
                    clipPath: 'path("M 30 0 Q 30 30 0 30 L 30 30 Z")',
                    zIndex: 3,
                    transform: 'rotate(-90deg)'
                  }} />

                        <motion.a href="#" onClick={e => e.preventDefault()} aria-label={`Open announcement: ${ann.title}`} whileHover={{
                    scale: 1.1
                  }} whileTap={{
                    scale: 0.92
                  }} style={{
                    position: 'absolute',
                    right: '5px',
                    bottom: '5px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 4,
                    textDecoration: 'none',
                    flexShrink: 0
                  }}>
                          <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      backgroundColor: '#101218',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                            <ArrowUpRight size={18} color="#FFFFFF" strokeWidth={2} aria-hidden="true" />
                          </div>
                        </motion.a>
                      </motion.article>)}
                  </motion.div>
                </motion.div>}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer ref={footerRef} style={{
      width: '100%',
      backgroundColor: '#0a0a0a',
      borderTop: '0.8px solid rgba(255,255,255,0.06)'
    }} aria-label="Footer">
        <div style={{
        maxWidth: '1440px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '72px',
        paddingBottom: '72px',
        boxSizing: 'border-box'
      }} className="px-5 sm:px-10 md:px-20">
          {/* Animated divider line */}
          <motion.div initial="hidden" animate={isFooterInView ? 'visible' : 'hidden'} variants={dividerVariants} style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(237,142,11,0.35), transparent)',
          transformOrigin: 'left',
          marginBottom: '64px'
        }} aria-hidden="true" />

          {/* Top footer row — staggered column animation */}
          <motion.div initial="hidden" animate={isFooterInView ? 'visible' : 'hidden'} variants={footerRowVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-16">
            {/* ── Brand column ── */}
            <motion.div custom={0} variants={footerColVariants} style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px'
          }}>
              <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
                <img src="/nsez-logo-white.png" alt="Nkomazi SEZ" className="h-12 w-auto object-contain max-w-none" />
              </div>

              <p style={{
              margin: 0,
              fontSize: '14px',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.5)'
            }}>
                A world-class industrial hub positioned at the heart of the Maputo Development
                Corridor, driving investment, trade, and regional prosperity.
              </p>

              {/* Compliance badges — staggered */}
              <div style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '8px'
            }}>
                {[{
                icon: <Shield size={13} strokeWidth={1.5} aria-hidden="true" />,
                label: 'POPIA Compliant'
              }, {
                icon: <BookOpen size={13} strokeWidth={1.5} aria-hidden="true" />,
                label: 'SEZ Act No. 15 of 2014'
              }].map((badge, bIdx) => <motion.div key={badge.label} custom={bIdx} variants={badgeVariants} whileHover={{
                borderColor: 'rgba(237,142,11,0.35)',
                x: 4
              }} transition={{
                type: 'spring',
                stiffness: 300,
                damping: 22
              }} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#171717',
                border: '0.8px solid rgba(255,255,255,0.07)',
                borderRadius: '8px',
                padding: '8px 12px',
                width: 'fit-content',
                cursor: 'default'
              }}>
                    <span style={{
                  color: '#ED8E0B',
                  display: 'flex'
                }}>{badge.icon}</span>
                    <span style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.55)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}>
                      {badge.label}
                    </span>
                  </motion.div>)}
              </div>

              {/* Social media icons */}
              <div>
                <p style={{
                margin: '0 0 12px 0',
                fontSize: '10px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: '"IBM Plex Mono", monospace'
              }}>
                  Follow Us
                </p>
                <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                  {SOCIAL_LINKS.map((social, sIdx) => <motion.a key={social.id} href={social.href} onClick={e => e.preventDefault()} custom={sIdx} initial="hidden" animate={isFooterInView ? 'visible' : 'hidden'} variants={socialIconVariants} whileHover={{
                  scale: 1.15,
                  backgroundColor: '#ED8E0B',
                  borderColor: '#ED8E0B',
                  color: '#FFFFFF'
                }} whileTap={{
                  scale: 0.9
                }} aria-label={social.label} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#171717',
                  border: '0.8px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  flexShrink: 0,
                  transition: 'background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease'
                }}>
                      {social.icon}
                    </motion.a>)}
                </div>
              </div>
            </motion.div>

            {/* ── Navigation column ── */}
            <motion.div custom={1} variants={footerColVariants}>
              <motion.h4 initial={{
              opacity: 0,
              y: 10
            }} animate={isFooterInView ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 10
            }} transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.3
            }} style={{
              margin: '0 0 20px 0',
              fontSize: '11px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: '"IBM Plex Mono", monospace'
            }}>
                Navigation
              </motion.h4>
              <ul style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              rowGap: '12px'
            }}>
                {FOOTER_LINKS.map((link, lIdx) => <motion.li key={link.id} custom={lIdx} initial="hidden" animate={isFooterInView ? 'visible' : 'hidden'} variants={footerLinkVariants}>
                    <motion.a href="#" onClick={e => e.preventDefault()} whileHover={{
                  x: 5,
                  color: '#FFFFFF'
                }} transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 22
                }} style={{
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '14px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  letterSpacing: '-0.1px',
                  display: 'inline-block'
                }}>
                      {link.label}
                    </motion.a>
                  </motion.li>)}
              </ul>
            </motion.div>

            {/* ── Contact column ── */}
            <motion.div custom={2} variants={footerColVariants}>
              <motion.h4 initial={{
              opacity: 0,
              y: 10
            }} animate={isFooterInView ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 10
            }} transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.44
            }} style={{
              margin: '0 0 20px 0',
              fontSize: '11px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: '"IBM Plex Mono", monospace'
            }}>
                Direct Contact
              </motion.h4>
              <ul style={{
              listStyle: 'none',
              margin: '0 0 32px 0',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              rowGap: '16px'
            }}>
                {CONTACTS.map((contact, cIdx) => <motion.li key={contact.id} custom={cIdx} initial="hidden" animate={isFooterInView ? 'visible' : 'hidden'} variants={contactItemVariants} style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '3px'
              }}>
                    <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontFamily: '"IBM Plex Mono", monospace'
                }}>
                      {contact.icon}
                      <span>{contact.label}</span>
                    </span>
                    <motion.a href="#" onClick={e => e.preventDefault()} whileHover={{
                  color: '#ED8E0B',
                  x: 3
                }} transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 22
                }} style={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '13px',
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontFamily: '"IBM Plex Mono", monospace',
                  paddingLeft: '20px',
                  display: 'inline-block'
                }}>
                      {contact.value}
                    </motion.a>
                  </motion.li>)}
              </ul>
            </motion.div>

            {/* ── Stay Updated column (4th) ── */}
            <motion.div custom={3} variants={footerColVariants} style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '24px'
          }}>
              <motion.h4 initial={{
              opacity: 0,
              y: 10
            }} animate={isFooterInView ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 10
            }} transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.58
            }} style={{
              margin: 0,
              fontSize: '11px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: '"IBM Plex Mono", monospace'
            }}>
                Stay Updated
              </motion.h4>

              {/* Language selector */}
              <motion.div initial={{
              opacity: 0,
              y: 12
            }} animate={isFooterInView ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 12
            }} transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.66
            }}>
                <p style={{
                margin: '0 0 10px 0',
                fontSize: '10px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontFamily: '"IBM Plex Mono", monospace'
              }}>
                  Language
                </p>
                <div style={{
                display: 'flex',
                gap: '6px',
                flexWrap: 'wrap'
              }}>
                  {LANGUAGES.map(lang => <motion.button key={lang.id} onClick={() => setActiveLang(lang.id)} whileHover={{
                  scale: 1.06
                }} whileTap={{
                  scale: 0.94
                }} style={{
                  padding: '7px 14px',
                  borderRadius: '8px',
                  border: '0.8px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 600,
                  fontFamily: '"IBM Plex Mono", monospace',
                  letterSpacing: '0.04em',
                  backgroundColor: activeLang === lang.id ? '#ED8E0B' : 'transparent',
                  color: activeLang === lang.id ? '#FFFFFF' : 'rgba(255,255,255,0.4)',
                  transition: 'background-color 0.2s ease, color 0.2s ease'
                }} aria-pressed={activeLang === lang.id} aria-label={`Switch to ${lang.label}`}>
                      {lang.code}
                    </motion.button>)}
                </div>
              </motion.div>

              {/* Email signup card */}
              <motion.div initial={{
              opacity: 0,
              y: 20,
              scale: 0.97
            }} animate={isFooterInView ? {
              opacity: 1,
              y: 0,
              scale: 1
            } : {
              opacity: 0,
              y: 20,
              scale: 0.97
            }} transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.78
            }} style={{
              backgroundColor: '#171717',
              borderRadius: '20px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              rowGap: '14px',
              border: '0.8px solid rgba(255,255,255,0.06)'
            }}>
                <div>
                  <p style={{
                  margin: '0 0 4px 0',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  letterSpacing: '-0.2px'
                }}>
                    Newsletter
                  </p>
                  <p style={{
                  margin: 0,
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.4)',
                  fontFamily: '"IBM Plex Mono", monospace',
                  lineHeight: 1.55
                }}>
                    Receive tender alerts, news &amp; investment updates
                  </p>
                </div>
                <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                  <input type="email" value={emailInput} onChange={e => setEmailInput(e.target.value)} placeholder="your@email.com" style={{
                  width: '100%',
                  boxSizing: 'border-box',
                  padding: '11px 16px',
                  borderRadius: '10px',
                  border: '0.8px solid rgba(255,255,255,0.1)',
                  backgroundColor: 'rgba(255,255,255,0.07)',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: 'inherit'
                }} aria-label="Email address for updates" />
                  <motion.button whileHover={{
                  opacity: 0.88,
                  scale: 1.02
                }} whileTap={{
                  scale: 0.95
                }} style={{
                  width: '100%',
                  padding: '11px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  backgroundColor: '#ED8E0B',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: '"IBM Plex Mono", monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom bar */}
          <motion.div initial="hidden" animate={isFooterInView ? 'visible' : 'hidden'} variants={bottomBarVariants} style={{
          borderTop: '0.8px solid rgba(255,255,255,0.07)',
          paddingTop: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
            <p style={{
            margin: 0,
            fontSize: '12px',
            color: 'rgba(255,255,255,0.2)',
            fontFamily: '"IBM Plex Mono", monospace'
          }}>
              <span>© {new Date().getFullYear()} Nkomazi Special Economic Zone. All rights reserved.</span>
            </p>
            <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
              {LEGAL_LINKS.map(item => <motion.a key={item} href="#" onClick={e => e.preventDefault()} whileHover={{
              color: 'rgba(255,255,255,0.55)'
            }} style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.2)',
              textDecoration: 'none',
              fontFamily: '"IBM Plex Mono", monospace'
            }}>
                  {item}
                </motion.a>)}
            </div>
          </motion.div>
        </div>
      </footer>
    </div>;
}