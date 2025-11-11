import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import ProjectDetail from "./ProjectDetail";

import EscrowRelease from "./EscrowRelease";

import Ledger from "./Ledger";

import Disputes from "./Disputes";

import Insurance from "./Insurance";

import Modules from "./Modules";

import Lending from "./Lending";

import Connect from "./Connect";

import TransactionFlow from "./TransactionFlow";

import InvestorDemo from "./InvestorDemo";

import Settings from "./Settings";

import Wallet from "./Wallet";

import AIAutomation from "./AIAutomation";

import Analytics from "./Analytics";

import Integrations from "./Integrations";

import CustomReports from "./CustomReports";

import APIAccess from "./APIAccess";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    ProjectDetail: ProjectDetail,
    
    EscrowRelease: EscrowRelease,
    
    Ledger: Ledger,
    
    Disputes: Disputes,
    
    Insurance: Insurance,
    
    Modules: Modules,
    
    Lending: Lending,
    
    Connect: Connect,
    
    TransactionFlow: TransactionFlow,
    
    InvestorDemo: InvestorDemo,
    
    Settings: Settings,
    
    Wallet: Wallet,
    
    AIAutomation: AIAutomation,
    
    Analytics: Analytics,
    
    Integrations: Integrations,
    
    CustomReports: CustomReports,
    
    APIAccess: APIAccess,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/ProjectDetail" element={<ProjectDetail />} />
                
                <Route path="/EscrowRelease" element={<EscrowRelease />} />
                
                <Route path="/Ledger" element={<Ledger />} />
                
                <Route path="/Disputes" element={<Disputes />} />
                
                <Route path="/Insurance" element={<Insurance />} />
                
                <Route path="/Modules" element={<Modules />} />
                
                <Route path="/Lending" element={<Lending />} />
                
                <Route path="/Connect" element={<Connect />} />
                
                <Route path="/TransactionFlow" element={<TransactionFlow />} />
                
                <Route path="/InvestorDemo" element={<InvestorDemo />} />
                
                <Route path="/Settings" element={<Settings />} />
                
                <Route path="/Wallet" element={<Wallet />} />
                
                <Route path="/AIAutomation" element={<AIAutomation />} />
                
                <Route path="/Analytics" element={<Analytics />} />
                
                <Route path="/Integrations" element={<Integrations />} />
                
                <Route path="/CustomReports" element={<CustomReports />} />
                
                <Route path="/APIAccess" element={<APIAccess />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}