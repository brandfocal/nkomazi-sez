import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GlobalRouteMap } from './GlobalRouteMap';
const HEADING_FONT = "'Inter', system-ui, sans-serif";
const BODY_FONT = "'DM Sans', system-ui, sans-serif";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_SECTORS = ['Agro-Processing & Agriculture', 'Manufacturing', 'Green Economy', 'Logistics & Warehousing'];
const NAV_INVESTORS = ['Investment Guide', 'Incentives', 'Land Allocation', 'Permits & Licensing', 'Contact Desk'];
const NAV_BUSINESS = ['Business Setup', 'Industrial Zones', 'Factory Shells', 'Supply Chains', 'Trade Partners'];
const NAV_PROGRESS = ['Development Updates', 'Phase Milestones', 'Impact Reports', 'Job Creation', 'Infrastructure'];
const PARTNER_LOGOS = [
  '/partners/dp-world.png',
  '/partners/dtic.png',
  '/partners/economic-development-tourism.png',
  '/partners/ehlanzeni-district-municipality.png',
  '/partners/nkomazi-local-municipality.png'
];
const HERO_SLIDES = [{
  id: 'investment',
  label: 'Investment Opportunity',
  headline: "Southern Africa's Premier Special Economic Zone",
  sub: 'Invest in a zone engineered for scale — agro-processing, manufacturing, logistics, and green energy on the N4 Maputo Corridor.',
  image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1800&q=85',
  cta: {
    primary: 'View Opportunities',
    secondary: 'Investment Guide'
  }
}, {
  id: 'smme',
  label: 'SMME Hub',
  headline: 'Empowering Local Enterprise in the Zone',
  sub: 'Connecting SMMEs with procurement contracts, business registration support, B-BBEE alignment, and DFI funding pathways.',
  image: '/nsez-smme5.jpg',
  cta: {
    primary: 'Visit SMME Hub',
    secondary: 'Register Enterprise'
  }
}, {
  id: 'partners',
  label: 'Strategic Partners',
  headline: 'A Network of Institutions Backing Nkomazi',
  sub: 'Backed by government, development finance institutions, and global investors committed to sustainable industrial growth.',
  image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1800&q=85',
  cta: {
    primary: 'Meet Our Partners',
    secondary: 'Become a Partner'
  }
}] as {
  id: string;
  label: string;
  headline: string;
  sub: string;
  image: string;
  cta: {
    primary: string;
    secondary: string;
  };
}[];

// ─── COMMUNITY CARDS ─────────────────────────────────────────────────────────
const COMMUNITY_CARDS = [{
  id: 'nyp',
  label: 'Artisan Program',
  title: 'Nkomazi Youth Artisan Program',
  desc: 'Transitioning local youth into certified trade artisans — welders, boilermakers, and electricians — deployed within construction phases.',
  bgImage: '/nsez-banner9.jpg',
  bgPosition: 'center 15%'
}, {
  id: 'wis',
  label: 'Women in Supply Chains',
  title: 'Women in Industrial Supply Chains',
  desc: 'Dedicated mentorship tracks assisting women-led enterprises and workers into logistics and agro-processing roles.',
  bgImage: '/nsez-industrial.jpg',
  bgPosition: 'center 15%'
}, {
  id: 'tvet',
  label: 'TVET Programs',
  title: 'Sector-Aligned Training',
  desc: 'Short courses in logistics, agro-processing technology, and mechanical/electrical maintenance aligned to zone demand.',
  bgImage: '/nsez-banner2.jpg',
  bgPosition: 'center 25%'
}] as {
  id: string;
  label: string;
  title: string;
  desc: string;
  bgImage: string;
  bgPosition: string;
}[];

// Sector card gradient bottom colors — varied palette
const SECTOR_BOTTOM_COLORS = ['#1D4D35', '#1A2744', '#1A3320', '#2C1A0E'] as string[];
// Benefit card gradient bottom colors — varied palette
const ENTERPRISE_CARD_BOTTOM_COLORS = ['#0F1923', '#1D4D35', '#1A2744'] as string[];
const SEZ_SECTORS = [{
  id: 'agro',
  label: '01',
  title: 'Agro-Processing & Agriculture',
  desc: "Direct access to Nkomazi's fertile agricultural corridor with cold chain and value-added processing facilities. Export links to SADC, EU, and MENA markets.",
  items: ["Direct access to Nkomazi's fertile agricultural corridor.", 'Cold chain and value-added processing facilities on-site.', 'Export links to SADC, EU, and MENA markets.'],
  image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=1400&q=85',
  bgImage: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=1800&q=85',
  tag: 'Agriculture'
}, {
  id: 'mfg',
  label: '02',
  title: 'Manufacturing',
  desc: 'Plug-and-play factory shells with bulk utility connections and streamlined customs. Single-window regulatory support and proximity to Mozambique border.',
  items: ['Plug-and-play factory shells with bulk utility connections.', 'Streamlined customs and single-window regulatory support.', 'Proximity to Mozambique border for regional supply chains.'],
  image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=85',
  bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1800&q=85',
  tag: 'Manufacturing'
}, {
  id: 'green',
  label: '03',
  title: 'Green Economy',
  desc: 'Renewable energy, solar, waste-to-energy and sustainable industrial solutions driving the green transition.',
  items: ['Renewable energy and solar installation zones.', 'Waste-to-energy and circular economy facilities.', 'Sustainable industrial solutions for the green transition.'],
  image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=85',
  bgImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1800&q=85',
  tag: 'Green Economy'
}, {
  id: 'log',
  label: '04',
  title: 'Logistics & Warehousing',
  desc: 'Strategic position on the N4 Maputo Development Corridor with intermodal freight connections. Bonded warehousing with 24/7 security and real-time tracking.',
  items: ['Strategic position on the N4 Maputo Development Corridor.', 'Intermodal freight hub connecting road, rail, and air.', 'Bonded warehousing with 24/7 security and tracking.'],
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=85',
  bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&q=85',
  tag: 'Logistics'
}] as {
  id: string;
  label: string;
  title: string;
  desc: string;
  items: string[];
  image: string;
  bgImage: string;
  tag: string;
}[];
const INVEST_STEPS = [{
  step: '01',
  title: 'Submit EOI',
  desc: 'Complete our online Expression of Interest form detailing your sector, investment size, and operational requirements.',
  image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80',
  icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
}, {
  step: '02',
  title: 'Site Visit',
  desc: 'Our investment facilitators arrange an on-site walkthrough and tailored incentive briefing at your convenience.',
  image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
  icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
}, {
  step: '03',
  title: 'Land & Agreements',
  desc: 'We fast-track lease agreements and land-use approvals within the SEZ regulatory framework — typically within 30 days.',
  image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80',
  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
}, {
  step: '04',
  title: 'Go Operational',
  desc: 'Break ground with full support from our one-stop-shop desk for permits, utilities, and compliance.',
  image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&q=80',
  icon: 'M13 10V3L4 14h7v7l9-11h-7z'
}] as {
  step: string;
  title: string;
  desc: string;
  image: string;
  icon: string;
}[];
const ENTERPRISE_HUB_CARDS = [{
  id: 'cipc',
  number: 'CIPC',
  title: 'Business Registration Support',
  desc: 'Streamlined assistance to meet institutional compliance, CIPC requirements, and tax clearances required for SEZ operations.',
  bgImage: '/nsez-smme3.jpg'
}, {
  id: 'bbbee',
  number: 'B-BBEE',
  title: 'B-BBEE Alignment',
  desc: 'Toolkits and advisory services to assist local enterprises in maximizing broad-based black economic empowerment scoring for tenant supply chains.',
  bgImage: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=800&q=80'
}, {
  id: 'dfi',
  number: 'DFI',
  title: 'Access to Funding',
  desc: 'Facilitation of linkages between registered SMMEs and development finance institutions including SEFA, NEF, and MEGA.',
  bgImage: '/nsez-smme2.jpg'
}] as {
  id: string;
  number: string;
  title: string;
  desc: string;
  bgImage: string;
}[];
const INVESTOR_STORIES = [{
  id: 's1',
  quote: "Establishing our agro-processing facility in Nkomazi SEZ was the best investment decision we've made. The infrastructure, incentives, and hands-on support exceeded every expectation.",
  name: 'Thandi Mokoena',
  role: 'CEO',
  company: 'Greenfield Produce Ltd',
  image: '/nsez-investor.jpg',
  bgImage: '/nsez-investor.jpg',
  sector: 'Agro-processing'
}, {
  id: 's2',
  quote: "The single-window permit desk saved us months of bureaucracy. We were operational within 60 days of signing — unmatched in any other African SEZ we evaluated.",
  name: 'David Ferreira',
  role: 'MD',
  company: 'Moz-Cargo Logistics',
  image: '/nsez-smme.jpg',
  bgImage: '/nsez-smme.jpg',
  sector: 'Logistics'
}, {
  id: 's3',
  quote: "The N4 corridor access and tax incentives made Nkomazi SEZ an obvious choice. Our manufacturing costs dropped 22% compared to our Johannesburg facility.",
  name: 'Priya Naidoo',
  role: 'COO',
  company: 'Precision Parts SA',
  image: '/nsez-investor3.jpg',
  bgImage: '/nsez-investor3.jpg',
  sector: 'Manufacturing'
}] as {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  image: string;
  bgImage: string;
  sector: string;
}[];
const FAQS = [{
  q: 'What tax incentives are available to SEZ investors?',
  a: 'Qualifying companies benefit from a reduced 15% corporate tax rate, VAT exemptions on goods and services within the zone, and customs duty rebates on imported capital equipment.'
}, {
  q: 'How large are the available land parcels?',
  a: 'Industrial plots range from 0.5 ha to 50+ ha. We also offer fully constructed factory shells from 500 m² for immediate occupation, subject to availability.'
}, {
  q: 'What utilities and infrastructure are provided?',
  a: 'The SEZ provides bulk water, sanitation, electricity (Eskom feed + solar backup), fibre-optic connectivity, and paved internal roads to every plot.'
}, {
  q: 'Is there support for work permit applications?',
  a: 'Yes. The Nkomazi SEZ one-stop-shop facilitates critical skills visas, work permits, and environmental authorisations on behalf of registered investors.'
}] as {
  q: string;
  a: string;
}[];
const FOOTER_LINKS = {
  Invest: ['Why Nkomazi', 'Incentives', 'Land & Infrastructure', 'Case Studies'],
  Sectors: ['Agro-processing', 'Manufacturing', 'Logistics', 'Energy'],
  Permits: ['Environmental Clearance', 'Building Plans', 'Business Licences'],
  Support: ['Investor Desk', 'Community Liaison', 'Skills Development'],
  Media: ['Press Releases', 'News & Insights']
};

// Enterprise Hub metrics trio
const EH_METRICS = [{
  value: 'R2.1bn',
  label: 'in SMME procurement\nunlocked within the zone'
}, {
  value: '840+',
  label: 'SMMEs registered\nand trading in the zone'
}, {
  value: 'R480m',
  label: 'in active procurement\ncontracts awarded'
}];

// Gold divider
const GoldDivider = () => <div style={{
  height: '1px',
  background: 'rgba(200,168,75,0.25)',
  width: '100%'
}} />;

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

// ─── Buttons ──────────────────────────────────────────────────────────────────

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
    <div className="flex items-center justify-center px-5 bg-[#1A3C2E] text-white text-[15px] font-medium overflow-hidden rounded-l-lg tracking-[0.01em]" style={{
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
    <div className="flex items-center justify-center px-5 bg-[#C8A84B] text-[#0F2419] text-[15px] font-medium overflow-hidden rounded-l-lg tracking-[0.01em]" style={{
    fontFamily: BODY_FONT
  }}>{label}</div>
    <div className="flex items-center justify-center w-[44px] bg-[#C8A84B] text-[#0F2419] rounded-r-lg flex-shrink-0"><ArrowUpRightIcon /></div>
    <div className="pointer-events-none absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 ease-in-out" style={{
    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)'
  }} />
  </motion.a>;
const DarkButton = ({
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
    <div className="flex items-center justify-center px-5 bg-[#0F2419] text-white text-[15px] font-medium overflow-hidden rounded-l-lg tracking-[0.01em]" style={{
    fontFamily: BODY_FONT
  }}>{label}</div>
    <div className="flex items-center justify-center w-[44px] bg-[#0F2419] text-white rounded-r-lg flex-shrink-0"><ArrowUpRightIcon /></div>
    <div className="pointer-events-none absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 ease-in-out" style={{
    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)'
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
    <div className="flex items-center justify-center px-5 bg-white text-[#0F2419] text-[15px] font-medium overflow-hidden rounded-l-lg tracking-[0.01em]" style={{
    fontFamily: BODY_FONT
  }}>{label}</div>
    <div className="flex items-center justify-center w-[44px] bg-white text-[#0F2419] rounded-r-lg flex-shrink-0"><ArrowUpRightIcon /></div>
    <div className="pointer-events-none absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-500 ease-in-out" style={{
    background: 'linear-gradient(105deg, transparent 30%, rgba(200,168,75,0.25) 50%, transparent 70%)'
  }} />
  </motion.a>;

// ─── Subtitle pill ────────────────────────────────────────────────────────────

const Subtitle = ({
  children,
  light = false
}: {
  children: React.ReactNode;
  light?: boolean;
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
}} className="inline-block text-xs rounded-full px-3 py-2 leading-[21px] tracking-[0.06em] uppercase" style={{
  fontFamily: BODY_FONT,
  background: light ? 'rgba(255,255,255,0.12)' : '#1A3C2E',
  color: light ? 'rgba(255,255,255,0.85)' : '#ffffff'
}}>
    {children}
  </motion.span>;

// ─── FadeUp ───────────────────────────────────────────────────────────────────

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

// ─── Animated Section Heading ─────────────────────────────────────────────────

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

// ─── Count-up hook ────────────────────────────────────────────────────────────

const useCountUp = (target: number, inView: boolean, duration: number = 1.8) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return count;
};

// ─── Counter card ─────────────────────────────────────────────────────────────

const CounterItem = ({
  value,
  suffix,
  label,
  bg
}: {
  value: string;
  suffix?: string;
  label: string;
  bg: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true
  });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
  const nonNumericPrefix = value.replace(/[0-9,]/g, '');
  const isNumeric = !isNaN(numericValue) && numericValue > 0;
  const count = useCountUp(numericValue, inView, 2.0);
  const displayValue = isNumeric ? count.toLocaleString() : value;
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 30
  }} animate={inView ? {
    opacity: 1,
    y: 0
  } : {}} whileHover={{
    y: -6,
    scale: 1.03,
    boxShadow: '0 20px 48px rgba(0,0,0,0.18)'
  }} transition={{
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1]
  }} className={`${bg} rounded-2xl p-[30px] flex flex-col gap-2.5 cursor-default`}>
      <div className="flex items-end gap-0">
        {nonNumericPrefix && <span className="text-[#0F2419] font-light text-6xl leading-none" style={{
        fontFamily: HEADING_FONT
      }}>{nonNumericPrefix}</span>}
        <span className="text-[#0F2419] font-light leading-none" style={{
        fontFamily: HEADING_FONT,
        fontSize: '60px',
        lineHeight: '1'
      }}>{displayValue}</span>
        {suffix && <span className="text-[#0F2419] font-light text-6xl leading-none" style={{
        fontFamily: HEADING_FONT
      }}>{suffix}</span>}
      </div>
      <p className="text-[#0F2419] font-medium text-base tracking-[-0.2px] leading-6 m-0" style={{
      fontFamily: BODY_FONT
    }}>{label}</p>
    </motion.div>;
};

// ─── Nav dropdown ─────────────────────────────────────────────────────────────

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
  // suppress unused warning
  void NAV_INVESTORS;
  void NAV_BUSINESS;
  void NAV_PROGRESS;
  return <div ref={ref} className="relative">
      <button className="flex items-center gap-1.5 text-white text-[15px] font-medium rounded-lg px-3 py-2.5 tracking-[0.01em] hover:bg-white/10 transition-all duration-300" style={{
      fontFamily: BODY_FONT,
      borderBottom: '2px solid transparent',
      transition: 'background 0.2s ease, border-color 0.2s ease'
    }} onMouseEnter={e => {
      (e.currentTarget as HTMLButtonElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
    }} onMouseLeave={e => {
      (e.currentTarget as HTMLButtonElement).style.borderBottomColor = 'transparent';
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
          }}>{item}</a>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

// suppress unused components warning
void DropdownMenu;

// ─── Sectors Hover Dropdown ───────────────────────────────────────────────────

const SectorsHoverDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  return <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button className="flex items-center gap-1.5 text-white text-[15px] font-medium rounded-lg px-3 py-2.5 tracking-[0.01em] hover:bg-white/10 transition-all duration-300" style={{
      fontFamily: BODY_FONT,
      borderBottom: '2px solid transparent',
      transition: 'background 0.2s ease, border-color 0.2s ease'
    }} onMouseEnter={e => {
      (e.currentTarget as HTMLButtonElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
    }} onMouseLeave={e => {
      (e.currentTarget as HTMLButtonElement).style.borderBottomColor = 'transparent';
    }} aria-haspopup="true" aria-expanded={open}>
        Sectors
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
      }} className="absolute top-full left-0 mt-2 z-[999]" style={{
        minWidth: '240px'
      }}>
            <div className="bg-[#1A3C2E] rounded-[8px] p-2.5 flex flex-col gap-0.5" style={{
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)'
        }}>
              {NAV_SECTORS.map(item => <a key={item} href="#" onClick={e => e.preventDefault()} className="block text-white text-[14px] font-medium rounded-lg px-3 py-2 transition-all duration-200 whitespace-nowrap no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#E8521A';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
          }}>{item}</a>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </div>;
};

// ─── Sticky Navbar ────────────────────────────────────────────────────────────

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
  const NAV_SIMPLE_LINKS = [
    { label: 'About Us', href: '#sec-about' },
    { label: 'Investor Hub', href: '/investor-hub' },
    { label: 'SMME Hub', href: '/enterprise-hub' },
    { label: 'Careers & Community', href: '/careers' },
    { label: 'Compliance Portal', href: '/compliance-portal' },
    { label: 'Contact', href: '/contact' }
  ];
  return <nav className="fixed top-0 left-0 right-0 z-[9999] px-4 sm:px-6" style={{
    paddingTop: scrolled ? '0px' : '20px',
    transition: 'padding 0.35s ease'
  }}>
      <div className="absolute inset-0" style={{
      opacity: scrolled ? 1 : 0,
      background: 'rgba(10, 24, 16, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      boxShadow: scrolled ? '0 1px 0 rgba(200,168,75,0.15)' : 'none',
      transition: 'background 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease'
    }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{
      background: 'linear-gradient(90deg, transparent, rgba(200,168,75,0.4), transparent)',
      opacity: scrolled ? 1 : 0,
      transition: 'opacity 0.35s ease'
    }} />
      <div className="relative flex justify-center">
        <div className="flex items-center justify-between w-full max-w-[1372px]" style={{
        paddingTop: scrolled ? '14px' : '0px',
        paddingBottom: scrolled ? '14px' : '0px',
        transition: 'padding 0.35s ease'
      }}>
          {/* ── Logo: Nkomazi SEZ image ── */}
          <a href="/" className="flex-shrink-0 flex items-center no-underline">
            <img src="/NSEZ-logo.jpg" alt="Nkomazi SEZ" className="h-8 sm:h-10 w-auto object-contain rounded-md" />
          </a>
          <div className="hidden lg:flex items-center gap-0 backdrop-blur-[26px] bg-white/10 border border-white/20 rounded-xl p-[4.6px]">
            <a href="#sec-about" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT,
            borderBottom: '2px solid transparent',
            transition: 'background 0.2s ease, border-color 0.2s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
          }}>About Us</a>
            <SectorsHoverDropdown />
            <a href="/investor-hub" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT,
            borderBottom: '2px solid transparent',
            transition: 'background 0.2s ease, border-color 0.2s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
          }}>Investor Hub</a>
            <a href="/enterprise-hub" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT,
            borderBottom: '2px solid transparent',
            transition: 'background 0.2s ease, border-color 0.2s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
          }}>SMME Hub</a>
            <a href="/careers" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT,
            borderBottom: '2px solid transparent',
            transition: 'background 0.2s ease, border-color 0.2s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
          }}>Careers &amp; Community</a>
            <a href="/compliance-portal" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT,
            borderBottom: '2px solid transparent',
            transition: 'background 0.2s ease, border-color 0.2s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
          }}>Compliance Portal</a>
            <a href="/contact" className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 transition-all duration-300 no-underline tracking-[0.01em]" style={{
            fontFamily: BODY_FONT,
            borderBottom: '2px solid transparent',
            transition: 'background 0.2s ease, border-color 0.2s ease'
          }} onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,168,75,0.6)';
          }} onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
          }}>Contact</a>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden lg:block"><GreenButton label="Invest Now" /></div>
            <button className="lg:hidden flex items-center justify-center w-11 h-11 rounded-full bg-[#1A3C2E] text-white flex-shrink-0" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
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
              {NAV_SIMPLE_LINKS.map(link => <a key={link.label} href={link.href} onClick={e => {
                if (link.href === '#') {
                  e.preventDefault();
                }
                setMobileMenuOpen(false);
              }} className="text-white text-[15px] font-medium rounded-lg px-3 py-2.5 hover:bg-white/10 no-underline" style={{
                fontFamily: BODY_FONT
              }}>{link.label}</a>)}
              <div className="border-t border-white/10 pt-2 mt-1">
                <p className="text-white/40 text-xs font-semibold px-3 pb-1 uppercase tracking-widest" style={{
              fontFamily: BODY_FONT
            }}>Sectors</p>
                {NAV_SECTORS.map(s => <a key={s} href="#" onClick={e => {
              e.preventDefault();
              setMobileMenuOpen(false);
            }} className="block text-white/80 text-sm rounded-lg px-3 py-2 hover:bg-white/10 no-underline" style={{
              fontFamily: BODY_FONT
            }}>{s}</a>)}
              </div>
              <div className="pt-2"><GreenButton label="Invest Now" /></div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
};

// ─── Hero — LEFT-TO-RIGHT wipe reveal for sector backgrounds ─────────────────

const HERO_STATS = [{
  value: 2800,
  suffix: 'ha',
  label: 'Total Land Area'
}, {
  value: 15,
  suffix: '%',
  label: 'Tax Incentive'
}, {
  value: 4.2,
  suffix: 'bn',
  prefix: 'R',
  label: 'Investment Pipeline'
}];
const HeroStatItem = ({
  stat,
  inView
}: {
  stat: {
    value: number;
    suffix: string;
    label: string;
    prefix?: string;
  };
  inView: boolean;
}) => {
  const isDecimal = stat.value % 1 !== 0;
  const intTarget = isDecimal ? Math.round(stat.value * 10) : stat.value;
  const count = useCountUp(intTarget, inView, 2.0);
  const displayCount = isDecimal ? (count / 10).toFixed(1) : count.toLocaleString();
  return <div className="flex flex-col gap-0.5">
      <span style={{
      fontFamily: HEADING_FONT,
      fontWeight: 700,
      fontSize: '20px',
      color: '#ffffff',
      lineHeight: '1.1'
    }}>
        {stat.prefix && <span>{stat.prefix}</span>}
        <span>{displayCount}</span>
        <span>{stat.suffix}</span>
      </span>
      <span style={{
      fontFamily: BODY_FONT,
      fontSize: '11px',
      color: 'rgba(255,255,255,0.55)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      lineHeight: '1.4'
    }}>{stat.label}</span>
    </div>;
};

// ─── Video Hero with parallax background ─────────────────────────────────────
const VideoHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [prevImg, setPrevImg] = useState<number | null>(null);
  const [wiping, setWiping] = useState(false);
  const statsRowRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRowRef, {
    once: true,
    margin: '-40px'
  });

  // Parallax scroll transform
  const {
    scrollY
  } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], ['0%', '18%']);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg(prev => {
        setPrevImg(prev);
        setWiping(true);
        return (prev + 1) % HERO_SLIDES.length;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const handleSlideChange = (i: number) => {
    if (i === activeImg) return;
    setPrevImg(activeImg);
    setWiping(true);
    setActiveImg(i);
  };
  void wiping;
  return <section ref={heroRef} className="relative flex flex-col justify-end rounded-3xl mx-2 sm:mx-3 mt-2 sm:mt-3 mb-2 sm:mb-3 h-[calc(100vh-16px)] sm:h-[calc(100vh-24px)] min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]" style={{
    overflow: 'hidden',
    position: 'relative'
  }}>
      {/* Parallax background container — overflow hidden so parallax doesn't leak */}
      <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden'
    }}>
        {/* Moving parallax layer — slightly oversized to avoid white edges */}
        <motion.div style={{
        position: 'absolute',
        inset: '-18% 0 0 0',
        y: bgY
      }}>
          {/* Previous image — stays static underneath */}
          {prevImg !== null && <div className="absolute inset-0" style={{
          backgroundImage: `url("${HERO_SLIDES[prevImg].image}")`,
          backgroundPosition: 'center 55%',
          backgroundSize: 'cover'
        }} />}
          {/* Incoming image — wipes in from left to right */}
          <motion.div key={activeImg} className="absolute inset-0" initial={{
          clipPath: 'inset(0 100% 0 0)'
        }} animate={{
          clipPath: 'inset(0 0% 0 0)'
        }} transition={{
          duration: 1.4,
          ease: [0.76, 0, 0.24, 1]
        }} onAnimationComplete={() => {
          setWiping(false);
          setPrevImg(null);
        }} style={{
          backgroundImage: `url("${HERO_SLIDES[activeImg].image}")`,
          backgroundPosition: 'center 55%',
          backgroundSize: 'cover'
        }} />
        </motion.div>
      </div>

      {/* Cinematic gradient — top 40% clean, organic fade to solid */}
      <div className="absolute inset-0" style={{
      background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(15,36,25,0.30) 55%, rgba(15,36,25,0.85) 78%, #0F2419 92%)'
    }} />

      {/* Hero content — full-width two-column layout anchored to bottom */}
      <motion.div className="absolute left-0 right-0" style={{
      bottom: '64px',
      paddingLeft: 'clamp(48px, 5vw, 80px)',
      paddingRight: 'clamp(48px, 5vw, 80px)',
      opacity
    }}>
        <motion.div className="w-full flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-0" initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 1.0,
        delay: 0.2,
        ease: [0.22, 1, 0.36, 1]
      }}>
          {/* LEFT column — sector chip + headline + slide indicators */}
          <div className="flex flex-col gap-0 flex-1 min-w-0">
            {/* Upgraded sector label chip */}
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
          }} className="flex items-center gap-3 mb-5">
              <AnimatePresence mode="wait">
                <motion.div key={activeImg} initial={{
                opacity: 0,
                x: -8
              }} animate={{
                opacity: 1,
                x: 0
              }} exit={{
                opacity: 0,
                x: 8
              }} transition={{
                duration: 0.35
              }} className="inline-flex items-center" style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderLeft: '3px solid #C8A84B',
                padding: '8px 16px 8px 12px',
                borderRadius: '999px'
              }}>
                  <span style={{
                  fontFamily: BODY_FONT,
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.9)',
                  letterSpacing: '0.04em'
                }}>
                    {HERO_SLIDES[activeImg].label} · Mpumalanga, South Africa
                  </span>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Static multi-colour headline */}
            <div style={{
            marginBottom: '20px'
          }}>
              <AnimatePresence mode="wait">
                <motion.h1 key={`heading-${activeImg}`} initial={{
                opacity: 0,
                y: 14
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -10
              }} transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }} style={{
                fontFamily: HEADING_FONT,
                fontSize: 'clamp(38px, 6vw, 80px)',
                lineHeight: '1.05',
                letterSpacing: '-2px',
                fontWeight: 300,
                color: '#ffffff',
                margin: 0,
                marginBottom: '20px'
              }}>
                  {activeImg === 0 && <span>
                      <span>Invest Where </span>
                      <span style={{
                    color: '#5DBB3A'
                  }}>Growth </span>
                      <span>Meets </span>
                      <span style={{
                    color: '#C8A84B'
                  }}>Opportunity</span>
                    </span>}
                  {activeImg === 1 && <span>
                      <span>Empowering </span>
                      <span style={{
                    color: '#5DBB3A'
                  }}>Local Enterprise </span>
                      <span>in the </span>
                      <span style={{
                    color: '#C8A84B'
                  }}>Zone</span>
                    </span>}
                  {activeImg === 2 && <span>
                      <span>Built on </span>
                      <span style={{
                    color: '#5DBB3A'
                  }}>Partnerships</span>
                      <span>, Driven by </span>
                      <span style={{
                    color: '#C8A84B'
                  }}>Purpose</span>
                    </span>}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Slide indicators — below headline */}
            <motion.div className="flex items-center gap-2" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 1.4,
            duration: 0.6
          }}>
              {HERO_SLIDES.map((_, i) => <button key={`hero-dot-${i}`} onClick={() => handleSlideChange(i)} className="rounded-full transition-all duration-500" style={{
              width: activeImg === i ? '28px' : '8px',
              height: '8px',
              backgroundColor: activeImg === i ? '#C8A84B' : 'rgba(255,255,255,0.35)'
            }} />)}
          </motion.div>
          </div>

          {/* Vertical rule divider */}
          <div className="hidden lg:block flex-shrink-0" style={{
          width: '1px',
          alignSelf: 'stretch',
          backgroundColor: 'rgba(255,255,255,0.15)',
          marginLeft: '40px',
          marginRight: '40px'
        }} />

          {/* RIGHT column — stat strip + body text + CTAs */}
          <div className="flex flex-col gap-0" style={{
          width: 'clamp(320px, 30vw, 480px)',
          flexShrink: 0
        }}>
            {/* Stat strip — animated count-up */}
            <div ref={statsRowRef} className="flex flex-row items-center" style={{
            gap: '20px',
            marginBottom: '20px'
          }}>
              {HERO_STATS.map((stat, i) => <div key={stat.label} className="flex flex-row items-center" style={{
              gap: '20px'
            }}>
                  <HeroStatItem stat={stat} inView={statsInView} />
                  {i < HERO_STATS.length - 1 && <div style={{
                width: '1px',
                height: '32px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                flexShrink: 0
              }} />}
                </div>)}
            </div>

            {/* Body text */}
            <AnimatePresence mode="wait">
              <motion.p key={`sub-${activeImg}`} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -8
            }} transition={{
              duration: 0.4,
              ease: 'easeOut'
            }} style={{
              fontFamily: BODY_FONT,
              fontSize: '14px',
              lineHeight: '1.8',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '16px',
              marginTop: 0
            }}>
                {HERO_SLIDES[activeImg].sub}
              </motion.p>
            </AnimatePresence>

            {/* CTA buttons */}
            <motion.div className="flex flex-col sm:flex-row items-start sm:items-center gap-3" initial={{
            opacity: 0,
            y: 16
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.75,
            ease: 'easeOut'
          }}>
              <AnimatePresence mode="wait">
                <motion.div key={`cta-${activeImg}`} initial={{
                opacity: 0,
                y: 10
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -8
              }} transition={{
                duration: 0.4,
                ease: 'easeOut'
              }} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <GoldButton label={HERO_SLIDES[activeImg].cta.primary} />
                  <GreenButton label={HERO_SLIDES[activeImg].cta.secondary} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue — bottom centre */}
      <motion.div className="absolute z-10 flex flex-col items-center" style={{
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)'
    }} initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1.6,
      duration: 0.6
    }}>
        <span style={{
        fontFamily: BODY_FONT,
        fontSize: '11px',
        color: 'rgba(255,255,255,0.45)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '6px',
        whiteSpace: 'nowrap'
      }}>Scroll to explore</span>
        <motion.svg width="16" height="10" viewBox="0 0 16 10" fill="none" animate={{
        y: [0, 6]
      }} transition={{
        duration: 1.4,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse'
      }}>
          <path d="M1 1L8 8L15 1" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </section>;
};

// ─── FAQ item ─────────────────────────────────────────────────────────────────

const FaqItem = ({
  num,
  question,
  answer,
  isLast,
  index
}: {
  num: number;
  question: string;
  answer: string;
  isLast: boolean;
  index: number;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-40px'
  });
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 28
  }} animate={inView ? {
    opacity: 1,
    y: 0
  } : {}} transition={{
    duration: 0.55,
    delay: index * 0.1,
    ease: [0.22, 1, 0.36, 1]
  }} className={`${!isLast ? 'border-b border-[rgba(0,0,0,0.08)]' : ''}`}>
      <button onClick={() => setOpen(o => !o)} className="w-full text-left flex items-start gap-4 sm:gap-5 py-5 sm:py-6 px-4 sm:px-5 group cursor-pointer bg-transparent border-0 outline-none" style={{
      fontFamily: BODY_FONT
    }} aria-expanded={open}>
        <motion.div animate={{
        backgroundColor: open ? '#1A3C2E' : '#EEF3EF',
        rotate: open ? 45 : 0
      }} transition={{
        duration: 0.25,
        ease: 'easeOut'
      }} className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5">
          <motion.span animate={{
          color: open ? '#ffffff' : '#1A3C2E'
        }} transition={{
          duration: 0.25
        }} className="text-xl font-light leading-none select-none" style={{
          fontFamily: HEADING_FONT
        }}>
            {open ? '+' : String(num)}
          </motion.span>
        </motion.div>
        <div className="flex-1 flex flex-col gap-0">
          <h3 className="text-[#0F2419] font-semibold leading-[1.3] tracking-[-0.3px] m-0 group-hover:text-[#1A3C2E] transition-colors duration-200 text-[18px] sm:text-[22px]" style={{
          fontFamily: HEADING_FONT
        }}>
            {question}
          </h3>
          <AnimatePresence initial={false}>
            {open && <motion.div initial={{
            height: 0,
            opacity: 0
          }} animate={{
            height: 'auto',
            opacity: 1
          }} exit={{
            height: 0,
            opacity: 0
          }} transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1]
          }} style={{
            overflow: 'hidden'
          }}>
                <p className="text-[#0F2419]/70 text-[15px] sm:text-base leading-[1.75] mt-3 mb-0" style={{
              fontFamily: BODY_FONT,
              fontWeight: 400
            }}>{answer}</p>
              </motion.div>}
          </AnimatePresence>
        </div>
        <motion.div animate={{
        rotate: open ? 135 : 0
      }} transition={{
        duration: 0.25,
        ease: 'easeOut'
      }} className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-[#1A3C2E] mt-0.5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.div>
      </button>
    </motion.div>;
};

// ─── Zone Overview carousel images ───────────────────────────────────────────

const ZONE_CAROUSEL_IMAGES = [{
  src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=85',
  alt: 'Nkomazi SEZ agricultural landscape'
}, {
  src: 'https://images.unsplash.com/photo-1545293527-e26058c5b48b?w=1200&q=80',
  alt: 'Road infrastructure'
}, {
  src: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&q=80',
  alt: 'Aerial SEZ view'
}, {
  src: 'https://images.unsplash.com/photo-1565108520862-fb84bcf0e9c0?w=1200&q=80',
  alt: 'Industrial facilities'
}];

// ─── Zone Overview — image carousel left, stats right ────────────────────────

const ZoneOverview = () => {
  const ZONE_STATS = [{
    value: '2 400',
    unit: 'ha',
    label: 'Industrial land available'
  }, {
    value: '15',
    unit: '%',
    label: 'Corp. tax rate'
  }, {
    value: '30k',
    unit: '+',
    label: 'Jobs targeted by 2030'
  }, {
    value: 'N4',
    unit: '',
    label: 'Corridor direct access'
  }];
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [wiping, setWiping] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx(prev => {
        setPrevIdx(prev);
        setWiping(true);
        return (prev + 1) % ZONE_CAROUSEL_IMAGES.length;
      });
    }, 4200);
    return () => clearInterval(timer);
  }, []);
  const handleDotClick = (i: number) => {
    if (i === carouselIdx) return;
    setPrevIdx(carouselIdx);
    setWiping(true);
    setCarouselIdx(i);
  };
  void wiping;
  return <section className="pb-[100px]" style={{
    background: '#F8F7F0'
  }}>
      <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-0 rounded-3xl overflow-hidden" style={{
        minHeight: '580px'
      }}>

          {/* Left — auto-playing carousel with Ken Burns zoom */}
          <div className="relative overflow-hidden" style={{
          minHeight: '320px'
        }}>

            {/* Previous image — stays underneath, keeps its own zoom state */}
            {prevIdx !== null && <motion.div key={`prev-${prevIdx}`} className="absolute inset-0" style={{
            backgroundImage: `url("${ZONE_CAROUSEL_IMAGES[prevIdx].src}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />}

            {/* Active image — wipes in from left, Ken Burns zooms simultaneously */}
            <motion.div key={`active-${carouselIdx}`} className="absolute inset-0" initial={{
            clipPath: 'inset(0 100% 0 0)',
            scale: 1.0
          }} animate={{
            clipPath: 'inset(0 0% 0 0)',
            scale: 1.08
          }} transition={{
            clipPath: {
              duration: 1.15,
              ease: [0.76, 0, 0.24, 1]
            },
            scale: {
              duration: 6.0,
              ease: 'linear'
            }
          }} onAnimationComplete={() => {
            setWiping(false);
            setPrevImg(null);
          }} style={{
            backgroundImage: `url("${ZONE_CAROUSEL_IMAGES[carouselIdx].src}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transformOrigin: 'center center'
          }} />

            {/* Gradient overlays */}
            <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, transparent 50%, rgba(15,36,25,0.4) 100%), linear-gradient(to top, rgba(15,36,25,0.7) 0%, transparent 50%)'
          }} />

            {/* Left-to-right dissolve overlay — image bleeds seamlessly into the dark right panel */}
            <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, transparent 0%, transparent 40%, rgba(15,36,25,0.30) 58%, rgba(15,36,25,0.88) 80%, #0F2419 96%)',
            pointerEvents: 'none',
            zIndex: 2
          }} />

            {/* Carousel dot indicators */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {ZONE_CAROUSEL_IMAGES.map((_, i) => <button key={`zone-dot-${i}`} onClick={() => handleDotClick(i)} className="rounded-full transition-all duration-400" style={{
              width: carouselIdx === i ? '22px' : '7px',
              height: '7px',
              backgroundColor: carouselIdx === i ? '#C8A84B' : 'rgba(255,255,255,0.4)'
            }} />)}
            </div>

            {/* Floating large pull stat bottom-left */}
            <motion.div className="absolute bottom-14 left-6 sm:left-8 z-10" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.7,
            delay: 0.4
          }}>
              <div className="bg-[#C8A84B] rounded-2xl px-5 sm:px-7 py-4 sm:py-5 inline-flex flex-col gap-1">
                <span className="text-[#0F2419] font-light" style={{
                fontFamily: HEADING_FONT,
                fontSize: 'clamp(36px, 5vw, 52px)',
                lineHeight: '1',
                letterSpacing: '-2px'
              }}>2 400</span>
                <span className="text-[#0F2419]/70 text-sm font-medium" style={{
                fontFamily: BODY_FONT
              }}>hectares of prime industrial land</span>
              </div>
            </motion.div>
          </div>

          {/* Right — dark text panel */}
          <div className="bg-[#0F2419] px-6 sm:px-10 py-10 sm:py-14 flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-6">
              <Subtitle>Zone Overview</Subtitle>
              <AnimatedHeading className="text-white font-light m-0 text-[32px] sm:text-[40px] lg:text-[48px]" style={{
              lineHeight: '1.1',
              letterSpacing: '-2px'
            }}>
                A world-class investment destination in Mpumalanga
              </AnimatedHeading>
              <FadeUp delay={0.1}>
                {/* Pull-quote first sentence pattern */}
                <p className="m-0" style={{
                fontFamily: BODY_FONT
              }}>
                  <span style={{
                  fontSize: '18px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.9)',
                  display: 'block',
                  marginBottom: '8px'
                }}>
                    Nkomazi SEZ is a fully serviced, government-backed industrial park with streamlined approvals and competitive tax incentives.
                  </span>
                  <span style={{
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.55)',
                  display: 'block'
                }}>
                    Direct access to the southern African regional market through the N4 Maputo Development Corridor makes this a uniquely strategic investment destination.
                  </span>
                </p>
              </FadeUp>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-3">
              {ZONE_STATS.map((s, i) => <FadeUp key={s.label} delay={0.1 + i * 0.08}>
                  <div className="rounded-xl px-4 sm:px-5 py-4 flex flex-col gap-1.5" style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                    <div className="flex items-end gap-0.5">
                      <span className="text-white font-light text-[24px] sm:text-[32px]" style={{
                    fontFamily: HEADING_FONT,
                    lineHeight: '1',
                    letterSpacing: '-1.5px'
                  }}>{s.value}</span>
                      {s.unit && <span className="text-[#C8A84B] font-light text-base sm:text-xl leading-none mb-0.5" style={{
                    fontFamily: HEADING_FONT
                  }}>{s.unit}</span>}
                    </div>
                    <span className="text-white/40 text-xs leading-tight" style={{
                  fontFamily: BODY_FONT
                }}>{s.label}</span>
                  </div>
                </FadeUp>)}
            </div>

            <FadeUp delay={0.35}><DarkButton label="Discover the zone" /></FadeUp>
          </div>
        </div>
      </div>
    </section>;
};

// ─── Enterprise Hub Section ───────────────────────────────────────────────────

const EnterpriseHubSection = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  return <section className="py-[80px] mx-1.5 sm:mx-2.5 mb-2.5">
      <div className="relative rounded-3xl py-14 sm:py-20 px-4 sm:px-6" style={{
      background: '#EDF3EE'
    }}>
        <div className="relative max-w-[1372px] mx-auto flex flex-col gap-10 sm:gap-14" style={{
        zIndex: 1
      }}>
          {/* Header */}
          <div className="flex flex-col items-center gap-3 text-center max-w-[640px] mx-auto">
            <Subtitle light={false}>Enterprise Hub</Subtitle>
            <AnimatedHeading className="font-light m-0 text-[32px] sm:text-[40px] lg:text-[52px]" style={{
            lineHeight: '1.1',
            letterSpacing: '-2px',
            color: '#0F2419'
          }}>
              Local Enterprise Integration: Driving the Nkomazi Supply Chain
            </AnimatedHeading>
            <FadeUp delay={0.1}>
              {/* Pull-quote first sentence pattern */}
              <p className="m-0" style={{
              fontFamily: BODY_FONT
            }}>
                <span style={{
                fontSize: '18px',
                fontWeight: 500,
                color: 'rgba(15,36,25,0.85)',
                display: 'block',
                marginBottom: '8px'
              }}>
                  Connecting Small, Medium, and Micro Enterprises with large-scale industrial tenants and procurement contracts.
                </span>
                <span style={{
                fontSize: '15px',
                fontWeight: 400,
                color: 'rgba(15,36,25,0.6)',
                display: 'block'
              }}>
                  Enterprise development support, B-BBEE alignment, and DFI funding pathways are all available within the zone.
                </span>
              </p>
            </FadeUp>
          </div>

          {/* Tri-metric callout row */}
          <FadeUp delay={0.2}>
            <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 0,
            marginBottom: '48px'
          }}>
              {EH_METRICS.map((metric, i) => <React.Fragment key={metric.value}>
                <div style={{
                flex: 1,
                paddingRight: i < EH_METRICS.length - 1 ? '32px' : 0
              }}>
                  <div style={{
                  fontFamily: HEADING_FONT,
                  fontSize: 'clamp(32px, 4vw, 52px)',
                  fontWeight: 200,
                  color: '#C8A84B',
                  letterSpacing: '-0.03em',
                  lineHeight: 1
                }}>{metric.value}</div>
                  <div style={{
                  fontFamily: BODY_FONT,
                  fontSize: '13px',
                  color: 'rgba(15,36,25,0.55)',
                  marginTop: '8px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-line'
                }}>{metric.label}</div>
                </div>
                {i < EH_METRICS.length - 1 && <div style={{
                width: '1px',
                background: 'rgba(15,36,25,0.12)',
                alignSelf: 'stretch',
                margin: '0 32px 0 0'
              }} />}
              </React.Fragment>)}
            </div>
          </FadeUp>

          {/* 3-column card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ENTERPRISE_HUB_CARDS.map((b, i) => <motion.div key={b.id} initial={{
            opacity: 0,
            y: 32
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.55,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1]
          }} onHoverStart={() => setHovered(b.id)} onHoverEnd={() => setHovered(null)} className="relative overflow-hidden rounded-2xl cursor-default" style={{
            minHeight: '400px'
          }}>
                {/* Full-bleed background image */}
                <motion.div className="absolute inset-0" animate={{
              scale: hovered === b.id ? 1.07 : 1
            }} transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }} style={{
              backgroundImage: `url("${b.bgImage}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 25%'
            }} />
                {/* Hero gradient: transparent top → solid bottom color */}
                <div className="absolute inset-0" style={{
              background: `linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 30%, ${ENTERPRISE_CARD_BOTTOM_COLORS[i]}CC 65%, ${ENTERPRISE_CARD_BOTTOM_COLORS[i]} 85%)`
            }} />
                {/* Hover gold shimmer */}
                <motion.div className="absolute inset-0" animate={{
              opacity: hovered === b.id ? 1 : 0
            }} transition={{
              duration: 0.4
            }} style={{
              background: 'linear-gradient(135deg, rgba(200,168,75,0.15) 0%, transparent 60%)'
            }} />
                {/* Hover top accent line */}
                <motion.div className="absolute top-0 left-0 right-0 h-[2px]" animate={{
              scaleX: hovered === b.id ? 1 : 0,
              opacity: hovered === b.id ? 1 : 0
            }} transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }} style={{
              background: '#C8A84B',
              transformOrigin: 'left'
            }} />

                <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8" style={{
              minHeight: '400px'
            }}>
                  <div className="flex flex-col gap-3">
                    <span className="text-[#C8A84B] font-light" style={{
                  fontFamily: HEADING_FONT,
                  fontSize: 'clamp(44px, 6vw, 64px)',
                  lineHeight: '1',
                  letterSpacing: '-2px'
                }}>{b.number}</span>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-white font-semibold text-xl leading-tight m-0" style={{
                    fontFamily: HEADING_FONT,
                    letterSpacing: '-0.3px'
                  }}>{b.title}</h3>
                      <motion.p className="text-white/65 text-[13px] leading-[1.65] m-0" style={{
                    fontFamily: BODY_FONT
                  }} animate={{
                    opacity: hovered === b.id ? 1 : 0.7,
                    y: hovered === b.id ? 0 : 4
                  }} transition={{
                    duration: 0.3
                  }}>
                        {b.desc}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>)}
          </div>

          {/* CTA row */}
          <FadeUp delay={0.2}>
            <div className="flex flex-col items-center gap-5">
              <div className="w-16 h-px" style={{
              background: 'rgba(200,168,75,0.3)'
            }} />
              <p className="text-white/40 text-[13px] tracking-[0.08em] uppercase text-center m-0" style={{
              fontFamily: BODY_FONT
            }}>
                Ready to grow within the zone?
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <GoldButton label="Explore Enterprise Hub" />
                <motion.a href="#" onClick={e => e.preventDefault()} className="group flex h-[44px] items-stretch no-underline relative overflow-hidden rounded-lg" whileHover={{
                y: -2,
                scale: 1.015
              }} whileTap={{
                scale: 0.97
              }} transition={{
                duration: 0.2,
                ease: 'easeOut'
              }}>
                  <div className="flex items-center justify-center px-5 text-[15px] font-medium overflow-hidden rounded-l-lg tracking-[0.01em]" style={{
                  fontFamily: BODY_FONT,
                  border: '2px solid #0F2419',
                  borderRight: 'none',
                  color: '#0F2419',
                  background: 'transparent'
                }}>Visit SMME Hub</div>
                  <div className="flex items-center justify-center w-[44px] rounded-r-lg flex-shrink-0" style={{
                  border: '2px solid #0F2419',
                  borderLeft: 'none',
                  color: '#0F2419',
                  background: 'transparent'
                }}><ArrowUpRightIcon /></div>
                </motion.a>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>;
};

// ─── Key Sectors — ivory section, full-bleed card switcher ───────────────────

const KeySectors = ({
  activeSector,
  setActiveSector
}: {
  activeSector: number;
  setActiveSector: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [userClicked, setUserClicked] = useState(false);

  // Auto-advance every 6s when user has not manually clicked
  useEffect(() => {
    if (userClicked) return;
    const t = setInterval(() => setActiveSector(i => (i + 1) % SEZ_SECTORS.length), 6000);
    return () => clearInterval(t);
  }, [userClicked, setActiveSector]);

  // Reset userClicked after 18s of inactivity
  useEffect(() => {
    if (!userClicked) return;
    const t = setTimeout(() => setUserClicked(false), 18000);
    return () => clearTimeout(t);
  }, [userClicked]);
  const activeBottomColor = SECTOR_BOTTOM_COLORS[activeSector];
  return <section className="mx-1.5 sm:mx-2.5 mb-2.5" style={{
    borderTop: '2px solid #E8521A',
    background: '#F5F0E8'
  }}>
      {/* fillBar keyframe injection */}
      <style>{`@keyframes fillBar { from { width: 0% } to { width: 100% } }`}</style>

      {/* Cards grid — each card is full-bleed with hero gradient */}
      <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-0">
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 sm:gap-6 mb-10">
          <div className="flex flex-col items-start gap-3">
            <Subtitle>Key Sectors</Subtitle>
            <AnimatedHeading className="font-light m-0 text-[32px] sm:text-[40px] lg:text-[52px]" style={{
            lineHeight: '1.1',
            letterSpacing: '-2px',
            color: '#1D4D35'
          }}>
              Priority investment sectors
            </AnimatedHeading>
          </div>
          {/* Tab pills */}
          <div className="flex flex-wrap gap-2">
            {SEZ_SECTORS.map((s, i) => <motion.button key={s.id} onClick={() => {
            setActiveSector(i);
            setUserClicked(true);
          }} className="relative px-4 sm:px-5 py-2.5 rounded-full text-[13px] font-medium tracking-[0.04em] overflow-hidden flex flex-col gap-0" style={{
            fontFamily: BODY_FONT,
            border: `1px solid ${activeSector === i ? '#1D4D35' : 'rgba(0,0,0,0.15)'}`,
            color: activeSector === i ? '#ffffff' : '#555',
            background: activeSector === i ? '#1D4D35' : 'rgba(0,0,0,0.04)'
          }} whileTap={{
            scale: 0.96
          }} transition={{
            duration: 0.2
          }}>
                <span>{s.tag}</span>
                {/* Progress bar under active tab when auto-advancing */}
                <div style={{
              height: '2px',
              background: '#C8A84B',
              animation: activeSector === i && !userClicked ? 'fillBar 6s linear forwards' : 'none',
              transformOrigin: 'left',
              width: activeSector === i && !userClicked ? undefined : '0%'
            }} />
              </motion.button>)}
          </div>
        </div>
      </div>

      {/* Full-bleed sector showcase card */}
      <div className="relative overflow-hidden" style={{
      minHeight: '560px'
    }}>
        {/* Background images — fade between them */}
        {SEZ_SECTORS.map((s, i) => <motion.div key={s.id} className="absolute inset-0" animate={{
        opacity: activeSector === i ? 1 : 0
      }} transition={{
        duration: 0.8,
        ease: 'easeInOut'
      }} style={{
        backgroundImage: `url("${s.bgImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }} />)}

        {/* Dark brand-matching contrast tint across entire background */}
        <div className="absolute inset-0 bg-[#07130E]/30 pointer-events-none" />

        {/* Hero gradient: top 40% clean, fades to solid bottom color */}
        <div className="absolute inset-0" style={{
        background: `linear-gradient(to bottom, transparent 0%, transparent 40%, ${activeBottomColor}CC 70%, ${activeBottomColor} 90%)`
      }} />

        {/* Content sits in lower portion */}
        <div className="relative z-10 max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end" style={{
        minHeight: '560px',
        paddingBottom: '48px'
      }}>
          <AnimatePresence mode="wait">
            {SEZ_SECTORS.map((svc, i) => i === activeSector && <motion.div key={svc.id} initial={{
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
          }} className="grid lg:grid-cols-[1fr_420px] gap-8 sm:gap-10 items-end">
                {/* Left — text content */}
                <div className="flex flex-col gap-5 sm:gap-7">
                  <div className="flex items-center gap-4">
                    <span className="text-[#C8A84B]/75 font-light" style={{
                  fontFamily: HEADING_FONT,
                  fontSize: 'clamp(48px, 8vw, 80px)',
                  lineHeight: '1',
                  letterSpacing: '-5px'
                }}>{svc.label}</span>
                    <div className="w-px h-16 bg-white/20" />
                    <span className="text-white/75 text-xs tracking-[0.12em] uppercase" style={{
                  fontFamily: BODY_FONT
                }}>{svc.tag}</span>
                  </div>
                  <h3 className="text-white font-light m-0 text-[18px] sm:text-[22px] lg:text-[42px]" style={{
                fontFamily: HEADING_FONT,
                lineHeight: '1.12',
                letterSpacing: '-1.5px'
              }}>{svc.title}</h3>
                  <p className="text-white/90 text-[15px] sm:text-[16px] leading-[1.78] m-0 max-w-full sm:max-w-[560px]" style={{
                fontFamily: BODY_FONT
              }}>{svc.desc}</p>

                  {/* Icon-tagged feature rows */}
                  <div className="flex flex-col gap-0">
                    {svc.items.map((feature, idx) => <div key={`feature-${svc.id}-${idx}`} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  marginBottom: '10px'
                }}>
                      <span style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'rgba(200,168,75,0.15)',
                    color: '#C8A84B',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>✓</span>
                      <span style={{
                    fontFamily: BODY_FONT,
                    fontSize: '14px',
                    color: 'rgba(255,255,255,0.95)',
                    lineHeight: '1.5'
                  }}>{feature}</span>
                    </div>)}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                    <GoldButton label="Explore this sector" />
                    <div className="flex gap-2">
                      {SEZ_SECTORS.map((_, dotIdx) => <button key={`sector-dot-${dotIdx}`} onClick={() => {
                    setActiveSector(dotIdx);
                    setUserClicked(true);
                  }} className="rounded-full transition-all duration-300" style={{
                    width: dotIdx === activeSector ? '24px' : '8px',
                    height: '8px',
                    backgroundColor: dotIdx === activeSector ? '#C8A84B' : 'rgba(255,255,255,0.25)'
                  }} />)}
                    </div>
                  </div>
                </div>

                {/* Right — sector image card (hidden on small, shown on lg) */}
                <motion.div className="hidden lg:block relative overflow-hidden rounded-2xl" style={{
              height: '380px'
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
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{
                background: 'linear-gradient(to top, rgba(10,31,18,0.7) 0%, transparent 50%)'
              }} />
                  {/* Nav arrows */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-3">
                    <motion.button onClick={() => {
                  setActiveSector(prev => (prev - 1 + SEZ_SECTORS.length) % SEZ_SECTORS.length);
                  setUserClicked(true);
                }} className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white" whileHover={{
                  scale: 1.1,
                  backgroundColor: 'rgba(200,168,75,0.3)'
                }} whileTap={{
                  scale: 0.95
                }}>
                      <ChevronLeft size={16} />
                    </motion.button>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-3">
                    <motion.button onClick={() => {
                  setActiveSector(prev => (prev + 1) % SEZ_SECTORS.length);
                  setUserClicked(true);
                }} className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white" whileHover={{
                  scale: 1.1,
                  backgroundColor: 'rgba(200,168,75,0.3)'
                }} whileTap={{
                  scale: 0.95
                }}>
                      <ChevronRight size={16} />
                    </motion.button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block bg-[#C8A84B] text-[#0F2419] text-xs font-semibold px-3 py-1.5 rounded-full tracking-[0.06em] uppercase" style={{
                  fontFamily: BODY_FONT
                }}>{svc.tag}</span>
                  </div>
                </motion.div>
              </motion.div>)}
          </AnimatePresence>
        </div>
      </div>
    </section>;
};

// ─── Testimonial Rotator ─────────────────────────────────────────────────────

const TestimonialRotator = () => {
  const [activeStory, setActiveStory] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveStory(prev => (prev + 1) % INVESTOR_STORIES.length), 7000);
    return () => clearInterval(t);
  }, []);
  return <section style={{
    background: '#0F2419',
    paddingTop: '100px',
    paddingBottom: '100px',
    width: '100%'
  }}>
    <div style={{
      maxWidth: '1372px',
      margin: '0 auto',
      paddingLeft: '24px',
      paddingRight: '24px'
    }}>
      <div className="grid lg:grid-cols-2 gap-[80px] items-center">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <Subtitle light>INVESTOR VOICES</Subtitle>

          <AnimatePresence mode="wait">
            <motion.blockquote key={`quote-${activeStory}`} initial={{
              opacity: 0,
              y: 16
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -12
            }} transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1]
            }} style={{
              fontFamily: HEADING_FONT,
              fontSize: 'clamp(22px, 3vw, 36px)',
              fontWeight: 300,
              lineHeight: 1.4,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              margin: 0,
              padding: 0,
              border: 'none'
            }}>
              <span>"{INVESTOR_STORIES[activeStory].quote}"</span>
            </motion.blockquote>
          </AnimatePresence>

          {/* Attribution */}
          <AnimatePresence mode="wait">
            <motion.div key={`attr-${activeStory}`} initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -8
            }} transition={{
              duration: 0.4,
              delay: 0.1,
              ease: 'easeOut'
            }} className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#C8A84B]" />
                <div className="flex flex-col gap-0.5">
                  <span style={{
                    fontWeight: 600,
                    fontSize: '15px',
                    color: '#C8A84B',
                    fontFamily: BODY_FONT
                  }}>
                    {INVESTOR_STORIES[activeStory].name}
                  </span>
                  <span style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: BODY_FONT
                  }}>
                    {INVESTOR_STORIES[activeStory].role}, {INVESTOR_STORIES[activeStory].company}
                  </span>
                </div>
              </div>
              <div style={{
                paddingLeft: '44px'
              }}>
                <span style={{
                  background: 'rgba(200,168,75,0.15)',
                  color: '#C8A84B',
                  fontSize: '11px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontFamily: BODY_FONT,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}>
                  {INVESTOR_STORIES[activeStory].sector}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="flex items-center gap-2 mt-2">
            {INVESTOR_STORIES.map((_, i) => <button key={`tr-dot-${i}`} onClick={() => setActiveStory(i)} className="rounded-full transition-all duration-400" style={{
              width: activeStory === i ? '24px' : '8px',
              height: '8px',
              backgroundColor: activeStory === i ? '#C8A84B' : 'rgba(255,255,255,0.3)'
            }} />)}
          </div>
        </div>

        {/* Right column — portrait image */}
        <div className="relative hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.div key={`portrait-${activeStory}`} initial={{
              opacity: 0,
              scale: 0.97
            }} animate={{
              opacity: 1,
              scale: 1
            }} exit={{
              opacity: 0,
              scale: 0.97
            }} transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1]
            }} style={{
              position: 'relative',
              zIndex: 1
            }}>
              <img src={INVESTOR_STORIES[activeStory].image} alt={INVESTOR_STORIES[activeStory].name} style={{
                width: '100%',
                aspectRatio: '3/4',
                objectFit: 'cover',
                borderRadius: '20px',
                display: 'block'
              }} />
            </motion.div>
          </AnimatePresence>
          {/* Gold ring accent */}
          <div style={{
            border: '2px solid rgba(200,168,75,0.3)',
            borderRadius: '50%',
            width: 220,
            height: 220,
            position: 'absolute',
            bottom: -20,
            right: -20,
            zIndex: 0,
            pointerEvents: 'none'
          }} />
        </div>
      </div>
    </div>
  </section>;
};

// ─── Community Portal Snippet ─────────────────────────────────────────────────

const COMMUNITY_STATS = [{
  num: '3',
  numericVal: 3,
  label: 'TVET PROGRAMS OFFERED',
  display: (n: number) => `${n}`
}, {
  num: '2 400+',
  numericVal: 2400,
  label: 'CANDIDATES TRAINED',
  display: (n: number) => `${n.toLocaleString()}+`
}, {
  num: '30%',
  numericVal: 30,
  label: 'LOCAL PROCUREMENT TARGET',
  display: (n: number) => `${n}%`
}] as {
  num: string;
  numericVal: number;
  label: string;
  display: (n: number) => string;
}[];
const CommunityStatItem = ({
  stat,
  inView
}: {
  stat: {
    num: string;
    numericVal: number;
    label: string;
    display: (n: number) => string;
  };
  inView: boolean;
}) => {
  const count = useCountUp(stat.numericVal, inView, 1.8);
  return <div className="flex flex-col items-center gap-2 px-8 py-4">
      <span style={{
      fontFamily: HEADING_FONT,
      fontWeight: 300,
      fontSize: 'clamp(40px, 5vw, 52px)',
      lineHeight: '1',
      color: '#C8A84B',
      letterSpacing: '-2px'
    }}>
        {stat.display(count)}
      </span>
      <span style={{
      fontFamily: BODY_FONT,
      fontSize: '11px',
      color: 'rgba(15,36,25,0.5)',
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      lineHeight: '1.4',
      textAlign: 'center'
    }}>
        {stat.label}
      </span>
    </div>;
};
const CommunityPortalSnippet = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, {
    once: true,
    margin: '-40px'
  });
  return <section className="py-[80px] sm:py-[120px]" style={{
    background: '#FFFFFF'
  }}>
      <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 sm:gap-16">

        {/* Block 1 — Header */}
        <FadeUp delay={0} className="flex flex-col items-center gap-3 text-center">
          <Subtitle light={false}>COMMUNITY &amp; CAREERS</Subtitle>
          <AnimatedHeading className="font-light m-0 text-4xl sm:text-5xl mt-4 mb-4" style={{
          lineHeight: '1.1',
          letterSpacing: '-2px',
          color: '#0F2419'
        }}>
            Building Nkomazi from Within
          </AnimatedHeading>
          {/* Pull-quote first sentence */}
          <div className="max-w-[680px] mx-auto text-center" style={{
          fontFamily: BODY_FONT
        }}>
            <span style={{
            fontSize: '18px',
            fontWeight: 500,
            color: 'rgba(15,36,25,0.85)',
            display: 'block',
            marginBottom: '8px'
          }}>
              The NSEZ Community and Careers Portal connects local youth, workers, and enterprises to training programmes inside the zone.
            </span>
            <span style={{
            fontSize: '15px',
            fontWeight: 400,
            color: 'rgba(15,36,25,0.6)',
            display: 'block'
          }}>
              Vacancies, empowerment benefits, and sector-aligned skills programmes are all accessible through one unified portal.
            </span>
          </div>
        </FadeUp>

        {/* Block 2 — Three image cards */}
        <FadeUp delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMMUNITY_CARDS.map(card => <div key={card.id} className="relative rounded-2xl overflow-hidden" style={{
            minHeight: '340px',
            backgroundImage: `url("${card.bgImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: card.bgPosition
          }}>
                <div className="absolute inset-0" style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 30%, rgba(15,36,25,0.80) 65%, #0F2419 85%)'
            }} />
                <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-7" style={{
              minHeight: '340px'
            }}>
                  <div>
                    <span className="inline-block text-white text-[11px] font-semibold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full" style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontFamily: BODY_FONT
                }}>
                      {card.label}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-white font-semibold m-0 text-[18px] sm:text-[20px]" style={{
                  fontFamily: HEADING_FONT,
                  letterSpacing: '-0.3px',
                  lineHeight: '1.25'
                }}>
                      {card.title}
                    </h3>
                    <p className="m-0 text-[13px] leading-[1.65]" style={{
                  fontFamily: BODY_FONT,
                  color: 'rgba(255,255,255,0.6)'
                }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </FadeUp>

        {/* Block 3 — Stat row with count-up */}
        <div ref={statsRef}>
          <FadeUp delay={0.2}>
            <p style={{
            fontFamily: BODY_FONT,
            fontSize: '11px',
            color: 'rgba(15,36,25,0.4)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '20px',
            textAlign: 'center'
          }}>Impact to Date</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-0">
              {COMMUNITY_STATS.map((stat, i) => <div key={stat.label} className="flex flex-row items-center">
                  <CommunityStatItem stat={stat} inView={statsInView} />
                  {i < COMMUNITY_STATS.length - 1 && <div style={{
                width: '1px',
                height: '48px',
                background: 'rgba(15,36,25,0.12)',
                flexShrink: 0
              }} />}
                </div>)}
            </div>
          </FadeUp>
        </div>

        {/* Block 4 — CTA row */}
        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GoldButton label="Explore Community Portal" />
            <GreenButton label="View Open Vacancies" />
          </div>
        </FadeUp>

      </div>
    </section>;
};

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────

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

// ─── Back to Top Button ───────────────────────────────────────────────────────

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
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
    })} className="fixed bottom-8 right-6 sm:right-8 z-[9998] w-12 h-12 rounded-full flex items-center justify-center cursor-pointer" style={{
      background: hovered ? '#C8A84B' : '#0F2419',
      border: `1.5px solid ${hovered ? '#C8A84B' : 'rgba(200,168,75,0.35)'}`,
      boxShadow: hovered ? '0 8px 32px rgba(200,168,75,0.35)' : '0 4px 20px rgba(0,0,0,0.35)',
      transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s'
    }}>
          <motion.svg width="16" height="16" viewBox="0 0 16 16" fill="none" animate={{
        y: hovered ? -2 : 0
      }} transition={{
        duration: 0.2
      }}>
            <path d="M8 12V4M4 7l4-4 4 4" stroke={hovered ? '#0F2419' : '#C8A84B'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.button>}
    </AnimatePresence>;
};

// ─── About Us ─────────────────────────────────────────────────────────────────

const ABOUT_STAT_PILLS = [{
  value: '2800',
  display: '2,800 ha',
  label: 'Total Zone Area',
  isCountUp: true
}, {
  value: 'Est. 2017',
  display: 'Est. 2017',
  label: 'Established',
  isCountUp: false
}, {
  value: 'N4 Corridor',
  display: 'N4 Corridor',
  label: 'Strategic Access',
  isCountUp: false
}];

// ─── About Stat Pill with count-up ───────────────────────────────────────────

const AboutStatPill = ({
  pill,
  sectionInView
}: {
  pill: {
    value: string;
    display: string;
    label: string;
    isCountUp: boolean;
  };
  sectionInView: boolean;
}) => {
  const pillRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!sectionInView || hasAnimated || !pill.isCountUp) return;
    setHasAnimated(true);
    const target = parseInt(pill.value.replace(/[^0-9]/g, ''), 10);
    const duration = 1800;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 2);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(step);
  }, [sectionInView, hasAnimated, pill.isCountUp, pill.value]);
  const displayValue = pill.isCountUp ? count.toLocaleString() + ' ha' : pill.display;
  return <div ref={pillRef} style={{
    background: 'rgba(29,77,53,0.08)',
    border: '1px solid rgba(29,77,53,0.15)',
    borderRadius: '999px',
    padding: '8px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    minWidth: '90px'
  }}>
      <span style={{
      fontFamily: BODY_FONT,
      fontWeight: 700,
      fontSize: '16px',
      color: '#1D4D35',
      lineHeight: 1.2
    }}>
        {displayValue}
      </span>
      <span style={{
      fontFamily: BODY_FONT,
      fontSize: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      color: '#1D4D35',
      opacity: 0.6,
      lineHeight: 1.4,
      marginTop: '2px'
    }}>
        {pill.label}
      </span>
    </div>;
};
const ABOUT_HIGHLIGHT_CARDS = [{
  id: 'loc',
  title: 'Strategic Location',
  body: 'On the N4, 8km from Mozambique border',
  icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8521A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
}, {
  id: 'infra',
  title: 'Investment Ready',
  body: '2,800 ha of serviced industrial land',
  icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8521A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
}, {
  id: 'anchor',
  title: 'Anchor Tenant',
  body: 'DP World signed as logistics anchor, March 2026',
  icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8521A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        <path d="M12 8v4l3 3" />
      </svg>
}, {
  id: 'gov',
  title: 'Government Backed',
  body: 'Designated SEZ under the DTI Special Economic Zones Act',
  icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8521A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
}];
const AboutUs = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-80px'
  });
  return <section id="sec-about" ref={ref} style={{
    backgroundColor: '#F8F7F0',
    backgroundImage: 'radial-gradient(circle, rgba(29,77,53,0.07) 1.5px, transparent 1.5px)',
    backgroundSize: '24px 24px',
    borderTop: '3px solid #E8521A',
    paddingTop: '80px',
    paddingBottom: '80px',
    paddingLeft: 'clamp(48px, 6vw, 96px)',
    paddingRight: 'clamp(48px, 6vw, 96px)'
  }}>
      <div style={{
      maxWidth: '1280px',
      margin: '0 auto'
    }}>

        {/* ── CINEMATIC WIDE IMAGE STRIP ── */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '280px',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '40px'
        }}>
          <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85" alt="Aerial landscape of Nkomazi SEZ region, Komatipoort" style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 40%',
          display: 'block'
        }} />
          <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 0%, transparent 45%, rgba(15,36,25,0.7) 75%, #0F2419 100%)'
        }} />
          <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '28px',
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '999px',
          paddingLeft: '14px',
          paddingRight: '14px',
          paddingTop: '6px',
          paddingBottom: '6px',
          color: 'white',
          fontSize: '11px',
          fontWeight: 500,
          fontFamily: BODY_FONT,
          whiteSpace: 'nowrap'
        }}>
            <span>Komatipoort, Mpumalanga · 8km from Mozambique Border</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* ── LEFT SIDE (55%) ── */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={inView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
          }}>
              <span style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#E8521A',
              marginBottom: '14px',
              fontFamily: BODY_FONT
            }}>
                About Us
              </span>
              <h2 style={{
              margin: 0
            }}>
                <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(32px, 3.8vw, 52px)',
                color: '#1D4D35',
                display: 'block',
                lineHeight: 1.0
              }}>
                  Africa's Gateway
                </span>
                <span style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900,
                fontStyle: 'italic',
                fontSize: 'clamp(38px, 4.8vw, 64px)',
                color: '#E8521A',
                display: 'block',
                lineHeight: 1.0,
                marginTop: '-4px'
              }}>
                  to Growth.
                </span>
              </h2>
            </motion.div>

            {/* Pull-quote first sentence for About */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={inView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.55,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}>
              <p style={{
              fontFamily: BODY_FONT,
              margin: 0
            }}>
                <span style={{
                fontSize: '18px',
                fontWeight: 500,
                color: 'rgba(15,36,25,0.85)',
                display: 'block',
                marginBottom: '8px'
              }}>
                  Nkomazi SEZ is a government-designated Special Economic Zone in Komatipoort, Mpumalanga — strategically positioned on the N4 Maputo Development Corridor.
                </span>
                <span style={{
                fontSize: '15px',
                fontWeight: 400,
                color: 'rgba(15,36,25,0.6)',
                display: 'block'
              }}>
                  Designed to attract investment, drive agro-industrial growth, and create lasting economic opportunity for the region and Southern Africa.
                </span>
              </p>
            </motion.div>

            {/* Stat pills — animated count-up */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={inView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.55,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }} className="flex flex-wrap gap-3">
              {ABOUT_STAT_PILLS.map(pill => <AboutStatPill key={pill.value} pill={pill} sectionInView={inView} />)}
            </motion.div>

            {/* CTA Button */}
            <motion.div initial={{
            opacity: 0,
            y: 16
          }} animate={inView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.5,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}>
              <motion.a href="#" onClick={e => e.preventDefault()} className="inline-flex items-center gap-2 no-underline" style={{
              background: '#E8521A',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '14px',
              paddingLeft: '28px',
              paddingRight: '28px',
              paddingTop: '12px',
              paddingBottom: '12px',
              borderRadius: '6px',
              fontFamily: BODY_FONT,
              letterSpacing: '0.01em'
            }} whileHover={{
              y: -1
            }} whileTap={{
              scale: 0.97
            }} transition={{
              duration: 0.2
            }}>
                <span>Discover Our Story</span>
                <ChevronRight size={16} />
              </motion.a>
            </motion.div>
          </div>

          {/* ── RIGHT SIDE (45%) ── */}
          <div className="w-full lg:w-[45%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ABOUT_HIGHLIGHT_CARDS.map((card, i) => <motion.div key={card.id} initial={{
              opacity: 0,
              y: 24
            }} animate={inView ? {
              opacity: 1,
              y: 0
            } : {}} transition={{
              duration: 0.55,
              delay: 0.15 + i * 0.08,
              ease: [0.22, 1, 0.36, 1]
            }} style={{
              background: 'rgba(29,77,53,0.06)',
              border: '1px solid rgba(29,77,53,0.1)',
              borderRadius: '12px',
              padding: '20px'
            }}>
                  <div style={{
                marginBottom: '10px'
              }}>{card.icon}</div>
                  <h3 style={{
                fontFamily: BODY_FONT,
                fontWeight: 700,
                fontSize: '14px',
                color: '#1D4D35',
                margin: '0 0 6px 0',
                lineHeight: 1.3
              }}>
                    {card.title}
                  </h3>
                  <p style={{
                fontFamily: BODY_FONT,
                fontSize: '13px',
                color: 'rgba(29,77,53,0.65)',
                lineHeight: 1.5,
                margin: 0
              }}>
                    {card.body}
                  </p>
                </motion.div>)}
            </div>
          </div>

        </div>
      </div>
    </section>;
};

// ─── Page component ───────────────────────────────────────────────────────────

export const Homev2Page = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSector, setActiveSector] = useState(0);
  return <div className="w-full bg-white overflow-x-hidden" style={{
    fontFamily: BODY_FONT
  }}>
      {/* ── Scroll Progress Bar ── */}
      <ScrollProgressBar />

      {/* ── Back to Top ── */}
      <BackToTop />

      {/* ── Sticky Navbar ── */}
      <StickyNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* ── Hero ── */}
      <div id="sec-hero">
        <VideoHero />
      </div>

      {/* ── Partner Marquee ── */}
      <section id="sec-partners" className="py-[120px] pb-[100px] flex flex-col items-center gap-6 overflow-hidden">
        <FadeUp>
          <p className="text-[#0F2419] text-2xl leading-[1.4] m-0 text-center font-light" style={{
          fontFamily: HEADING_FONT,
          letterSpacing: '-0.5px'
        }}>
            Trusted by leading global investors and institutions
          </p>
        </FadeUp>
        <div className="relative w-full overflow-hidden">
          <motion.div className="flex gap-[110px] items-center" animate={{
          x: [0, -1800]
        }} transition={{
          repeat: Infinity,
          duration: 20,
          ease: 'linear'
        }} style={{
          width: 'max-content'
        }}>
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS].map((src, i) => <img key={i} src={src} alt="Partner Logo" className="block max-h-12 flex-shrink-0" style={{
            maxWidth: '160px'
          }} />)}
          </motion.div>
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0" style={{
          background: 'linear-gradient(90deg, #fff, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 90%, #fff)'
        }} />
        </div>
      </section>

      {/* ── Gold divider: partner marquee → About/ZoneOverview ── */}
      <GoldDivider />

      {/* ── About Us ── */}
      <div id="sec-about">
        <AboutUs />
      </div>

      {/* ── Zone Overview ── */}
      <div id="sec-overview">
        <ZoneOverview />
      </div>

      {/* ── Key Sectors ── */}
      <div id="sec-sectors">
        <KeySectors activeSector={activeSector} setActiveSector={setActiveSector} />
      </div>

      {/* ── Gold divider: SEZ Sectors → Enterprise Hub ── */}
      <GoldDivider />

      {/* ── Enterprise Hub Section ── */}
      <div id="sec-benefits">
        <EnterpriseHubSection />
      </div>

      {/* ── Global Route Map ── */}
      <div id="sec-map">
        <GlobalRouteMap />
      </div>

      {/* ── Community Portal Snippet ── */}
      <div id="sec-stories">
        <CommunityPortalSnippet />
      </div>

      {/* ── Gold divider: Community & Careers → Testimonials ── */}
      <GoldDivider />

      {/* ── Testimonial Rotator (Investor Voices) ── */}
      <div id="sec-testimonials">
        <TestimonialRotator />
      </div>

      {/* ── Gold divider: Testimonials → FAQ ── */}
      <GoldDivider />

      {/* ── FAQs ── */}
      <section id="sec-faq" className="py-[80px] sm:py-[120px]" style={{
      background: '#F8F7F0'
    }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:gap-10 overflow-hidden">
            <div className="flex flex-col items-center gap-3 text-center">
              <Subtitle>FAQs</Subtitle>
              <AnimatedHeading className="text-[#0F2419] font-light m-0 text-[32px] sm:text-[40px] lg:text-[52px]" style={{
              lineHeight: '1.1',
              letterSpacing: '-2px'
            }}>
                Questions? Glad you asked
              </AnimatedHeading>
            </div>
            <div className="border border-[rgba(0,0,0,0.08)] rounded-2xl overflow-hidden">
              {FAQS.map((faq, i) => <FaqItem key={faq.q} num={i + 1} question={faq.q} answer={faq.a} isLast={i === FAQS.length - 1} index={i} />)}
            </div>
            {/* Contact the Investment Desk CTA */}
            <FadeUp delay={0.3}>
              <div style={{
              textAlign: 'center',
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(15,36,25,0.1)'
            }}>
                <p style={{
                fontFamily: BODY_FONT,
                fontSize: '15px',
                color: 'rgba(15,36,25,0.55)',
                marginBottom: '16px'
              }}>Still have questions?</p>
                <motion.a href="#" onClick={e => e.preventDefault()} style={{
                fontFamily: BODY_FONT,
                fontSize: '15px',
                fontWeight: 600,
                color: '#0F2419',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                borderBottom: '1.5px solid #C8A84B',
                paddingBottom: '2px'
              }} whileHover={{
                gap: '10px'
              }} transition={{
                duration: 0.2
              }}>
                  <span>Contact the Investment Desk</span>
                  <ArrowRightIcon />
                </motion.a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Immersive CTA — full-bleed hero format ── */}
      <section id="sec-cta" className="relative flex flex-col justify-end overflow-hidden rounded-3xl mx-1.5 sm:mx-2.5 mb-2.5" style={{
      minHeight: '620px'
    }}>
        {/* Full-bleed background image */}
        <div className="absolute inset-0" style={{
        backgroundImage: 'url("/nsez-banner7.jpg")',
        backgroundPosition: 'center 40%',
        backgroundSize: 'cover'
      }} />
        {/* Dark brand overlay to guarantee heading text legibility */}
        <div className="absolute inset-0 bg-[#091710]/45 pointer-events-none" />
        {/* Hero gradient: transparent top 40% → solid #0F2419 bottom 90% */}
        <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(15,36,25,0.85) 65%, #0F2419 90%)'
      }} />
        {/* Subtle gold tint overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(135deg, transparent 40%, rgba(200,168,75,0.04) 60%, transparent 80%)'
      }} />

        <div className="relative z-10 max-w-[1372px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 pb-12 sm:pb-16">
          <div className="flex flex-col gap-6 sm:gap-7 items-start max-w-full sm:max-w-[780px]">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            ease: 'easeOut'
          }} className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#C8A84B]" />
              <span className="text-[#C8A84B] text-xs font-medium tracking-[0.16em] uppercase" style={{
              fontFamily: BODY_FONT
            }}>Begin Your Journey</span>
            </motion.div>
            <AnimatedHeading className="text-white font-light m-0 text-[32px] sm:text-[40px] lg:text-[52px]" style={{
            lineHeight: '1.06',
            letterSpacing: '-3px'
          }}>
              Build your future in Southern Africa's growth engine
            </AnimatedHeading>
            <FadeUp delay={0.3} className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
              <GreenButton label="Start your investment journey" />
              <GoldButton label="Download Investor Pack" />
            </FadeUp>
          </div>

          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.7,
          delay: 0.4,
          ease: [0.22, 1, 0.36, 1]
        }} className="mt-10 sm:mt-14 max-w-full sm:max-w-[360px]" style={{
          background: 'rgba(255,255,255,0.07)',
          backdropFilter: 'blur(20px)',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '24px'
        }}>
            <div className="flex items-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map(s => <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill="#C8A84B"><path d="M7 1l1.8 3.6L13 5.4l-3 2.9.7 4.1L7 10.3l-3.7 2.1.7-4.1-3-2.9 4.2-.8z" /></svg>)}
            </div>
            <p className="text-white/80 font-light leading-[1.65] m-0 mb-3" style={{
            fontFamily: HEADING_FONT,
            fontStyle: 'italic',
            fontSize: '17px'
          }}>
              <span>"The single-window support made our entire setup seamless — permits, land, utilities."</span>
            </p>
            <span className="text-white/50 text-xs tracking-[0.05em]" style={{
            fontFamily: BODY_FONT
          }}>— S. Dlamini, AgriPro Foods</span>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        {/* Top — white links section */}
        <div className="bg-white pt-[60px] sm:pt-[115px] pb-12 sm:pb-16">
          <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-[60px]">
              {Object.entries(FOOTER_LINKS).map(([cat, links]) => <FadeUp key={cat} className="flex flex-col gap-4 sm:gap-6">
                  <span className="text-[#0F2419] text-[15px] sm:text-base font-semibold tracking-[0.04em] uppercase" style={{
                fontFamily: BODY_FONT
              }}>{cat}</span>
                  <div className="flex flex-col gap-2 sm:gap-2.5">
                    {links.map(link => <a key={link} href="#" onClick={e => e.preventDefault()} className="text-[#0F2419]/60 text-[14px] sm:text-[15px] font-normal no-underline hover:text-[#0F2419] transition-colors duration-200" style={{
                  fontFamily: BODY_FONT
                }}>{cat === 'Invest' && link === 'Incentives' ? 'Incentives' : link}</a>)}
                  </div>
                </FadeUp>)}
            </div>
          </div>
        </div>

        {/* Bottom — dark section */}
        <div className="bg-[#0D1A0F]">
          <div className="max-w-[1372px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/10">
              <div className="flex flex-col gap-5">
                {/* Logo + tagline */}
                <div style={{
                marginBottom: '8px'
              }}>
                  <img src="/NSEZ-logo.jpg" alt="Nkomazi SEZ" className="h-10 w-auto object-contain rounded-md" style={{
                  marginBottom: '10px'
                }} />
                  <p style={{
                  fontFamily: BODY_FONT,
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.4)',
                  lineHeight: '1.6',
                  maxWidth: '220px',
                  margin: 0
                }}>Nkomazi Special Economic Zone — engineering inclusive industrial growth in Southern Africa.</p>
                </div>
                {/* Social icons */}
                <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '8px'
              }}>
                  {([{
                  Icon: LinkedInIcon,
                  label: 'LinkedIn'
                }, {
                  Icon: InstagramIcon,
                  label: 'Instagram'
                }] as {
                  Icon: React.FC;
                  label: string;
                }[]).map(({
                  Icon,
                  label
                }) => <motion.a key={label} href="#" onClick={(e: React.MouseEvent) => e.preventDefault()} aria-label={label} whileHover={{
                  scale: 1.15
                }} style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}>
                    <Icon />
                  </motion.a>)}
                </div>

                <img src="/NSEZ-logo.jpg" alt="Nkomazi SEZ" className="h-8 w-auto object-contain rounded-md" />
                <p className="text-white/40 text-[14px] font-normal leading-6 m-0" style={{
                fontFamily: BODY_FONT
              }}>
                  <span>Copyright © </span>
                  <a href="#" onClick={e => e.preventDefault()} className="text-white/70 font-semibold no-underline hover:text-white transition-colors duration-200">Nkomazi SEZ</a>
                  <span> 2026 | All Rights Reserved</span>
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:gap-5">
                <span className="text-white font-light leading-[1.2] text-[28px] sm:text-[40px]" style={{
                fontFamily: HEADING_FONT,
                letterSpacing: '-1px'
              }}>
                  Ready to invest in Nkomazi?
                </span>
                <GreenButton label="Contact our investment desk" />
              </div>
            </div>

            <div className="pt-5 flex flex-col lg:flex-row gap-4 sm:gap-6 justify-between items-start lg:items-center">
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
      </footer>
    </div>;
};
