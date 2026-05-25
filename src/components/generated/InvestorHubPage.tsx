import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { Menu, X, ChevronUp } from 'lucide-react';
const HEADING_FONT = "'Inter', system-ui, sans-serif";
const BODY_FONT = "'DM Sans', system-ui, sans-serif";

// ─── Data ──────────────────────────────────────────────────────────────────────

const NAV_INVEST_ITEMS = ['Why Nkomazi', 'Incentives', 'Land & Infrastructure', 'Case Studies'];
const NAV_BUSINESS_ITEMS = ['Business Setup', 'Industrial Zones', 'Factory Shells', 'Supply Chains'];
const NAV_PROGRESS_ITEMS = ['Development Updates', 'Phase Milestones', 'Impact Reports', 'Infrastructure'];
const BENEFIT_CARDS = [{
  id: 'tax',
  number: '15%',
  title: 'Corporate Tax Rate',
  desc: 'A reduced corporate tax rate of 15% for qualifying businesses operating within the zone.',
  icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  bgImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80'
}, {
  id: 'vat',
  number: 'VAT',
  title: 'Customs and VAT Relief',
  desc: 'VAT and customs duty exemptions on capital goods and raw materials imported for use in the Customs Controlled Area.',
  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
  bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80'
}, {
  id: 'eti',
  number: 'ETI',
  title: 'Employment Tax Incentive',
  desc: 'Significant tax credits for the employment of qualifying low-income workers within the SEZ.',
  icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  bgImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80'
}, {
  id: 'building',
  number: '100%',
  title: 'Building Allowance',
  desc: 'Accelerated depreciation allowances on the cost of buildings and improvements within the zone.',
  icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  bgImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80'
}, {
  id: '12i',
  number: '12I',
  title: '12I Tax Allowance',
  desc: 'Capital investment tax allowances for greenfield and brownfield industrial projects within the SEZ.',
  icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  bgImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80'
}];
const SEZ_SECTORS = [{
  id: 'agro',
  tab: 'Agro-Processing',
  label: '01',
  title: 'Agro-Processing',
  desc: 'Direct access to Nkomazi fertile agricultural corridor with cold chain and value-added processing on-site. Connecting Southern African producers to global markets.',
  bullets: ['Direct access to Nkomazi fertile agricultural corridor', 'Cold chain and value-added processing on-site', 'Export links to SADC EU and MENA markets'],
  image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1400&q=85',
  tag: 'Agro-Processing'
}, {
  id: 'log',
  tab: 'Logistics and Distribution',
  label: '02',
  title: 'Logistics and Distribution',
  desc: 'Strategic position on the N4 Maputo Development Corridor with intermodal freight connections. Bonded warehousing with 24/7 security and real-time tracking.',
  bullets: ['Strategic position on N4 Maputo Development Corridor', 'Intermodal freight hub connecting road, rail, and air', 'Bonded warehousing with 24/7 security and tracking'],
  image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&q=85',
  tag: 'Logistics'
}, {
  id: 'auto',
  tab: 'Automotive',
  label: '03',
  title: 'Automotive',
  desc: 'Plug-and-play factory shells with bulk utility connections and streamlined customs. Single-window regulatory support and proximity to Mozambique border.',
  bullets: ['Plug-and-play factory shells with bulk utility connections', 'Streamlined customs and single-window regulatory support', 'Proximity to Mozambique border for regional supply chains'],
  image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=85',
  tag: 'Automotive'
}, {
  id: 'energy',
  tab: 'Green Energy',
  label: '04',
  title: 'Green Energy',
  desc: 'Leading-edge renewable energy infrastructure supporting both on-site generation and export into the national grid. Solar, wind, and battery storage solutions.',
  bullets: ['Large-scale solar and wind generation capacity', 'Battery storage and grid stabilization solutions', 'Carbon credits and green financing available'],
  image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1400&q=85',
  tag: 'Green Energy'
}];
const CONNECTIVITY_ITEMS = [{
  id: 'n4',
  title: 'The N4 Corridor',
  desc: "Direct frontage on the N4 National Highway, the primary artery linking South Africa's industrial heartland to the Port of Maputo."
}, {
  id: 'lebombo',
  title: 'Lebombo Border Post',
  desc: 'Immediate proximity to the busiest land border between South Africa and Mozambique, facilitating rapid cross-border movement.'
}, {
  id: 'rail',
  title: 'Rail Connectivity',
  desc: 'Integrated rail sidings connecting directly to the national rail network for bulk freight and containerized cargo.'
}, {
  id: 'utilities',
  title: 'Utilities',
  desc: 'Guaranteed supply of high-voltage power, industrial-grade water, and high-speed fibre-optic connectivity.'
}];
const STAT_BAR_ITEMS = [{
  stat: '16',
  label: 'SADC countries reachable'
}, {
  stat: 'N4',
  label: 'Direct highway access'
}, {
  stat: '48h',
  label: 'Avg port transit time'
}, {
  stat: '24/7',
  label: 'Utility supply guaranteed'
}];
const INVEST_STEPS = [{
  step: '01',
  title: 'Enquiry and Consultation',
  image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80'
}, {
  step: '02',
  title: 'Application Submission',
  image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80'
}, {
  step: '03',
  title: 'Technical Evaluation',
  image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'
}, {
  step: '04',
  title: 'Operator Agreement',
  image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80'
}, {
  step: '05',
  title: 'Implementation and Commissioning',
  image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80'
}];
const RESOURCE_CARDS = [{
  id: 'sez-act',
  title: 'SEZ Act No 15 of 2014',
  desc: 'Full legal framework governing special economic zones in South Africa.'
}, {
  id: 'eia',
  title: 'Environmental Impact Assessment (EIA)',
  desc: 'Strategic EIA reports for the Nkomazi region and surrounding industrial corridor.'
}, {
  id: 'master-plan',
  title: 'Master Plan Overview',
  desc: 'High-resolution map of phase-based infrastructure development across the SEZ.'
}, {
  id: 'factsheets',
  title: 'Sector Factsheets',
  desc: 'Detailed data on Agro-processing and Logistics potential in Nkomazi.'
}];
const CONTACT_STATS = [{
  stat: '2400ha',
  label: 'Hectares available'
}, {
  stat: '15%',
  label: 'Corporate tax rate'
}, {
  stat: '30k+',
  label: 'Jobs targeted by 2030'
}];
const FOOTER_LINKS_DATA = {
  Invest: ['Why Nkomazi', 'Incentives', 'Land & Infrastructure', 'Case Studies'],
  Sectors: ['Agro-processing', 'Manufacturing', 'Logistics', 'Energy'],
  Permits: ['Environmental Clearance', 'Building Plans', 'Business Licences'],
  Support: ['Investor Desk', 'Community Liaison', 'Skills Development'],
  Media: ['Press Releases', 'News & Insights']
};

// ─── Icons ─────────────────────────────────────────────────────────────────────

const ArrowUpRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M4.22748 12.7119C3.93459 13.0048 3.93459 13.4796 4.22748 13.7725C4.52038 14.0654 4.99525 14.0654 5.28814 13.7725L4.75781 13.2422L4.22748 12.7119ZM4.75781 13.2422L5.28814 13.7725L13.7734 5.28724L13.2431 4.75691L12.7128 4.22658L4.22748 12.7119L4.75781 13.2422Z" fill="currentColor" />
    <path d="M6.87891 4.75781H13.2429V11.1218" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.58844 6.47511C2.29705 6.47511 2.06083 6.71132 2.06083 7.00271C2.06083 7.2941 2.29705 7.53032 2.58844 7.53032V7.00271V6.47511ZM2.58844 7.00271V7.53032H11.0301V7.00271V6.47511H2.58844V7.00271Z" fill="currentColor" />
    <path d="M7.86448 3.83709L11.0301 7.00271L7.86448 10.1683" stroke="currentColor" strokeWidth="1.05521" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M14.7926 2.50012H17.3483L11.7649 8.88156L18.3333 17.5652H13.1903L9.16214 12.2986L4.55298 17.5652H1.99577L7.96774 10.7396L1.66666 2.50012H6.94022L10.5814 7.31401L14.7926 2.50012ZM13.8957 16.0356H15.3118L6.17074 3.94946H4.6511L13.8957 16.0356Z" fill="currentColor" />
  </svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10.0017 3.16891C12.2286 3.16891 12.4924 3.17868 13.3682 3.21775C14.1822 3.25356 14.6217 3.39031 14.9147 3.50427C15.3022 3.65403 15.5822 3.83636 15.8719 4.12613C16.165 4.41916 16.344 4.6959 16.4938 5.08335C16.6078 5.37638 16.7445 5.81917 16.7803 6.62988C16.8194 7.50895 16.8292 7.77268 16.8292 9.99642C16.8292 12.2234 16.8194 12.4871 16.7803 13.363C16.7445 14.1769 16.6078 14.6165 16.4938 14.9095C16.344 15.2969 16.1617 15.5769 15.8719 15.8667C15.5789 16.1597 15.3022 16.3388 14.9147 16.4886C14.6217 16.6025 14.1789 16.7393 13.3682 16.7751C12.4891 16.8142 12.2254 16.8239 10.0017 16.8239C7.77465 16.8239 7.51093 16.8142 6.63511 16.7751C5.82115 16.7393 5.38161 16.6025 5.08858 16.4886C4.70113 16.3388 4.42113 16.1565 4.13136 15.8667C3.83834 15.5737 3.65926 15.2969 3.5095 14.9095C3.39554 14.6165 3.2588 14.1737 3.22298 13.363C3.18391 12.4839 3.17414 12.2202 3.17414 9.99642C3.17414 7.76942 3.18391 7.5057 3.22298 6.62988C3.2588 5.81591 3.39554 5.37638 3.5095 5.08335C3.65926 4.6959 3.84159 4.4159 4.13136 4.12613C4.42439 3.83311 4.70113 3.65403 5.08858 3.50427C5.38161 3.39031 5.8244 3.25356 6.63511 3.21775C7.51093 3.17868 7.77465 3.16891 10.0017 3.16891ZM10.0017 1.66797C7.73884 1.66797 7.45558 1.67774 6.56673 1.71681C5.68114 1.75588 5.0723 1.89913 4.54485 2.10425C3.99462 2.31914 3.52903 2.6024 3.0667 3.06798C2.60111 3.53031 2.31786 3.9959 2.10297 4.54288C1.89785 5.07358 1.75459 5.67917 1.71552 6.56476C1.67645 7.45686 1.66669 7.74012 1.66669 10.0029C1.66669 12.2657 1.67645 12.549 1.71552 13.4378C1.75459 14.3234 1.89785 14.9323 2.10297 15.4597C2.31786 16.01 2.60111 16.4756 3.0667 16.9379C3.52903 17.4002 3.99462 17.6867 4.5416 17.8984C5.0723 18.1035 5.67789 18.2467 6.56348 18.2858C7.45232 18.3249 7.73558 18.3346 9.99839 18.3346C12.2612 18.3346 12.5445 18.3249 13.4333 18.2858C14.3189 18.2467 14.9277 18.1035 15.4552 17.8984C16.0022 17.6867 16.4678 17.4002 16.9301 16.9379C17.3924 16.4756 17.6789 16.01 17.8906 15.463C18.0957 14.9323 18.2389 14.3267 18.278 13.4411C18.3171 12.5523 18.3268 12.269 18.3268 10.0062C18.3268 7.74338 18.3171 7.46012 18.278 6.57127C18.2389 5.68568 18.0957 5.07684 17.8906 4.54939C17.6854 3.9959 17.4022 3.53031 16.9366 3.06798C16.4743 2.60565 16.0087 2.31914 15.4617 2.10751C14.931 1.90239 14.3254 1.75913 13.4398 1.72006C12.5477 1.67774 12.2645 1.66797 10.0017 1.66797Z" fill="currentColor" />
    <path d="M10.0016 5.7215C7.63791 5.7215 5.72021 7.63919 5.72021 10.0029C5.72021 12.3667 7.63791 14.2844 10.0016 14.2844C12.3654 14.2844 14.2831 12.3667 14.2831 10.0029C14.2831 7.63919 12.3654 5.7215 10.0016 5.7215ZM10.0016 12.7802C8.46815 12.7802 7.22441 11.5364 7.22441 10.0029C7.22441 8.46943 8.46815 7.2257 10.0016 7.2257C11.5352 7.2257 12.7789 8.46943 12.7789 10.0029C12.7789 11.5364 11.5352 12.7802 10.0016 12.7802Z" fill="currentColor" />
    <path d="M15.4519 5.55216C15.4519 6.10566 15.0026 6.55171 14.4524 6.55171C13.8989 6.55171 13.4528 6.1024 13.4528 5.55216C13.4528 4.99867 13.9022 4.55262 14.4524 4.55262C15.0026 4.55262 15.4519 5.00192 15.4519 5.55216Z" fill="currentColor" />
  </svg>;
const LinkedInIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
    <path d="M15.5996 0.666626H1.39716C0.716817 0.666626 0.166687 1.20374 0.166687 1.8678V16.1289C0.166687 16.7929 0.716817 17.3333 1.39716 17.3333H15.5996C16.28 17.3333 16.8334 16.7929 16.8334 16.1321V1.8678C16.8334 1.20374 16.28 0.666626 15.5996 0.666626ZM5.11135 14.8691H2.63739V6.91337H5.11135V14.8691ZM3.87437 5.82939C3.0801 5.82939 2.43882 5.18811 2.43882 4.39709C2.43882 3.60608 3.0801 2.9648 3.87437 2.9648C4.66539 2.9648 5.30666 3.60608 5.30666 4.39709C5.30666 5.18486 4.66539 5.82939 3.87437 5.82939ZM14.3692 14.8691H11.8985V11.0019C11.8985 10.0807 11.8822 8.89254 10.6127 8.89254C9.32684 8.89254 9.13153 9.8984 9.13153 10.9368V14.8691H6.66408V6.91337H9.03387V8.00061H9.06643C9.3952 7.37561 10.2025 6.7148 11.4037 6.7148C13.9069 6.7148 14.3692 8.36194 14.3692 10.5039V14.8691Z" fill="currentColor" />
  </svg>;
const DocIcon = () => <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <path d="M8 4H20L26 10V28H8V4Z" stroke="#C8A84B" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M20 4V10H26" stroke="#C8A84B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 16H20M12 20H18" stroke="#C8A84B" strokeWidth="1.5" strokeLinecap="round" />
  </svg>;

// ─── Buttons ───────────────────────────────────────────────────────────────────

const GreenButton = ({
  label
}: {
  label: string;
}) => <motion.a href="#" onClick={e => e.preventDefault()} className="group flex h-[44px] items-stretch no-underline relative overflow-hidden rounded-lg" whileHover={{
  y: -2,
  scale: 1.015
}} whileTap={{
  scale: 0.97
}} transition={{
  duration: 0.2,
  ease: 'easeOut'
}}>
    <div className="flex items-center justify-center px-5 bg-[#1A3C2E] text-white text-[15px] font-medium rounded-l-lg tracking-[0.01em]" style={{
    fontFamily: BODY_FONT
  }}>{label}</div>
    <div className="flex items-center justify-center w-[44px] bg-[#1A3C2E] text-white rounded-r-lg flex-shrink-0"><ArrowRightIcon /></div>
    <div className="pointer-events-none absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 ease-in-out" style={{
    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)'
  }} />
  </motion.a>;
const GoldButton = ({
  label
}: {
  label: string;
}) => <motion.a href="#" onClick={e => e.preventDefault()} className="group flex h-[44px] items-stretch no-underline relative overflow-hidden rounded-lg" whileHover={{
  y: -2,
  scale: 1.015
}} whileTap={{
  scale: 0.97
}} transition={{
  duration: 0.2,
  ease: 'easeOut'
}}>
    <div className="flex items-center justify-center px-5 bg-[#C8A84B] text-[#0F2419] text-[15px] font-medium rounded-l-lg tracking-[0.01em]" style={{
    fontFamily: BODY_FONT
  }}>{label}</div>
    <div className="flex items-center justify-center w-[44px] bg-[#C8A84B] text-[#0F2419] rounded-r-lg flex-shrink-0"><ArrowUpRightIcon /></div>
    <div className="pointer-events-none absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 ease-in-out" style={{
    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)'
  }} />
  </motion.a>;
const WhiteButton = ({
  label
}: {
  label: string;
}) => <motion.a href="#" onClick={e => e.preventDefault()} className="group flex h-[44px] items-stretch no-underline relative overflow-hidden rounded-lg" whileHover={{
  y: -2,
  scale: 1.015
}} whileTap={{
  scale: 0.97
}} transition={{
  duration: 0.2,
  ease: 'easeOut'
}}>
    <div className="flex items-center justify-center px-5 bg-white text-[#0F2419] text-[15px] font-medium rounded-l-lg tracking-[0.01em]" style={{
    fontFamily: BODY_FONT
  }}>{label}</div>
    <div className="flex items-center justify-center w-[44px] bg-white text-[#0F2419] rounded-r-lg flex-shrink-0"><ArrowUpRightIcon /></div>
    <div className="pointer-events-none absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 ease-in-out" style={{
    background: 'linear-gradient(105deg, transparent 30%, rgba(200,168,75,0.25) 50%, transparent 70%)'
  }} />
  </motion.a>;

// ─── Subtitle pill ─────────────────────────────────────────────────────────────

const Subtitle = ({
  children
}: {
  children: React.ReactNode;
}) => <motion.span initial={{
  opacity: 0,
  y: 8
}} whileInView={{
  opacity: 1,
  y: 0
}} viewport={{
  once: true
}} transition={{
  duration: 0.4,
  ease: 'easeOut'
}} className="inline-block bg-[#1A3C2E] text-white text-xs rounded-full px-3 py-2 leading-[21px] tracking-[0.06em] uppercase" style={{
  fontFamily: BODY_FONT
}}>
    {children}
  </motion.span>;

// ─── FadeUp ────────────────────────────────────────────────────────────────────

const FadeUp = ({
  children,
  delay = 0,
  className = ''
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-50px'
  });
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 28
  }} animate={inView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1]
  }} className={className}>
      {children}
    </motion.div>;
};

// ─── AnimatedHeading ───────────────────────────────────────────────────────────

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
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-60px'
  });
  const words = children.split(' ');
  return <Tag ref={ref} className={className} style={{
    ...style,
    fontFamily: HEADING_FONT,
    overflow: 'hidden'
  }}>
      {words.map((word, i) => <span key={`${word}-${i}`} style={{
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
      } : {}} transition={{
        duration: 0.55,
        delay: i * 0.065,
        ease: [0.22, 1, 0.36, 1]
      }}>
            {word}
          </motion.span>
        </span>)}
    </Tag>;
};

// ─── Nav Dropdown ──────────────────────────────────────────────────────────────

const DropdownMenu = ({
  label,
  items
}: {
  label: string;
  items: string[];
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return <div ref={ref} className="relative">
      <button className="flex items-center gap-1.5 text-white text-[15px] font-medium rounded-lg px-3 py-2.5 tracking-[0.01em] hover:bg-white/10 transition-all duration-300" style={{
      fontFamily: BODY_FONT
    }} onClick={() => setOpen(o => !o)} aria-haspopup="true" aria-expanded={open}>
        {label}
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 11 6" fill="none" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M9.63082 1.26563L6.37082 4.52563C5.98582 4.91063 5.35582 4.91063 4.97082 4.52563L1.71082 1.26562" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence>
        {open && <motion.div initial={{
        opacity: 0,
        y: -8,
        scale: 0.97
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: -8,
        scale: 0.97
      }} transition={{
        duration: 0.18,
        ease: 'easeOut'
      }} className="absolute top-full left-0 mt-2 w-52 z-[999]">
            <div className="bg-[#1A3C2E] rounded-xl p-2.5 flex flex-col gap-0.5" style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}>
              {items.map(item => <a key={item} href="#" onClick={e => e.preventDefault()} className="block text-white text-[14px] font-medium rounded-lg px-3 py-1.5 hover:bg-white/20 transition-all duration-200 whitespace-nowrap no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT
          }}>
                  {item}
                </a>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

// ─── Sticky Navbar ─────────────────────────────────────────────────────────────

const StickyNav = ({
  mobileMenuOpen,
  setMobileMenuOpen
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <motion.nav className="fixed top-0 left-0 right-0 z-[9999] px-4 lg:px-6" initial={false} animate={scrolled ? {
    paddingTop: '0px'
  } : {
    paddingTop: '20px'
  }} transition={{
    duration: 0.35,
    ease: 'easeInOut'
  }}>
      <motion.div className="absolute inset-0" initial={false} animate={scrolled ? {
      opacity: 1
    } : {
      opacity: 0
    }} transition={{
      duration: 0.35
    }} style={{
      background: 'rgba(15,36,25,0.96)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)'
    }} />
      <motion.div className="absolute bottom-0 left-0 right-0 h-[1px]" initial={false} animate={scrolled ? {
      opacity: 1
    } : {
      opacity: 0
    }} transition={{
      duration: 0.35
    }} style={{
      background: 'linear-gradient(90deg, transparent, rgba(200,168,75,0.4), transparent)'
    }} />
      <div className="relative flex justify-center">
        <motion.div className="flex items-center justify-between w-full max-w-[1372px]" animate={scrolled ? {
        paddingTop: '14px',
        paddingBottom: '14px'
      } : {
        paddingTop: '0px',
        paddingBottom: '0px'
      }} transition={{
        duration: 0.35,
        ease: 'easeInOut'
      }}>
          <a href="/" className="flex-shrink-0 flex items-center no-underline min-w-0">
            <img src="/nsez-logo-white.png" alt="Nkomazi SEZ" className="h-12 w-auto object-contain max-w-none" />
          </a>
          <div className="hidden lg:flex items-center gap-0 backdrop-blur-[26px] bg-white/10 border border-white/20 rounded-xl p-[4.6px]">
            <a href="/investor-hub" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT
          }}>Investor Hub</a>
            <a href="/enterprise-hub" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT
          }}>Enterprise Hub</a>
            <a href="/careers" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT
          }}>Careers & Community</a>
            <a href="/compliance-portal" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT
          }}>Compliance Portal</a>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden lg:block"><GreenButton label="Invest Now" /></div>
            <button className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full bg-[#1A3C2E] text-white flex-shrink-0" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} transition={{
        duration: 0.25
      }} className="relative lg:hidden mt-2 rounded-2xl bg-[#0F2419]/95 backdrop-blur-md overflow-hidden">
            <div className="p-4 flex flex-col gap-2">
              <a href="/investor-hub" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 no-underline" style={{
            fontFamily: BODY_FONT
          }}>Investor Hub</a>
              <a href="/enterprise-hub" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 no-underline" style={{
            fontFamily: BODY_FONT
          }}>Enterprise Hub</a>
              <a href="/careers" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 no-underline" style={{
            fontFamily: BODY_FONT
          }}>Careers & Community</a>
              <a href="/compliance-portal" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 no-underline" style={{
            fontFamily: BODY_FONT
          }}>Compliance Portal</a>
              <div className="pt-2"><GreenButton label="Invest Now" /></div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </motion.nav>;
};

// ─── Scroll Progress Bar ───────────────────────────────────────────────────────

const ScrollProgressBar = () => {
  const {
    scrollYProgress
  } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });
  return <motion.div className="fixed top-0 left-0 right-0 z-[99999] h-[2px] origin-left" style={{
    scaleX,
    background: 'linear-gradient(90deg, #C8A84B, #e8c96a, #C8A84B)'
  }} />;
};

// ─── Back to Top ───────────────────────────────────────────────────────────────

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <AnimatePresence>
      {visible && <motion.button aria-label="Back to top" initial={{
      opacity: 0,
      y: 24,
      scale: 0.85
    }} animate={{
      opacity: 1,
      y: 0,
      scale: 1
    }} exit={{
      opacity: 0,
      y: 16,
      scale: 0.85
    }} transition={{
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1]
    }} whileTap={{
      scale: 0.92
    }} onHoverStart={() => setHovered(true)} onHoverEnd={() => setHovered(false)} onClick={() => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })} className="fixed bottom-6 right-6 z-[9998] w-10 h-10 rounded-full flex items-center justify-center" style={{
      background: '#0F2419',
      border: '1px solid rgba(255,255,255,0.2)',
      transition: 'background 0.25s, box-shadow 0.25s',
      boxShadow: hovered ? '0 8px 32px rgba(200,168,75,0.3)' : '0 4px 20px rgba(0,0,0,0.3)'
    }}>
          <ChevronUp size={16} className="text-white" />
        </motion.button>}
    </AnimatePresence>;
};

// ─── Hero Section ──────────────────────────────────────────────────────────────

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return <section ref={heroRef} id="sec-hero" className="relative flex flex-col justify-end rounded-3xl overflow-hidden mx-1.5 sm:mx-2.5 mt-2.5 min-h-[600px] sm:min-h-[860px]">
      <motion.div className="absolute inset-[-10%]" style={{
      y: bgY
    }}>
        <div className="absolute inset-0" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1800&q=85")',
        backgroundPosition: 'center 55%',
        backgroundSize: 'cover'
      }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F2419]/85 via-[#0F2419]/70 to-transparent" />
      <div className="absolute inset-0" style={{
      background: 'linear-gradient(to top, rgba(15,36,25,0.9) 0%, transparent 60%)'
    }} />
      <motion.div className="relative z-10 max-w-[1372px] mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 pt-32 sm:pt-40" style={{
      opacity
    }}>
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-5">
            <motion.div initial={{
            opacity: 0,
            x: -24
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.7,
            delay: 0.45,
            ease: 'easeOut'
          }} className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#C8A84B]" />
              <span className="text-[#C8A84B] text-xs font-medium tracking-[0.16em] uppercase" style={{
              fontFamily: BODY_FONT
            }}>INDUSTRIAL · MPUMALANGA, SOUTH AFRICA</span>
            </motion.div>
            <Subtitle>INVESTOR HUB - NKOMAZI SEZ</Subtitle>
            <AnimatedHeading as="h1" className="text-white m-0 font-light text-[40px] sm:text-[52px] lg:text-[72px]" style={{
            letterSpacing: '-2px',
            lineHeight: '1.05'
          }}>
              Secure Your Industrial Future in the Nkomazi SEZ.
            </AnimatedHeading>
            <FadeUp delay={0.3}>
              <p className="text-white/70 text-[15px] sm:text-[18px] leading-[1.65] m-0 w-full sm:max-w-[540px]" style={{
              fontFamily: BODY_FONT
            }}>
                Access a de-risked investment environment with world-class infrastructure, strategic logistics connectivity, and comprehensive fiscal incentives designed for global scale.
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.45} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <GreenButton label="Start Your Application" />
            <GoldButton label="Download Investor Prospectus" />
          </FadeUp>
        </div>
      </motion.div>
      <motion.div className="absolute bottom-8 left-4 sm:left-8 z-10" initial={{
      opacity: 0,
      x: -16
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: 1.2,
      duration: 0.6,
      ease: 'easeOut'
    }}>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-2">
          <div className="w-2 h-2 rounded-full bg-[#C8A84B] animate-pulse" />
          <span className="text-white/80 text-xs tracking-[0.08em]" style={{
          fontFamily: BODY_FONT
        }}>De-risked · Government-backed · Est. 2024</span>
        </div>
      </motion.div>
      <motion.div className="absolute bottom-8 right-6 sm:right-10 z-10 flex items-center gap-2" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1.4,
      duration: 0.6
    }}>
        {[0, 1, 2].map(i => <button key={i} className="rounded-full transition-all duration-500" style={{
        width: i === 0 ? '28px' : '8px',
        height: '8px',
        backgroundColor: i === 0 ? '#C8A84B' : 'rgba(255,255,255,0.3)'
      }} />)}
      </motion.div>
    </section>;
};

// ─── Section II - Fiscal Incentives ───────────────────────────────────────────

const FiscalIncentivesSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  return <section id="sec-incentives" className="mx-1.5 sm:mx-2.5 mb-2.5">
      <div className="bg-[#EFF0EB] rounded-3xl py-16 sm:py-20 overflow-hidden">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col items-start gap-3 max-w-2xl">
              <Subtitle>FISCAL AND NON-FISCAL INCENTIVES</Subtitle>
              <AnimatedHeading className="text-[#0F2419] font-light m-0 text-[32px] sm:text-[40px] lg:text-[52px]" style={{
              lineHeight: '1.1',
              letterSpacing: '-1.5px'
            }}>
                A comprehensive incentive framework built for scale.
              </AnimatedHeading>
              <FadeUp delay={0.1}>
                <p className="text-[#0F2419]/70 text-[15px] sm:text-[17px] leading-[1.65] m-0 max-w-2xl" style={{
                fontFamily: BODY_FONT
              }}>
                  The Nkomazi SEZ offers a layered fiscal and non-fiscal incentive package designed to maximize your return on investment and reduce time-to-operational status.
                </p>
              </FadeUp>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {BENEFIT_CARDS.slice(0, 3).map((card, i) => <motion.div key={card.id} initial={{
              opacity: 0,
              y: 32
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: '-40px'
            }} transition={{
              duration: 0.55,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }} onHoverStart={() => setHovered(card.id)} onHoverEnd={() => setHovered(null)} whileHover={{
              y: -6,
              scale: 1.02
            }} className="relative rounded-2xl overflow-hidden cursor-default min-h-[280px]">
                  <div className="absolute inset-0" style={{
                backgroundImage: `url("${card.bgImage}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0F2419]/95 via-[#0F2419]/60 to-[#0F2419]/20" />
                  <div className="relative z-10 h-full flex flex-col justify-between p-7">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={card.icon} /></svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#C8A84B] font-light" style={{
                    fontFamily: HEADING_FONT,
                    fontSize: '52px',
                    lineHeight: '1',
                    letterSpacing: '-2px'
                  }}>{card.number}</span>
                      <h3 className="text-white font-semibold m-0 text-[18px] sm:text-[22px]" style={{
                    fontFamily: HEADING_FONT
                  }}>{card.title}</h3>
                      <p className="text-white/65 m-0 text-[15px] sm:text-[16px]" style={{
                    fontFamily: BODY_FONT,
                    lineHeight: '1.65'
                  }}>{card.desc}</p>
                    </div>
                  </div>
                </motion.div>)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:px-[calc(16.66%/2)]">
              {BENEFIT_CARDS.slice(3).map((card, i) => <motion.div key={card.id} initial={{
              opacity: 0,
              y: 32
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: '-40px'
            }} transition={{
              duration: 0.55,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }} onHoverStart={() => setHovered(card.id)} onHoverEnd={() => setHovered(null)} whileHover={{
              y: -6,
              scale: 1.02
            }} className="relative rounded-2xl overflow-hidden cursor-default min-h-[280px]">
                  <div className="absolute inset-0" style={{
                backgroundImage: `url("${card.bgImage}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0F2419]/95 via-[#0F2419]/60 to-[#0F2419]/20" />
                  <div className="relative z-10 h-full flex flex-col justify-between p-7">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={card.icon} /></svg>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#C8A84B] font-light" style={{
                    fontFamily: HEADING_FONT,
                    fontSize: '52px',
                    lineHeight: '1',
                    letterSpacing: '-2px'
                  }}>{card.number}</span>
                      <h3 className="text-white font-semibold m-0 text-[18px] sm:text-[22px]" style={{
                    fontFamily: HEADING_FONT
                  }}>{card.title}</h3>
                      <p className="text-white/65 m-0 text-[15px] sm:text-[16px]" style={{
                    fontFamily: BODY_FONT,
                    lineHeight: '1.65'
                  }}>{card.desc}</p>
                    </div>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};

// ─── Section III - Industrial Clusters ────────────────────────────────────────

const IndustrialClustersSection = () => {
  const [activeSector, setActiveSector] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSector(prev => (prev + 1) % SEZ_SECTORS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return <section id="sec-sectors" className="mx-1.5 sm:mx-2.5 mb-2.5">
      <div className="bg-[#0F2419] rounded-3xl overflow-hidden py-16 sm:py-24">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="flex flex-col items-start gap-3">
                <Subtitle>KEY SECTORS</Subtitle>
                <AnimatedHeading className="text-white font-light m-0 text-[32px] sm:text-[40px] lg:text-[52px]" style={{
                lineHeight: '1.1',
                letterSpacing: '-1.5px'
              }}>
                  Specialized industrial clusters.
                </AnimatedHeading>
              </div>
              <div className="flex flex-wrap gap-2">
                {SEZ_SECTORS.map((s, i) => <motion.button key={s.id} onClick={() => setActiveSector(i)} className="relative px-5 py-2 rounded-full text-[14px] font-medium overflow-hidden" style={{
                fontFamily: BODY_FONT,
                background: activeSector === i ? '#C8A84B' : 'rgba(255,255,255,0.10)',
                color: activeSector === i ? '#0F2419' : 'rgba(255,255,255,0.70)'
              }} whileTap={{
                scale: 0.96
              }} transition={{
                duration: 0.2
              }}>
                    {s.tab}
                  </motion.button>)}
              </div>
            </div>
            <AnimatePresence mode="wait">
              {SEZ_SECTORS.map((sector, i) => i === activeSector ? <motion.div key={sector.id} initial={{
              opacity: 0,
              y: 24
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -16
            }} transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1]
            }} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                  <div className="flex flex-col gap-6">
                    <span className="text-[#C8A84B]/25 font-light" style={{
                  fontFamily: HEADING_FONT,
                  fontSize: '120px',
                  lineHeight: '1',
                  letterSpacing: '-5px'
                }}>{sector.label}</span>
                    <h3 className="text-white font-light m-0 text-[18px] sm:text-[22px]" style={{
                  fontFamily: HEADING_FONT,
                  letterSpacing: '-0.5px',
                  lineHeight: '1.3'
                }}>{sector.title}</h3>
                    <p className="text-white/70 text-[15px] sm:text-[16px] leading-[1.65] m-0" style={{
                  fontFamily: BODY_FONT
                }}>{sector.desc}</p>
                    <ul className="list-none p-0 m-0 flex flex-col gap-3">
                      {sector.bullets.map(bullet => <li key={bullet} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C8A84B]/15 border border-[#C8A84B]/30 flex items-center justify-center mt-0.5">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3.5 6L6.5 2" stroke="#C8A84B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                          <span className="text-white/70 text-[14px] leading-[1.65]" style={{
                      fontFamily: BODY_FONT
                    }}>{bullet}</span>
                        </li>)}
                    </ul>
                    <div className="flex items-center gap-4">
                      <GoldButton label="Explore this sector" />
                      <div className="flex gap-2">
                        {SEZ_SECTORS.map((_, dotIdx) => <button key={dotIdx} onClick={() => setActiveSector(dotIdx)} className="rounded-full transition-all duration-300" style={{
                      width: dotIdx === activeSector ? '24px' : '8px',
                      height: '8px',
                      backgroundColor: dotIdx === activeSector ? '#C8A84B' : 'rgba(255,255,255,0.25)'
                    }} />)}
                      </div>
                    </div>
                  </div>
                  <motion.div className="relative overflow-hidden rounded-2xl" style={{
                height: '320px'
              }} initial={{
                opacity: 0,
                x: 20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.55,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}>
                    <img src={sector.image} alt={sector.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{
                  background: 'linear-gradient(to top, rgba(15,36,25,0.7) 0%, transparent 50%)'
                }} />
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-block bg-[#C8A84B] text-[#0F2419] text-xs font-semibold px-3 py-1 rounded-full tracking-[0.06em] uppercase" style={{
                    fontFamily: BODY_FONT
                  }}>{sector.tag}</span>
                    </div>
                  </motion.div>
                </motion.div> : null)}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>;
};

// ─── Section IV - Logistics & Connectivity ────────────────────────────────────

const ConnectivitySection = () => {
  return <section id="sec-connectivity" className="pt-16 sm:pt-24 pb-[60px] sm:pb-[100px]">
      <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-start gap-3">
            <Subtitle>LOGISTICS AND CONNECTIVITY</Subtitle>
            <AnimatedHeading className="text-[#0F2419] font-light m-0 text-[32px] sm:text-[40px] lg:text-[52px]" style={{
            lineHeight: '1.1',
            letterSpacing: '-1.5px'
          }}>
              Africa's most connected industrial corridor.
            </AnimatedHeading>
          </div>
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
              {CONNECTIVITY_ITEMS.map((item, i) => <FadeUp key={item.id} delay={i * 0.1}>
                  <div className="border-l-2 border-[#C8A84B] pl-5 flex flex-col gap-1">
                    <h3 className="font-semibold m-0 text-[18px] sm:text-[22px]" style={{
                  fontFamily: HEADING_FONT,
                  color: '#0F2419'
                }}>{item.title}</h3>
                    <p className="m-0 text-[15px] sm:text-[16px]" style={{
                  fontFamily: BODY_FONT,
                  color: 'rgba(15,36,25,0.65)',
                  lineHeight: '1.6'
                }}>{item.desc}</p>
                  </div>
                </FadeUp>)}
            </div>
            <FadeUp delay={0.2} className="w-full lg:w-1/2">
              <div className="rounded-2xl overflow-hidden" style={{
              height: '320px'
            }}>
                <img src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1000&q=85" alt="N4 Corridor logistics" className="w-full h-full object-cover" />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
      <div className="bg-[#C8A84B] py-8 mt-16">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {STAT_BAR_ITEMS.map(item => <div key={item.stat} className="text-center flex flex-col gap-1">
                <span className="font-light text-[24px] sm:text-[36px]" style={{
              fontFamily: HEADING_FONT,
              color: '#0F2419',
              lineHeight: '1'
            }}>{item.stat}</span>
                <span className="uppercase tracking-[0.06em]" style={{
              fontFamily: BODY_FONT,
              color: 'rgba(15,36,25,0.70)',
              fontSize: '13px'
            }}>{item.label}</span>
              </div>)}
          </div>
        </div>
      </div>
    </section>;
};

// ─── Section V - Application Process ─────────────────────────────────────────

const ApplicationProcessSection = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  return <section id="sec-process" className="mx-1.5 sm:mx-2.5 mb-2.5">
      <div className="bg-[#EFF0EB] rounded-3xl py-16 sm:py-20 overflow-hidden">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
              <div className="flex flex-col items-start gap-3">
                <Subtitle>HOW TO INVEST</Subtitle>
                <AnimatedHeading className="text-[#0F2419] font-light m-0 text-[32px] sm:text-[40px] lg:text-[52px]" style={{
                lineHeight: '1.1',
                letterSpacing: '-1.5px'
              }}>
                  Your pathway to the Nkomazi SEZ.
                </AnimatedHeading>
              </div>
              <FadeUp delay={0.1}><GreenButton label="Start your journey" /></FadeUp>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {INVEST_STEPS.map((step, i) => <motion.div key={step.step} initial={{
              opacity: 0,
              y: 32
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: '-40px'
            }} transition={{
              duration: 0.55,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }} onHoverStart={() => setHovered(i)} onHoverEnd={() => setHovered(null)} whileHover={{
              y: -6,
              scale: 1.015
            }} className="relative overflow-hidden rounded-2xl cursor-default min-h-[280px] sm:min-h-[340px]">
                  <div className="absolute inset-0" style={{
                backgroundImage: `url("${step.image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }} />
                  <div className="absolute inset-0" style={{
                background: 'linear-gradient(180deg, rgba(15,36,25,0.2) 0%, rgba(15,36,25,0.90) 100%)'
              }} />
                  <div className="relative z-10 h-full flex flex-col justify-between p-6">
                    <div className="w-9 h-9 rounded-full bg-[#C8A84B] text-[#0F2419] text-sm font-bold flex items-center justify-center" style={{
                  fontFamily: BODY_FONT
                }}>{step.step}</div>
                    <div className="flex flex-col gap-1">
                      <div className="w-6 h-px bg-[#C8A84B] mb-2" />
                      <h3 className="text-white font-semibold m-0 text-[18px] sm:text-[22px]" style={{
                    fontFamily: HEADING_FONT
                  }}>{step.title}</h3>
                    </div>
                  </div>
                </motion.div>)}
            </div>
            <FadeUp delay={0.2}>
              <p className="text-[#0F2419]/50 text-[13px] text-center m-0" style={{
              fontFamily: BODY_FONT
            }}>
                <span>Hover each step to explore your pathway · Operational within </span>
                <strong className="font-bold text-[#C8A84B]">60 days</strong>
                <span> from signing</span>
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>;
};

// ─── Section VI - Resource Library ────────────────────────────────────────────

const ResourceLibrarySection = () => {
  return <section id="sec-resources" className="pt-16 sm:pt-24 pb-[60px] sm:pb-[100px]">
      <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-start gap-3">
            <Subtitle>RESOURCES</Subtitle>
            <AnimatedHeading className="text-[#0F2419] font-light m-0 text-[32px] sm:text-[40px] lg:text-[52px]" style={{
            lineHeight: '1.1',
            letterSpacing: '-1.5px'
          }}>
              Everything you need to invest with confidence.
            </AnimatedHeading>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {RESOURCE_CARDS.map((card, i) => <motion.div key={card.id} initial={{
            opacity: 0,
            y: 28
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.55,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }} whileHover={{
            y: -4
          }} className="bg-[#EFF0EB] rounded-2xl p-8 flex flex-col gap-4 cursor-default">
                <DocIcon />
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold m-0 text-[18px] sm:text-[22px]" style={{
                fontFamily: HEADING_FONT,
                color: '#0F2419'
              }}>{card.title}</h3>
                  <p className="m-0 text-[15px] sm:text-[16px]" style={{
                fontFamily: BODY_FONT,
                color: 'rgba(15,36,25,0.65)',
                lineHeight: '1.65'
              }}>{card.desc}</p>
                </div>
                <a href="#" onClick={e => e.preventDefault()} className="no-underline flex items-center gap-1.5 mt-auto" style={{
              fontFamily: BODY_FONT,
              color: '#C8A84B',
              fontSize: '14px',
              fontWeight: 500
            }}>
                  <span>Download</span>
                  <ArrowUpRightIcon />
                </a>
              </motion.div>)}
          </div>
        </div>
      </div>
    </section>;
};

// ─── Section VII - Contact & CTA ───────────────────────────────────────────────

const ContactSection = () => {
  return <section id="sec-contact" className="relative overflow-hidden rounded-3xl mx-1.5 sm:mx-2.5 mb-2.5 bg-[#0F2419]" style={{
    minHeight: '620px'
  }}>
      <div className="absolute inset-0" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1800&q=85")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0.10
    }} />
      <div className="relative z-10 max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col items-start gap-3">
            <Subtitle>GET IN TOUCH</Subtitle>
            <AnimatedHeading className="text-white font-light m-0 text-[32px] sm:text-[40px] lg:text-[52px]" style={{
            lineHeight: '1.1',
            letterSpacing: '-1.5px'
          }}>
              Build your future in Southern Africa's growth engine.
            </AnimatedHeading>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <FadeUp delay={0.1}>
              <div className="bg-[#1A3C2E] rounded-2xl p-8 flex flex-col gap-5">
                <span className="uppercase tracking-[0.06em]" style={{
                fontFamily: BODY_FONT,
                color: 'rgba(255,255,255,0.50)',
                fontSize: '12px'
              }}>Chief Investment Officer</span>
                <a href="mailto:invest@nsez.co.za" className="no-underline" style={{
                fontFamily: HEADING_FONT,
                color: '#C8A84B',
                fontSize: '20px',
                fontWeight: 500
              }}>invest@nsez.co.za</a>
                <p className="m-0 text-[15px] sm:text-[16px]" style={{
                fontFamily: BODY_FONT,
                color: 'rgba(255,255,255,0.65)'
              }}>NSEZ Administration Building, Nkomazi, Mpumalanga</p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
                  <GreenButton label="Start Your Application" />
                  <WhiteButton label="Download Investor Prospectus" />
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="bg-[#1A3C2E] rounded-2xl p-8 flex flex-col gap-6">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(s => <svg key={s} width="16" height="16" viewBox="0 0 14 14" fill="#C8A84B">
                      <path d="M7 1l1.8 3.6L13 5.4l-3 2.9.7 4.1L7 10.3l-3.7 2.1.7-4.1-3-2.9 4.2-.8z" />
                    </svg>)}
                </div>
                <p className="m-0 text-[15px] sm:text-[16px]" style={{
                fontFamily: BODY_FONT,
                color: 'rgba(255,255,255,0.80)',
                lineHeight: '1.65',
                fontStyle: 'italic'
              }}>
                  "The single-window support made our entire setup seamless — permits, land, utilities. We were operational within 60 days of signing, unmatched in any other African SEZ we evaluated."
                </p>
                <span style={{
                fontFamily: BODY_FONT,
                color: 'rgba(255,255,255,0.50)',
                fontSize: '14px'
              }}>— David Ferreira, MD · Moz-Cargo Logistics</span>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  {CONTACT_STATS.map(item => <div key={item.stat} className="rounded-xl p-4 flex flex-col gap-1" style={{
                  background: 'rgba(200,168,75,0.10)',
                  border: '1px solid rgba(200,168,75,0.20)'
                }}>
                      <span className="font-light" style={{
                    fontFamily: HEADING_FONT,
                    color: '#C8A84B',
                    fontSize: '28px',
                    lineHeight: '1'
                  }}>{item.stat}</span>
                      <span className="uppercase tracking-[0.06em]" style={{
                    fontFamily: BODY_FONT,
                    color: 'rgba(255,255,255,0.60)',
                    fontSize: '12px'
                  }}>{item.label}</span>
                    </div>)}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>;
};

// ─── Footer ────────────────────────────────────────────────────────────────────

const Footer = () => {
  return <footer>
      <div className="bg-white pt-[60px] sm:pt-[115px] pb-16">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[40px] sm:gap-[60px]">
            {Object.entries(FOOTER_LINKS_DATA).map(([cat, links]) => <FadeUp key={cat} className="flex flex-col gap-6">
                <span className="text-[#0F2419] text-base font-semibold tracking-[0.04em] uppercase" style={{
              fontFamily: BODY_FONT
            }}>{cat}</span>
                <div className="flex flex-col gap-2.5">
                  {links.map(link => <a key={link} href="#" onClick={e => e.preventDefault()} className="text-[#0F2419]/60 text-[15px] font-normal no-underline hover:text-[#0F2419] transition-colors duration-200" style={{
                fontFamily: BODY_FONT
              }}>{link}</a>)}
                </div>
              </FadeUp>)}
          </div>
        </div>
      </div>
      <div className="bg-[#0F2419]">
        <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 pb-12 border-b border-white/10">
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-[#1A3C2E] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2L16 6V12L9 16L2 12V6L9 2Z" stroke="#C8A84B" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="9" cy="9" r="2" fill="#C8A84B" />
                  </svg>
                </div>
                <span className="text-white font-semibold text-base tracking-[0.05em] uppercase" style={{
                fontFamily: BODY_FONT
              }}>
                  Nkomazi <span className="font-light opacity-60">SEZ</span>
                </span>
              </div>
              <p className="text-white/40 text-[14px] font-normal leading-6 m-0" style={{
              fontFamily: BODY_FONT
            }}>
                <span>Copyright © </span>
                <a href="#" onClick={e => e.preventDefault()} className="text-white/70 font-semibold no-underline hover:text-white transition-colors duration-200">Nkomazi SEZ</a>
                <span> 2026 | All Rights Reserved</span>
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <span className="text-white font-light leading-[1.2]" style={{
              fontFamily: HEADING_FONT,
              fontSize: '40px',
              letterSpacing: '-1px'
            }}>
                Ready to invest in Nkomazi?
              </span>
              <GreenButton label="Contact our investment desk" />
            </div>
          </div>
          <div className="pt-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-4">
            <div className="flex items-center gap-5">
              <a href="#" onClick={e => e.preventDefault()} className="text-white/40 text-[14px] font-normal no-underline hover:text-white/70 transition-colors duration-200" style={{
              fontFamily: BODY_FONT
            }}>Terms of Use</a>
              <a href="#" onClick={e => e.preventDefault()} className="text-white/40 text-[14px] font-normal no-underline hover:text-white/70 transition-colors duration-200" style={{
              fontFamily: BODY_FONT
            }}>Privacy Policy</a>
            </div>
            <div>
              <a href="mailto:invest@nkomazisez.co.za" className="text-white/40 text-[14px] font-normal no-underline hover:text-white/70 transition-colors duration-200" style={{
              fontFamily: BODY_FONT
            }}>invest@nkomazisez.co.za</a>
            </div>
            <div className="flex items-center gap-2.5">
              {[{
              icon: <XIcon key="x" />,
              label: 'X / Twitter'
            }, {
              icon: <InstagramIcon key="ig" />,
              label: 'Instagram'
            }, {
              icon: <LinkedInIcon key="li" />,
              label: 'LinkedIn'
            }].map(social => <motion.a key={social.label} href="#" onClick={e => e.preventDefault()} aria-label={social.label} className="flex items-center justify-center w-11 h-11 rounded-[10px] text-white/50 border border-white/10 no-underline" whileHover={{
              backgroundColor: '#C8A84B',
              color: '#0F2419',
              scale: 1.05,
              borderColor: '#C8A84B'
            }} whileTap={{
              scale: 0.95
            }} transition={{
              duration: 0.18
            }}>
                  {social.icon}
                </motion.a>)}
            </div>
          </div>
        </div>
      </div>
    </footer>;
};

// ─── Page Component ────────────────────────────────────────────────────────────

export const InvestorHubPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return <div className="w-full bg-white overflow-x-hidden" style={{
    fontFamily: BODY_FONT
  }}>
      <ScrollProgressBar />
      <BackToTop />
      <StickyNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <HeroSection />
      <FiscalIncentivesSection />
      <IndustrialClustersSection />
      <ConnectivitySection />
      <ApplicationProcessSection />
      <ResourceLibrarySection />
      <ContactSection />
      <Footer />
    </div>;
};