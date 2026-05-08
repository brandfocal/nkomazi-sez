import { NSEZNavbar } from './NSEZNavbar';
import { NSEZHeroSection } from './NSEZHeroSection';
import { NSEZPartnersMarquee } from './NSEZPartnersMarquee';
import { NSEZStakeholderSection } from './NSEZStakeholderSection';
import { NSEZAdvantagesSection } from './NSEZAdvantagesSection';
import { NSEZFooterSection } from './NSEZFooterSection';
import { NSEZPageTransition } from './NSEZPageTransition';
import { NSEZScrollToTop } from './NSEZScrollToTop';

export function Home2Page() {
  return (
    <div className="w-full">
      <NSEZPageTransition />
      <NSEZNavbar />
      <NSEZHeroSection />
      <NSEZPartnersMarquee />
      <NSEZStakeholderSection />
      <NSEZAdvantagesSection />
      <NSEZFooterSection />
      <NSEZScrollToTop />
    </div>
  );
}
