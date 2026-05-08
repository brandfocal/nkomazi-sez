import React, { useState } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Route, Truck, Factory } from 'lucide-react';
type AdvantageTab = {
  id: string;
  label: string;
  labelWords: HeadingWord[];
  icon: React.ReactNode;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  tags: string[];
};
type IndustrialCluster = {
  id: string;
  label: string;
  color: string;
};
type HeadingWord = {
  id: string;
  text: string;
  trailingSpace: boolean;
};

/* ── Heading word arrays (outside component) ── */
const HEADING_WORDS: HeadingWord[] = [{
  id: 'w-strategic',
  text: 'Strategic',
  trailingSpace: true
}, {
  id: 'w-advantages',
  text: 'Advantages',
  trailingSpace: false
}];
const TAB_CONNECTIVITY_WORDS: HeadingWord[] = [{
  id: 'tc-connectivity',
  text: 'Connectivity',
  trailingSpace: true
}, {
  id: 'tc-hub',
  text: 'Hub',
  trailingSpace: false
}];
const TAB_CUSTOMS_WORDS: HeadingWord[] = [{
  id: 'tcu-customs',
  text: 'Customs',
  trailingSpace: true
}, {
  id: 'tcu-controlled',
  text: 'Controlled',
  trailingSpace: true
}, {
  id: 'tcu-area',
  text: 'Area',
  trailingSpace: false
}];
const TAB_CLUSTERS_WORDS: HeadingWord[] = [{
  id: 'tcl-industrial',
  text: 'Industrial',
  trailingSpace: true
}, {
  id: 'tcl-clusters',
  text: 'Clusters',
  trailingSpace: false
}];
const ADVANTAGE_TABS: AdvantageTab[] = [{
  id: 'adv-connectivity',
  label: 'Connectivity Hub',
  labelWords: TAB_CONNECTIVITY_WORDS,
  icon: <Route size={22} strokeWidth={1.5} aria-hidden="true" />,
  image: 'https://images.unsplash.com/photo-1462396240927-52058a6a84ec?auto=format&fit=crop&w=900&q=80',
  imageAlt: 'Aerial view of a major highway interchange showing road connectivity and transport infrastructure.',
  paragraphs: ['Direct access to the N4 National Highway and the Maputo Development Corridor, providing essential road and rail links to the Port of Maputo and South African markets.', 'Strategic positioning ensures that goods move efficiently across borders, reducing logistics costs and transit times for all industrial operators within the zone.'],
  tags: ['N4 Highway', 'Rail Corridor', 'Port Access']
}, {
  id: 'adv-customs',
  label: 'Customs Controlled Area',
  labelWords: TAB_CUSTOMS_WORDS,
  icon: <Truck size={22} strokeWidth={1.5} aria-hidden="true" />,
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
  imageAlt: 'Customs-controlled logistics yard at Lebombo Border Post with freight trucks awaiting clearance.',
  paragraphs: ['Efficient logistics handling with proximity to the Lebombo Border Post for seamless cross-border trade. Expedited customs clearance protocols minimize dwell times.', 'Our dedicated customs-controlled environment ensures duty-free imports of capital equipment and raw materials, significantly reducing the cost base for manufacturing operations.'],
  tags: ['Lebombo Border', 'Duty-Free Zone', 'Streamlined Clearance']
}, {
  id: 'adv-clusters',
  label: 'Industrial Clusters',
  labelWords: TAB_CLUSTERS_WORDS,
  icon: <Factory size={22} strokeWidth={1.5} aria-hidden="true" />,
  image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
  imageAlt: 'Industrial facility at the Nkomazi SEZ showing modern manufacturing infrastructure within the Maputo Development Corridor.',
  paragraphs: ['Dedicated infrastructure for Agro-processing, Logistics, Automotive, and Green Energy sectors. Each cluster features purpose-built facilities and shared utilities.', 'The cluster model fosters supply chain synergies, knowledge transfer, and collaborative growth — creating a self-reinforcing ecosystem of industrial excellence.'],
  tags: ['Agro-processing', 'Logistics', 'Automotive', 'Green Energy']
}];
const CLUSTERS: IndustrialCluster[] = [{
  id: 'cluster-agro',
  label: 'Agro-processing',
  color: '#036537'
}, {
  id: 'cluster-logistics',
  label: 'Logistics & Warehousing',
  color: '#ED8E0B'
}, {
  id: 'cluster-auto',
  label: 'Automotive Assembly',
  color: '#F7B721'
}, {
  id: 'cluster-energy',
  label: 'Green Energy',
  color: '#9EC3A1'
}];

/* ── Animation variants ── */
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
const fadeUpVariants = {
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
const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 1.05
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.1
    }
  }
};

/* Stagger container */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07
    }
  }
};

/* Tab label stagger — tighter */
const tabContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06
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
const contentVariants = {
  hidden: {
    opacity: 0,
    height: 0
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
const chipStaggerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07
    }
  }
};
const chipVariants = {
  hidden: {
    opacity: 0,
    scale: 0.88,
    y: 10
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};
export function NSEZAdvantagesSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const imageParallaxRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.06
  });
  const {
    scrollYProgress
  } = useScroll({
    target: imageParallaxRef,
    offset: ['start end', 'end start']
  });
  const rawImgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imgParallaxY = useSpring(rawImgY, {
    stiffness: 55,
    damping: 18,
    mass: 0.8
  });
  const [activeTab, setActiveTab] = useState<string>('adv-connectivity');
  const activeTabData = ADVANTAGE_TABS.find(t => t.id === activeTab) ?? ADVANTAGE_TABS[0];
  return <section ref={sectionRef} style={{
    width: '100%',
    backgroundColor: '#0a0a0a'
  }} aria-label="Strategic Advantages">
      <div style={{
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
          <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: '64px'
        }}>

            {/* Header */}
            <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '16px',
            textAlign: 'center'
          }}>

              {/* Caption */}
              <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={captionVariants} style={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '10px',
              fontFamily: '"IBM Plex Mono", monospace',
              color: '#FFFFFF',
              fontSize: '14px',
              lineHeight: '19.8px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              backgroundColor: '#171717',
              borderRadius: '6px',
              padding: '4px 12px',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
                <span style={{
                backgroundColor: '#ED8E0B',
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                flexShrink: 0,
                display: 'inline-block'
              }} aria-hidden="true" />
                <span>Strategic Advantages</span>
              </motion.div>

              {/* Staggered h2 */}
              <div style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '16px'
            }}>
                <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={containerVariants} aria-label="Strategic Advantages">
                  <h2 style={{
                  margin: 0,
                  fontWeight: 600,
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  lineHeight: 1.16,
                  color: '#FFFFFF',
                  letterSpacing: '-0.5px'
                }}>
                    {HEADING_WORDS.map(word => <span key={word.id} style={{
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

                <motion.p initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUpVariants} style={{
                margin: 0,
                color: 'rgba(255,255,255,0.75)',
                maxWidth: '465px',
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                  Positioned at the heart of the Maputo Development Corridor, NSEZ delivers
                  unrivalled logistics, regulatory, and industrial advantages.
                </motion.p>
              </div>
            </div>

            {/* Card block: image + tabs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 w-full">

              {/* Image with parallax */}
              <motion.div ref={imageParallaxRef} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={imageVariants} style={{
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              minHeight: '320px'
            }}>
                <AnimatePresence mode="wait">
                  <motion.figure key={activeTabData.id} initial={{
                  opacity: 0,
                  scale: 1.05
                }} animate={{
                  opacity: 1,
                  scale: 1
                }} exit={{
                  opacity: 0,
                  scale: 0.97
                }} transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1]
                }} style={{
                  margin: 0,
                  padding: 0,
                  height: '100%',
                  display: 'block',
                  overflow: 'hidden'
                }}>
                    <motion.img src={activeTabData.image} alt={activeTabData.imageAlt} loading="lazy" style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    minHeight: '320px',
                    y: imgParallaxY
                  }} />
                  </motion.figure>
                </AnimatePresence>
              </motion.div>

              {/* Tabs */}
              <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeUpVariants} style={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '24px'
            }} role="tablist" aria-label="Strategic Advantage tabs">
                {ADVANTAGE_TABS.map(tab => {
                const isActive = activeTab === tab.id;
                return <motion.div key={tab.id} role="tab" aria-selected={isActive} onClick={() => setActiveTab(tab.id)} whileHover={!isActive ? {
                  borderColor: 'rgba(255,255,255,0.15)',
                  scale: 1.005
                } : {}} transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 22
                }} style={{
                  backgroundColor: '#171717',
                  border: `0.8px solid ${isActive ? 'rgba(237,142,11,0.4)' : 'rgba(255,255,255,0.07)'}`,
                  borderRadius: '20px',
                  padding: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '0px',
                  transition: 'border-color 0.3s ease'
                }}>
                      {/* Tab title row — staggered h3 */}
                      <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#FFFFFF'
                  }}>
                        <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      columnGap: '16px'
                    }}>
                          <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: isActive ? 'rgba(237,142,11,0.15)' : 'rgba(255,255,255,0.07)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isActive ? '#ED8E0B' : 'rgba(255,255,255,0.5)',
                        flexShrink: 0,
                        transition: 'background-color 0.3s ease, color 0.3s ease'
                      }}>
                            {tab.icon}
                          </div>
                          {/* Staggered h3 label */}
                          <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={tabContainerVariants} aria-label={tab.label}>
                            <h3 style={{
                          margin: 0,
                          fontSize: 'clamp(18px, 2vw, 26px)',
                          lineHeight: '1.3',
                          fontWeight: 600,
                          color: '#FFFFFF'
                        }}>
                              {tab.labelWords.map(word => <span key={word.id} style={{
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
                            </h3>
                          </motion.div>
                        </div>

                        {/* Plus / minus icon */}
                        <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '32px',
                      height: '32px',
                      flexShrink: 0
                    }} aria-hidden="true">
                          <span style={{
                        display: 'block',
                        width: '20px',
                        height: '1.5px',
                        backgroundColor: '#FFFFFF'
                      }} />
                          <span style={{
                        display: 'block',
                        width: '1.5px',
                        height: '20px',
                        backgroundColor: '#FFFFFF',
                        marginLeft: '-10.75px',
                        transition: 'opacity 0.3s ease, transform 0.3s ease',
                        opacity: isActive ? 0 : 1,
                        transform: isActive ? 'scaleY(0)' : 'scaleY(1)'
                      }} />
                        </div>
                      </div>

                      {/* Expandable content */}
                      <AnimatePresence initial={false}>
                        {isActive && <motion.div key={`content-${tab.id}`} initial="hidden" animate="visible" exit="exit" variants={contentVariants} style={{
                      overflow: 'hidden'
                    }} role="tabpanel">
                            <div style={{
                        paddingTop: '32px',
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: '20px'
                      }}>
                              {tab.paragraphs.map((para, pIdx) => <motion.p key={`${tab.id}-p-${pIdx}`} initial={{
                          opacity: 0,
                          y: 10
                        }} animate={{
                          opacity: 1,
                          y: 0
                        }} transition={{
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                          delay: 0.08 * pIdx
                        }} style={{
                          margin: 0,
                          color: 'rgba(255,255,255,0.72)',
                          fontSize: '15px',
                          lineHeight: '1.65'
                        }}>
                                  {para}
                                </motion.p>)}
                              <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px',
                          paddingTop: '4px'
                        }}>
                                {tab.tags.map((tag, tIdx) => <motion.span key={tag} initial={{
                            opacity: 0,
                            scale: 0.85
                          }} animate={{
                            opacity: 1,
                            scale: 1
                          }} transition={{
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                            delay: 0.15 + tIdx * 0.06
                          }} whileHover={{
                            scale: 1.06,
                            backgroundColor: 'rgba(237,142,11,0.2)'
                          }} style={{
                            display: 'inline-block',
                            backgroundColor: 'rgba(237,142,11,0.12)',
                            border: '0.8px solid rgba(237,142,11,0.3)',
                            borderRadius: '6px',
                            padding: '4px 12px',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#ED8E0B',
                            fontFamily: '"IBM Plex Mono", monospace',
                            letterSpacing: '0.04em',
                            cursor: 'default'
                          }}>
                                    {tag}
                                  </motion.span>)}
                              </div>
                            </div>
                          </motion.div>}
                      </AnimatePresence>
                    </motion.div>;
              })}
              </motion.div>
            </div>

            {/* Cluster chips */}
            <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={chipStaggerVariants} style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center'
          }}>
              {CLUSTERS.map(cluster => <motion.span key={cluster.id} variants={chipVariants} whileHover={{
              scale: 1.06,
              backgroundColor: 'rgba(255,255,255,0.06)'
            }} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              backgroundColor: '#171717',
              border: '0.8px solid rgba(255,255,255,0.08)',
              borderRadius: '999px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '-0.1px',
              cursor: 'default'
            }}>
                  <span style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: cluster.color,
                display: 'inline-block',
                flexShrink: 0
              }} aria-hidden="true" />
                  {cluster.label}
                </motion.span>)}
            </motion.div>
          </div>
        </div>
      </div>
    </section>;
}