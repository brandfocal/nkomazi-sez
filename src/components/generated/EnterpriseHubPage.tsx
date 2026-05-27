import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ChevronRight, ChevronUp, ArrowRight, ArrowUpRight, Building, GraduationCap, Users, FileText, Download, Calendar, CheckCircle2, Mail, MapPin, Star, Twitter, Instagram, Linkedin } from 'lucide-react';
import { NSEZNavbar } from './NSEZNavbar';

// --- Design Tokens ---
const HEADING_FONT = "'Inter', system-ui, sans-serif";
const BODY_FONT = "'DM Sans', system-ui, sans-serif";
const COLORS = {
  darkGreen: "#0F2419",
  midGreen: "#1A3C2E",
  gold: "#C8A84B",
  offWhite: "#EFF0EB",
  white: "#FFFFFF"
};

// --- Reusable Shared Components ---

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
}} transition={{
  duration: 0.5
}} className={`inline-block bg-[#1A3C2E] text-white text-[10px] sm:text-xs rounded-full px-3 py-2 tracking-[0.06em] uppercase ${className}`} style={{
  fontFamily: BODY_FONT
}}>
    {children}
  </motion.span>;
const AnimatedHeading = ({
  children,
  as: Tag = 'h2',
  className = "",
  style = {}
}: {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  className?: string;
  style?: React.CSSProperties;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  const words = children.split(' ');
  return <Tag ref={ref} className={`flex flex-wrap ${className}`} style={{
    fontFamily: HEADING_FONT,
    ...style
  }}>
    {words.map((word, idx) => <span key={idx} className="relative overflow-hidden inline-block mr-[0.25em] pb-[0.1em]">
        <motion.span initial={{
        y: "110%"
      }} animate={isInView ? {
        y: "0%"
      } : {
        y: "110%"
      }} transition={{
        duration: 0.8,
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
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
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
const GreenButton = ({
  label,
  className = "",
  onClick
}: {
  label: string;
  className?: string;
  onClick?: () => void;
}) => <motion.button whileHover={{
  y: -2,
  scale: 1.015
}} whileTap={{
  scale: 0.98
}} onClick={onClick} className={`group flex h-[44px] items-stretch cursor-pointer relative ${className}`}>
    <div className="flex items-center px-5 bg-[#1A3C2E] text-white text-[15px] font-medium rounded-l-lg transition-colors group-hover:bg-[#234d3b]" style={{
    fontFamily: BODY_FONT
  }}>
      {label}
    </div>
    <div className="flex items-center justify-center w-[44px] bg-[#1A3C2E] text-white rounded-r-lg border-l border-white/10 group-hover:bg-[#234d3b] transition-colors">
      <ArrowRight size={18} />
    </div>
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
    </div>
  </motion.button>;
const GoldButton = ({
  label,
  className = ""
}: {
  label: string;
  className?: string;
}) => <motion.button whileHover={{
  y: -2,
  scale: 1.015
}} whileTap={{
  scale: 0.98
}} className={`group flex h-[44px] items-stretch cursor-pointer relative overflow-hidden ${className}`}>
    <div className="flex items-center px-5 bg-[#C8A84B] text-[#0F2419] text-[15px] font-medium rounded-l-lg" style={{
    fontFamily: BODY_FONT
  }}>
      {label}
    </div>
    <div className="flex items-center justify-center w-[44px] bg-[#C8A84B] text-[#0F2419] rounded-r-lg border-l border-[#0F2419]/10">
      <ArrowUpRight size={18} />
    </div>
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
    </div>
  </motion.button>;
const WhiteButton = ({
  label,
  className = ""
}: {
  label: string;
  className?: string;
}) => <motion.button whileHover={{
  y: -2,
  scale: 1.015
}} whileTap={{
  scale: 0.98
}} className={`group flex h-[44px] items-stretch cursor-pointer relative overflow-hidden ${className}`}>
    <div className="flex items-center px-5 bg-white text-[#0F2419] text-[15px] font-medium rounded-l-lg" style={{
    fontFamily: BODY_FONT
  }}>
      {label}
    </div>
    <div className="flex items-center justify-center w-[44px] bg-white text-[#0F2419] rounded-r-lg border-l border-[#0F2419]/10">
      <ArrowUpRight size={18} />
    </div>
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
      <div className="w-full h-full bg-gradient-to-r from-transparent via-[#C8A84B]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
    </div>
  </motion.button>;

// --- Section Specific Components ---

const BenefitCard = ({
  icon: Icon,
  number,
  title,
  desc,
  bg
}: {
  icon: any;
  number: string;
  title: string;
  desc: string;
  bg: string;
}) => <motion.div whileHover={{
  y: -6,
  scale: 1.02
}} className="rounded-2xl overflow-hidden min-h-[280px] relative cursor-pointer group">
    <img src={bg} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2419]/95 via-[#0F2419]/60 to-[#0F2419]/20" />
    <div className="relative z-10 p-7 flex flex-col min-h-[280px] justify-between">
      <div className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
        <Icon size={20} />
      </div>
      <div>
        <div className="text-[52px] font-light leading-none mb-1" style={{
        fontFamily: HEADING_FONT,
        color: COLORS.gold
      }}>{number}</div>
        <div className="text-white font-semibold text-[18px] sm:text-[22px] mb-2" style={{
        fontFamily: HEADING_FONT
      }}>{title}</div>
        <div className="text-white/65 text-[15px] sm:text-[16px] leading-relaxed" style={{
        fontFamily: BODY_FONT
      }}>{desc}</div>
      </div>
    </div>
  </motion.div>;
const StepCard = ({
  number,
  title,
  bg
}: {
  number: string;
  title: string;
  bg: string;
}) => <motion.div whileHover={{
  y: -6,
  scale: 1.015
}} className="rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[340px] relative cursor-pointer group">
    <img src={bg} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2419] via-[#0F2419]/40 to-transparent" />
    <div className="absolute top-6 left-6 w-9 h-9 bg-[#C8A84B] text-[#0F2419] font-bold rounded-full flex items-center justify-center text-sm shadow-lg">
      {number}
    </div>
    <div className="absolute bottom-0 left-0 p-6 w-full">
      <div className="text-white font-semibold text-[18px] sm:text-[22px] leading-tight max-w-[80%]" style={{
      fontFamily: HEADING_FONT
    }}>{title}</div>
    </div>
  </motion.div>;
const TenderCard = ({
  refNo,
  title,
  desc,
  closingDate,
  category,
  typeBadge
}: {
  refNo: string;
  title: string;
  desc: string;
  closingDate: string;
  category: string;
  typeBadge?: string;
}) => <motion.div initial={{
  opacity: 0,
  y: 20
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true
}} className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-8 flex flex-col gap-4 border border-white/5 hover:border-white/20 transition-all duration-300">
    <div className="flex flex-wrap gap-2">
      <div className="bg-[#C8A84B]/15 text-[#C8A84B] text-[10px] uppercase font-bold rounded-full px-3 py-1">
        {category}
      </div>
      {typeBadge && <div className="bg-[#C8A84B] text-[#0F2419] text-[10px] uppercase font-bold rounded-full px-3 py-1">
          {typeBadge}
        </div>}
      <div className="bg-white/10 text-white/60 text-[10px] uppercase font-medium rounded-full px-3 py-1 flex items-center gap-1.5">
        <Calendar size={10} /> <span>Closing: {closingDate}</span>
      </div>
    </div>
    <div className="text-white/40 text-[12px]" style={{
    fontFamily: BODY_FONT
  }}>{refNo}</div>
    <h3 className="text-white font-semibold text-[18px] sm:text-[22px] leading-[1.3]" style={{
    fontFamily: HEADING_FONT
  }}>{title}</h3>
    <p className="text-white/65 text-[15px] sm:text-[16px] leading-relaxed" style={{
    fontFamily: BODY_FONT
  }}>{desc}</p>
    <GoldButton label="View Tender Details" className="w-fit mt-2" />
  </motion.div>;
const ProgramCard = ({
  icon: Icon,
  title,
  desc
}: {
  icon: any;
  title: string;
  desc: string;
}) => <motion.div whileHover={{
  y: -4
}} className="bg-[#EFF0EB] rounded-2xl p-8 flex flex-col gap-6 shadow-sm hover:shadow-lg transition-all duration-300">
    <div className="text-[#C8A84B]">
      <Icon size={32} />
    </div>
    <h3 className="text-[#0F2419] text-[18px] sm:text-[22px] font-semibold" style={{
    fontFamily: HEADING_FONT
  }}>{title}</h3>
    <p className="text-[#0F2419]/65 text-[15px] sm:text-[16px] leading-[1.65]" style={{
    fontFamily: BODY_FONT
  }}>{desc}</p>
  </motion.div>;
const ResourceCard = ({
  title,
  desc
}: {
  title: string;
  desc: string;
}) => <motion.div whileHover={{
  y: -4
}} className="bg-white rounded-2xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
    <div className="text-[#C8A84B]">
      <FileText size={32} />
    </div>
    <div className="flex-1">
      <h3 className="text-[#0F2419] font-semibold text-[18px] sm:text-[22px] mb-2" style={{
      fontFamily: HEADING_FONT
    }}>{title}</h3>
      <p className="text-[#0F2419]/65 text-[15px] sm:text-[16px] leading-relaxed" style={{
      fontFamily: BODY_FONT
    }}>{desc}</p>
    </div>
    <a href="#" className="text-[#C8A84B] text-[14px] font-medium flex items-center gap-2 group" style={{
    fontFamily: BODY_FONT
  }}>
      <Download size={16} /> <span>Download</span>
      <span className="w-0 group-hover:w-4 transition-all duration-300 h-[1px] bg-[#C8A84B]" />
    </a>
  </motion.div>;

// --- Constants & Data ---

const TENDERS = {
  subcontracting: [{
    ref: "NSEZ-CIV-2026-089",
    title: "Provision of Paving and Civils for Phase 1 Industrial Plots",
    desc: "Comprehensive paving works and minor civils infrastructure development for the phase 1 expansion area.",
    closing: "12 June 2026",
    cat: "CIVILS & INFRA",
    type: undefined as string | undefined
  }, {
    ref: "NSEZ-SEC-2026-004",
    title: "Supply and Installation of Perimeter Security Technology Systems",
    desc: "Installation of AI-integrated CCTV systems and access control technologies for the main SEZ entrance.",
    closing: "19 June 2026",
    cat: "SECURITY TECH",
    type: undefined as string | undefined
  }],
  supplyChain: [{
    ref: "EOI-AGRO-02",
    title: "Supply of Raw Sub-Tropical Agricultural Produce to Agro-processing Facility Tenant",
    desc: "Strategic sourcing of avocados, mangoes, and citrus from local SMME farmers for on-site value addition.",
    closing: "26 June 2026",
    cat: "AGRO-PROCESSING",
    type: "Expression of Interest" as string | undefined
  }, {
    ref: "NSEZ-LOG-2026-012",
    title: "Local Freight and Short-Haul Logistics Services for Zone Warehouse Hub",
    desc: "Dedicated short-haul transport services for moving containerized goods between the SEZ and Maputo port.",
    closing: "03 July 2026",
    cat: "LOGISTICS",
    type: undefined as string | undefined
  }]
};
const PROGRAMS = [{
  icon: Building,
  title: "Incubation Hub",
  desc: "Access to physical workshop spaces, high-speed connectivity, and shared administrative resources within the physical zone."
}, {
  icon: GraduationCap,
  title: "Technical Capacity Building",
  desc: "Regular masterclasses on meeting international ISO standards, environmental safety regulations, and manufacturing quality controls."
}, {
  icon: Users,
  title: "Mentorship Portal",
  desc: "Structured business coaching programs connecting local entrepreneurs with veteran industrial operations managers."
}];
const RESOURCES = [{
  title: "NSEZ Local Procurement Policy Document",
  desc: "Full guidelines on the minimum 30% local localization targets for zone operators and tenant businesses."
}, {
  title: "Compliance Checklist",
  desc: "A simplified step-by-step PDF guide detailing the requirements to bid for industrial contracts within the SEZ."
}, {
  title: "Supplier Training Schedule 2026",
  desc: "Calendar of upcoming vendor workshops, financial literacy programs, and procurement briefings."
}];
const FOOTER_LINKS = [{
  title: "Invest",
  links: ["Why Nkomazi", "Incentives", "Land and Infrastructure", "Case Studies"]
}, {
  title: "Sectors",
  links: ["Agro-processing", "Manufacturing", "Logistics", "Energy"]
}, {
  title: "Permits",
  links: ["Environmental Clearance", "Building Plans", "Business Licences"]
}, {
  title: "Support",
  links: ["Investor Desk", "Community Liaison", "Skills Development"]
}, {
  title: "Media",
  links: ["Press Releases", "News and Insights"]
}];
const NAV_ITEMS = ['Invest', 'Business', 'Progress'];
const INVEST_SUBNAV = ['Investment Guide', 'Incentives', 'Land Allocation', 'Permits and Licensing', 'Contact Desk'];
const BUSINESS_SUBNAV = ['Business Setup', 'Industrial Zones', 'Factory Shells', 'Supply Chains', 'Trade Partners'];
const PROGRESS_SUBNAV = ['Development Updates', 'Phase Milestones', 'Impact Reports', 'Job Creation', 'Infrastructure'];
const MOBILE_NAV = ['Invest', 'Business', 'Progress', 'Compliance Portal'];
const SOCIAL_ICONS = [Twitter, Instagram, Linkedin];
const DOTS = [0, 1, 2];
const STARS = [1, 2, 3, 4, 5];

// --- Main Page Component ---

export const EnterpriseHubPage = () => {
  const [activeTab, setActiveTab] = useState<'subcontracting' | 'supplyChain'>('subcontracting');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const getSubnav = (item: string) => {
    if (item === 'Invest') return INVEST_SUBNAV;
    if (item === 'Business') return BUSINESS_SUBNAV;
    return PROGRESS_SUBNAV;
  };
  return <div className="bg-white min-h-screen relative overflow-x-hidden">
      <AnimatePresence>
        {isScrolled && <motion.button initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.8
      }} onClick={scrollToTop} className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-[#0F2419] border border-white/20 z-[100] flex items-center justify-center text-white cursor-pointer shadow-lg">
            <ChevronUp size={20} />
          </motion.button>}
      </AnimatePresence>

      {/* Navbar */}
      <NSEZNavbar />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="rounded-3xl overflow-hidden mx-1.5 sm:mx-2.5 mt-1.5 sm:mt-2.5 relative flex flex-col justify-end" style={{
      minHeight: undefined
    }}>
        <div className="min-h-[600px] sm:min-h-[860px] flex flex-col justify-end">
          <motion.div className="absolute inset-0 z-0" style={{
          y: bgY
        }}>
            <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1800" alt="Hero Background" className="w-full h-[120%] object-cover brightness-75 scale-110" />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-br from-[#0F2419]/85 via-[#0F2419]/70 to-transparent z-[1]" />

          <div className="relative z-[2] max-w-[1372px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20 sm:pb-32 pt-28 sm:pt-40">
            <div className="max-w-[1200px] w-full">
              <div className="text-white/60 text-[13px] uppercase tracking-[0.08em] mb-6" style={{
              fontFamily: BODY_FONT
            }}>
                SMME PORTAL - MPUMALANGA, SOUTH AFRICA
              </div>
              <SubtitlePill className="mb-8">
                ENTERPRISE HUB - NKOMAZI SEZ
              </SubtitlePill>
              <AnimatedHeading as="h1" className="text-white text-[40px] sm:text-[52px] lg:text-[72px] font-light leading-[1.05] tracking-[-2px] mb-8">
                Local Enterprise Integration: Driving the Nkomazi Supply Chain
              </AnimatedHeading>
              <FadeUp delay={0.4}>
                <p className="text-white/70 text-[15px] sm:text-[16px] leading-[1.65] max-w-full sm:max-w-[540px] mb-10 sm:mb-12" style={{
                fontFamily: BODY_FONT
              }}>
                  Connecting Small, Medium, and Micro Enterprises with large-scale industrial tenants, procurement contracts, and enterprise development support within the zone.
                </p>
              </FadeUp>
              <FadeUp delay={0.6} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <GreenButton label="Register as an Approved Vendor" />
                <GoldButton label="View Active Procurement Bulletins" />
              </FadeUp>
            </div>
          </div>

          <div className="absolute bottom-8 left-4 sm:left-8 z-[2]">
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 text-white/80 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SMME-focused - Government-backed - Est. 2024</span>
            </div>
          </div>

          <div className="absolute bottom-8 right-4 sm:right-8 z-[2] flex gap-2">
            {DOTS.map(i => <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#C8A84B]' : 'bg-white/30'}`} />)}
          </div>
        </div>
      </section>

      {/* 2. SMME HELPDESK — white section */}
      <section className="pb-[60px] sm:pb-[100px]">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 pt-16 sm:pt-24">
            <SubtitlePill className="mb-6">SMME HELPDESK AND ONE-STOP SUPPORT</SubtitlePill>
            <AnimatedHeading className="text-[#0F2419] text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] mb-8 justify-center">
              Comprehensive support for local enterprise growth
            </AnimatedHeading>
            <FadeUp delay={0.2} className="max-w-2xl mx-auto">
              <p className="text-[#0F2419]/70 text-[15px] sm:text-[16px] leading-[1.65]" style={{
              fontFamily: BODY_FONT
            }}>
                Every registered SMME gains access to compliance advisory, B-BBEE toolkit services, and direct linkages to development finance institutions.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard icon={Building} number="CIPC" title="Business Registration Support" desc="Streamlined assistance to meet institutional compliance, CIPC requirements, and tax clearances required for SEZ operations." bg="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600" />
            <BenefitCard icon={Users} number="B-BBEE" title="B-BBEE Alignment" desc="Toolkits and advisory services to assist local enterprises in maximizing broad-based black economic empowerment scoring for tenant supply chains." bg="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600" />
            <BenefitCard icon={FileText} number="DFI" title="Access to Funding" desc="Facilitation of linkages between registered SMMEs and development finance institutions including SEFA, NEF, and MEGA." bg="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600" />
          </div>
        </div>
      </section>

      {/* 3. LIVE TENDER BOARD — dark full-bleed section */}
      <section className="mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5">
        <div className="bg-[#0F2419] rounded-3xl overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-[1372px] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 sm:gap-12 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              <SubtitlePill className="mb-6">ACTIVE PROCUREMENT BULLETIN</SubtitlePill>
              <AnimatedHeading className="text-white text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] mb-6">
                Live tender board. Real opportunities.
              </AnimatedHeading>
              <FadeUp delay={0.2}>
                <p className="text-white/70 text-[15px] sm:text-[16px]" style={{
                fontFamily: BODY_FONT
              }}>
                  Updated procurement opportunities for registered SMMEs. Access live subcontracting roles and tenant supply requirements.
                </p>
              </FadeUp>
            </div>

            <div className="flex flex-wrap gap-2 bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-md w-fit">
              <button onClick={() => setActiveTab('subcontracting')} className={`px-5 sm:px-6 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 ${activeTab === 'subcontracting' ? 'bg-[#C8A84B] text-[#0F2419]' : 'text-white/70 hover:text-white'}`} style={{
              fontFamily: BODY_FONT
            }}>
                Subcontracting
              </button>
              <button onClick={() => setActiveTab('supplyChain')} className={`px-5 sm:px-6 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 ${activeTab === 'supplyChain' ? 'bg-[#C8A84B] text-[#0F2419]' : 'text-white/70 hover:text-white'}`} style={{
              fontFamily: BODY_FONT
            }}>
                Tenant Supply Chain
              </button>
            </div>
          </div>

          <div className="max-w-[1372px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <AnimatePresence mode="wait">
              {(activeTab === 'subcontracting' ? TENDERS.subcontracting : TENDERS.supplyChain).map((tender, idx) => <motion.div key={`${activeTab}-${tender.ref}`} initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: -20
            }} transition={{
              duration: 0.4,
              delay: idx * 0.1
            }}>
                  <TenderCard refNo={tender.ref} title={tender.title} desc={tender.desc} closingDate={tender.closing} category={tender.cat} typeBadge={tender.type} />
                </motion.div>)}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. VENDOR REGISTRATION PROCESS — light off-white section */}
      <section className="py-[60px] sm:py-[80px] mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5">
        <div className="bg-[#EFF0EB] rounded-3xl py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1372px] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 sm:mb-16 gap-8">
            <div className="max-w-xl">
              <SubtitlePill className="mb-6">HOW TO REGISTER</SubtitlePill>
              <AnimatedHeading className="text-[#0F2419] text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px]">
                Your pathway to the NSEZ Vendor Directory
              </AnimatedHeading>
            </div>
            <GreenButton label="Register as an Approved Vendor" />
          </div>

          <div className="max-w-[1372px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StepCard number="01" title="Online Profile Creation" bg="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800" />
            <StepCard number="02" title="Documentation Upload" bg="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800" />
            <StepCard number="03" title="Compliance Verification" bg="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800" />
            <StepCard number="04" title="Database Integration" bg="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800" />
          </div>

          <p className="text-[#0F2419]/50 text-[13px] text-center mt-12 max-w-[1372px] mx-auto" style={{
          fontFamily: BODY_FONT
        }}>
            Hover each step to explore your registration journey - <span className="font-bold text-[#C8A84B]">Approved vendors listed within 14 working days.</span>
          </p>
        </div>
      </section>

      {/* 5. ENTERPRISE AND SKILLS DEVELOPMENT — white section */}
      <section className="pb-[60px] sm:pb-[100px]">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 sm:mb-16 text-center pt-16 sm:pt-24">
            <SubtitlePill className="mb-6">ENTERPRISE AND SKILLS DEVELOPMENT</SubtitlePill>
            <AnimatedHeading className="text-[#0F2419] text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] justify-center">
              Programs designed to grow local industrial capacity
            </AnimatedHeading>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 sm:mb-20">
            {PROGRAMS.map(prog => <ProgramCard key={prog.title} icon={prog.icon} title={prog.title} desc={prog.desc} />)}
          </div>

          <div className="bg-[#C8A84B] py-10 sm:py-12 px-6 rounded-3xl shadow-xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
              <div className="text-center flex flex-col gap-2">
                <div className="text-[24px] sm:text-[36px] lg:text-[52px] font-light text-[#0F2419]" style={{
                fontFamily: HEADING_FONT
              }}>30%</div>
                <div className="text-[#0F2419]/70 text-[12px] uppercase tracking-wider font-bold" style={{
                fontFamily: BODY_FONT
              }}>Local procurement target</div>
              </div>
              <div className="text-center flex flex-col gap-2">
                <div className="text-[24px] sm:text-[36px] lg:text-[52px] font-light text-[#0F2419]" style={{
                fontFamily: HEADING_FONT
              }}>3</div>
                <div className="text-[#0F2419]/70 text-[12px] uppercase tracking-wider font-bold" style={{
                fontFamily: BODY_FONT
              }}>DFI partners</div>
              </div>
              <div className="text-center flex flex-col gap-2">
                <div className="text-[24px] sm:text-[36px] lg:text-[52px] font-light text-[#0F2419]" style={{
                fontFamily: HEADING_FONT
              }}>4</div>
                <div className="text-[#0F2419]/70 text-[12px] uppercase tracking-wider font-bold" style={{
                fontFamily: BODY_FONT
              }}>Active programs</div>
              </div>
              <div className="text-center flex flex-col gap-2">
                <div className="text-[24px] sm:text-[36px] lg:text-[52px] font-light text-[#0F2419]" style={{
                fontFamily: HEADING_FONT
              }}>14</div>
                <div className="text-[#0F2419]/70 text-[12px] uppercase tracking-wider font-bold" style={{
                fontFamily: BODY_FONT
              }}>Days vendor approval</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RESOURCE CENTER — light off-white section */}
      <section className="py-[60px] sm:py-[80px] mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5">
        <div className="bg-[#EFF0EB] rounded-3xl py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1372px] mx-auto mb-12 sm:mb-16 text-center">
            <SubtitlePill className="mb-6">SMME RESOURCE CENTER</SubtitlePill>
            <AnimatedHeading className="text-[#0F2419] text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] justify-center">
              Everything you need to compete for NSEZ contracts
            </AnimatedHeading>
          </div>

          <div className="max-w-[1372px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {RESOURCES.map(res => <ResourceCard key={res.title} title={res.title} desc={res.desc} />)}
          </div>
        </div>
      </section>

      {/* 7. CTA / CONTACT SECTION */}
      <section className="relative flex flex-col justify-end overflow-hidden rounded-3xl mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5" style={{
      minHeight: 560
    }}>
        <img src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1800" alt="Contact Background" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-[#0F2419]" />
        <div className="relative z-10 max-w-[1372px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="mb-10 sm:mb-16">
            <SubtitlePill className="mb-6">GET IN TOUCH</SubtitlePill>
            <AnimatedHeading className="text-white text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px]">
              Connect with our Enterprise Development team
            </AnimatedHeading>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 shadow-2xl border border-white/5">
              <div>
                <div className="text-white/50 text-[10px] uppercase tracking-widest mb-2" style={{
                fontFamily: BODY_FONT
              }}>
                  Manager: Enterprise Development and Localization
                </div>
                <a href="mailto:smme@nsez.co.za" className="text-[#C8A84B] text-[20px] sm:text-[24px] lg:text-[32px] font-medium hover:underline break-all" style={{
                fontFamily: HEADING_FONT
              }}>
                  smme@nsez.co.za
                </a>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#C8A84B] flex-shrink-0">
                  <MapPin size={20} />
                </div>
                <div className="text-white/65 text-[15px] sm:text-[16px] leading-relaxed" style={{
                fontFamily: BODY_FONT
              }}>
                  <span>Ground Floor, Block B, NSEZ Smart Centre</span><br /><span>Nkomazi, Mpumalanga, South Africa</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                <GreenButton label="Register as an Approved Vendor" />
                <WhiteButton label="View Procurement Bulletins" />
              </div>
            </div>

            <div className="flex flex-col gap-6 sm:gap-8">
              <div className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/5 relative">
                <div className="flex gap-1 mb-6 text-[#C8A84B]">
                  {STARS.map(i => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <blockquote className="text-white text-lg sm:text-xl font-light leading-relaxed mb-6 sm:mb-8 italic" style={{
                fontFamily: HEADING_FONT
              }}>
                  "Registering with the NSEZ vendor platform opened direct access to three major procurement contracts within our first quarter. The compliance support made the entire process seamless."
                </blockquote>
                <div className="text-white/50 text-sm" style={{
                fontFamily: BODY_FONT
              }}>
                  <span>Sipho Dlamini, Director, </span><span className="text-white">Dlamini Civil Works</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-[#C8A84B]/10 border border-[#C8A84B]/20 rounded-2xl p-4 sm:p-6 text-center">
                  <div className="text-[#C8A84B] text-[22px] sm:text-[28px] font-light leading-none mb-2" style={{
                  fontFamily: HEADING_FONT
                }}>30%</div>
                  <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Target</div>
                </div>
                <div className="bg-[#C8A84B]/10 border border-[#C8A84B]/20 rounded-2xl p-4 sm:p-6 text-center">
                  <div className="text-[#C8A84B] text-[22px] sm:text-[28px] font-light leading-none mb-2" style={{
                  fontFamily: HEADING_FONT
                }}>4</div>
                  <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Active Cycles</div>
                </div>
                <div className="bg-[#C8A84B]/10 border border-[#C8A84B]/20 rounded-2xl p-4 sm:p-6 text-center">
                  <div className="text-[#C8A84B] text-[22px] sm:text-[28px] font-light leading-none mb-2" style={{
                  fontFamily: HEADING_FONT
                }}>14d</div>
                  <div className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Approval</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER — full-bleed, no mx */}
      <footer className="bg-white">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 pt-[60px] sm:pt-[115px] pb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12 mb-16 sm:mb-20">
            {FOOTER_LINKS.map(col => <div key={col.title} className="flex flex-col gap-4 sm:gap-6">
                <h4 className="text-[#0F2419] font-bold text-xs uppercase tracking-[0.06em]" style={{
              fontFamily: BODY_FONT
            }}>{col.title}</h4>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {col.links.map(link => <a key={link} href="#" className="text-[#0F2419]/60 text-[14px] sm:text-[15px] hover:text-[#C8A84B] transition-colors" style={{
                fontFamily: BODY_FONT
              }}>{link}</a>)}
                </div>
              </div>)}
          </div>
        </div>

        <div className="bg-[#0F2419] py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-[1372px] mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 sm:gap-12 mb-12 sm:mb-16">
              <div className="flex flex-col gap-6 sm:gap-8">
                <img src="/NSEZ-logo.jpg" alt="Nkomazi SEZ Logo" className="h-12 w-auto object-contain max-w-none rounded-md" />
                <p className="text-white/40 text-sm max-w-sm" style={{
                fontFamily: BODY_FONT
              }}>
                  Copyright 2026 Nkomazi SEZ. All Rights Reserved. Development of the Maputo Corridor Industrial Hub.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:gap-6 items-start lg:items-end w-full lg:w-auto">
                <h2 className="text-white text-[28px] sm:text-[40px] font-light leading-tight tracking-tight text-left lg:text-right" style={{
                fontFamily: HEADING_FONT
              }}>
                  Ready to invest in Nkomazi?
                </h2>
                <GreenButton label="Contact our investment desk" onClick={() => window.location.href = '/contact'} />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pt-8 border-t border-white/10 gap-6 lg:gap-8">
              <div className="flex flex-wrap gap-4 sm:gap-8">
                <a href="#" className="text-white/40 text-sm hover:text-white" style={{
                fontFamily: BODY_FONT
              }}>Terms of Use</a>
                <a href="#" className="text-white/40 text-sm hover:text-white" style={{
                fontFamily: BODY_FONT
              }}>Privacy Policy</a>
                <a href="mailto:invest@nkomazisez.co.za" className="text-white/40 text-sm hover:text-white break-all" style={{
                fontFamily: BODY_FONT
              }}>invest@nkomazisez.co.za</a>
              </div>

              <div className="flex gap-4">
                {SOCIAL_ICONS.map((Icon, idx) => <motion.a key={idx} href="#" whileHover={{
                scale: 1.05,
                backgroundColor: COLORS.gold,
                color: COLORS.darkGreen
              }} className="w-11 h-11 rounded-[10px] bg-white/5 border border-white/10 flex items-center justify-center text-white/50 transition-colors">
                    <Icon size={18} />
                  </motion.a>)}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};