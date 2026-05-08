import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Users, PackageSearch, Briefcase } from 'lucide-react';
type PortalCard = {
  id: string;
  number: string;
  imageSrc: string;
  imageAlt: string;
  iconSrc: string;
  title: string;
  description: string;
  cta: string;
};
type KPICard = {
  id: string;
  numericValue: number;
  displayPrefix: string;
  displaySuffix: string;
  unit: string;
  label: string;
  note: string;
  live: boolean;
  decimals: number;
};
type HeadingWord = {
  id: string;
  text: string;
  trailingSpace: boolean;
};
const PORTAL_CARDS: PortalCard[] = [{
  id: 'portal-investors',
  number: '01.',
  imageSrc: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  imageAlt: 'Global investors reviewing industrial facility investment documents',
  iconSrc: 'https://demo2.wpopal.com/spaciaz/wp-content/uploads/2025/04/building-1.svg',
  title: 'Fiscal Incentives Designed to Scale',
  description: 'Leverage high-impact fiscal incentives, including 15% corporate tax, duty-free imports, and streamlined regulatory support to scale your industrial operations.',
  cta: 'Explore Incentives'
}, {
  id: 'portal-smme',
  number: '02.',
  imageSrc: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
  imageAlt: 'SMME business owner working with supply chain partners',
  iconSrc: 'https://demo2.wpopal.com/spaciaz/wp-content/uploads/2025/04/layer.svg',
  title: 'Access the SEZ Supply Chain',
  description: 'Access the SEZ supply chain through our vendor registration portal, procurement bulletins, and enterprise development resources to grow within the corridor ecosystem.',
  cta: 'Register as Vendor'
}, {
  id: 'portal-community',
  number: '03.',
  imageSrc: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
  imageAlt: 'Community members and talent exploring economic development opportunities',
  iconSrc: 'https://demo2.wpopal.com/spaciaz/wp-content/uploads/2025/04/house.svg',
  title: 'Shared Growth & Opportunity',
  description: 'Explore regional economic impact, community development milestones, and direct employment opportunities within the zone. Building local capacity is central to our mandate.',
  cta: 'View Opportunities'
}];
const KPI_CARDS: KPICard[] = [{
  id: 'kpi-investment-full',
  numericValue: 4.2,
  displayPrefix: 'R',
  displaySuffix: 'B',
  unit: '+',
  label: 'Total Investment Secured',
  note: 'Committed capital to date',
  live: true,
  decimals: 1
}, {
  id: 'kpi-jobs-full',
  numericValue: 3800,
  displayPrefix: '',
  displaySuffix: '',
  unit: '+',
  label: 'Direct Jobs Created',
  note: 'Phase 1 & 2 combined',
  live: true,
  decimals: 0
}, {
  id: 'kpi-vendors-full',
  numericValue: 240,
  displayPrefix: '',
  displaySuffix: '',
  unit: '+',
  label: 'Registered SMME Vendors',
  note: 'Active supply chain partners',
  live: false,
  decimals: 0
}, {
  id: 'kpi-infra',
  numericValue: 68,
  displayPrefix: '',
  displaySuffix: '',
  unit: '%',
  label: 'Infrastructure Progress',
  note: 'Phase 1 completion',
  live: true,
  decimals: 0
}];
const KPI_ICONS = [TrendingUp, Users, PackageSearch, Briefcase];

/* ── Heading word arrays (outside component) ── */
const PORTALS_HEADING_WORDS: HeadingWord[] = [{
  id: 'pw-your',
  text: 'Your',
  trailingSpace: true
}, {
  id: 'pw-gateway',
  text: 'gateway,',
  trailingSpace: true
}, {
  id: 'pw-tailored',
  text: 'tailored',
  trailingSpace: true
}, {
  id: 'pw-to',
  text: 'to',
  trailingSpace: true
}, {
  id: 'pw-your-role',
  text: 'your role',
  trailingSpace: false
}];
const DASHBOARD_HEADING_WORDS: HeadingWord[] = [{
  id: 'w-live',
  text: 'Live',
  trailingSpace: true
}, {
  id: 'w-performance',
  text: 'performance,',
  trailingSpace: true
}, {
  id: 'w-real',
  text: 'real',
  trailingSpace: true
}, {
  id: 'w-impact',
  text: 'impact.',
  trailingSpace: false
}];

/* ── Animation variants ── */
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
const descVariants = {
  hidden: {
    opacity: 0,
    y: 18
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.28
    }
  }
};

/* Stagger container for headings */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055
    }
  }
};
const wordVariants = {
  hidden: {
    y: '110%',
    opacity: 0
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
const kpiVariants = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.15 + i * 0.1
    }
  })
};
function AnimatedKPIValue({
  kpi,
  shouldAnimate
}: {
  kpi: KPICard;
  shouldAnimate: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);
  useEffect(() => {
    if (!shouldAnimate || hasAnimated.current) return;
    hasAnimated.current = true;
    const controls = animate(0, kpi.numericValue, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(value) {
        setDisplayValue(value);
      }
    });
    return () => controls.stop();
  }, [shouldAnimate, kpi.numericValue]);
  const formatted = kpi.decimals > 0 ? displayValue.toFixed(kpi.decimals) : Math.round(displayValue).toLocaleString();
  return <span style={{
    fontSize: 'clamp(22px, 2.5vw, 32px)',
    fontWeight: 700,
    color: '#101218',
    letterSpacing: '-1.5px',
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums'
  }}>
      {kpi.displayPrefix}{formatted}{kpi.displaySuffix}
    </span>;
}
export function NSEZStakeholderSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const kpiRowRef = React.useRef<HTMLDivElement>(null);
  const parallaxRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.06
  });
  const isKpiRowInView = useInView(kpiRowRef, {
    once: true,
    amount: 0.3
  });
  const {
    scrollYProgress
  } = useScroll({
    target: parallaxRef,
    offset: ['start end', 'end start']
  });
  const rawParallaxY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const parallaxY = useSpring(rawParallaxY, {
    stiffness: 55,
    damping: 18,
    mass: 0.8
  });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  return <section ref={sectionRef} style={{
    width: '100%'
  }} aria-label="Stakeholder Access Portals and Key Performance Indicators">

      {/* ── Access Portals ── */}
      <div style={{
      backgroundColor: '#F2F5F9',
      width: '100%'
    }}>
        <div style={{
        maxWidth: '1440px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '80px',
        paddingRight: '80px',
        paddingTop: '96px',
        paddingBottom: '96px',
        boxSizing: 'border-box'
      }} className="px-5 sm:px-10 md:px-20">
          {/* Section header */}
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '16px',
          textAlign: 'center',
          marginBottom: '64px'
        }}>

            {/* Caption */}
            <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={captionVariants} style={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '10px',
            fontFamily: '"IBM Plex Mono", monospace',
            color: '#101218',
            fontSize: '14px',
            lineHeight: '19.8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            backgroundColor: '#F2F5F9',
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
              <span>Access Portals</span>
            </motion.div>

            {/* Staggered h2 heading */}
            <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={containerVariants} aria-label="Your gateway, tailored to your role">
              <h2 style={{
              margin: 0,
              fontWeight: 600,
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.16,
              color: '#101218',
              letterSpacing: '-0.5px',
              maxWidth: '560px'
            }}>
                {PORTALS_HEADING_WORDS.map(word => <span key={word.id} style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom'
              }}>
                    <motion.span variants={wordVariants} style={{
                  display: 'inline-block'
                }}>
                      {word.text}
                    </motion.span>
                    {word.trailingSpace ? '\u00a0' : ''}
                  </span>)}
              </h2>
            </motion.div>

            <motion.p initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={descVariants} style={{
            margin: 0,
            fontSize: '16px',
            lineHeight: 1.65,
            color: '#696E77',
            maxWidth: '480px'
          }}>
              Whether you're a global investor, local enterprise, or community member — the Nkomazi
              SEZ has a dedicated pathway for you.
            </motion.p>
          </div>

          {/* Portal cards */}
          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={sectionVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PORTAL_CARDS.map((card, index) => <motion.article key={card.id} variants={cardVariants} onMouseEnter={() => setHoveredId(card.id)} onMouseLeave={() => setHoveredId(null)} whileHover={{
            y: -6
          }} transition={{
            type: 'spring',
            stiffness: 280,
            damping: 22
          }} style={{
            position: 'relative',
            borderRadius: '30px',
            overflow: 'hidden',
            aspectRatio: '410 / 480',
            cursor: 'pointer'
          }} aria-label={card.title}>
                {/* Background image */}
                <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '30px',
              overflow: 'hidden'
            }}>
                  <img src={card.imageSrc} alt={card.imageAlt} loading={index < 3 ? 'eager' : 'lazy'} style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: hoveredId === card.id ? 'scale(1.06)' : 'scale(1.2)',
                transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
                borderRadius: '25px'
              }} />
                  <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: hoveredId === card.id ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.4)',
                borderRadius: '30px',
                transition: 'background-color 0.4s ease'
              }} aria-hidden="true" />
                </div>

                {/* Content panel */}
                <div style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: '#FFFFFF',
              borderRadius: '30px',
              padding: '28px 32px 32px',
              transform: hoveredId === card.id ? 'translateY(0%)' : 'translateY(calc(100% - 52px))',
              transition: 'transform 0.48s cubic-bezier(0.22, 1, 0.36, 1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0'
            }}>
                  <span style={{
                display: 'block',
                fontSize: '12px',
                lineHeight: '14px',
                fontWeight: 600,
                color: '#101218',
                borderBottom: '0.8px solid #e4e4e7',
                paddingBottom: '14px',
                letterSpacing: '0.04em'
              }}>
                    {card.number}
                  </span>
                  <div style={{
                marginTop: '20px',
                marginBottom: '16px'
              }}>
                    <img src={card.iconSrc} alt={`${card.title} icon`} loading="lazy" style={{
                  display: 'block',
                  width: '44px',
                  height: '44px'
                }} />
                  </div>
                  <h3 style={{
                margin: '0 0 10px 0',
                fontWeight: 700,
                fontSize: 'clamp(18px, 1.8vw, 24px)',
                lineHeight: 1.22,
                letterSpacing: '-0.5px',
                color: '#101218'
              }}>
                    {card.title}
                  </h3>
                  <p style={{
                margin: 0,
                fontSize: '14px',
                lineHeight: '22px',
                color: '#696E77',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                    {card.description}
                  </p>
                </div>

                {/* Arrow button */}
                <motion.a href="#" onClick={e => e.preventDefault()} aria-label={`${card.cta} — ${card.title}`} whileHover={{
              scale: 1.12
            }} whileTap={{
              scale: 0.92
            }} style={{
              position: 'absolute',
              right: '40px',
              bottom: hoveredId === card.id ? '24px' : '-30px',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              backgroundColor: '#ED8E0B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'bottom 0.48s cubic-bezier(0.22, 1, 0.36, 1)',
              zIndex: 10,
              textDecoration: 'none',
              flexShrink: 0
            }}>
                  <ArrowUpRight size={18} color="#FFFFFF" strokeWidth={2} aria-hidden="true" />
                </motion.a>
              </motion.article>)}
          </motion.div>
        </div>
      </div>

      {/* ── Live Performance Dashboard ── */}
      <div ref={parallaxRef} style={{
      backgroundColor: '#F2F5F9',
      width: '100%'
    }}>
        <div style={{
        maxWidth: '1440px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '80px',
        paddingRight: '80px',
        paddingTop: '0',
        paddingBottom: '96px',
        boxSizing: 'border-box'
      }} className="px-5 sm:px-10 md:px-20">
          {/* Divider */}
          <div style={{
          width: '100%',
          height: '0.8px',
          backgroundColor: '#e4e4e7',
          marginBottom: '96px'
        }} aria-hidden="true" />

          {/* Two-column layout */}
          <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '40px'
        }} className="flex-col lg:flex-row">

            {/* Left: Caption badge with parallax */}
            <motion.div style={{
            y: parallaxY
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
              backgroundColor: '#F2F5F9',
              borderRadius: '6px',
              padding: '4px 12px',
              border: '1px solid #e4e4e7',
              flexShrink: 0
            }}>
                <span style={{
                backgroundColor: '#ED8E0B',
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                flexShrink: 0,
                display: 'inline-block'
              }} aria-hidden="true" />
                <span>Live Dashboard</span>
              </div>
            </motion.div>

            {/* Right: Heading + Stat Cards */}
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '56px',
            maxWidth: '996px',
            width: '100%'
          }}>

              {/* Staggered h2 heading */}
              <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={containerVariants} aria-label="Live performance, real impact.">
                <h2 style={{
                margin: 0,
                fontWeight: 600,
                fontSize: 'clamp(28px, 4vw, 48px)',
                lineHeight: 1.16,
                color: '#101218',
                letterSpacing: '-0.5px'
              }}>
                  {DASHBOARD_HEADING_WORDS.map(word => <span key={word.id} style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                  verticalAlign: 'bottom'
                }}>
                      <motion.span variants={wordVariants} style={{
                    display: 'inline-block'
                  }}>
                        {word.text}
                      </motion.span>
                      {word.trailingSpace ? '\u00a0' : ''}
                    </span>)}
                </h2>
              </motion.div>

              {/* KPI grid */}
              <div ref={kpiRowRef} style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1px',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '0.8px solid #e4e4e7'
            }} className="grid-cols-2 lg:grid-cols-4">
                {KPI_CARDS.map((kpi, i) => {
                const Icon = KPI_ICONS[i];
                return <motion.div key={kpi.id} custom={i} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={kpiVariants} whileHover={{
                  backgroundColor: '#f9f9fb',
                  scale: 1.02
                }} transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20
                }} style={{
                  backgroundColor: '#FFFFFF',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '16px',
                  borderRight: i < 3 ? '0.8px solid #e4e4e7' : 'none',
                  cursor: 'default'
                }}>
                      <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                        <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(237,142,11,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ED8E0B'
                    }}>
                          <Icon size={17} strokeWidth={1.5} aria-hidden="true" />
                        </div>
                        {kpi.live && <motion.span animate={{
                      opacity: [1, 0.4, 1]
                    }} transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '9px',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#101218',
                      backgroundColor: 'rgba(237,142,11,0.18)',
                      padding: '3px 8px',
                      borderRadius: '4px'
                    }}>
                            <span style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#ED8E0B',
                        display: 'inline-block',
                        flexShrink: 0
                      }} aria-hidden="true" />
                            <span>Live</span>
                          </motion.span>}
                      </div>
                      <div>
                        <div style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '2px'
                    }}>
                          <AnimatedKPIValue kpi={kpi} shouldAnimate={isKpiRowInView} />
                          <span style={{
                        fontSize: 'clamp(14px, 1.5vw, 18px)',
                        fontWeight: 700,
                        color: '#101218',
                        letterSpacing: '-0.5px'
                      }}>{kpi.unit}</span>
                        </div>
                        <p style={{
                      margin: '6px 0 0 0',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#696E77',
                      lineHeight: 1.4
                    }}>{kpi.label}</p>
                        <p style={{
                      margin: '3px 0 0 0',
                      fontSize: '10px',
                      color: 'rgba(16,18,24,0.4)',
                      fontFamily: '"IBM Plex Mono", monospace',
                      lineHeight: 1.4
                    }}>{kpi.note}</p>
                      </div>
                    </motion.div>;
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}