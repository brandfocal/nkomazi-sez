import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import { Container, Theme } from './settings/types';
import { AirCargoPage } from './components/generated/AirCargoPage';
import { Home2Page } from './components/generated/Home2Page';
import { InvestorHubPage } from './components/generated/InvestorHubPage';
import { EnterpriseHubPage } from './components/generated/EnterpriseHubPage';
import { CommunityPortalPage } from './components/generated/CommunityPortalPage';

let theme: Theme = 'light';

function App() {
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AirCargoPage />} />
        <Route path="/home2" element={<Home2Page />} />
        <Route path="/investor-hub" element={<InvestorHubPage />} />
        <Route path="/enterprise-hub" element={<EnterpriseHubPage />} />
        <Route path="/careers" element={<CommunityPortalPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;