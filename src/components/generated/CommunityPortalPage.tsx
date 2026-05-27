import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronUp, ArrowRight, ArrowUpRight, Users, FileText, Download, Award, Instagram, Linkedin, Twitter, MapPin } from 'lucide-react';
import { NSEZNavbar } from './NSEZNavbar';

// --- Design Tokens ---
const HEADING_FONT = "'Inter', system-ui, sans-serif";
const BODY_FONT = "'DM Sans', system-ui, sans-serif";
const DARK_GREEN = "#0F2419";
const ACCENT_GOLD = "#C8A84B";

// --- Data Constants ---
const VACANCIES = [{
  ref: "NSEZ-OPS-041",
  title: "Warehouse Operators and Logistics Coordinators",
  employer: "Required by Tenant Facility Hub",
  closing: "15 June 2026"
}, {
  ref: "NSEZ-CIV-102",
  title: "General Civil Construction Laborers",
  employer: "Required for Phase 1 Road Networks",
  closing: "22 June 2026"
}, {
  ref: "NSEZ-SEC-015",
  title: "Certified Control Room and Security Personnel",
  employer: "NSEZ Security Division",
  closing: "29 June 2026"
}];
const TRAINING_PROGRAMS = [{
  id: "01",
  title: "Logistics and Supply Chain Management",
  image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
  desc: "Short courses on warehousing, stock verification, and forklift operational certificates."
}, {
  id: "02",
  title: "Agro-Processing Technology",
  image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
  desc: "Food safety standards, agricultural machinery operation, and packaging line control."
}, {
  id: "03",
  title: "Mechanical and Electrical Infrastructure Maintenance",
  image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
  desc: "Industrial high-voltage power networks and automated manufacturing equipment repair apprenticeships."
}];
const TRAINING_STATS = [{
  value: "3",
  label: "TVET PROGRAMS OFFERED"
}, {
  value: "2400+",
  label: "CANDIDATES TRAINED TO DATE"
}, {
  value: "6 months",
  label: "AVG COURSE DURATION"
}, {
  value: "100%",
  label: "SECTOR-ALIGNED CURRICULUM"
}];
const EMPOWERMENT_BENEFITS = [{
  id: "NYP",
  title: "Nkomazi Youth Artisan Program",
  desc: "Transitioning unemployed local youth into certified trade artisans - welders, boiler makers, and electricians - deployed within construction phases.",
  bg: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80"
}, {
  id: "WIS",
  title: "Women in Industrial Supply Chains",
  desc: "Dedicated mentorship and capacity-building tracks to assist women-led enterprises and workers in securing operational roles in logistics and agro-processing.",
  bg: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80"
}];
const RESOURCE_CARDS = [{
  title: "NSEZ Career Guide 2026",
  desc: "A simplified digital booklet outlining future skills demands inside the economic zone over the next five years."
}, {
  title: "Training Application Guidelines",
  desc: "Step-by-step PDF detailing eligibility criteria, bursary availability, and documentation rules for regional youth training allocations."
}, {
  title: "Social Compact Charter",
  desc: "The official agreement defining mutual commitments between NSEZ management, industrial tenants, and local community leadership."
}];
const CONTACT_STATS = [{
  val: "3",
  label: "Active vacancies"
}, {
  val: "2400+",
  label: "Members trained"
}, {
  val: "30%",
  label: "Local procurement"
}];
const FOOTER_INVEST_LINKS = ['Why Nkomazi', 'Incentives', 'Land and Infrastructure', 'Case Studies'];
const FOOTER_SECTOR_LINKS = ['Agro-processing', 'Manufacturing', 'Logistics', 'Energy'];
const FOOTER_PERMITS_LINKS = ['Environmental Clearance', 'Building Plans', 'Business Licences'];
const FOOTER_SUPPORT_LINKS = ['Investor Desk', 'Community Liaison', 'Skills Development'];
const FOOTER_MEDIA_LINKS = ['Press Releases', 'News and Insights'];
const STAR_INDICES = [1, 2, 3, 4, 5];
const SOCIAL_ICONS = [Twitter, Instagram, Linkedin];
const MOBILE_NAV_ITEMS = ['Invest', 'Business', 'Progress'];
const NAV_INVESTORS = ['Investment Guide', 'Incentives', 'Land Allocation', 'Permits and Licensing', 'Contact Desk'];
const NAV_BUSINESS = ['Business Setup', 'Industrial Zones', 'Factory Shells', 'Supply Chains', 'Trade Partners'];
const NAV_PROGRESS = ['Development Updates', 'Phase Milestones', 'Impact Reports', 'Job Creation', 'Infrastructure'];

// --- Helper Components ---

const SubtitlePill = ({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) => <motion.span initial={{
  opacity: 0,
  y: 10
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true
}} className={`inline-block bg-[#1A3C2E] text-white text-xs rounded-full px-3 py-2 leading-[21px] tracking-[0.06em] uppercase mb-6 ${className}`} style={{
  fontFamily: BODY_FONT
}}>
    {children}
  </motion.span>;
const AnimatedHeading = ({
  children,
  className = "",
  as: Tag = 'h2'
}: {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-100px"
  });
  const words = children.split(' ');
  return <Tag ref={containerRef} className={`${className} overflow-hidden`} style={{
    fontFamily: HEADING_FONT
  }}>
      {words.map((word, idx) => <span key={`word-${idx}-${word}`} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span initial={{
        y: "110%"
      }} animate={isInView ? {
        y: 0
      } : {
        y: "110%"
      }} transition={{
        duration: 0.6,
        delay: idx * 0.065,
        ease: [0.22, 1, 0.36, 1]
      }} className="inline-block">
            {word}
          </motion.span>
        </span>)}
    </Tag>;
};
const FadeUp = ({
  children,
  className = "",
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => <motion.div initial={{
  opacity: 0,
  y: 28
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true
}} transition={{
  duration: 0.6,
  delay,
  ease: [0.22, 1, 0.36, 1]
}} className={className}>
    {children}
  </motion.div>;
const SplitButton = ({
  label,
  variant = 'green',
  className = "",
  icon: Icon = ArrowRight,
  onClick
}: {
  label: string;
  variant?: 'green' | 'gold' | 'white';
  className?: string;
  icon?: React.ElementType;
  onClick?: () => void;
}) => {
  const bgClass = variant === 'green' ? 'bg-[#1A3C2E]' : variant === 'gold' ? 'bg-[#C8A84B]' : 'bg-white';
  const textClass = variant === 'green' ? 'text-white' : 'text-[#0F2419]';
  const iconColor = variant === 'green' ? 'text-white' : 'text-[#0F2419]';
  return <motion.button whileHover={{
    y: -2,
    scale: 1.015
  }} onClick={onClick} className={`group flex h-[44px] items-stretch no-underline relative overflow-hidden rounded-lg cursor-pointer ${className}`}>
      <div className={`flex items-center justify-center px-5 ${bgClass} ${textClass} text-[15px] font-medium rounded-l-lg tracking-[0.01em]`} style={{
      fontFamily: BODY_FONT
    }}>
        {label}
      </div>
      <div className={`flex items-center justify-center w-[44px] ${bgClass} ${iconColor} rounded-r-lg border-l border-black/5`}>
        <Icon size={18} />
      </div>
      <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
    </motion.button>;
};
const BenefitCard = ({
  number,
  title,
  desc,
  bg
}: {
  number: string;
  title: string;
  desc: string;
  bg: string;
}) => <motion.div whileHover={{
  y: -6,
  scale: 1.02
}} className="relative rounded-2xl overflow-hidden min-h-[320px] group flex flex-col justify-end p-7">
    <img src={bg} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2419]/95 via-[#0F2419]/60 to-[#0F2419]/20" />
    <div className="relative z-10 space-y-2">
      <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center mb-4">
        <Award className="text-white" size={20} />
      </div>
      <div className="text-[#C8A84B] text-[40px] sm:text-[52px] font-light leading-none mb-2" style={{
      fontFamily: HEADING_FONT
    }}>{number}</div>
      <h3 className="text-white font-semibold text-[18px] sm:text-[22px]" style={{
      fontFamily: HEADING_FONT
    }}>{title}</h3>
      <p className="text-white/65 text-[15px] sm:text-[16px] leading-[1.6]" style={{
      fontFamily: BODY_FONT
    }}>{desc}</p>
    </div>
  </motion.div>;
const StepCard = ({
  id,
  title,
  image,
  desc
}: {
  id: string;
  title: string;
  image: string;
  desc: string;
}) => <div className="flex flex-col">
    <motion.div whileHover={{
    y: -6,
    scale: 1.015
  }} className="relative rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[340px] group">
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2419]/90 to-transparent" />
      <div className="absolute top-6 left-6 w-9 h-9 bg-[#C8A84B] text-[#0F2419] font-bold rounded-full flex items-center justify-center text-sm shadow-lg">
        {id}
      </div>
      <h3 className="absolute bottom-6 left-6 right-6 text-white font-semibold text-[18px] sm:text-[22px] leading-tight" style={{
      fontFamily: HEADING_FONT
    }}>
        {title}
      </h3>
    </motion.div>
    <p className="text-[#0F2419]/65 text-[15px] sm:text-[16px] leading-[1.6] mt-4" style={{
    fontFamily: BODY_FONT
  }}>{desc}</p>
  </div>;
const DropdownMenu = ({
  label,
  items
}: {
  label: string;
  items: string[];
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  return <div className="relative" ref={containerRef}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1.5 text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300" style={{
      fontFamily: BODY_FONT
    }}>
        {label}
        <motion.div animate={{
        rotate: open ? 180 : 0
      }}>
          <ArrowRight size={14} className="rotate-90" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && <motion.div initial={{
        opacity: 0,
        y: 10,
        scale: 0.95
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 10,
        scale: 0.95
      }} className="absolute top-full left-0 mt-2 w-56 bg-[#1A3C2E] rounded-xl p-2 border border-white/10 shadow-2xl z-[999]">
            {items.map((item, i) => <a key={`dd-${i}-${item}`} href="#" className="block text-white/80 hover:text-white text-[14px] font-medium rounded-lg px-3 py-2 hover:bg-white/10 transition-colors" style={{
          fontFamily: BODY_FONT
        }}>
                {item}
              </a>)}
          </motion.div>}
      </AnimatePresence>
    </div>;
};

// --- Main Page Component ---

export const CommunityPortalPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="bg-[#EFF0EB] min-h-screen selection:bg-[#C8A84B] selection:text-[#0F2419]">

      {/* Navbar */}
      <NSEZNavbar />

      {/* Section I: Hero */}
      <section ref={heroRef} className="relative flex flex-col justify-end rounded-2xl sm:rounded-3xl overflow-hidden mx-1.5 sm:mx-2.5 mt-1.5 sm:mt-2.5 min-h-[600px] sm:min-h-[860px]">
        <motion.div style={{
        y: bgY
      }} className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&q=85" alt="Community" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F2419]/85 via-[#0F2419]/70 to-transparent" />

        <motion.div style={{
        opacity: heroOpacity
      }} className="relative z-10 max-w-[1372px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
          <FadeUp delay={0.2} className="flex flex-col items-start gap-4">
            <span className="text-white/60 text-[13px] uppercase tracking-[0.08em] font-medium" style={{
            fontFamily: BODY_FONT
          }}>
              COMMUNITY PORTAL - MPUMALANGA, SOUTH AFRICA
            </span>
            <SubtitlePill>COMMUNITY AND CAREERS PORTAL - NKOMAZI SEZ</SubtitlePill>

            <AnimatedHeading as="h1" className="text-white text-[40px] sm:text-[52px] lg:text-[72px] font-light leading-[1.05] tracking-[-2px] max-w-full sm:max-w-[1200px] mb-6 sm:mb-8">
              Empowering the Nkomazi Community Through Shared Growth
            </AnimatedHeading>

            <p className="text-white/70 text-[15px] sm:text-[18px] leading-[1.65] max-w-full sm:max-w-[540px] mb-8 sm:mb-10" style={{
            fontFamily: BODY_FONT
          }}>
              Bridging local talent with direct employment opportunities, industry-accredited skills development, and community-centric economic programs within the zone.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <SplitButton label="Search Active Job Vacancies" variant="green" />
              <SplitButton label="Apply for Skills Training Programs" variant="gold" icon={ArrowUpRight} />
            </div>
          </FadeUp>

          <div className="mt-10 sm:mt-0 sm:absolute sm:bottom-10 sm:left-8 flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-white/80 text-xs" style={{
              fontFamily: BODY_FONT
            }}>
                Community-first - Government-backed - Est. 2024
              </span>
            </div>
          </div>

          <div className="hidden sm:flex absolute bottom-10 right-8 gap-2">
            {[1, 2, 3].map(i => <div key={`dot-${i}`} className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-[#C8A84B]' : 'bg-white/30'}`} />)}
          </div>
        </motion.div>
      </section>

      {/* Section II: Local Employment Portal */}
      <section className="mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5">
        <div className="bg-[#0F2419] rounded-2xl sm:rounded-3xl overflow-hidden py-16 sm:py-24 px-4 sm:px-6 relative">
          <div className="max-w-[1372px] mx-auto">
            <SubtitlePill>LOCAL EMPLOYMENT PORTAL - JOB SEEKER HUB</SubtitlePill>
            <AnimatedHeading className="text-white text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] mb-6">
              Active vacancies. Real careers. Real impact.
            </AnimatedHeading>
            <FadeUp className="mb-12 sm:mb-16">
              <p className="text-white/70 text-[15px] sm:text-[16px] leading-[1.65] max-w-xl" style={{
              fontFamily: BODY_FONT
            }}>
                Current employment opportunities open to qualifying local residents. Submit your CV directly to the regional labour database.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {VACANCIES.map((job, i) => <motion.div key={`vacancy-${job.ref}`} whileHover={{
              y: -4
            }} className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 group shadow-lg">
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-[#C8A84B]/15 text-[#C8A84B] text-xs rounded-full px-3 py-1 font-medium" style={{
                  fontFamily: BODY_FONT
                }}>
                      {job.ref}
                    </span>
                    <span className="bg-white/10 text-white/60 text-xs rounded-full px-3 py-1" style={{
                  fontFamily: BODY_FONT
                }}>
                      Closing: {job.closing}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-[18px] sm:text-[20px] leading-[1.3] tracking-[-0.5px] mb-2" style={{
                  fontFamily: HEADING_FONT
                }}>
                      {job.title}
                    </h3>
                    <p className="text-white/50 text-[13px] italic" style={{
                  fontFamily: BODY_FONT
                }}>{job.employer}</p>
                  </div>
                  <SplitButton label="Apply Now" variant="gold" className="w-full" />
                </motion.div>)}
            </div>

            <FadeUp className="bg-[#1A3C2E]/60 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-white font-semibold text-[18px] sm:text-[20px]" style={{
                fontFamily: HEADING_FONT
              }}>
                  Submit Your CV to Our Talent Database
                </h3>
                <p className="text-white/65 text-[15px] sm:text-[15px]" style={{
                fontFamily: BODY_FONT
              }}>
                  Upload your Curriculum Vitae, certified South African ID copy, and relevant qualifications.
                </p>
              </div>
              <SplitButton label="Submit Your CV" variant="green" />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Section III: Skills Development */}
      <section className="mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5">
        <div className="bg-[#EFF0EB] rounded-2xl sm:rounded-3xl py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1372px] mx-auto">
            <SubtitlePill>ACCREDITED SKILLS DEVELOPMENT</SubtitlePill>
            <AnimatedHeading className="text-[#0F2419] text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] mb-6">
              Industry-aligned training programs for the Nkomazi region.
            </AnimatedHeading>
            <FadeUp className="mb-12 sm:mb-16">
              <p className="text-[#0F2419]/70 text-[15px] sm:text-[17px] leading-[1.65] max-w-2xl" style={{
              fontFamily: BODY_FONT
            }}>
                In partnership with regional TVET institutions, the NSEZ offers specialized technical training directly aligned with active industrial sector demands.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {TRAINING_PROGRAMS.map((program, i) => <StepCard key={`program-${program.id}`} id={program.id} title={program.title} image={program.image} desc={program.desc} />)}
            </div>

            <div className="bg-[#C8A84B] py-8 sm:py-10 rounded-3xl grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-6">
              {TRAINING_STATS.map((stat, i) => <div key={`stat-${i}-${stat.label}`} className="text-center">
                  <div className="text-[24px] sm:text-[36px] font-light text-[#0F2419] mb-1" style={{
                fontFamily: HEADING_FONT
              }}>
                    {stat.value}
                  </div>
                  <div className="text-[#0F2419]/70 text-[11px] sm:text-[13px] uppercase tracking-[0.06em] font-medium" style={{
                fontFamily: BODY_FONT
              }}>
                    {stat.label}
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Section IV: Youth and Women Empowerment */}
      <section className="pb-16 sm:pb-[100px]">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
          <SubtitlePill>YOUTH AND WOMEN EMPOWERMENT</SubtitlePill>
          <AnimatedHeading className="text-[#0F2419] text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] mb-6">
            Targeted programs building inclusive industrial participation.
          </AnimatedHeading>
          <FadeUp className="mb-12 sm:mb-16">
            <p className="text-[#0F2419]/70 text-[15px] sm:text-[17px] leading-[1.65] max-w-2xl" style={{
            fontFamily: BODY_FONT
          }}>
              Dedicated pathways ensuring local youth and women-led enterprises are active participants in the Nkomazi SEZ economic ecosystem.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {EMPOWERMENT_BENEFITS.map((benefit, i) => <BenefitCard key={`benefit-${benefit.id}`} number={benefit.id} title={benefit.title} desc={benefit.desc} bg={benefit.bg} />)}
          </div>
        </div>
      </section>

      {/* Section V: Community Engagement */}
      <section className="mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5">
        <div className="bg-[#0F2419] rounded-2xl sm:rounded-3xl overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1372px] mx-auto">
            <SubtitlePill>COMMUNITY ENGAGEMENT</SubtitlePill>
            <AnimatedHeading className="text-white text-[32px] sm:text-[40px] lg:text-[52px] font-light mb-6">
              A mutual commitment to the Nkomazi region.
            </AnimatedHeading>
            <FadeUp className="mb-12 sm:mb-16">
              <p className="text-white/70 text-[15px] sm:text-[16px] leading-[1.65] max-w-xl" style={{
              fontFamily: BODY_FONT
            }}>
                The NSEZ social compact defines the shared obligations between management, industrial tenants, and the local community for sustainable regional development.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div whileHover={{
              y: -4
            }} className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
                <div className="w-12 h-12 rounded-full bg-[#C8A84B]/10 flex items-center justify-center text-[#C8A84B]">
                  <Users size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-[18px] sm:text-[20px] mb-4" style={{
                  fontFamily: HEADING_FONT
                }}>
                    Stakeholder Engagement Forums
                  </h3>
                  <p className="text-white/65 text-[15px] sm:text-[15px] leading-[1.65]" style={{
                  fontFamily: BODY_FONT
                }}>
                    Regular interactive public meetings hosted by the NSEZ administration to communicate regional developmental milestones, environmental compliance, and social updates.
                  </p>
                </div>
                <SplitButton label="View Upcoming Forums" variant="gold" />
              </motion.div>

              <motion.div whileHover={{
              y: -4
            }} className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
                <div className="w-12 h-12 rounded-full bg-[#C8A84B]/10 flex items-center justify-center text-[#C8A84B]">
                  <FileText size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-[18px] sm:text-[20px] mb-4" style={{
                  fontFamily: HEADING_FONT
                }}>
                    Socio-Economic Development Framework
                  </h3>
                  <p className="text-white/65 text-[15px] sm:text-[15px] leading-[1.65]" style={{
                  fontFamily: BODY_FONT
                }}>
                    Guidelines ensuring incoming international tenants actively contribute toward regional school infrastructure, healthcare support, and localized greening initiatives.
                  </p>
                </div>
                <SplitButton label="Download SED Framework" variant="gold" icon={Download} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section VI: Community Resource Center */}
      <section className="mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5">
        <div className="bg-[#EFF0EB] rounded-2xl sm:rounded-3xl py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1372px] mx-auto">
            <SubtitlePill>COMMUNITY RESOURCE CENTER</SubtitlePill>
            <AnimatedHeading className="text-[#0F2419] text-[32px] sm:text-[40px] lg:text-[52px] font-light mb-6">
              Everything you need to participate in the Nkomazi economy.
            </AnimatedHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16">
              {RESOURCE_CARDS.map((card, i) => <motion.div key={`resource-${i}-${card.title}`} whileHover={{
              y: -4
            }} className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[#C8A84B]">
                    <FileText size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#0F2419] font-semibold text-[18px] sm:text-[18px] mb-3" style={{
                  fontFamily: HEADING_FONT
                }}>
                      {card.title}
                    </h3>
                    <p className="text-[#0F2419]/65 text-[15px] sm:text-[15px] leading-[1.65]" style={{
                  fontFamily: BODY_FONT
                }}>
                      {card.desc}
                    </p>
                  </div>
                  <a href="#" className="text-[#C8A84B] text-[14px] font-medium flex items-center gap-2 group/link" style={{
                fontFamily: BODY_FONT
              }}>
                    Download PDF
                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </motion.div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Section VII: Contact & Recruitment Desk */}
      <section className="relative overflow-hidden rounded-2xl sm:rounded-3xl mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5 min-h-[560px] sm:min-h-[620px] bg-[#0F2419]">
        <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1800&q=85" alt="Contact" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[1372px] mx-auto">
          <SubtitlePill>GET IN TOUCH</SubtitlePill>
          <AnimatedHeading className="text-white text-[32px] sm:text-[40px] lg:text-[52px] font-light mb-12 sm:mb-16">
            Connect with our Community and Socio-Economic Development team.
          </AnimatedHeading>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <FadeUp className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-8 flex flex-col gap-8 shadow-xl">
              <div>
                <span className="text-white/50 text-xs uppercase tracking-[0.06em] font-medium" style={{
                fontFamily: BODY_FONT
              }}>
                  Manager: Socio-Economic Development and Stakeholder Relations
                </span>
                <a href="mailto:careers@nsez.co.za" className="block text-[#C8A84B] text-[22px] sm:text-[28px] lg:text-[32px] font-medium mt-2 hover:opacity-80 transition-opacity break-all sm:break-normal" style={{
                fontFamily: HEADING_FONT
              }}>
                  careers@nsez.co.za
                </a>
              </div>

              <div className="flex items-start gap-3 text-white/65">
                <MapPin className="text-[#C8A84B] flex-shrink-0 mt-0.5" size={20} />
                <p className="text-[15px] leading-[1.6]" style={{
                fontFamily: BODY_FONT
              }}>
                  Office Block C, Community Services Hub, NSEZ Administration Precinct, Nkomazi, Mpumalanga
                </p>
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4 border-t border-white/10">
                <SplitButton label="Search Job Vacancies" variant="green" />
                <SplitButton label="Apply for Training" variant="white" icon={ArrowUpRight} />
              </div>
            </FadeUp>

            <div className="space-y-6">
              <FadeUp className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-8 shadow-xl border border-white/5">
                <div className="flex gap-1 text-[#C8A84B] mb-6">
                  {STAR_INDICES.map(i => <motion.span key={`star-${i}`} initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} transition={{
                  delay: i * 0.1
                }}>
                      ★
                    </motion.span>)}
                </div>
                <blockquote className="text-white text-base sm:text-lg font-light leading-relaxed mb-6 italic" style={{
                fontFamily: BODY_FONT
              }}>
                  "The NSEZ youth artisan program transformed my employment prospects entirely. Within six months I was certified and deployed on the Phase 1 construction works."
                </blockquote>
                <div className="text-white/50 text-sm" style={{
                fontFamily: BODY_FONT
              }}>
                  <span className="text-white font-medium">Thabo Nkosi</span>, Graduate Artisan, Nkomazi SEZ Youth Program
                </div>
              </FadeUp>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {CONTACT_STATS.map((stat, i) => <div key={`cstat-${i}-${stat.val}`} className="bg-[#C8A84B]/10 border border-[#C8A84B]/20 rounded-xl p-3 sm:p-4">
                    <div className="text-[#C8A84B] text-[22px] sm:text-[28px] font-light leading-none mb-1" style={{
                  fontFamily: HEADING_FONT
                }}>
                      {stat.val}
                    </div>
                    <div className="text-white/60 text-[10px] uppercase tracking-[0.06em]" style={{
                  fontFamily: BODY_FONT
                }}>
                      {stat.label}
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-[60px] sm:pt-[115px]">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12 pb-16 sm:pb-24 border-b border-[#0F2419]/10">
            <div>
              <h4 className="text-[#0F2419] font-semibold tracking-[0.04em] uppercase text-sm mb-6 sm:mb-8" style={{
              fontFamily: BODY_FONT
            }}>
                Invest
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                {FOOTER_INVEST_LINKS.map(l => <li key={`inv-${l}`}>
                    <a href="#" className="text-[#0F2419]/60 hover:text-[#0F2419] transition-colors no-underline text-[14px] sm:text-[15px]" style={{
                  fontFamily: BODY_FONT
                }}>
                      {l}
                    </a>
                  </li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-[#0F2419] font-semibold tracking-[0.04em] uppercase text-sm mb-6 sm:mb-8" style={{
              fontFamily: BODY_FONT
            }}>
                Sectors
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                {FOOTER_SECTOR_LINKS.map(l => <li key={`sec-${l}`}>
                    <a href="#" className="text-[#0F2419]/60 hover:text-[#0F2419] transition-colors no-underline text-[14px] sm:text-[15px]" style={{
                  fontFamily: BODY_FONT
                }}>
                      {l}
                    </a>
                  </li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-[#0F2419] font-semibold tracking-[0.04em] uppercase text-sm mb-6 sm:mb-8" style={{
              fontFamily: BODY_FONT
            }}>
                Permits
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                {FOOTER_PERMITS_LINKS.map(l => <li key={`per-${l}`}>
                    <a href="#" className="text-[#0F2419]/60 hover:text-[#0F2419] transition-colors no-underline text-[14px] sm:text-[15px]" style={{
                  fontFamily: BODY_FONT
                }}>
                      {l}
                    </a>
                  </li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-[#0F2419] font-semibold tracking-[0.04em] uppercase text-sm mb-6 sm:mb-8" style={{
              fontFamily: BODY_FONT
            }}>
                Support
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                {FOOTER_SUPPORT_LINKS.map(l => <li key={`sup-${l}`}>
                    <a href="#" className="text-[#0F2419]/60 hover:text-[#0F2419] transition-colors no-underline text-[14px] sm:text-[15px]" style={{
                  fontFamily: BODY_FONT
                }}>
                      {l}
                    </a>
                  </li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-[#0F2419] font-semibold tracking-[0.04em] uppercase text-sm mb-6 sm:mb-8" style={{
              fontFamily: BODY_FONT
            }}>
                Media
              </h4>
              <ul className="space-y-3 sm:space-y-4">
                {FOOTER_MEDIA_LINKS.map(l => <li key={`med-${l}`}>
                    <a href="#" className="text-[#0F2419]/60 hover:text-[#0F2419] transition-colors no-underline text-[14px] sm:text-[15px]" style={{
                  fontFamily: BODY_FONT
                }}>
                      {l}
                    </a>
                  </li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-[#0F2419] py-10 sm:py-14">
          <div className="max-w-[1372px] mx-auto px-4 sm:px-6">
            <div className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-end">
              <div className="space-y-8 sm:space-y-12">
                <img src="/NSEZ-logo.jpg" alt="NSEZ Logo" className="h-12 w-auto object-contain max-w-none rounded-md" />
                <div className="space-y-2">
                  <p className="text-white/40 text-sm" style={{
                  fontFamily: BODY_FONT
                }}>
                    Copyright 2026 Nkomazi SEZ All Rights Reserved.
                  </p>
                  <div className="flex gap-4">
                    <a href="#" className="text-white/40 hover:text-white text-sm" style={{
                    fontFamily: BODY_FONT
                  }}>Terms of Use</a>
                    <a href="#" className="text-white/40 hover:text-white text-sm" style={{
                    fontFamily: BODY_FONT
                  }}>Privacy Policy</a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end gap-6 sm:gap-8">
                <div className="space-y-4 text-left lg:text-right">
                  <h2 className="text-white text-[28px] sm:text-[36px] lg:text-[40px] font-light leading-tight" style={{
                  fontFamily: HEADING_FONT
                }}>
                    Ready to invest in Nkomazi?
                  </h2>
                  <SplitButton label="Contact our investment desk" variant="green" onClick={() => window.location.href = '/contact'} />
                </div>
                <div className="flex gap-4">
                  {SOCIAL_ICONS.map((Icon, i) => <motion.a key={`social-${i}`} href="#" whileHover={{
                  scale: 1.05,
                  backgroundColor: ACCENT_GOLD,
                  color: DARK_GREEN
                }} className="w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] border border-white/10 flex items-center justify-center text-white/50 transition-colors">
                      <Icon size={18} />
                    </motion.a>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && <motion.button initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.8
      }} onClick={() => window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })} className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#0F2419] border border-white/20 text-white flex items-center justify-center z-[9999] hover:bg-[#1A3C2E] transition-colors">
            <ChevronUp size={20} />
          </motion.button>}
      </AnimatePresence>
    </div>;
};