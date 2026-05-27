import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronRight, ChevronUp, Download, FileText, CheckCircle2, BarChart3, Users, Mail, MapPin, Menu, X, Plus, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NSEZNavbar } from './NSEZNavbar';

const BODY_FONT = "'DM Sans', system-ui, sans-serif";

// --- Types ---

interface CardProps {
  title: string;
  desc: string;
  image?: string;
  icon?: React.ReactNode;
  number?: string;
}

// --- Animation Variants ---

const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 28
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
const staggerContainer = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// --- Shared UI Components ---

const SubtitlePill = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={cn("inline-block bg-[#1A3C2E] text-white text-xs rounded-full px-3 py-2 leading-[21px] tracking-[0.06em] uppercase", className)}>
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
  as?: any;
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
      {words.map((word, i) => <span key={i} style={{
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
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => <motion.div variants={fadeUpVariants} initial="hidden" whileInView="visible" viewport={{
  once: true,
  margin: "-100px"
}} transition={{
  delay
}} className={className}>
    {children}
  </motion.div>;
const SplitButton = ({
  label,
  variant = 'green',
  icon = <ArrowRight className="w-5 h-5" />,
  className,
  onClick
}: {
  label: string;
  variant?: 'green' | 'gold' | 'white';
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const styles = {
    green: {
      main: "bg-[#1A3C2E] text-white",
      icon: "bg-[#1A3C2E]",
      text: "text-white"
    },
    gold: {
      main: "bg-[#C8A84B] text-[#0F2419]",
      icon: "bg-[#C8A84B]",
      text: "text-[#0F2419]"
    },
    white: {
      main: "bg-white text-[#0F2419]",
      icon: "bg-white",
      text: "text-[#0F2419]"
    }
  };
  const currentStyle = styles[variant];
  return <motion.button whileHover={{
    y: -2,
    scale: 1.015
  }} whileTap={{
    scale: 0.98
  }} className={cn("group flex h-[44px] items-stretch cursor-pointer", className)} onClick={onClick}>
      <div className={cn("relative flex items-center px-5 rounded-l-lg font-medium text-[15px] tracking-[0.01em] overflow-hidden", currentStyle.main)}>
        <span className="relative z-10">{label}</span>
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
      </div>
      <div className={cn("flex items-center justify-center w-[44px] rounded-r-lg border-l border-white/10 shrink-0", currentStyle.icon, currentStyle.text)}>
        {icon}
      </div>
    </motion.button>;
};
const BenefitCard = ({
  title,
  desc,
  image,
  number,
  icon
}: CardProps) => <motion.div whileHover={{
  y: -6,
  scale: 1.02
}} className="relative rounded-2xl overflow-hidden min-h-[280px] group cursor-pointer">
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-br from-[#0F2419]/95 via-[#0F2419]/60 to-[#0F2419]/20" />
    <div className="relative z-10 p-7 h-full flex flex-col justify-between min-h-[280px]">
      <div className="flex justify-between items-start">
        <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center text-white backdrop-blur-sm">
          {icon || <ShieldCheck className="w-5 h-5" />}
        </div>
      </div>
      <div>
        <h4 className="text-[#C8A84B] text-[42px] font-light leading-none font-['Inter'] mb-1">
          {number}
        </h4>
        <h3 className="text-white font-semibold text-[18px] sm:text-[22px] font-['Inter'] mb-2">
          {title}
        </h3>
        <p className="text-white/65 text-[15px] sm:text-[16px] leading-relaxed max-w-[90%]">
          {desc}
        </p>
      </div>
    </div>
  </motion.div>;
const StepCard = ({
  title,
  image,
  number
}: {
  title: string;
  image: string;
  number: string;
}) => <motion.div whileHover={{
  y: -6,
  scale: 1.015
}} className="relative rounded-2xl overflow-hidden min-h-[280px] sm:min-h-[340px] group cursor-pointer">
    <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2419]/90 via-[#0F2419]/30 to-transparent" />
    <div className="absolute top-6 left-6 w-9 h-9 bg-[#C8A84B] text-[#0F2419] font-bold rounded-full flex items-center justify-center text-sm shadow-lg">
      {number}
    </div>
    <div className="absolute bottom-0 left-0 p-6 w-full">
      <h3 className="text-white font-semibold text-[18px] sm:text-[22px] leading-tight font-['Inter']">
        {title}
      </h3>
    </div>
  </motion.div>;
const ResourceCard = ({
  title,
  desc,
  linkText = "Download Resource"
}: {
  title: string;
  desc: string;
  linkText?: string;
}) => <motion.div whileHover={{
  y: -4
}} className="bg-white rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md transition-all duration-300 border border-[#EFF0EB]">
    <div className="w-12 h-12 bg-[#EFF0EB] rounded-xl flex items-center justify-center mb-6 shrink-0">
      <FileText className="w-6 h-6 text-[#C8A84B]" />
    </div>
    <h3 className="text-[#0F2419] font-semibold text-[18px] sm:text-[22px] mb-3 font-['Inter']">
      {title}
    </h3>
    <p className="text-[#0F2419]/65 text-[15px] sm:text-[16px] leading-[1.65] mb-6 flex-grow">
      {desc}
    </p>
    <a href="#" className="flex items-center text-[#C8A84B] text-[14px] font-medium group">
      {linkText}
      <ArrowUpRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  </motion.div>;
const FeatureCard = ({
  title,
  desc,
  icon: Icon
}: {
  title: string;
  desc: string;
  icon: any;
}) => <motion.div whileHover={{
  y: -4
}} className="bg-[#EFF0EB] rounded-2xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0">
      <Icon className="w-6 h-6 text-[#C8A84B]" />
    </div>
    <h3 className="text-[#0F2419] font-semibold text-[18px] sm:text-[22px] font-['Inter']">
      {title}
    </h3>
    <p className="text-[#0F2419]/65 text-[15px] sm:text-[16px] leading-[1.65]">
      {desc}
    </p>
    <div className="mt-2">
      <SplitButton label="Access Dashboard" variant="gold" icon={<ArrowUpRight className="w-5 h-5" />} className="w-fit" />
    </div>
  </motion.div>;

// --- Navigation & Footer ---

const Footer = () => {
  const footerSections = [{
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
  return <footer className="w-full">
      <div className="bg-white pt-[60px] sm:pt-[115px] pb-16">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-[60px]">
            {footerSections.map(section => <div key={section.title}>
                <h4 className="text-[#0F2419] font-semibold tracking-[0.04em] uppercase text-sm mb-6 sm:mb-8">
                  {section.title}
                </h4>
                <ul className="flex flex-col gap-4">
                  {section.links.map(link => <li key={link}>
                      <a href="#" className="text-[#0F2419]/60 text-[15px] hover:text-[#0F2419] transition-colors">
                        {link}
                      </a>
                    </li>)}
                </ul>
              </div>)}
          </div>
        </div>
      </div>

      <div className="bg-[#0F2419] pt-14 pb-12">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 sm:gap-12 border-b border-white/10 pb-12 mb-12">
            <div>
              <a href="/" className="flex-shrink-0 flex items-center no-underline">
                <img src="/NSEZ-logo.jpg" alt="NSEZ Logo" className="h-10 sm:h-12 object-contain mb-6 sm:mb-8 rounded-md" />
              </a>
              <p className="text-white/40 text-[14px]">
                Copyright 2026 Nkomazi SEZ All Rights Reserved.
              </p>
            </div>
            <div className="flex flex-col gap-6 w-full lg:max-w-xl">
              <h3 className="text-white text-[28px] sm:text-[32px] md:text-[40px] font-light tracking-[-1px] font-['Inter']">
                Ready to invest in Nkomazi?
              </h3>
              <SplitButton label="Contact our investment desk" variant="green" className="w-fit" onClick={() => window.location.href = '/contact'} />
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row justify-between items-center">
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-white/40 text-[14px]">
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="mailto:invest@nkomazisez.co.za" className="text-white/60 hover:text-white transition-colors">invest@nkomazisez.co.za</a>
            </div>
            <div className="flex items-center gap-3">
              {['X', 'Instagram', 'LinkedIn'].map(social => <motion.a key={social} href="#" whileHover={{
              backgroundColor: '#C8A84B',
              color: '#0F2419',
              scale: 1.05
            }} className="w-11 h-11 rounded-[10px] border border-white/10 flex items-center justify-center text-white/50 transition-colors">
                  <span className="text-xs font-bold uppercase">{social.slice(0, 2)}</span>
                </motion.a>)}
            </div>
          </div>
        </div>
      </div>
    </footer>;
};

// --- Page Sections ---

const Hero = () => {
  const {
    scrollY
  } = useScroll();
  const y = useTransform(scrollY, [0, 860], [0, 240]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  return <section className="mx-1.5 sm:mx-2.5 mt-1.5 sm:mt-2.5 rounded-3xl overflow-hidden relative flex flex-col justify-end min-h-[600px] sm:min-h-[860px]">
      <motion.div style={{
      y,
      opacity
    }} className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1800&q=85" alt="Regulatory Background" className="w-full h-full object-cover scale-110" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F2419]/85 via-[#0F2419]/70 to-transparent" />
      </motion.div>

      <div className="relative z-10 px-6 py-10 sm:p-10 md:p-20 max-w-[1372px] mx-auto w-full">
        <FadeUp delay={0.1}>
          <div className="text-white/60 text-[13px] uppercase tracking-[0.08em] mb-6">
            ONE-STOP-SHOP - MPUMALANGA, SOUTH AFRICA
          </div>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <SubtitlePill className="mb-6 sm:mb-8">
            REGULATORY AND COMPLIANCE PORTAL - NKOMAZI SEZ
          </SubtitlePill>
        </FadeUp>

        <AnimatedHeading as="h1" className="text-[40px] sm:text-[52px] lg:text-[72px] font-light leading-[1.05] tracking-[-2px] text-white font-['Inter'] mb-6 sm:mb-8 max-w-4xl" style={{
        color: '#FFFFFF'
      }}>
          The NSEZ One-Stop-Shop: Streamlining Institutional Approvals.
        </AnimatedHeading>

        <FadeUp delay={0.4} className="mb-8 sm:mb-10 w-full sm:max-w-[540px]">
          <p className="text-white/70 text-[15px] sm:text-[18px] leading-[1.65]">
            Redefining regulatory efficiency by centralizing municipal, provincial, and national government approvals into a single coordinated digital interface for seamless business onboarding.
          </p>
        </FadeUp>

        <FadeUp delay={0.5} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16">
          <SplitButton label="Initiate Regulatory Clearance Application" variant="green" />
          <SplitButton label="Download Compliance Guidelines Manual" variant="gold" icon={<Download className="w-5 h-5" />} />
        </FadeUp>

        <div className="flex justify-between items-end border-t border-white/10 pt-8 sm:pt-10">
          <FadeUp delay={0.6}>
            <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 text-white/80 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Centralized - Government-backed - Est. 2024</span>
            </div>
          </FadeUp>
          
          <div className="flex gap-2">
            {[0, 1, 2].map(i => <div key={i} className={cn("w-2 h-2 rounded-full", i === 0 ? "bg-[#C8A84B]" : "bg-white/30")} />)}
          </div>
        </div>
      </div>
    </section>;
};
const CentralizedServices = () => {
  const benefitCards = [{
    number: "CIPC",
    title: "Company Registration and Vetting",
    desc: "CIPC processing, corporate structural compliance, and statutory verification integrated into a single institutional window.",
    image: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=600&q=80",
    icon: <CheckCircle2 className="w-5 h-5" />
  }, {
    number: "SARS",
    title: "Tax and Customs Administration",
    desc: "Direct SARS desk integration for CCA enterprise registration, VAT exemptions, and specialized tax clearance certificates.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    icon: <BarChart3 className="w-5 h-5" />
  }, {
    number: "DHA",
    title: "Visa and Immigration Facilitation",
    desc: "Fast-tracked corporate visas, international specialist work permits, and residency clearances with the Department of Home Affairs.",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
    icon: <Users className="w-5 h-5" />
  }, {
    number: "EIA",
    title: "Environmental and Municipal Licensing",
    desc: "EIA record of decisions, rezoning approvals, water-use licenses, and municipal building plan sign-offs coordinated centrally.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    icon: <MapPin className="w-5 h-5" />
  }];
  return <section className="mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5">
      <div className="bg-[#EFF0EB] rounded-3xl py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1372px] mx-auto">
          <FadeUp>
            <SubtitlePill className="mb-6">CENTRALIZED GOVERNMENT SERVICES</SubtitlePill>
          </FadeUp>
          
          <div className="mb-12 sm:mb-16">
            <AnimatedHeading className="text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] text-[#0F2419] font-['Inter'] mb-6" style={{
            color: '#0F2419'
          }}>
              Four integrated government service channels under one roof.
            </AnimatedHeading>
            <FadeUp delay={0.2} className="max-w-2xl">
              <p className="text-[#0F2419]/70 text-[15px] sm:text-[17px] leading-[1.65]">
                Every approval required to commence industrial operations in the Nkomazi SEZ is coordinated through a single submission desk eliminating multi-agency delays.
              </p>
            </FadeUp>
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{
          once: true
        }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefitCards.map((card, i) => <BenefitCard key={card.number} {...card} />)}
          </motion.div>
        </div>
      </div>
    </section>;
};
const OnboardingRoadmap = () => {
  const steps = [{
    number: "01",
    title: "OSS Profiling",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
  }, {
    number: "02",
    title: "Consolidated Document Submission",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
  }, {
    number: "03",
    title: "Inter-Departmental Review",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
  }, {
    number: "04",
    title: "Permit Issuance and Operational Sign-off",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
  }];
  return <section className="mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5" id="roadmap">
      <div className="bg-[#0F2419] rounded-3xl py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-[1372px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 gap-8">
            <div className="max-w-3xl">
              <FadeUp>
                <SubtitlePill className="mb-6">DIGITAL ONBOARDING ROADMAP</SubtitlePill>
              </FadeUp>
              <AnimatedHeading className="text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] text-white font-['Inter']" style={{
              color: '#FFFFFF'
            }}>
                Your pathway from application to operational approval.
              </AnimatedHeading>
            </div>
            <FadeUp delay={0.3}>
              <SplitButton label="Initiate Your Application" variant="green" />
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => <StepCard key={step.number} {...step} />)}
          </div>

          <FadeUp delay={0.4} className="mt-10 sm:mt-12 text-center">
            <p className="text-white/40 text-[13px]">
              Hover each step to explore the approval pathway - Operational sign-off typically within <span className="font-bold text-[#C8A84B]">30 working days</span>
            </p>
          </FadeUp>
        </div>
      </div>
    </section>;
};
const IncentiveTracking = () => {
  const features = [{
    title: "Incentive Compliance Dashboard",
    desc: "Digital tracking tool for operational tenants to log continuous compliance metrics required to retain specialized SEZ fiscal benefits.",
    icon: BarChart3
  }, {
    title: "Local Content Verification",
    desc: "Quarter-based logging system for primary operators to demonstrate adherence to local localization targets and qualified SMME supply chain spending.",
    icon: CheckCircle2
  }, {
    title: "Employment Metrics Logging",
    desc: "Direct submission portal for local headcount numbers, employee demographics, and skills training metrics to secure active Employment Tax Incentives.",
    icon: Users
  }];
  const stats = [{
    value: "4",
    label: "Government departments integrated"
  }, {
    value: "30 days",
    label: "Avg approval turnaround"
  }, {
    value: "15%",
    label: "Corporate tax rate retained"
  }, {
    value: "100%",
    label: "Digital submission process"
  }];
  return <section className="bg-white py-16 sm:py-[100px]">
      <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 sm:mb-16">
          <FadeUp>
            <SubtitlePill className="mb-6">INCENTIVE COMPLIANCE TRACKING</SubtitlePill>
          </FadeUp>
          <AnimatedHeading className="text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] text-[#0F2419] font-['Inter'] mb-6" style={{
          color: '#0F2419'
        }}>
            Maintaining compliance to protect your fiscal incentives.
          </AnimatedHeading>
          <FadeUp delay={0.2} className="max-w-2xl">
            <p className="text-[#0F2419]/70 text-[15px] sm:text-[17px] leading-[1.65]">
              Operational tenants use the NSEZ digital compliance dashboard to log ongoing performance metrics and protect their active SEZ fiscal benefit status.
            </p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => <FeatureCard key={feature.title} {...feature} />)}
        </div>

        <div className="bg-[#C8A84B] py-10 px-6 sm:px-8 rounded-3xl mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => <div key={stat.label} className="text-center">
              <div className="text-[24px] sm:text-[36px] md:text-[48px] font-light text-[#0F2419] font-['Inter'] leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-[#0F2419]/70 text-[11px] sm:text-[13px] uppercase tracking-[0.06em] max-w-[150px] mx-auto">
                {stat.label}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
const ResourceLibrary = () => {
  const resources = [{
    title: "The dtic SEZ Investor Handbook",
    desc: "Official guide outlining inter-governmental frameworks and single-window service structures across South African special economic zones."
  }, {
    title: "Customs Controlled Area Guidelines",
    desc: "Comprehensive technical document specifying logistics rules, border corridor controls, and security setups required for tax-free perimeters."
  }, {
    title: "Integrated Spatial and Zoning Guide",
    desc: "Detailed map breakdowns highlighting structural setback rules, municipal utility hookups, and plot-specific engineering restrictions."
  }];
  return <section className="mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5">
      <div className="bg-[#EFF0EB] rounded-3xl py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1372px] mx-auto">
          <div className="mb-12 sm:mb-16">
            <FadeUp>
              <SubtitlePill className="mb-6">OSS REGULATORY RESOURCE LIBRARY</SubtitlePill>
            </FadeUp>
            <AnimatedHeading className="text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] text-[#0F2419] font-['Inter'] mb-6" style={{
            color: '#0F2419'
          }}>
              Official frameworks and technical compliance documents.
            </AnimatedHeading>
            <FadeUp delay={0.2} className="max-w-2xl">
              <p className="text-[#0F2419]/70 text-[15px] sm:text-[17px] leading-[1.65]">
                All regulatory reference materials required to prepare a compliant institutional application and maintain ongoing operational status within the zone.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((res, i) => <ResourceCard key={res.title} {...res} />)}
          </div>
        </div>
      </div>
    </section>;
};
const ContactSection = () => {
  return <section className="mx-1.5 sm:mx-2.5 mb-1.5 sm:mb-2.5 bg-[#0F2419] rounded-3xl relative overflow-hidden min-h-[620px]">
      <div className="absolute inset-0 opacity-10">
        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1800&q=85" alt="Contact Background" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 px-4 py-10 sm:px-6 sm:py-14 md:p-20 max-w-[1372px] mx-auto w-full">
        <FadeUp>
          <SubtitlePill className="mb-6">GET IN TOUCH</SubtitlePill>
        </FadeUp>
        <AnimatedHeading className="text-[32px] sm:text-[40px] lg:text-[52px] font-light leading-[1.1] tracking-[-1.5px] text-white font-['Inter'] mb-10 sm:mb-16" style={{
        color: '#FFFFFF'
      }}>
          Connect with our One-Stop-Shop Operations team.
        </AnimatedHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-start">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-8 flex flex-col gap-6 sm:gap-8 shadow-xl">
            <div>
              <div className="text-white/50 text-xs uppercase tracking-[0.06em] mb-2">
                Director: One-Stop-Shop Operations and Regulatory Vetting
              </div>
              <a href="mailto:oss@nsez.co.za" className="text-[#C8A84B] text-[20px] sm:text-[24px] md:text-[28px] font-medium font-['Inter'] hover:opacity-80 transition-opacity flex items-center gap-3 break-all">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
                oss@nsez.co.za
              </a>
            </div>
            
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-white/40 mt-1 shrink-0" />
              <p className="text-white/65 text-[15px] sm:text-[16px] leading-relaxed">
                Office First Floor, One-Stop-Shop Centre,<br />
                NSEZ Administration Precinct, Nkomazi, Mpumalanga
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
              <SplitButton label="Initiate Regulatory Application" variant="green" />
              <SplitButton label="Download Compliance Manual" variant="white" icon={<Download className="w-5 h-5" />} />
            </div>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="bg-[#1A3C2E] rounded-2xl p-6 sm:p-8 shadow-xl relative">
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4, 5].map(s => <Plus key={s} className="w-5 h-5 text-[#C8A84B]" />)}
            </div>
            
            <blockquote className="text-white text-[16px] sm:text-[18px] md:text-[20px] leading-relaxed font-['Inter'] italic mb-6 sm:mb-8">
              "The NSEZ one-stop-shop consolidated what would have been a 14-month multi-agency process into a single 30-day digital submission. Our environmental and CIPC approvals arrived simultaneously."
            </blockquote>
            
            <div className="text-white/50 text-sm mb-8 sm:mb-10">
              Operations Director, International Logistics Group SA
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 sm:pt-8 border-t border-white/10">
              {[{
              val: "4",
              label: "Integrated Desks"
            }, {
              val: "30d",
              label: "Avg Approval"
            }, {
              val: "100%",
              label: "Digital"
            }].map((stat, i) => <div key={stat.label}>
                  <div className="text-[#C8A84B] text-[22px] sm:text-[24px] md:text-[28px] font-light font-['Inter'] leading-none mb-2">
                    {stat.val}
                  </div>
                  <div className="text-white/60 text-[10px] uppercase tracking-[0.06em]">
                    {stat.label}
                  </div>
                </div>)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};

// --- Main Layout ---

export const CompliancePortalPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <div className="bg-[#0F2419] min-h-screen text-[#0F2419] overflow-x-hidden selection:bg-[#C8A84B] selection:text-[#0F2419]" style={{ fontFamily: BODY_FONT }}>
      <NSEZNavbar />
      
      <AnimatePresence>
        {showScrollTop && <motion.button initial={{
        opacity: 0,
        scale: 0.5
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.5
      }} onClick={() => window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })} className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1A3C2E] border border-white/20 text-white flex items-center justify-center z-[100] shadow-2xl hover:bg-[#C8A84B] hover:text-[#0F2419] transition-colors">
            <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>}
      </AnimatePresence>

      <main className="pb-10">
        <div id="hero"><Hero /></div>
        <div id="services"><CentralizedServices /></div>
        <div id="roadmap"><OnboardingRoadmap /></div>
        <div id="tracking"><IncentiveTracking /></div>
        <div id="resources"><ResourceLibrary /></div>
        <div id="contact"><ContactSection /></div>
      </main>

      <Footer />
    </div>;
};
