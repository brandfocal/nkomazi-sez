import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const BARS = [{
  id: 'bar-1',
  delay: 0
}, {
  id: 'bar-2',
  delay: 0.06
}, {
  id: 'bar-3',
  delay: 0.12
}, {
  id: 'bar-4',
  delay: 0.18
}, {
  id: 'bar-5',
  delay: 0.24
}];
const barVariants = {
  initial: {
    scaleY: 1
  },
  exit: (delay: number) => ({
    scaleY: 0,
    transition: {
      duration: 0.72,
      ease: [0.76, 0, 0.24, 1],
      delay: delay
    }
  })
};
const logoVariants = {
  initial: {
    opacity: 0,
    scale: 0.88
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1
    }
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
const lineVariants = {
  initial: {
    scaleX: 0
  },
  animate: {
    scaleX: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.25
    }
  },
  exit: {
    scaleX: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
export function NSEZPageTransition() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1100);
    return () => clearTimeout(timer);
  }, []);
  return <AnimatePresence>
      {visible && <motion.div key="page-transition" style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      pointerEvents: 'none'
    }} aria-hidden="true">
          {BARS.map(bar => <motion.div key={bar.id} custom={bar.delay} initial="initial" animate="exit" variants={barVariants} style={{
        flex: 1,
        backgroundColor: '#0a0a0a',
        transformOrigin: 'top',
        height: '100%'
      }} />)}

          {/* Centered logo mark */}
          <motion.div variants={logoVariants} initial="initial" animate="animate" exit="exit" style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        zIndex: 10000,
        pointerEvents: 'none'
      }}>
            <img src="/NSEZ-logo.jpg" alt="Nkomazi SEZ" className="h-16 w-auto object-contain max-w-none rounded-md" />
          </motion.div>
        </motion.div>}
    </AnimatePresence>;
}