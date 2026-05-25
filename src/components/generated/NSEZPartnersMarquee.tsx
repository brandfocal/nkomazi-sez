import React, { useRef, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, useInView } from 'framer-motion';
type PartnerLogo = {
  id: string;
  src: string;
  alt: string;
};
const PARTNER_LOGOS: PartnerLogo[] = [
  {
    id: 'partner-dp-world',
    src: '/partners/dp-world.png',
    alt: 'DP World'
  },
  {
    id: 'partner-dtic',
    src: '/partners/dtic.png',
    alt: 'DTIC'
  },
  {
    id: 'partner-ed',
    src: '/partners/economic-development-tourism.png',
    alt: 'Economic Development and Tourism'
  },
  {
    id: 'partner-ehlanzeni',
    src: '/partners/ehlanzeni-district-municipality.png',
    alt: 'Ehlanzeni District Municipality'
  },
  {
    id: 'partner-nkomazi',
    src: '/partners/nkomazi-local-municipality.png',
    alt: 'Nkomazi Local Municipality'
  }
];
const SPEED = 40;
const GAP = 48;
function MarqueeTrack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const itemWidthRef = useRef(0);
  useEffect(() => {
    if (trackRef.current) {
      const singleSet = trackRef.current.children[0] as HTMLElement;
      if (singleSet) {
        itemWidthRef.current = singleSet.offsetWidth + GAP;
      }
    }
  }, []);
  useAnimationFrame((_, delta) => {
    const loopWidth = itemWidthRef.current;
    if (loopWidth === 0) return;
    let current = x.get() - SPEED * delta / 1000;
    if (current <= -loopWidth) {
      current = current + loopWidth;
    }
    x.set(current);
  });
  const sets = [0, 1, 2];
  return <div style={{
    overflow: 'hidden',
    width: '100%'
  }} aria-label="Scrolling partner logos">
      <motion.div ref={trackRef} style={{
      x,
      display: 'flex',
      alignItems: 'center',
      gap: `${GAP}px`,
      willChange: 'transform'
    }}>
        {sets.map(setIndex => <div key={setIndex} style={{
        display: 'flex',
        alignItems: 'center',
        gap: `${GAP}px`,
        flexShrink: 0
      }}>
            {PARTNER_LOGOS.map(logo => <motion.div key={`${setIndex}-${logo.id}`} whileHover={{
          scale: 1.1,
          opacity: 1
        }} style={{
          flexShrink: 0,
          opacity: 0.7,
          transition: 'opacity 0.25s'
        }}>
                <img src={logo.src} alt={logo.alt} loading="lazy" style={{
            display: 'inline-block',
            verticalAlign: 'middle',
            maxWidth: '100%',
            height: 'auto'
          }} />
              </motion.div>)}
          </div>)}
      </motion.div>
    </div>;
}
export function NSEZPartnersMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3
  });
  return <motion.section ref={sectionRef} initial={{
    opacity: 0,
    y: 32
  }} animate={isInView ? {
    opacity: 1,
    y: 0
  } : {
    opacity: 0,
    y: 32
  }} transition={{
    duration: 0.75,
    ease: [0.22, 1, 0.36, 1]
  }} style={{
    backgroundColor: '#F2F5F9'
  }} className="w-full px-10 py-16" aria-label="Partners we work with">
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      rowGap: '48px'
    }}>
        {/* Caption */}
        <motion.div initial={{
        opacity: 0,
        y: 12
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {
        opacity: 0,
        y: 12
      }} transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1
      }} style={{
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
          <span>Partners we work with</span>
        </motion.div>

        {/* Marquee */}
        <MarqueeTrack />
      </div>
    </motion.section>;
}