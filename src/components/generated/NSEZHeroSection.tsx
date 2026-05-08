import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045
    }
  }
};
const wordVariants = {
  hidden: {
    y: '115%',
    opacity: 0,
    rotateX: 12
  },
  visible: {
    y: '0%',
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 28
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.52
    }
  }
};
const ctaVariants = {
  hidden: {
    opacity: 0,
    y: 18
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.74
    }
  }
};
const captionVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    scale: 0.97
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
const statsBarVariants = {
  hidden: {
    opacity: 0,
    y: 22
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.92
    }
  }
};
type HeadingWord = {
  id: string;
  text: string;
  accent?: boolean;
  trailingSpace: boolean;
};
const HEADING_WORDS: HeadingWord[] = [{
  id: 'w-nkomazi',
  text: 'Nkomazi',
  trailingSpace: true
}, {
  id: 'w-sez',
  text: 'SEZ:',
  trailingSpace: true
}, {
  id: 'w-the',
  text: 'The',
  trailingSpace: true
}, {
  id: 'w-strategic',
  text: 'Strategic',
  accent: true,
  trailingSpace: true
}, {
  id: 'w-gateway',
  text: 'Gateway',
  accent: true,
  trailingSpace: true
}, {
  id: 'w-to',
  text: 'to',
  trailingSpace: true
}, {
  id: 'w-southern',
  text: 'Southern',
  trailingSpace: true
}, {
  id: 'w-african',
  text: 'African',
  trailingSpace: true
}, {
  id: 'w-trade',
  text: 'Trade.',
  trailingSpace: false
}];
const STATS = [{
  id: 'stat-corridor',
  value: 'N4',
  label: 'Corridor Access'
}, {
  id: 'stat-border',
  value: 'Lebombo',
  label: 'Border Post'
}, {
  id: 'stat-tax',
  value: '15%',
  label: 'Corporate Tax Rate'
}];
const HERO_IMAGE_URL = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1920&q=80';
const HERO_VIDEO_URL = 'https://videos.pexels.com/video-files/3252669/3252669-uhd_2560_1440_25fps.mp4';
export function NSEZHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });
  const rawBgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const bgY = useSpring(rawBgY, {
    stiffness: 60,
    damping: 20,
    mass: 0.8
  });
  const rawContentY = useTransform(scrollYProgress, [0, 1], ['0px', '-60px']);
  const contentY = useSpring(rawContentY, {
    stiffness: 60,
    damping: 20,
    mass: 0.8
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  return <section ref={sectionRef} style={{
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  }} aria-label="Nkomazi SEZ Hero">
      {/* Parallax background */}
      <motion.div aria-hidden="true" style={{
      y: bgY,
      position: 'absolute',
      inset: '-15% 0',
      willChange: 'transform',
      overflow: 'hidden'
    }}>
        <video autoPlay muted loop playsInline aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
      }} poster={HERO_IMAGE_URL}>
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </video>
        <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.85) 100%)'
      }} />
      </motion.div>

      {/* Grid overlay */}
      <div aria-hidden="true" style={{
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
      backgroundSize: '80px 80px',
      pointerEvents: 'none',
      maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 75%, transparent 100%)'
    }} />

      {/* Hero content */}
      <motion.div style={{
      y: contentY,
      opacity: contentOpacity,
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 2,
      maxWidth: '1440px',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
      paddingLeft: '80px',
      paddingRight: '80px',
      paddingTop: '140px',
      paddingBottom: '96px',
      boxSizing: 'border-box'
    }} className="px-5 sm:px-10 md:px-20">
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '1009px',
        margin: '0 auto'
      }}>

          {/* Caption badge */}
          <motion.div initial="hidden" animate="visible" variants={captionVariants} style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'rgba(10,10,10,0.6)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '6px',
          padding: '4px 12px',
          marginBottom: '28px',
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#FFFFFF'
        }}>
            <motion.span animate={{
            opacity: [1, 0.35, 1]
          }} transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: 'easeInOut'
          }} style={{
            backgroundColor: '#ED8E0B',
            width: '8px',
            height: '8px',
            borderRadius: '2px',
            display: 'inline-block',
            flexShrink: 0
          }} aria-hidden="true" />
            <span>Maputo Development Corridor · Phase 1 Active</span>
          </motion.div>

          {/* Main heading — word-by-word stagger */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} aria-label="Nkomazi SEZ: The Strategic Gateway to Southern African Trade." style={{
          marginBottom: '32px'
        }}>
            <h1 style={{
            margin: 0,
            fontWeight: 600,
            fontSize: 'clamp(40px, 6vw, 88px)',
            lineHeight: 1.05,
            letterSpacing: '-2px',
            color: '#FFFFFF',
            perspective: '800px'
          }}>
              {HEADING_WORDS.map(word => <span key={word.id} style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom'
            }}>
                  <motion.span variants={wordVariants} style={{
                display: 'inline-block',
                color: word.accent ? '#ED8E0B' : '#FFFFFF'
              }}>
                    {word.text}
                  </motion.span>
                  {word.trailingSpace ? '\u00a0' : ''}
                </span>)}
            </h1>
          </motion.div>

          {/* Sub-headline */}
          <motion.p initial="hidden" animate="visible" variants={fadeUpVariants} style={{
          margin: '0 0 48px 0',
          fontSize: 'clamp(15px, 1.8vw, 18px)',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '661px'
        }}>
            A world-class industrial hub and One-Stop-Shop providing specialized incentives for
            global investors and comprehensive integration for local enterprises within the Maputo
            Development Corridor.
          </motion.p>

          {/* CTAs */}
          <motion.div initial="hidden" animate="visible" variants={ctaVariants} style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '72px'
        }}>
            <motion.a href="#" onClick={e => e.preventDefault()} whileHover={{
            scale: 1.025,
            borderColor: 'rgba(237,142,11,0.55)'
          }} whileTap={{
            scale: 0.975
          }} style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: 'rgba(10,10,10,0.9)',
            border: '0.8px solid rgba(255,255,255,0.15)',
            borderRadius: '14px',
            padding: '3px',
            height: '56px',
            textDecoration: 'none',
            overflow: 'hidden',
            cursor: 'pointer'
          }} aria-label="View Investment Opportunities">
              <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingRight: '24px'
            }}>
                <motion.div whileHover={{
                rotate: -8
              }} transition={{
                type: 'spring',
                stiffness: 300,
                damping: 18
              }} style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#ED8E0B',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexShrink: 0
              }}>
                  <ArrowRight size={20} color="#FFFFFF" strokeWidth={2.5} aria-hidden="true" />
                </motion.div>
                <span style={{
                fontFamily: '"IBM Plex Mono", monospace',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                whiteSpace: 'nowrap'
              }}>
                  View Investment Opportunities
                </span>
              </div>
            </motion.a>

            <motion.a href="#" onClick={e => e.preventDefault()} whileHover={{
            backgroundColor: 'rgba(255,255,255,0.11)',
            scale: 1.02
          }} whileTap={{
            scale: 0.975
          }} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'rgba(255,255,255,0.07)',
            color: '#FFFFFF',
            padding: '16px 28px',
            borderRadius: '14px',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            fontFamily: '"IBM Plex Mono", monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            border: '0.8px solid rgba(255,255,255,0.12)',
            height: '56px',
            boxSizing: 'border-box'
          }} aria-label="Access SMME Tender Board">
              <span>SMME Tender Board</span>
            </motion.a>
          </motion.div>

          {/* Quick stats bar */}
          <motion.div initial="hidden" animate="visible" variants={statsBarVariants} style={{
          display: 'flex',
          gap: '1px',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '0.8px solid rgba(255,255,255,0.1)',
          width: '100%',
          maxWidth: '600px',
          flexWrap: 'wrap'
        }}>
            {STATS.map(stat => <motion.div key={stat.id} whileHover={{
            backgroundColor: 'rgba(237,142,11,0.08)'
          }} transition={{
            duration: 0.25
          }} style={{
            flex: 1,
            minWidth: '120px',
            padding: '20px 24px',
            backgroundColor: 'rgba(10,10,10,0.7)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            borderRight: '0.8px solid rgba(255,255,255,0.07)',
            cursor: 'default'
          }}>
                <span style={{
              fontSize: 'clamp(20px, 2.5vw, 28px)',
              fontWeight: 700,
              color: '#ED8E0B',
              letterSpacing: '-0.5px',
              lineHeight: 1
            }}>
                  {stat.value}
                </span>
                <span style={{
              fontSize: '10px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontFamily: '"IBM Plex Mono", monospace'
            }}>
                  {stat.label}
                </span>
              </motion.div>)}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom divider */}
      <div aria-hidden="true" style={{
      position: 'relative',
      zIndex: 2,
      width: '100%',
      height: '1px',
      background: 'linear-gradient(90deg, transparent, rgba(237,142,11,0.4), transparent)'
    }} />
    </section>;
}