import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
export function NSEZScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <AnimatePresence>
      {visible && <motion.button key="scroll-to-top" onClick={scrollToTop} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} initial={{
      opacity: 0,
      y: 24,
      scale: 0.85
    }} animate={{
      opacity: 1,
      y: 0,
      scale: 1
    }} exit={{
      opacity: 0,
      y: 24,
      scale: 0.85
    }} transition={{
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }} whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.92
    }} aria-label="Scroll back to top" style={{
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      zIndex: 200,
      width: '52px',
      height: '52px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ED8E0B',
      boxShadow: hovered ? '0 12px 40px rgba(237,142,11,0.45), 0 4px 16px rgba(0,0,0,0.35)' : '0 6px 24px rgba(237,142,11,0.3), 0 2px 8px rgba(0,0,0,0.25)',
      transition: 'box-shadow 0.3s ease',
      padding: 0
    }}>
          {/* Pulsing ring */}
          <motion.span animate={{
        scale: [1, 1.55, 1],
        opacity: [0.45, 0, 0.45]
      }} transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: 'easeInOut'
      }} aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        border: '1.5px solid rgba(237,142,11,0.6)',
        pointerEvents: 'none'
      }} />
          <ArrowUp size={20} color="#FFFFFF" strokeWidth={2.5} aria-hidden="true" />
        </motion.button>}
    </AnimatePresence>;
}