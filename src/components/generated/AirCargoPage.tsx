import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion';
import { Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GlobalRouteMap } from './GlobalRouteMap';
const HEADING_FONT = "'Inter', system-ui, sans-serif";
const BODY_FONT = "'DM Sans', system-ui, sans-serif";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_SECTORS = ['Agro-processing', 'Manufacturing', 'Logistics & Warehousing', 'Mining Beneficiation', 'Energy & Infrastructure'];
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

// Sector-specific hero images cycling through agro → manufacturing → logistics
const HERO_BG_IMAGES = ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85',
// golden agricultural fields
'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1800&q=85',
// manufacturing floor
'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1800&q=85' // logistics warehouse
];
const HERO_SECTOR_LABELS = ['Agro-processing', 'Manufacturing', 'Logistics'];
const SEZ_SECTORS = [{
  id: 'agro',
  label: '01',
  title: 'Agro-processing & Food Security',
  desc: "Direct access to Nkomazi's fertile agricultural corridor with cold chain and value-added processing facilities. Export links to SADC, EU, and MENA markets.",
  items: ["Direct access to Nkomazi's fertile agricultural corridor.", 'Cold chain and value-added processing facilities on-site.', 'Export links to SADC, EU, and MENA markets.'],
  image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1400&q=85',
  bgImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1800&q=85',
  tag: 'Agriculture'
}, {
  id: 'mfg',
  label: '02',
  title: 'Manufacturing & Light Industry',
  desc: 'Plug-and-play factory shells with bulk utility connections and streamlined customs. Single-window regulatory support and proximity to Mozambique border.',
  items: ['Plug-and-play factory shells with bulk utility connections.', 'Streamlined customs and single-window regulatory support.', 'Proximity to Mozambique border for regional supply chains.'],
  image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=85',
  bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1800&q=85',
  tag: 'Manufacturing'
}, {
  id: 'log',
  label: '03',
  title: 'Logistics, Warehousing & Distribution',
  desc: 'Strategic position on the N4 Maputo Development Corridor with intermodal freight connections. Bonded warehousing with 24/7 security and real-time tracking.',
  items: ['Strategic position on the N4 Maputo Development Corridor.', 'Intermodal freight hub connecting road, rail, and air.', 'Bonded warehousing with 24/7 security and tracking.'],
  image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&q=85',
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
  image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
  icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
}, {
  step: '02',
  title: 'Site Visit',
  desc: 'Our investment facilitators arrange an on-site walkthrough and tailored incentive briefing at your convenience.',
  image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
  icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
}, {
  step: '03',
  title: 'Land & Agreements',
  desc: 'We fast-track lease agreements and land-use approvals within the SEZ regulatory framework — typically within 30 days.',
  image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4'
}, {
  step: '04',
  title: 'Go Operational',
  desc: 'Break ground with full support from our one-stop-shop desk for permits, utilities, and compliance.',
  image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
  icon: 'M13 10V3L4 14h7v7l9-11h-7z'
}] as {
  step: string;
  title: string;
  desc: string;
  image: string;
  icon: string;
}[];
const BENEFITS = [{
  id: 'tax',
  number: '15%',
  title: 'Corporate Tax Rate',
  desc: 'Reduced corporate income tax for qualifying SEZ operators, plus VAT exemptions and customs duty rebates on capital equipment.',
  icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  bgImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80'
}, {
  id: 'loc',
  number: 'N4',
  title: 'Corridor Access',
  desc: 'Positioned on the N4 Maputo Development Corridor — direct road, rail, and port connections to regional and global markets.',
  icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  bgImage: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=600&q=80'
}, {
  id: 'infra',
  number: '24/7',
  title: 'Utilities On-site',
  desc: 'Bulk water, sanitation, Eskom electricity with solar backup, fibre-optic connectivity, and paved internal roads to every plot.',
  icon: 'M13 10V3L4 14h7v7l9-11h-7z',
  bgImage: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80'
}, {
  id: 'support',
  number: '1',
  title: 'Stop-Shop Desk',
  desc: 'A single dedicated desk handles all investor permits, visas, environmental authorisations, and compliance requirements.',
  icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
  bgImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80'
}] as {
  id: string;
  number: string;
  title: string;
  desc: string;
  icon: string;
  bgImage: string;
}[];

// Different sector-themed backgrounds for investor stories
const INVESTOR_STORIES = [{
  id: 's1',
  quote: "Establishing our agro-processing facility in Nkomazi SEZ was the best investment decision we've made. The infrastructure, incentives, and hands-on support exceeded every expectation.",
  name: 'Thandi Mokoena',
  role: 'CEO, Greenfield Produce Ltd',
  image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80',
  bgImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=85',
  sector: 'Agro-processing'
}, {
  id: 's2',
  quote: "The single-window permit desk saved us months of bureaucracy. We were operational within 60 days of signing — unmatched in any other African SEZ we evaluated.",
  name: 'David Ferreira',
  role: 'MD, Moz-Cargo Logistics',
  image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
  bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=85',
  sector: 'Logistics'
}, {
  id: 's3',
  quote: "The N4 corridor access and tax incentives made Nkomazi SEZ an obvious choice. Our manufacturing costs dropped 22% compared to our Johannesburg facility.",
  name: 'Priya Naidoo',
  role: 'COO, Precision Parts SA',
  image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=800&q=80',
  bgImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=85',
  sector: 'Manufacturing'
}] as {
  id: string;
  quote: string;
  name: string;
  role: string;
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

// ─── Sectors Hover Dropdown ───────────────────────────────────────────────────

const SECTOR_NAV_ITEMS = ['Agro-Processing & Agriculture', 'Manufacturing', 'Green Economy', 'Logistics & Warehousing'];

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
              {SECTOR_NAV_ITEMS.map(item => <a key={item} href="#" onClick={e => e.preventDefault()} className="block text-white text-[14px] font-medium rounded-lg px-3 py-2 transition-all duration-200 whitespace-nowrap no-underline tracking-[0.01em]" style={{
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
                {SECTOR_NAV_ITEMS.map(s => <a key={s} href="#" onClick={e => {
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

const VideoHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [prevImg, setPrevImg] = useState<number | null>(null);
  const [wiping, setWiping] = useState(false);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg(prev => {
        setPrevImg(prev);
        setWiping(true);
        return (prev + 1) % HERO_BG_IMAGES.length;
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
  return <section ref={heroRef} className="relative flex flex-col justify-end rounded-3xl overflow-hidden mx-2.5" style={{
    minHeight: '860px'
  }}>
      {/* Parallax wrapper */}
      <motion.div className="absolute inset-[-10%]" style={{
      y: bgY
    }}>
        {/* Previous image — stays static underneath */}
        {prevImg !== null && <div className="absolute inset-0" style={{
        backgroundImage: `url("${HERO_BG_IMAGES[prevImg]}")`,
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
        backgroundImage: `url("${HERO_BG_IMAGES[activeImg]}")`,
        backgroundPosition: 'center 55%',
        backgroundSize: 'cover'
      }} />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2419]/95 via-[#0F2419]/35 to-[#0F2419]/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F2419]/55 to-transparent" />
      <div className="absolute inset-0" style={{
      background: 'radial-gradient(ellipse at center, transparent 50%, rgba(15,36,25,0.4) 100%)'
    }} />

      <motion.div className="relative z-10 max-w-[1372px] mx-auto w-full px-8 pb-28 pt-40" style={{
      opacity
    }}>
        <motion.div className="max-w-[1200px] w-full flex flex-col gap-9" initial={{
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
          <div className="flex flex-col items-start gap-5">
            <AnimatePresence mode="wait">
              <motion.span key={activeImg} initial={{
              opacity: 0,
              y: 8
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: -8
            }} transition={{
              duration: 0.35
            }} className="inline-block bg-[#1A3C2E] text-white text-xs rounded-full px-3 py-2 leading-[21px] tracking-[0.06em] uppercase" style={{
              fontFamily: BODY_FONT
            }}>
                {HERO_SECTOR_LABELS[activeImg]} · Mpumalanga, South Africa
              </motion.span>
            </AnimatePresence>

            <h1 className="text-white m-0 font-light max-w-[1000px]" style={{
            fontSize: 'clamp(38px, 5vw, 68px)',
            letterSpacing: '-2.5px',
            lineHeight: '1.12',
            fontFamily: HEADING_FONT
          }}>
              Africa's premier Special Economic Zone for sustainable growth
            </h1>

            <p className="text-white/70 text-[17px] font-normal leading-[1.78] m-0 max-w-[620px]" style={{
            fontFamily: BODY_FONT
          }}>
              Strategically located on the N4 Maputo Development Corridor — unlock world-class incentives, infrastructure, and market access in the heart of Southern Africa.
            </p>
          </div>
          <motion.div className="flex flex-wrap items-center gap-4" initial={{
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
            <GreenButton label="Explore Sectors" />
            <GoldButton label="Investment Guide" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Slide indicators */}
      <motion.div className="absolute bottom-8 right-10 z-10 flex items-center gap-2" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: 1.4,
      duration: 0.6
    }}>
        {HERO_BG_IMAGES.map((_, i) => <button key={i} onClick={() => handleSlideChange(i)} className="rounded-full transition-all duration-500" style={{
        width: activeImg === i ? '28px' : '8px',
        height: '8px',
        backgroundColor: activeImg === i ? '#C8A84B' : 'rgba(255,255,255,0.3)'
      }} />)}
      </motion.div>

      {/* Live status pill */}
      <motion.div className="absolute bottom-8 left-10 z-10" initial={{
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
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-3.5 py-2">
          <div className="w-2 h-2 rounded-full bg-[#C8A84B] animate-pulse" />
          <span className="text-white/80 text-xs tracking-[0.08em]" style={{
          fontFamily: BODY_FONT
        }}>Fully operational · Est. 2024</span>
        </div>
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
      <button onClick={() => setOpen(o => !o)} className="w-full text-left flex items-start gap-5 py-6 px-5 group cursor-pointer bg-transparent border-0 outline-none" style={{
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
          <h3 className="text-[#0F2419] font-semibold leading-[1.3] tracking-[-0.3px] m-0 group-hover:text-[#1A3C2E] transition-colors duration-200" style={{
          fontFamily: HEADING_FONT,
          fontSize: '22px'
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
                <p className="text-[#0F2419]/70 text-base leading-[1.75] mt-3 mb-0" style={{
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
  src: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&q=85',
  alt: 'Nkomazi SEZ agricultural landscape'
}, {
  src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  alt: 'Road infrastructure'
}, {
  src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
  alt: 'Aerial SEZ view'
}, {
  src: 'https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=1200&q=80',
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
  return <section className="pb-[100px]">
      <div className="max-w-[1372px] mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-0 rounded-3xl overflow-hidden" style={{
        minHeight: '580px'
      }}>

          {/* Left — auto-playing carousel with Ken Burns zoom */}
          <div className="relative overflow-hidden" style={{
          minHeight: '580px'
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
            setPrevIdx(null);
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

            {/* Carousel dot indicators */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {ZONE_CAROUSEL_IMAGES.map((_, i) => <button key={i} onClick={() => handleDotClick(i)} className="rounded-full transition-all duration-400" style={{
              width: carouselIdx === i ? '22px' : '7px',
              height: '7px',
              backgroundColor: carouselIdx === i ? '#C8A84B' : 'rgba(255,255,255,0.4)'
            }} />)}
            </div>

            {/* Floating large pull stat bottom-left */}
            <motion.div className="absolute bottom-14 left-8 z-10" initial={{
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
              <div className="bg-[#C8A84B] rounded-2xl px-7 py-5 inline-flex flex-col gap-1">
                <span className="text-[#0F2419] font-light" style={{
                fontFamily: HEADING_FONT,
                fontSize: '52px',
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
          <div className="bg-[#0F2419] px-10 py-14 flex flex-col justify-between gap-10">
            <div className="flex flex-col gap-6">
              <Subtitle>Zone Overview</Subtitle>
              <AnimatedHeading className="text-white font-light m-0" style={{
              fontSize: 'clamp(30px, 3vw, 48px)',
              lineHeight: '1.1',
              letterSpacing: '-2px'
            }}>
                A world-class investment destination in Mpumalanga
              </AnimatedHeading>
              <FadeUp delay={0.1}>
                <p className="text-white/60 text-[16px] font-normal leading-[1.85] m-0" style={{
                fontFamily: BODY_FONT
              }}>
                  Nkomazi SEZ is a fully serviced, government-backed industrial park with streamlined approvals, competitive tax incentives, and direct access to the southern African regional market through the N4 Maputo Development Corridor.
                </p>
              </FadeUp>
            </div>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-3">
              {ZONE_STATS.map((s, i) => <FadeUp key={s.label} delay={0.1 + i * 0.08}>
                  <div className="rounded-xl px-5 py-4 flex flex-col gap-1.5" style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                    <div className="flex items-end gap-0.5">
                      <span className="text-white font-light" style={{
                    fontFamily: HEADING_FONT,
                    fontSize: '32px',
                    lineHeight: '1',
                    letterSpacing: '-1.5px'
                  }}>{s.value}</span>
                      {s.unit && <span className="text-[#C8A84B] font-light text-xl leading-none mb-0.5" style={{
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

// ─── How to Invest — hover-activated image cards ──────────────────────────────

const HowToInvest = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  return <section className="py-[120px]">
      <div className="max-w-[1372px] mx-auto px-4">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6">
            <div className="flex flex-col items-start gap-3 max-w-[520px]">
              <Subtitle>How to Invest</Subtitle>
              <AnimatedHeading className="text-[#0F2419] font-light m-0" style={{
              fontSize: 'clamp(32px, 3.5vw, 52px)',
              lineHeight: '1.1',
              letterSpacing: '-2px'
            }}>
                Your pathway to the Nkomazi SEZ
              </AnimatedHeading>
            </div>
            <FadeUp delay={0.1}><GreenButton label="Start your journey" /></FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INVEST_STEPS.map((s, i) => <motion.div key={s.step} initial={{
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
          }} onHoverStart={() => setHovered(i)} onHoverEnd={() => setHovered(null)} className="relative overflow-hidden rounded-2xl cursor-default group" style={{
            minHeight: '340px'
          }}>
                <motion.div className="absolute inset-0" animate={{
              scale: hovered === i ? 1.06 : 1
            }} transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }} style={{
              backgroundImage: `url("${s.image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
                <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, rgba(15,36,25,0.2) 0%, rgba(15,36,25,0.85) 60%, rgba(15,36,25,0.97) 100%)'
            }} />
                <motion.div className="absolute inset-0" animate={{
              opacity: hovered === i ? 1 : 0
            }} transition={{
              duration: 0.35
            }} style={{
              background: 'linear-gradient(135deg, rgba(200,168,75,0.08) 0%, transparent 70%)'
            }} />

                <div className="relative z-10 h-full flex flex-col justify-between p-7">
                  <div className="flex items-center justify-between">
                    <motion.div className="w-10 h-10 rounded-full border-2 flex items-center justify-center" animate={{
                  borderColor: hovered === i ? '#C8A84B' : 'rgba(255,255,255,0.3)',
                  backgroundColor: hovered === i ? '#C8A84B' : 'transparent'
                }} transition={{
                  duration: 0.3
                }}>
                      <span className="text-xs font-bold" style={{
                    fontFamily: BODY_FONT,
                    color: hovered === i ? '#0F2419' : 'white'
                  }}>{s.step}</span>
                    </motion.div>
                    <motion.div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white" animate={{
                  x: hovered === i ? 0 : 6,
                  opacity: hovered === i ? 1 : 0
                }} transition={{
                  duration: 0.3
                }}>
                      <ArrowUpRightIcon />
                    </motion.div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <motion.div animate={{
                  y: hovered === i ? 0 : 8
                }} transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1]
                }}>
                      <div className="w-8 h-px bg-[#C8A84B] mb-3" />
                      <h3 className="text-white font-semibold m-0" style={{
                    fontFamily: HEADING_FONT,
                    fontSize: '22px',
                    letterSpacing: '-0.4px'
                  }}>{s.title}</h3>
                    </motion.div>
                    <motion.p className="text-white/70 text-[14px] leading-[1.7] m-0" style={{
                  fontFamily: BODY_FONT
                }} animate={{
                  opacity: hovered === i ? 1 : 0,
                  y: hovered === i ? 0 : 12
                }} transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1]
                }}>
                      {s.desc}
                    </motion.p>
                  </div>
                </div>
              </motion.div>)}
          </div>

          <FadeUp delay={0.2}>
            <p className="text-[#0F2419]/45 text-sm text-center" style={{
            fontFamily: BODY_FONT
          }}>
              <span>Hover each step to explore your investment journey · Operational within </span>
              <strong className="text-[#1A3C2E]">60 days</strong>
              <span> from signing</span>
            </p>
          </FadeUp>
        </div>
      </div>
    </section>;
};

// ─── Key Benefits — full-bleed image cards with overlay stat ──────────────────

const KeyBenefits = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  return <section className="py-[80px] mx-2.5 mb-2.5">
      <div className="bg-[#EEF3EF] rounded-3xl py-20 px-6">
        <div className="max-w-[1372px] mx-auto flex flex-col gap-14">
          <div className="flex flex-col items-center gap-3 text-center max-w-[520px] mx-auto">
            <Subtitle>Key Benefits</Subtitle>
            <AnimatedHeading className="text-[#0F2419] font-light m-0" style={{
            fontSize: 'clamp(34px, 4vw, 52px)',
            lineHeight: '1.1',
            letterSpacing: '-2px'
          }}>
              Why choose Nkomazi SEZ
            </AnimatedHeading>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {BENEFITS.map((b, i) => <motion.div key={b.id} initial={{
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
            minHeight: '380px'
          }}>
                <motion.div className="absolute inset-0" animate={{
              scale: hovered === b.id ? 1.07 : 1
            }} transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }} style={{
              backgroundImage: `url("${b.bgImage}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }} />
                <div className="absolute inset-0" style={{
              background: 'linear-gradient(180deg, rgba(15,36,25,0.55) 0%, rgba(15,36,25,0.88) 100%)'
            }} />
                <motion.div className="absolute inset-0" animate={{
              opacity: hovered === b.id ? 1 : 0
            }} transition={{
              duration: 0.4
            }} style={{
              background: 'linear-gradient(135deg, rgba(200,168,75,0.15) 0%, transparent 60%)'
            }} />
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

                <div className="relative z-10 h-full flex flex-col justify-between p-7">
                  <motion.div className="w-12 h-12 rounded-xl flex items-center justify-center" animate={{
                backgroundColor: hovered === b.id ? '#C8A84B' : 'rgba(255,255,255,0.1)'
              }} transition={{
                duration: 0.3
              }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{
                  color: hovered === b.id ? '#0F2419' : 'white'
                }}>
                      <path d={b.icon} />
                    </svg>
                  </motion.div>
                  <div className="flex flex-col gap-3">
                    <span className="text-[#C8A84B] font-light" style={{
                  fontFamily: HEADING_FONT,
                  fontSize: '56px',
                  lineHeight: '1',
                  letterSpacing: '-2px'
                }}>{b.number}</span>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-white font-semibold text-lg leading-tight m-0" style={{
                    fontFamily: HEADING_FONT
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
        </div>
      </div>
    </section>;
};

// ─── Key Sectors — dynamic full-bleed tab switcher with auto-play ─────────────

const KeySectors = ({
  activeSector,
  setActiveSector
}: {
  activeSector: number;
  setActiveSector: (i: number) => void;
}) => {
  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSector((activeSector + 1) % SEZ_SECTORS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSector, setActiveSector]);
  return <section className="mx-2.5 mb-2.5 rounded-3xl overflow-hidden" style={{
    minHeight: '700px'
  }}>
      {/* Full-bleed background that crossfades between sectors */}
      <div className="relative" style={{
      minHeight: '700px'
    }}>
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
        {/* Overlay */}
        <div className="absolute inset-0" style={{
        background: 'linear-gradient(to right, rgba(10,31,18,0.97) 0%, rgba(10,31,18,0.88) 45%, rgba(10,31,18,0.55) 75%, rgba(10,31,18,0.3) 100%)'
      }} />
        <div className="absolute inset-0" style={{
        background: 'linear-gradient(to top, rgba(10,31,18,0.7) 0%, transparent 50%)'
      }} />

        <div className="relative z-10 max-w-[1372px] mx-auto px-8 py-16 h-full flex flex-col justify-between" style={{
        minHeight: '700px'
      }}>
          {/* Header row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex flex-col items-start gap-3">
              <Subtitle>Key Sectors</Subtitle>
              <AnimatedHeading className="text-white font-light m-0" style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              lineHeight: '1.1',
              letterSpacing: '-2px'
            }}>
                Priority investment sectors
              </AnimatedHeading>
            </div>
            {/* Tab pills */}
            <div className="flex flex-wrap gap-2">
              {SEZ_SECTORS.map((s, i) => <motion.button key={s.id} onClick={() => setActiveSector(i)} className="relative px-5 py-2.5 rounded-full text-[13px] font-medium tracking-[0.04em] overflow-hidden" style={{
              fontFamily: BODY_FONT,
              border: `1px solid ${activeSector === i ? '#C8A84B' : 'rgba(255,255,255,0.18)'}`,
              color: activeSector === i ? '#0F2419' : 'rgba(255,255,255,0.65)',
              background: activeSector === i ? '#C8A84B' : 'rgba(255,255,255,0.05)'
            }} whileTap={{
              scale: 0.96
            }} transition={{
              duration: 0.2
            }}>
                  <span>{s.tag}</span>
                </motion.button>)}
            </div>
          </div>

          {/* Sector content */}
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
          }} className="grid lg:grid-cols-[1fr_420px] gap-10 items-end">
                {/* Left — text content */}
                <div className="flex flex-col gap-7">
                  <div className="flex items-center gap-4">
                    <span className="text-[#C8A84B]/40 font-light" style={{
                  fontFamily: HEADING_FONT,
                  fontSize: '80px',
                  lineHeight: '1',
                  letterSpacing: '-5px'
                }}>{svc.label}</span>
                    <div className="w-px h-16 bg-white/10" />
                    <span className="text-white/40 text-xs tracking-[0.12em] uppercase" style={{
                  fontFamily: BODY_FONT
                }}>{svc.tag}</span>
                  </div>
                  <h3 className="text-white font-light m-0" style={{
                fontFamily: HEADING_FONT,
                fontSize: 'clamp(26px, 2.8vw, 42px)',
                lineHeight: '1.12',
                letterSpacing: '-1.5px'
              }}>{svc.title}</h3>
                  <p className="text-white/60 text-[16px] leading-[1.78] m-0 max-w-[560px]" style={{
                fontFamily: BODY_FONT
              }}>{svc.desc}</p>

                  <ul className="list-none p-0 m-0 flex flex-col gap-3">
                    {svc.items.map((item, idx) => <motion.li key={item} className="flex items-start gap-3" initial={{
                  opacity: 0,
                  x: -12
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: idx * 0.09,
                  duration: 0.4,
                  ease: 'easeOut'
                }}>
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C8A84B]/15 border border-[#C8A84B]/30 flex items-center justify-center mt-0.5">
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4L3.5 6L6.5 2" stroke="#C8A84B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-white/70 text-[14px] font-normal leading-[1.65] m-0" style={{
                    fontFamily: BODY_FONT
                  }}>{item}</p>
                      </motion.li>)}
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

                {/* Right — sector image card */}
                <motion.div className="relative overflow-hidden rounded-2xl" style={{
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
                    <motion.button onClick={() => setActiveSector((activeSector - 1 + SEZ_SECTORS.length) % SEZ_SECTORS.length)} className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white" whileHover={{
                  scale: 1.1,
                  backgroundColor: 'rgba(200,168,75,0.3)'
                }} whileTap={{
                  scale: 0.95
                }}>
                      <ChevronLeft size={16} />
                    </motion.button>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 right-3">
                    <motion.button onClick={() => setActiveSector((activeSector + 1) % SEZ_SECTORS.length)} className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white" whileHover={{
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

// ─── Investor Stories — compact height, auto-play, lift-on-hover stat cards ──

const InvestorStories = () => {
  const [activeStory, setActiveStory] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-60px'
  });

  // Auto-advance every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStory(prev => (prev + 1) % INVESTOR_STORIES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);
  return <section ref={ref} className="mx-2.5 mb-2.5">
      <div className="bg-[#0F2419] rounded-3xl overflow-hidden">
        {/* Compact background image strip */}
        <div className="relative" style={{
        height: '260px'
      }}>
          {INVESTOR_STORIES.map((story, i) => <motion.div key={story.id} className="absolute inset-0" animate={{
          opacity: activeStory === i ? 1 : 0
        }} transition={{
          duration: 1.0,
          ease: 'easeInOut'
        }} style={{
          backgroundImage: `url("${story.bgImage}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%'
        }} />)}
          {/* Gradient overlays */}
          <div className="absolute inset-0" style={{
          background: 'linear-gradient(180deg, rgba(15,36,25,0.15) 0%, rgba(15,36,25,0.7) 60%, #0F2419 100%)'
        }} />
          <div className="absolute inset-0" style={{
          background: 'linear-gradient(90deg, rgba(15,36,25,0.5) 0%, transparent 55%)'
        }} />

          {/* Sector label overlay top-right */}
          <div className="absolute top-6 right-6">
            <AnimatePresence mode="wait">
              <motion.span key={activeStory} initial={{
              opacity: 0,
              y: -8
            }} animate={{
              opacity: 1,
              y: 0
            }} exit={{
              opacity: 0,
              y: 8
            }} transition={{
              duration: 0.3
            }} className="inline-block bg-[#C8A84B] text-[#0F2419] text-xs font-bold px-4 py-2 rounded-full tracking-[0.08em] uppercase" style={{
              fontFamily: BODY_FONT
            }}>
                {INVESTOR_STORIES[activeStory].sector}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Story selector pills — left edge */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {INVESTOR_STORIES.map((story, i) => <button key={story.id} onClick={() => setActiveStory(i)} className="flex items-center gap-2.5 group">
                <motion.div animate={{
              width: activeStory === i ? '28px' : '8px',
              backgroundColor: activeStory === i ? '#C8A84B' : 'rgba(255,255,255,0.3)'
            }} transition={{
              duration: 0.4
            }} className="h-[3px] rounded-full" />
                <motion.span animate={{
              opacity: activeStory === i ? 1 : 0,
              x: activeStory === i ? 0 : -8
            }} transition={{
              duration: 0.3
            }} className="text-[#C8A84B] text-xs font-medium tracking-[0.08em] uppercase" style={{
              fontFamily: BODY_FONT
            }}>
                  {story.sector}
                </motion.span>
              </button>)}
          </div>
        </div>

        {/* Quote + counter stats — tighter padding */}
        <div className="px-10 py-10">
          <div className="max-w-[1372px] mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="flex flex-col gap-5">
                <Subtitle>Investor Stories</Subtitle>
                <AnimatePresence mode="wait">
                  <motion.div key={activeStory} initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} exit={{
                  opacity: 0,
                  y: -16
                }} transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1]
                }} className="flex flex-col gap-4">
                    <p className="text-white/90 text-xl font-light leading-[1.6] tracking-[-0.3px] m-0" style={{
                    fontFamily: HEADING_FONT
                  }}>
                      <span>"{INVESTOR_STORIES[activeStory].quote}"</span>
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-px bg-[#C8A84B] flex-shrink-0" />
                      <div className="flex flex-col gap-0.5">
                        <span className="text-white font-semibold text-[15px]" style={{
                        fontFamily: BODY_FONT
                      }}>{INVESTOR_STORIES[activeStory].name}</span>
                        <span className="text-white/50 text-sm" style={{
                        fontFamily: BODY_FONT
                      }}>{INVESTOR_STORIES[activeStory].role}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center gap-3 mt-1">
                  <WhiteButton label="Read Case Study" />
                  <div className="flex gap-2 ml-2">
                    {INVESTOR_STORIES.map((_, i) => <button key={i} onClick={() => setActiveStory(i)} className="rounded-full transition-all duration-300" style={{
                    width: activeStory === i ? '24px' : '8px',
                    height: '8px',
                    backgroundColor: activeStory === i ? '#C8A84B' : 'rgba(255,255,255,0.25)'
                  }} />)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <CounterItem value="2400" label="Hectares of prime industrial land available." bg="bg-[#C8A84B]" />
                <CounterItem value="15" suffix="%" label="Reduced corporate tax rate for SEZ operators." bg="bg-white" />
                <CounterItem value="30" suffix="k+" label="Direct and indirect jobs targeted by 2030." bg="bg-[#EEF3EF]" />
              </div>
            </div>
          </div>
        </div>
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
    })} className="fixed bottom-8 right-8 z-[9998] w-12 h-12 rounded-full flex items-center justify-center" style={{
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

// ─── Page component ───────────────────────────────────────────────────────────

export const AirCargoPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSector, setActiveSector] = useState(0);
  return <div className="w-full bg-white overflow-x-hidden" style={{
    fontFamily: BODY_FONT
  }}>
      {/* ── Scroll Progress Bar ── */}
      <ScrollProgressBar />

      {/* ── Back to Top ── */}
      <BackToTop />

      {/* ── Section Snap Nav ── */}
      <SectionSnapNav />

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

      {/* ── Zone Overview ── */}
      <div id="sec-overview">
        <ZoneOverview />
      </div>

      {/* ── Key Sectors ── */}
      <div id="sec-sectors">
        <KeySectors activeSector={activeSector} setActiveSector={setActiveSector} />
      </div>

      {/* ── How to Invest ── */}
      <div id="sec-invest">
        <HowToInvest />
      </div>

      {/* ── Key Benefits ── */}
      <div id="sec-benefits">
        <KeyBenefits />
      </div>

      {/* ── Global Route Map ── */}
      <div id="sec-map">
        <GlobalRouteMap />
      </div>

      {/* ── Investor Stories ── */}
      <div id="sec-stories">
        <InvestorStories />
      </div>

      {/* ── FAQs ── */}
      <section id="sec-faq" className="py-[120px]">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex flex-col gap-10 overflow-hidden">
            <div className="flex flex-col items-center gap-3 text-center">
              <Subtitle>FAQs</Subtitle>
              <AnimatedHeading className="text-[#0F2419] font-light m-0" style={{
              fontSize: 'clamp(34px, 4vw, 52px)',
              lineHeight: '1.1',
              letterSpacing: '-2px'
            }}>
                Questions? Glad you asked
              </AnimatedHeading>
            </div>
            <div className="border border-[rgba(0,0,0,0.08)] rounded-2xl overflow-hidden">
              {FAQS.map((faq, i) => <FaqItem key={faq.q} num={i + 1} question={faq.q} answer={faq.a} isLast={i === FAQS.length - 1} index={i} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ── Immersive CTA — manufacturing background ── */}
      <section id="sec-cta" className="relative flex flex-col justify-end overflow-hidden rounded-3xl mx-2.5 mb-2.5" style={{
      minHeight: '620px'
    }}>
        <div className="absolute inset-0" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1800&q=85")',
        backgroundPosition: 'center 40%',
        backgroundSize: 'cover'
      }} />
        <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, rgba(10,20,14,0.96) 0%, rgba(15,36,25,0.82) 45%, rgba(15,36,25,0.45) 100%)'
      }} />
        <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(135deg, transparent 40%, rgba(200,168,75,0.04) 60%, transparent 80%)'
      }} />

        <div className="relative z-10 max-w-[1372px] mx-auto w-full px-8 py-10 pb-16">
          <div className="flex flex-col gap-7 items-start max-w-[780px]">
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
            <AnimatedHeading className="text-white font-light m-0" style={{
            fontSize: 'clamp(36px, 5.5vw, 76px)',
            lineHeight: '1.06',
            letterSpacing: '-3px'
          }}>
              Build your future in Southern Africa's growth engine
            </AnimatedHeading>
            <FadeUp delay={0.3} className="flex flex-wrap gap-4 items-center">
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
        }} className="mt-14 max-w-[360px]" style={{
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
              "The single-window support made our entire setup seamless — permits, land, utilities."
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
        <div className="bg-white pt-[115px] pb-16">
          <div className="max-w-[1372px] mx-auto px-4">
            <div className="grid gap-[60px]" style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))'
          }}>
              {Object.entries(FOOTER_LINKS).map(([cat, links]) => <FadeUp key={cat} className="flex flex-col gap-6">
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

        {/* Bottom — dark section */}
        <div className="bg-[#0F2419]">
          <div className="max-w-[1372px] mx-auto px-4 pt-14 pb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-10 pb-12 border-b border-white/10">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2.5">
                  <img src="/NSEZ-logo.jpg" alt="Nkomazi SEZ" className="h-12 w-auto object-contain max-w-none rounded-md" />
                </div>
                <p className="text-white/40 text-[14px] font-normal leading-6 m-0" style={{
                fontFamily: BODY_FONT
              }}>
                  <span>Copyright © </span>
                  <a href="#" onClick={e => e.preventDefault()} className="text-white/70 font-semibold no-underline hover:text-white transition-colors duration-200">Nkomazi SEZ</a>
                  <span> 2025 | All Rights Reserved</span>
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

            <div className="pt-5 flex flex-wrap justify-between items-center gap-4">
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

// ─── Section Snap Navigator ───────────────────────────────────────────────────

const SECTION_NAV_ITEMS = [{
  id: 'sec-hero',
  label: 'Hero'
}, {
  id: 'sec-partners',
  label: 'Partners'
}, {
  id: 'sec-overview',
  label: 'Zone Overview'
}, {
  id: 'sec-sectors',
  label: 'Key Sectors'
}, {
  id: 'sec-invest',
  label: 'How to Invest'
}, {
  id: 'sec-benefits',
  label: 'Key Benefits'
}, {
  id: 'sec-map',
  label: 'Global Map'
}, {
  id: 'sec-stories',
  label: 'Investor Stories'
}, {
  id: 'sec-faq',
  label: 'FAQs'
}, {
  id: 'sec-cta',
  label: 'Get Started'
}];
const useActiveSectionTracker = (ids: string[]) => {
  const [activeId, setActiveId] = useState<string>(ids[0]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveId(id);
        }
      }, {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
      });
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [ids]);
  return activeId;
};
const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};
const SectionSnapNav = () => {
  const sectionIds = SECTION_NAV_ITEMS.map(s => s.id);
  const activeId = useActiveSectionTracker(sectionIds);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <AnimatePresence>
      {visible && <motion.nav aria-label="Section navigation" initial={{
      opacity: 0,
      x: 20
    }} animate={{
      opacity: 1,
      x: 0
    }} exit={{
      opacity: 0,
      x: 20
    }} transition={{
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }} className="fixed right-6 top-1/2 z-[9997] flex flex-col gap-[10px] -translate-y-1/2 hidden lg:flex">
          {SECTION_NAV_ITEMS.map(item => {
        const isActive = activeId === item.id;
        const isHovered = hoveredId === item.id;
        return <button key={item.id} aria-label={`Navigate to ${item.label}`} onClick={() => scrollToSection(item.id)} onMouseEnter={() => setHoveredId(item.id)} onMouseLeave={() => setHoveredId(null)} className="relative flex items-center justify-end group" style={{
          outline: 'none',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer'
        }}>
                {/* Tooltip label */}
                <AnimatePresence>
                  {isHovered && <motion.span initial={{
              opacity: 0,
              x: 8,
              scale: 0.92
            }} animate={{
              opacity: 1,
              x: 0,
              scale: 1
            }} exit={{
              opacity: 0,
              x: 8,
              scale: 0.92
            }} transition={{
              duration: 0.18,
              ease: 'easeOut'
            }} className="mr-2.5 text-[11px] font-semibold tracking-[0.06em] uppercase whitespace-nowrap px-2.5 py-1 rounded-md" style={{
              fontFamily: BODY_FONT,
              background: 'rgba(15,36,25,0.92)',
              color: isActive ? '#C8A84B' : 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(200,168,75,0.2)'
            }}>
                      {item.label}
                    </motion.span>}
                </AnimatePresence>

                {/* Dot */}
                <motion.div animate={{
            width: isActive ? '28px' : isHovered ? '18px' : '8px',
            height: isActive ? '8px' : '8px',
            backgroundColor: isActive ? '#C8A84B' : isHovered ? 'rgba(200,168,75,0.6)' : 'rgba(255,255,255,0.3)',
            borderRadius: isActive ? '4px' : '50%',
            boxShadow: isActive ? '0 0 10px rgba(200,168,75,0.6)' : 'none'
          }} transition={{
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1]
          }} style={{
            border: isActive ? '1.5px solid rgba(200,168,75,0.5)' : '1.5px solid rgba(255,255,255,0.2)',
            flexShrink: 0
          }} />
              </button>;
      })}
        </motion.nav>}
    </AnimatePresence>;
};