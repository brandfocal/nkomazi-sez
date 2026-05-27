import * as React from "react";
import { useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronUp, Building2, Store, ShieldCheck, Users, Megaphone, MapPin, Mail, Clock, AlertTriangle, Menu, X, Instagram, Linkedin, Twitter, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { NSEZNavbar } from './NSEZNavbar';

const BODY_FONT = "'DM Sans', system-ui, sans-serif";

// --- Types & Constants ---

interface Department {
  id: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  focus: string;
  personnel: string;
  name: string;
  email: string;
  phone: string;
  cta: string;
}
const DEPARTMENTS: Department[] = [{
  id: "investor",
  icon: <Building2 className="w-5 h-5" />,
  badge: "INVESTOR RELATIONS",
  title: "Investor Relations and Capital Attraction",
  focus: "Global tenant onboarding, industrial plot allocations, fiscal incentives, and joint-venture opportunities.",
  personnel: "CHIEF INVESTMENT OFFICER",
  name: "Tshepo Mashaba",
  email: "invest@nsez.co.za",
  phone: "+27 (0) 13 750 1234 Ext. 101",
  cta: "Start Investment Inquiry"
}, {
  id: "smme",
  icon: <Store className="w-5 h-5" />,
  badge: "ENTERPRISE SUPPORT",
  title: "SMME Support and Localization Desk",
  focus: "Vendor registration, local procurement compliance, active tender clarification, and business development workshops.",
  personnel: "MANAGER: ENTERPRISE DEVELOPMENT",
  name: "Sarah Nkosi",
  email: "smme@nsez.co.za",
  phone: "+27 (0) 13 750 1234 Ext. 102",
  cta: "Register as Vendor"
}, {
  id: "regulatory",
  icon: <ShieldCheck className="w-5 h-5" />,
  badge: "REGULATORY",
  title: "One-Stop-Shop Regulatory Approvals",
  focus: "Fast-tracked municipal licensing, environmental authorizations, corporate visas, and SARS customs area certifications.",
  personnel: "DIRECTOR: ONE-STOP-SHOP",
  name: "Dr. David Mbeki",
  email: "oss@nsez.co.za",
  phone: "+27 (0) 13 750 1234 Ext. 103",
  cta: "Initiate OSS Application"
}, {
  id: "hr",
  icon: <Users className="w-5 h-5" />,
  badge: "HUMAN RESOURCES",
  title: "Human Resources and Community Development",
  focus: "Skills training applications, local labor registry, internship placements, and community stakeholder engagement.",
  personnel: "MANAGER: SED & STAKEHOLDER RELATIONS",
  name: "Nomvula Zulu",
  email: "careers@nsez.co.za",
  phone: "+27 (0) 13 750 1234 Ext. 104",
  cta: "Submit CV or Application"
}, {
  id: "media",
  icon: <Megaphone className="w-5 h-5" />,
  badge: "MEDIA AND COMMUNICATIONS",
  title: "Media, Marketing and Corporate Communications",
  focus: "Press releases, drone footage access, branding guidelines, event coordination, and site visit requests.",
  personnel: "HEAD OF MARKETING",
  name: "Lindiwe Khumalo",
  email: "media@nsez.co.za",
  phone: "+27 (0) 13 750 1234 Ext. 105",
  cta: "Submit Media Inquiry"
}];
const OPERATIONAL_HOURS = [{
  day: "Monday to Thursday",
  time: "08:00 to 16:30 SAST",
  closed: false
}, {
  day: "Friday",
  time: "08:00 to 16:00 SAST",
  closed: false
}, {
  day: "Weekends",
  time: "Closed",
  closed: true
}, {
  day: "Public Holidays",
  time: "Closed",
  closed: true
}];
const STATS = [{
  value: "5",
  label: "Specialized desks"
}, {
  value: "24h",
  label: "Email response target"
}, {
  value: "1",
  label: "Coordinated team"
}, {
  value: "5",
  label: "Active departments"
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
const SOCIAL_ICONS = [Twitter, Instagram, Linkedin];

// --- Sub-components ---

const SubtitlePill = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("inline-block bg-[#1A3C2E] text-white text-[10px] sm:text-xs rounded-full px-3 py-1.5 leading-[21px] tracking-[0.06em] uppercase font-body mb-6", className)}>
    {children}
  </div>;
const AnimatedHeading = ({
  children,
  className,
  style,
  as: Tag = 'h2'
}: {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  as?: 'h1' | 'h2' | 'h3';
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-60px'
  });
  const words = String(children).split(' ');
  return <Tag ref={ref} className={className} style={{
    ...style,
    fontFamily: "'Inter', system-ui, sans-serif",
    overflow: 'hidden'
  }}>
      {words.map((word, i) => <span key={word + i} style={{
      display: 'inline-block',
      overflow: 'hidden',
      verticalAlign: 'bottom',
      marginRight: '0.22em'
    }}>
          <motion.span style={{
        display: 'inline-block'
      }} initial={{
        y: '110%',
        opacity: 0
      }} animate={inView ? {
        y: '0%',
        opacity: 1
      } : {
        y: '110%',
        opacity: 0
      }} transition={{
        duration: 0.55,
        delay: i * 0.065,
        ease: [0.22, 1, 0.36, 1]
      }}>
            {word}
          </motion.span>
        </span>)}
    </Tag>;
};
const FadeUp = ({
  children,
  delay = 0,
  className
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
  className,
  onClick
}: {
  label: string;
  className?: string;
  onClick?: () => void;
}) => <motion.button whileHover={{
  y: -2,
  scale: 1.015
}} onClick={onClick} className={cn("group flex h-[44px] cursor-pointer font-body", className)}>
    <div className="bg-[#1A3C2E] text-white px-5 text-[15px] font-medium rounded-l-lg flex items-center tracking-[0.01em] relative overflow-hidden">
      <span className="relative z-10">{label}</span>
      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </div>
    <div className="w-[44px] bg-[#1A3C2E] rounded-r-lg flex items-center justify-center border-l border-white/10">
      <ArrowRight className="w-4 h-4 text-white" />
    </div>
  </motion.button>;
const GoldButton = ({
  label,
  className,
  onClick
}: {
  label: string;
  className?: string;
  onClick?: () => void;
}) => <motion.button whileHover={{
  y: -2,
  scale: 1.015
}} onClick={onClick} className={cn("group flex h-[44px] cursor-pointer font-body", className)}>
    <div className="bg-[#C8A84B] text-[#0F2419] px-5 text-[15px] font-medium rounded-l-lg flex items-center tracking-[0.01em] relative overflow-hidden">
      <span className="relative z-10">{label}</span>
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </div>
    <div className="w-[44px] bg-[#C8A84B] rounded-r-lg flex items-center justify-center border-l border-[#0F2419]/10">
      <ArrowUpRight className="w-4 h-4 text-[#0F2419]" />
    </div>
  </motion.button>;
const WhiteButton = ({
  label,
  className,
  onClick
}: {
  label: string;
  className?: string;
  onClick?: () => void;
}) => <motion.button whileHover={{
  y: -2,
  scale: 1.015
}} onClick={onClick} className={cn("group flex h-[44px] cursor-pointer font-body", className)}>
    <div className="bg-white text-[#0F2419] px-5 text-[15px] font-medium rounded-l-lg flex items-center tracking-[0.01em] relative overflow-hidden border border-white">
      <span className="relative z-10">{label}</span>
      <div className="absolute inset-0 bg-black/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </div>
    <div className="w-[44px] bg-white rounded-r-lg flex items-center justify-center border border-white border-l-[#0F2419]/10">
      <ArrowUpRight className="w-4 h-4 text-[#0F2419]" />
    </div>
  </motion.button>;
const Footer = () => {
  return <footer className="w-full">
      <div className="bg-white">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8 pt-[60px] sm:pt-[115px] pb-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-[60px]">
          {FOOTER_LINKS.map(col => <div key={col.title} className="flex flex-col gap-6">
              <h4 className="text-[#0F2419] font-semibold tracking-[0.04em] uppercase font-body text-base">{col.title}</h4>
              <div className="flex flex-col gap-3">
                {col.links.map(link => <a key={link} href="#" className="text-[#0F2419]/60 text-[15px] font-body hover:text-[#0F2419] transition-colors">
                    {link}
                  </a>)}
              </div>
            </div>)}
        </div>
      </div>
      <div className="bg-[#0F2419]">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 border-b border-white/10 pb-14 mb-8">
            <div className="flex flex-col gap-6">
              <a href="/" className="flex-shrink-0 flex items-center no-underline">
                <img src="/NSEZ-logo.jpg" alt="NSEZ Logo" className="h-10 w-auto object-contain rounded-md" />
              </a>
              <p className="text-white/40 text-[14px] font-body">
                Copyright 2026 Nkomazi SEZ All Rights Reserved.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-heading text-white text-[28px] sm:text-[40px] font-light tracking-[-1px]">
                Ready to invest in Nkomazi?
              </h3>
              <GreenButton label="Contact our investment desk" className="w-fit" onClick={() => window.location.href = '/contact'} />
            </div>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row justify-between items-center">
            <div className="flex flex-wrap items-center gap-4 sm:gap-8">
              <a href="#" className="text-white/40 font-body text-[14px] hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="text-white/40 font-body text-[14px] hover:text-white transition-colors">Privacy Policy</a>
              <a href="mailto:invest@nkomazisez.co.za" className="text-white/40 font-body text-[14px] hover:text-white transition-colors underline">invest@nkomazisez.co.za</a>
            </div>
            <div className="flex items-center gap-4">
              {SOCIAL_ICONS.map((Icon, i) => <motion.a key={i} href="#" whileHover={{
              scale: 1.05,
              backgroundColor: "#C8A84B",
              color: "#0F2419"
            }} className="w-11 h-11 rounded-[10px] border border-white/10 flex items-center justify-center text-white/50 transition-colors">
                  <Icon className="w-5 h-5" />
                </motion.a>)}
            </div>
          </div>
        </div>
      </div>
    </footer>;
};

// --- Main Page Component ---

export const ContactPage = () => {
  const {
    scrollYProgress
  } = useScroll();
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const heroRef = useRef(null);
  const {
    scrollYProgress: heroScroll
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0.4]);
  return <div className="bg-[#EFF0EB] min-h-screen selection:bg-[#C8A84B] selection:text-[#0F2419]" style={{ fontFamily: BODY_FONT }}>
      <NSEZNavbar />

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
        behavior: "smooth"
      })} className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#0F2419] border border-white/20 text-white flex items-center justify-center z-[99] hover:bg-[#1A3C2E] transition-colors">
            <ChevronUp className="w-6 h-6" />
          </motion.button>}
      </AnimatePresence>

      <main>
        {/* SECTION I: HERO */}
        <section ref={heroRef} className="mx-1.5 sm:mx-2.5 mt-2.5 rounded-[32px] overflow-hidden relative flex flex-col justify-end min-h-[600px] sm:min-h-[860px]">
          <motion.div style={{
          y: heroY,
          opacity: heroOpacity
        }} className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85" alt="NSEZ Administration Office" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F2419]/90 via-[#0F2419]/70 to-transparent" />
          </motion.div>

          <div className="relative z-10 w-full max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-32">
            <FadeUp>
              <div className="mb-10">
                <span className="text-white/80 text-[13px] uppercase tracking-[0.08em] block mb-6">
                  CONTACT DIRECTORY - MPUMALANGA, SOUTH AFRICA
                </span>
                <SubtitlePill>CONTACT AND SUPPORT DIRECTORY - NKOMAZI SEZ</SubtitlePill>
              </div>
            </FadeUp>

            <AnimatedHeading as="h1" className="text-[40px] sm:text-[52px] lg:text-[72px] font-light leading-[1.05] tracking-[-2px] text-white max-w-[900px] mb-8" style={{
            color: '#FFFFFF'
          }}>
              Connect with the Nkomazi SEZ Team.
            </AnimatedHeading>

            <FadeUp delay={0.4}>
              <p className="text-white/80 text-[15px] sm:text-[18px] leading-[1.65] max-w-full sm:max-w-[540px] mb-12">
                Get in touch with our specialized departments for investor onboarding, local procurement opportunities, media inquiries, or general administrative support.
              </p>
            </FadeUp>

            <FadeUp delay={0.5} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-20">
              <GreenButton label="Submit a General Inquiry" />
              <GoldButton label="Locate Our Administration Offices" />
            </FadeUp>

            <FadeUp delay={0.6} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="bg-white/10 border border-white/20 rounded-full px-4 py-2.5 backdrop-blur-md flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white/80 text-[12px]"><span>Available Mon-Fri - Government-backed - Est. 2024</span></span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map(i => <div key={i} className={cn("w-2 h-2 rounded-full", i === 1 ? "bg-white" : "bg-white/30")} />)}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* SECTION II: DEPARTMENTAL DIRECTORY */}
        <section className="mx-1.5 sm:mx-2.5 mb-2.5">
          <div className="bg-[#0F2419] rounded-[32px] overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1372px] mx-auto">
              <div className="mb-12 sm:mb-16">
                <SubtitlePill>SPECIALIZED DEPARTMENTAL DIRECTORY</SubtitlePill>
                <AnimatedHeading as="h2" className="text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] text-white mb-6" style={{
                color: '#FFFFFF'
              }}>
                  Five specialized desks. One coordinated team.
                </AnimatedHeading>
                <FadeUp>
                  <p className="text-white/70 max-w-xl text-[15px] sm:text-[17px] leading-[1.65]">
                    Each department is staffed by a designated specialist. Contact the relevant desk directly to reduce response time and ensure accurate assistance.
                  </p>
                </FadeUp>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {DEPARTMENTS.slice(0, 3).map(dept => <motion.div key={dept.id} whileHover={{
                y: -5,
                scale: 1.01
              }} className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-8 flex flex-col border border-white/5 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C8A84B]/15 rounded-xl flex items-center justify-center text-[#C8A84B] shrink-0">
                        {dept.icon}
                      </div>
                      <span className="bg-white/10 text-white/60 text-[11px] rounded-full px-3 py-1 uppercase tracking-[0.05em]">
                        {dept.badge}
                      </span>
                    </div>

                    <h3 className="text-[18px] sm:text-[22px] font-medium leading-[1.3] tracking-[-0.5px] text-white mb-4 font-heading">
                      {dept.title}
                    </h3>

                    <p className="text-white/60 text-[14px] leading-[1.6] mb-8 flex-grow">
                      {dept.focus}
                    </p>

                    <div className="border-t border-white/10 pt-6 mb-8 flex flex-col gap-4">
                      <div>
                        <span className="text-white/40 text-[11px] uppercase tracking-[0.06em] block mb-1">
                          {dept.personnel}
                        </span>
                        <span className="text-white/80 text-[14px] font-medium block">
                          {dept.name}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <a href={`mailto:${dept.email}`} className="text-[#C8A84B] text-[14px] font-medium hover:underline">
                          {dept.email}
                        </a>
                        <span className="text-white/60 text-[13px]">
                          {dept.phone}
                        </span>
                      </div>
                    </div>

                    <GoldButton label={dept.cta} className="w-full mt-auto" />
                  </motion.div>)}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 lg:max-w-[910px] lg:mx-auto">
                {DEPARTMENTS.slice(3, 5).map(dept => <motion.div key={dept.id} whileHover={{
                y: -5,
                scale: 1.01
              }} className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-8 flex flex-col border border-white/5 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C8A84B]/15 rounded-xl flex items-center justify-center text-[#C8A84B] shrink-0">
                        {dept.icon}
                      </div>
                      <span className="bg-white/10 text-white/60 text-[11px] rounded-full px-3 py-1 uppercase tracking-[0.05em]">
                        {dept.badge}
                      </span>
                    </div>

                    <h3 className="text-[18px] sm:text-[22px] font-medium leading-[1.3] tracking-[-0.5px] text-white mb-4 font-heading">
                      {dept.title}
                    </h3>

                    <p className="text-white/60 text-[14px] leading-[1.6] mb-8 flex-grow">
                      {dept.focus}
                    </p>

                    <div className="border-t border-white/10 pt-6 mb-8 flex flex-col gap-4">
                      <div>
                        <span className="text-white/40 text-[11px] uppercase tracking-[0.06em] block mb-1">
                          {dept.personnel}
                        </span>
                        <span className="text-white/80 text-[14px] font-medium block">
                          {dept.name}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <a href={`mailto:${dept.email}`} className="text-[#C8A84B] text-[14px] font-medium hover:underline">
                          {dept.email}
                        </a>
                        <span className="text-white/60 text-[13px]">
                          {dept.phone}
                        </span>
                      </div>
                    </div>

                    <GoldButton label={dept.cta} className="w-full mt-auto" />
                  </motion.div>)}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION III: PHYSICAL ADDRESSES AND OPERATIONAL HOURS */}
        <section className="mx-1.5 sm:mx-2.5 mb-2.5">
          <div className="bg-[#EFF0EB] rounded-[32px] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1372px] mx-auto">
              <SubtitlePill>PHYSICAL ADDRESSES AND HOURS</SubtitlePill>
              <AnimatedHeading as="h2" className="text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] text-[#0F2419] mb-12 sm:mb-16" style={{
              color: '#0F2419'
            }}>
                Find us at the heart of the Nkomazi region.
              </AnimatedHeading>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col gap-6">
                  {/* Physical Address */}
                  <motion.div whileHover={{
                  y: -3
                }} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-black/5">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-10 h-10 bg-[#C8A84B]/10 rounded-full flex items-center justify-center text-[#C8A84B] shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading text-[#0F2419] font-semibold text-[18px] sm:text-[20px] pt-1">Physical Address</h3>
                    </div>
                    <div className="space-y-1 mb-8">
                      <p className="text-[#0F2419]/65 text-[15px] leading-[1.9]">Nkomazi SEZ Administration Precinct</p>
                      <p className="text-[#0F2419]/65 text-[15px] leading-[1.9]">Block A, First Floor</p>
                      <p className="text-[#0F2419]/65 text-[15px] leading-[1.9]">R570 Jeppes Reef Road</p>
                      <p className="text-[#0F2419]/65 text-[15px] leading-[1.9]">Malelane, Nkomazi Region</p>
                      <p className="text-[#0F2419]/65 text-[15px] leading-[1.9]">Mpumalanga, South Africa</p>
                    </div>
                    <GoldButton label="Get Directions" className="w-fit" />
                  </motion.div>

                  {/* Postal Address */}
                  <motion.div whileHover={{
                  y: -3
                }} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-black/5">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-10 h-10 bg-[#C8A84B]/10 rounded-full flex items-center justify-center text-[#C8A84B] shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading text-[#0F2419] font-semibold text-[18px] sm:text-[20px] pt-1">Postal Address</h3>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[#0F2419]/65 text-[15px] leading-[1.9]">Private Bag X11204</p>
                      <p className="text-[#0F2419]/65 text-[15px] leading-[1.9]">Malelane</p>
                      <p className="text-[#0F2419]/65 text-[15px] leading-[1.9]">1320</p>
                    </div>
                  </motion.div>
                </div>

                <div className="flex flex-col gap-6">
                  {/* Operational Hours */}
                  <motion.div whileHover={{
                  y: -3
                }} className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-black/5 h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-8">
                      <div className="w-10 h-10 bg-[#C8A84B]/10 rounded-full flex items-center justify-center text-[#C8A84B] shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading text-[#0F2419] font-semibold text-[18px] sm:text-[20px] pt-1">Operational Hours</h3>
                    </div>

                    <div className="flex-grow">
                      {OPERATIONAL_HOURS.map((row, i) => <div key={row.day} className={cn("py-4 sm:py-5 flex justify-between items-center gap-4", i !== OPERATIONAL_HOURS.length - 1 && "border-b border-[#EFF0EB]")}>
                          <span className="text-[#0F2419] font-medium text-[15px]">{row.day}</span>
                          <span className={cn("text-[15px] text-right", row.closed ? "text-[#0F2419]/40" : "text-[#0F2419]/65")}>
                            {row.time}
                          </span>
                        </div>)}
                    </div>

                    <div className="mt-10 pt-6 border-t border-[#EFF0EB]">
                      <p className="text-[#0F2419]/50 text-[13px] italic leading-[1.6]">
                        <span>All times are South African Standard Time (SAST). Emergency investor inquiries may be directed to </span>
                        <a href="mailto:invest@nkomazisez.co.za" className="underline hover:text-[#C8A84B]">invest@nkomazisez.co.za</a>
                        <span>.</span>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION IV: WHISTLEBLOWER AND HOTLINE */}
        <section className="bg-white py-16 sm:py-[100px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1372px] mx-auto">
            <div className="mb-12">
              <SubtitlePill>ANTI-CORRUPTION AND TRANSPARENCY</SubtitlePill>
              <AnimatedHeading as="h2" className="text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] text-[#0F2419] mb-6" style={{
              color: '#0F2419'
            }}>
                Institutional integrity is non-negotiable.
              </AnimatedHeading>
              <FadeUp>
                <p className="text-[#0F2419]/70 text-[15px] sm:text-[18px] max-w-2xl leading-[1.65]">
                  The NSEZ maintains a fully independent anonymous reporting channel managed by an external auditing firm to protect the integrity of all procurement and operational processes.
                </p>
              </FadeUp>
            </div>

            <motion.div whileHover={{
            scale: 1.005
          }} className="bg-[#0F2419] rounded-[32px] p-8 sm:p-14 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
              <div className="flex flex-col gap-6 max-w-xl">
                <div className="w-14 h-14 bg-[#C8A84B]/20 rounded-2xl flex items-center justify-center text-[#C8A84B]">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-white font-semibold text-[22px] sm:text-[28px] lg:text-[32px] leading-[1.2]">
                  Anti-Corruption and Whistleblower Hotline
                </h3>
                <p className="text-white/65 text-[15px] sm:text-[16px] leading-[1.65]">
                  Anonymous reporting channel for fraudulent tender activities, non-compliance breaches, or governance violations. Fully managed by an independent auditing firm.
                </p>
              </div>

              <div className="flex flex-col gap-8 w-full lg:w-auto">
                <div className="flex flex-col gap-3">
                  <span className="text-white/50 text-[11px] uppercase tracking-[0.08em]">HOTLINE NUMBER</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#C8A84B] font-heading text-[28px] sm:text-[36px] lg:text-[44px] font-light leading-none">
                      0800 112 233
                    </span>
                    <span className="bg-white/10 text-white/60 text-[11px] rounded-full px-3 py-1 w-fit mt-2 uppercase tracking-wide">
                      Toll-Free within South Africa
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <span className="text-white/50 text-[11px] uppercase tracking-[0.08em]">SECURE EMAIL</span>
                  <a href="mailto:whistleblower@nsez-secure.co.za" className="text-[#C8A84B] text-[15px] sm:text-[17px] font-medium hover:underline break-all">
                    whistleblower@nsez-secure.co.za
                  </a>
                </div>

                <GreenButton label="Report Anonymously" className="w-full sm:w-fit" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION V: GENERAL INQUIRY FORM CTA */}
        <section className="mx-1.5 sm:mx-2.5 mb-2.5 relative overflow-hidden min-h-[620px] rounded-[32px]">
          <div className="absolute inset-0 bg-[#0F2419]">
            <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85" className="w-full h-full object-cover opacity-10" alt="Background texture" />
          </div>

          <div className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-[1372px] mx-auto">
            <div className="mb-12 sm:mb-16">
              <SubtitlePill>GENERAL INQUIRY</SubtitlePill>
              <AnimatedHeading as="h2" className="text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] text-white" style={{
              color: '#FFFFFF'
            }}>
                Not sure which department to contact? Start here.
              </AnimatedHeading>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
              {/* Contact Form */}
              <FadeUp>
                <div className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-10 flex flex-col gap-6 shadow-2xl border border-white/5">
                  <h3 className="font-heading text-white font-semibold text-[18px] sm:text-[22px]">Submit a General Inquiry</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/50 text-[11px] uppercase tracking-[0.08em]">Full Name</label>
                      <input type="text" placeholder="John Doe" className="bg-[#0F2419] border border-white/15 rounded-xl px-4 py-3.5 text-white text-[15px] w-full focus:border-[#C8A84B] focus:outline-none transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-white/50 text-[11px] uppercase tracking-[0.08em]">Organization</label>
                      <input type="text" placeholder="Company Name" className="bg-[#0F2419] border border-white/15 rounded-xl px-4 py-3.5 text-white text-[15px] w-full focus:border-[#C8A84B] focus:outline-none transition-colors" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-[11px] uppercase tracking-[0.08em]">Inquiry Type</label>
                    <select className="bg-[#0F2419] border border-white/15 rounded-xl px-4 py-3.5 text-white text-[15px] w-full focus:border-[#C8A84B] focus:outline-none transition-colors appearance-none">
                      <option>Investor Relations</option>
                      <option>SMME Support</option>
                      <option>OSS Regulatory</option>
                      <option>HR and Community</option>
                      <option>Media and Communications</option>
                      <option>General</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-[11px] uppercase tracking-[0.08em]">Email Address</label>
                    <input type="email" placeholder="email@example.com" className="bg-[#0F2419] border border-white/15 rounded-xl px-4 py-3.5 text-white text-[15px] w-full focus:border-[#C8A84B] focus:outline-none transition-colors" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-white/50 text-[11px] uppercase tracking-[0.08em]">Message</label>
                    <textarea rows={4} placeholder="How can we assist you today?" className="bg-[#0F2419] border border-white/15 rounded-xl px-4 py-3.5 text-white text-[15px] w-full focus:border-[#C8A84B] focus:outline-none transition-colors resize-none" />
                  </div>

                  <GreenButton label="Submit Inquiry" className="w-full mt-2" />
                </div>
              </FadeUp>

              {/* Stats & Testimonials */}
              <div className="flex flex-col gap-10">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-4">
                  {STATS.map(stat => <motion.div key={stat.label} whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(200, 168, 75, 0.15)"
                }} className="bg-[#C8A84B]/10 border border-[#C8A84B]/20 rounded-xl p-4 sm:p-6 transition-colors">
                      <span className="font-heading text-[#C8A84B] text-[24px] sm:text-[36px] font-light block leading-none mb-2">
                        {stat.value}
                      </span>
                      <span className="text-white/60 text-[11px] uppercase tracking-wider">
                        {stat.label}
                      </span>
                    </motion.div>)}
                </div>

                <motion.div whileHover={{
                y: -5
              }} className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-10 flex flex-col gap-6 relative">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-[#C8A84B] fill-[#C8A84B]" />)}
                  </div>
                  <p className="text-white/80 text-[15px] sm:text-[17px] italic leading-[1.7] relative z-10">
                    "The NSEZ investor relations desk responded within hours and arranged a full site briefing within two days. Exceptional institutional professionalism."
                  </p>
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-medium text-[15px]">Executive Director</span>
                    <span className="text-white/50 text-[13px]">Pan-African Infrastructure Fund</span>
                  </div>
                  <div className="absolute top-8 right-10 text-white/5 text-[100px] font-serif leading-none select-none">
                    "
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
