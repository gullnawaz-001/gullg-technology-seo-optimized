/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Link } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { Header } from './components/Header';
import { ChatbotWidget } from './components/ChatbotWidget';
import { LandingPage } from './modules/LandingPage';
import { ClientPortal } from './modules/ClientPortal';

import { KnowledgeHub, KnowledgeHubArticle } from './modules/KnowledgeHub';
import { AdminDashboard } from './modules/AdminDashboard';
import { ContactUs } from './modules/ContactUs';
import { FeaturedWorksShowcase } from './modules/FeaturedWorksShowcase';
import { CompanyPage } from "./modules/CompanyPage";
import { PrivacyPolicy } from "./modules/PrivacyPolicy";
import { TermsOfService } from "./modules/TermsOfService";
import { ViewState } from './types';
import { SEO } from './components/SEO';
import { getOrganizationSchema, getWebSiteSchema, getBreadcrumbSchema } from './lib/seoSchemas';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Layout wrapper for header and footer
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const hideHeaderFooter = [
    '/admin'
  ].includes(location.pathname);
  
  // Backward compatibility map for Header navigation
  const viewToRoute: Record<string, string> = {
    'landing': '/',
    'company': '/company',
    'portfolio': '/portfolio',
    'knowledge-hub': '/knowledge-hub',
    'contact': '/contact',
    'admin': '/admin',
    'client-portal': '/client-portal',
    'privacy': '/privacy-policy',
    'terms': '/terms-of-service'
  };

  const handleNavigate = (view: ViewState) => {
    const route = viewToRoute[view as string];
    if (route) {
      navigate(route);
    }
  };
  
  // Map current route to ViewState for Header to highlight correctly
  const routeToView: Record<string, string> = {
    '/': 'landing',
    '/company': 'company',
    '/portfolio': 'portfolio',
    '/knowledge-hub': 'knowledge-hub',
    '/contact': 'contact',
    '/admin': 'admin',
    '/client-portal': 'client-portal',
    '/privacy-policy': 'privacy',
    '/terms-of-service': 'terms'
  };
  
  let currentView = routeToView[location.pathname] || 'landing';
  if (location.pathname.startsWith('/knowledge-hub/')) {
    currentView = 'knowledge-hub';
  }

  return (
    <>
      {!hideHeaderFooter && (
        <Header currentView={currentView as ViewState} onNavigate={handleNavigate} />
      )}
      
      <main id="main-content">
        {children}
      </main>

      {!hideHeaderFooter && <ChatbotWidget />}
      
      {!hideHeaderFooter && (
        <footer className="bg-slate-50 text-slate-600 py-12 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 overflow-hidden flex items-center justify-center shadow-sm ring-1 ring-slate-200">
                  <img src="/logo.png" alt="GullG Technology Logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-slate-900">GullG Technology</span>
              </div>
              
              {/* Internal Navigation Links */}
              <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600" aria-label="Footer Navigation">
                <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
                <Link to="/company" className="hover:text-slate-900 transition-colors">Company</Link>
                <Link to="/portfolio" className="hover:text-slate-900 transition-colors">Portfolio</Link>
                <Link to="/knowledge-hub" className="hover:text-slate-900 transition-colors">Knowledge Hub</Link>
                <Link to="/contact" className="hover:text-slate-900 transition-colors">Contact</Link>
              </nav>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-sm text-slate-500">
              <div>
                &copy; 2026 GullG Technology. All rights reserved.
              </div>
              <div className="flex gap-6">
                <Link to="/privacy-policy" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
                <Link to="/terms-of-service" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

// 404 Component
function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
      <SEO 
        title="Page Not Found | GullG Technology" 
        description="The requested page could not be found on GullG Technology."
        noIndex={true}
      />
      <h1 className="text-6xl font-black text-slate-900 mb-6">404</h1>
      <p className="text-xl text-slate-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
        Return Home
      </Link>
    </div>
  );
}

function RouteWrapper({ Component, ...props }: any) {
  const navigate = useNavigate();
  const viewToRoute: Record<string, string> = {
    'landing': '/',
    'company': '/company',
    'portfolio': '/portfolio',
    'knowledge-hub': '/knowledge-hub',
    'contact': '/contact',
    'admin': '/admin',
    'client-portal': '/client-portal',
    'privacy': '/privacy-policy',
    'terms': '/terms-of-service'
  };

  const handleNavigate = (view: string) => {
    const route = viewToRoute[view] || '/';
    navigate(route);
  };
  
  const handleNavigateWithService = (service: string) => {
    navigate('/contact?service=' + encodeURIComponent(service));
  };

  return <Component onNavigate={handleNavigate} onNavigateWithService={handleNavigateWithService} {...props} />;
}

export default function App() {
  const homeSchemas = [getOrganizationSchema(), getWebSiteSchema()];

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-slate-700/30">
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <SEO 
                    title="GullG Technology | Digital Innovation & AI Engineering Agency"
                    description="GullG Technology is a digital innovation agency bridging modern web & mobile engineering, UI/UX design, AI integration, and workflow automation to build high-performance products."
                    canonicalPath="/"
                    schemas={homeSchemas}
                  />
                  <RouteWrapper Component={LandingPage} />
                </>
              } 
            />
            
            <Route 
              path="/company" 
              element={
                <>
                  <SEO 
                    title="About Us | GullG Technology - 20+ Years in Digital Innovation"
                    description="Learn about GullG Technology's story, multidisciplinary team, and 7 core pillars transforming digital complexity into simple, high-performance solutions."
                    canonicalPath="/company"
                    schemas={[getBreadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Company', item: '/company' }])]}
                  />
                  <RouteWrapper Component={CompanyPage} />
                </>
              } 
            />
            
            <Route 
              path="/portfolio" 
              element={
                <>
                  <SEO 
                    title="Portfolio & Case Studies | GullG Technology"
                    description="Explore our interactive case studies and live demos spanning SaaS dashboards, medical QBank analytics, e-commerce apps, AI chatbots, and luxury brand portals."
                    canonicalPath="/portfolio"
                    schemas={[getBreadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Portfolio', item: '/portfolio' }])]}
                  />
                  <RouteWrapper Component={FeaturedWorksShowcase} />
                </>
              } 
            />
            
            <Route 
              path="/knowledge-hub" 
              element={
                <>
                  <SEO 
                    title="Knowledge Hub & Tech Insights | GullG Technology"
                    description="In-depth articles, engineering architecture deep dives, AI workflow strategies, and UI/UX design insights from GullG Technology experts."
                    canonicalPath="/knowledge-hub"
                    schemas={[getBreadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Knowledge Hub', item: '/knowledge-hub' }])]}
                  />
                  <KnowledgeHub />
                </>
              } 
            />
            
            <Route path="/knowledge-hub/:slug" element={<KnowledgeHubArticle />} />
            
            <Route 
              path="/contact" 
              element={
                <>
                  <SEO 
                    title="Contact Us & Get a Quote | GullG Technology"
                    description="Get in touch with GullG Technology for custom web development, AI integration, UI/UX design, or digital transformation partnerships."
                    canonicalPath="/contact"
                    schemas={[getBreadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Contact Us', item: '/contact' }])]}
                  />
                  <ContactUs />
                </>
              } 
            />
            
            <Route 
              path="/client-portal" 
              element={
                <>
                  <SEO 
                    title="Client Portal Login & Project Hub | GullG Technology"
                    description="Secure client portal for GullG Technology clients to track milestones, access deliverables, and review project documentation."
                    canonicalPath="/client-portal"
                    noIndex={true}
                  />
                  <RouteWrapper Component={ClientPortal} />
                </>
              } 
            />
            
            <Route 
              path="/admin" 
              element={
                <>
                  <SEO 
                    title="Admin Dashboard | GullG Technology"
                    description="Internal administration portal for GullG Technology."
                    canonicalPath="/admin"
                    noIndex={true}
                  />
                  <RouteWrapper Component={AdminDashboard} />
                </>
              } 
            />
            
            <Route 
              path="/privacy-policy" 
              element={
                <>
                  <SEO 
                    title="Privacy Policy | GullG Technology"
                    description="Read the GullG Technology Privacy Policy regarding user data protection, privacy practices, and personal information handling."
                    canonicalPath="/privacy-policy"
                    schemas={[getBreadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Privacy Policy', item: '/privacy-policy' }])]}
                  />
                  <PrivacyPolicy />
                </>
              } 
            />
            
            <Route 
              path="/terms-of-service" 
              element={
                <>
                  <SEO 
                    title="Terms of Service | GullG Technology"
                    description="Review the terms and conditions governing the use of GullG Technology's website, digital services, and client engagements."
                    canonicalPath="/terms-of-service"
                    schemas={[getBreadcrumbSchema([{ name: 'Home', item: '/' }, { name: 'Terms of Service', item: '/terms-of-service' }])]}
                  />
                  <TermsOfService />
                </>
              } 
            />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}
