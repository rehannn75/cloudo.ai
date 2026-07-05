import * as data from './data.js';
import * as comps from './components.js';

// Global State
const state = {
  currentView: 'home', // 'home', 'platform', 'features', etc.
  theme: 'dark', // 'dark', 'light' (simulated via root styles)
  language: 'EN',
  notifications: [
    { id: 1, text: "Critical system call isolated on GCP-Prod-Db", type: "threat" },
    { id: 2, text: "Daily compliance scan completed: SOC 2 100% compliant", type: "success" }
  ],
  user: null, // null if logged out, { email: "admin@techcorp.com", role: "Security Lead" } if logged in
  activeDashboardTab: 'dashboard',
  activeAdminTab: 'dashboard',
  searchQuery: '',
  selectedFeatureId: 'ai-threat-detection',
  selectedSolutionId: 'enterprise',
  faqCategory: 'General',
  inquiries: [
    { id: 1, name: "Sarah Connor", email: "sconnor@cyberdyne.co", phone: "+1 555-0199", company: "Cyberdyne Systems", subject: "Kubernetes Security Scanner Audit", message: "We need an agentless audit of our main GKE node segments. Please send custom pricing options for enterprise.", time: "1 day ago" }
  ],
  pricingInquiries: [
    { id: 1, name: "John Connor", company: "Cyberdyne Tech", email: "jconnor@cyberdyne.co", countryCode: "🇺🇸 +1", mobile: "2025550143", plan: "Enterprise", subject: "Custom WAF Gateway scaling Quote", description: "Requesting custom WAF scale sizing pricing for high frequency financial transactions matching 15M monthly requests.", time: "2026-07-04T12:00:00", status: "Pending" },
    { id: 2, name: "Rehan Mujawar", company: "R&M Solutions", email: "rehan@rmsol.com", countryCode: "🇮🇳 +91", mobile: "9876543210", plan: "Professional", subject: "SaaS DevSecOps continuous pipeline setup", description: "Need detailed professional tier custom deployment support specs for automated terraform checks.", time: "2026-07-05T09:30:00", status: "Contacted" }
  ]
};

// Route mapping
const routes = {
  // Public
  '': () => renderPublic('home'),
  '#home': () => renderPublic('home'),
  '#overview': () => renderPublic('overview'),
  '#platform': () => renderPublic('platform'),
  '#features': () => renderPublic('features'),
  '#solutions': () => renderPublic('solutions'),
  '#services': () => renderPublic('services'),
  '#industries': () => renderPublic('industries'),
  '#integrations': () => renderPublic('integrations'),
  '#compliance': () => renderPublic('compliance'),
  '#pricing': () => renderPublic('pricing'),
  '#resources': () => renderPublic('resources'),
  '#customers': () => renderPublic('customers'),
  '#about': () => renderPublic('about'),
  '#careers': () => renderPublic('careers'),
  '#partners': () => renderPublic('partners'),
  '#contact': () => renderPublic('contact'),
  '#faq': () => renderPublic('faq'),
  '#status': () => renderPublic('status'),

  // Auth
  '#login': () => renderAuth('login'),
  '#register': () => renderAuth('register'),
  '#forgot-password': () => renderAuth('forgot-password'),
  '#reset-password': () => renderAuth('reset-password'),
  '#verify-email': () => renderAuth('verify-email'),
  '#two-factor': () => renderAuth('two-factor'),

  // User Dashboard
  '#dashboard': () => renderUserDashboard('dashboard'),
  '#dashboard-overview': () => renderUserDashboard('overview'),
  '#dashboard-threats': () => renderUserDashboard('threats'),
  '#dashboard-map': () => renderUserDashboard('map'),
  '#dashboard-assets': () => renderUserDashboard('assets'),
  '#dashboard-servers': () => renderUserDashboard('servers'),
  '#dashboard-apps': () => renderUserDashboard('apps'),
  '#dashboard-containers': () => renderUserDashboard('containers'),
  '#dashboard-scanner': () => renderUserDashboard('scanner'),
  '#dashboard-alerts': () => renderUserDashboard('alerts'),
  '#dashboard-reports': () => renderUserDashboard('reports'),
  '#dashboard-compliance': () => renderUserDashboard('compliance'),
  '#dashboard-integrations': () => renderUserDashboard('integrations'),
  '#dashboard-billing': () => renderUserDashboard('billing'),
  '#dashboard-notifications': () => renderUserDashboard('notifications'),
  '#dashboard-api': () => renderUserDashboard('api'),
  '#dashboard-profile': () => renderUserDashboard('profile'),
  '#dashboard-settings': () => renderUserDashboard('settings'),
  '#dashboard-support': () => renderUserDashboard('support'),

  // Admin Dashboard
  '#admin': () => renderAdminDashboard('dashboard'),
  '#admin-customers': () => renderAdminDashboard('customers'),
  '#admin-users': () => renderAdminDashboard('users'),
  '#admin-team': () => renderAdminDashboard('team'),
  '#admin-roles': () => renderAdminDashboard('roles'),
  '#admin-threats': () => renderAdminDashboard('threats'),
  '#admin-incidents': () => renderAdminDashboard('incidents'),
  '#admin-resources': () => renderAdminDashboard('resources'),
  '#admin-containers': () => renderAdminDashboard('containers'),
  '#admin-kubernetes': () => renderAdminDashboard('kubernetes'),
  '#admin-servers': () => renderAdminDashboard('servers'),
  '#admin-audit': () => renderAdminDashboard('audit'),
  '#admin-security-logs': () => renderAdminDashboard('security-logs'),
  '#admin-analytics': () => renderAdminDashboard('analytics'),
  '#admin-reports': () => renderAdminDashboard('reports'),
  '#admin-compliance': () => renderAdminDashboard('compliance'),
  '#admin-billing': () => renderAdminDashboard('billing'),
  '#admin-subscriptions': () => renderAdminDashboard('subscriptions'),
  '#admin-tickets': () => renderAdminDashboard('tickets'),
  '#admin-pricing-inquiries': () => renderAdminDashboard('pricing-inquiries'),
  '#admin-templates': () => renderAdminDashboard('templates'),
  '#admin-cms': () => renderAdminDashboard('cms'),
  '#admin-api': () => renderAdminDashboard('api'),
  '#admin-backup': () => renderAdminDashboard('backup'),
  '#admin-settings': () => renderAdminDashboard('settings'),
  '#admin-activity': () => renderAdminDashboard('activity')
};

// Router initialization
export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}

function handleRoute() {
  const hash = window.location.hash || '';
  let matched = false;

  // Clear any map timers/animations from components if active
  if (window.activeMapCleanup) {
    window.activeMapCleanup();
    window.activeMapCleanup = null;
  }

  for (const route in routes) {
    if (route === hash) {
      routes[route]();
      matched = true;
      break;
    }
  }

  if (!matched) {
    // Fallback
    renderPublic('home');
  }

  // Update layout header active links
  updateActiveLinks(hash);
  window.scrollTo(0, 0);
}

function updateActiveLinks(hash) {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(l => {
    if (l.getAttribute('href') === hash) {
      l.classList.add('active');
    } else {
      l.classList.remove('active');
    }
  });
}

// Layout Selectors
const layouts = {
  public: document.getElementById('public-layout'),
  auth: document.getElementById('auth-layout'),
  user: document.getElementById('user-dashboard-layout'),
  admin: document.getElementById('admin-dashboard-layout')
};

function showLayout(layoutName) {
  for (const key in layouts) {
    if (layouts[key]) {
      if (key === layoutName) {
        layouts[key].classList.remove('hidden');
      } else {
        layouts[key].classList.add('hidden');
      }
    }
  }
}

// Global search handling
window.handleSearch = (e) => {
  const q = e.target.value.toLowerCase();
  state.searchQuery = q;
  // If we are in public-resources, features, integrations or dashboards, trigger sub-filtering
  const hash = window.location.hash;
  if (hash === '#features') {
    renderFeaturesPage();
  } else if (hash === '#integrations') {
    renderIntegrationsPage();
  } else if (hash === '#resources') {
    renderResourcesPage();
  } else if (hash === '#faq') {
    renderFAQPage();
  }
};

// Render Functions for Public Platform
function renderPublic(view) {
  showLayout('public');
  state.currentView = view;
  const viewport = document.getElementById('public-viewport');
  if (!viewport) return;

  // Build appropriate view
  switch (view) {
    case 'home':
      viewport.innerHTML = getHomeHTML();
      comps.initGlobe('hero-globe-canvas');
      comps.renderRadialScore('hero-score-radial', 92);
      break;
    case 'overview':
      viewport.innerHTML = getOverviewHTML();
      break;
    case 'platform':
      viewport.innerHTML = getPlatformHTML();
      comps.initGlobe('platform-globe-canvas');
      break;
    case 'features':
      renderFeaturesPage(viewport);
      break;
    case 'solutions':
      renderSolutionsPage(viewport);
      break;
    case 'services':
      viewport.innerHTML = getServicesHTML();
      break;
    case 'industries':
      viewport.innerHTML = getIndustriesHTML();
      break;
    case 'integrations':
      renderIntegrationsPage(viewport);
      break;
    case 'compliance':
      viewport.innerHTML = getComplianceHTML();
      break;
    case 'pricing':
      viewport.innerHTML = getPricingHTML();
      setupPricingQuoteForm();
      break;
    case 'resources':
      renderResourcesPage(viewport);
      break;
    case 'customers':
      viewport.innerHTML = getCustomersHTML();
      break;
    case 'about':
      viewport.innerHTML = getAboutHTML();
      break;
    case 'careers':
      renderCareersPage(viewport);
      break;
    case 'partners':
      viewport.innerHTML = getPartnersHTML();
      setupPartnerForm();
      break;
    case 'contact':
      viewport.innerHTML = getContactHTML();
      setupContactForm();
      break;
    case 'faq':
      renderFAQPage(viewport);
      break;
    case 'status':
      viewport.innerHTML = getStatusHTML();
      break;
  }
}

// Render Functions for Authentication Flow
function renderAuth(view) {
  showLayout('auth');
  const viewport = document.getElementById('auth-viewport');
  if (!viewport) return;

  switch (view) {
    case 'login':
      viewport.innerHTML = getLoginHTML();
      setupLoginForm();
      break;
    case 'register':
      viewport.innerHTML = getRegisterHTML();
      setupRegisterForm();
      break;
    case 'forgot-password':
      viewport.innerHTML = getForgotPasswordHTML();
      setupForgotForm();
      break;
    case 'reset-password':
      viewport.innerHTML = getResetPasswordHTML();
      setupResetForm();
      break;
    case 'verify-email':
      viewport.innerHTML = getVerifyEmailHTML();
      setupVerifyForm();
      break;
    case 'two-factor':
      viewport.innerHTML = getTwoFactorHTML();
      setup2FAForm();
      break;
  }
}

// User Dashboard renderer
function renderUserDashboard(tab) {
  showLayout('user');
  state.activeDashboardTab = tab;
  const viewport = document.getElementById('user-dashboard-viewport');
  if (!viewport) return;

  // Highlight active sidebar tab
  const tabs = document.querySelectorAll('.user-sidebar-tab');
  tabs.forEach(t => {
    if (t.getAttribute('href') === `#dashboard-${tab}` || (tab === 'dashboard' && t.getAttribute('href') === '#dashboard')) {
      t.classList.add('bg-[rgba(0,240,255,0.08)]', 'text-[var(--neon-cyan)]', 'border-l-2', 'border-[var(--neon-cyan)]');
    } else {
      t.classList.remove('bg-[rgba(0,240,255,0.08)]', 'text-[var(--neon-cyan)]', 'border-l-2', 'border-[var(--neon-cyan)]');
    }
  });

  // Render sub sections
  switch (tab) {
    case 'dashboard':
      viewport.innerHTML = getUserDashboardHTML();
      comps.renderRadialScore('dashboard-score-radial', data.userDashboardData.securityScore);
      comps.renderTimelineChart('dashboard-timeline-chart', [
        { label: "00:00", val: 2 },
        { label: "04:00", val: 5 },
        { label: "08:00", val: 3 },
        { label: "12:00", val: 8 },
        { label: "16:00", val: 12 },
        { label: "20:00", val: 4 }
      ]);
      comps.initDragAndDrop('dashboard-widgets-grid');
      break;
    case 'threats':
    case 'map':
      viewport.innerHTML = getThreatMapHTML();
      window.activeMapCleanup = comps.initAttackMap('attack-map-canvas', 'attack-map-logs');
      break;
    case 'scanner':
      renderScannerTab(viewport);
      break;
    case 'compliance':
      viewport.innerHTML = getDashboardComplianceHTML();
      break;
    case 'integrations':
      renderDashboardIntegrations(viewport);
      break;
    case 'billing':
      viewport.innerHTML = getDashboardBillingHTML();
      setupBillingForm();
      break;
    case 'settings':
      viewport.innerHTML = getDashboardSettingsHTML();
      setupSettingsForm();
      break;
    default:
      viewport.innerHTML = getFallbackDashboardTabHTML(tab);
      break;
  }
}

// Admin Dashboard renderer
function renderAdminDashboard(tab) {
  showLayout('admin');
  state.activeAdminTab = tab;
  const viewport = document.getElementById('admin-dashboard-viewport');
  if (!viewport) return;

  // Highlight active sidebar tab
  const tabs = document.querySelectorAll('.admin-sidebar-tab');
  tabs.forEach(t => {
    if (t.getAttribute('href') === `#admin-${tab}` || (tab === 'dashboard' && t.getAttribute('href') === '#admin')) {
      t.classList.add('bg-[rgba(171,32,253,0.08)]', 'text-[var(--neon-purple)]', 'border-l-2', 'border-[var(--neon-purple)]');
    } else {
      t.classList.remove('bg-[rgba(171,32,253,0.08)]', 'text-[var(--neon-purple)]', 'border-l-2', 'border-[var(--neon-purple)]');
    }
  });

  switch (tab) {
    case 'dashboard':
      viewport.innerHTML = getAdminDashboardHTML();
      comps.renderTimelineChart('admin-timeline-chart', [
        { label: "Jan", val: 12 },
        { label: "Feb", val: 24 },
        { label: "Mar", val: 18 },
        { label: "Apr", val: 32 },
        { label: "May", val: 45 },
        { label: "Jun", val: 58 }
      ]);
      break;
    case 'customers':
      viewport.innerHTML = getAdminCustomersHTML();
      break;
    case 'roles':
      viewport.innerHTML = getAdminRolesHTML();
      setupRolesMatrix();
      break;
    case 'incidents':
      viewport.innerHTML = getAdminIncidentsHTML();
      setupIncidentActions();
      break;
    case 'audit':
      viewport.innerHTML = getAdminAuditLogsHTML();
      break;
    case 'cms':
      viewport.innerHTML = getAdminCMSHTML();
      setupCMSForm();
      break;
    case 'tickets':
      renderAdminInquiries(viewport);
      break;
    case 'pricing-inquiries':
      renderAdminPricingInquiries(viewport);
      break;
    default:
      viewport.innerHTML = getFallbackAdminTabHTML(tab);
      break;
  }
}

// HTML Templates for Public website
function getHomeHTML() {
  return `
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center justify-between px-6 lg:px-20 overflow-hidden py-16">
      <div class="cyber-grid"></div>
      <div class="z-10 max-w-2xl">
        <div class="cyber-badge cyber-badge-cyan mb-4 animate-pulse-glow">AI Cloud Protection Active</div>
        <h1 class="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Autonomously Shield <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-cyan)] to-[var(--neon-purple)]">
            Your Multi-Cloud.
          </span>
        </h1>
        <p class="text-slate-400 text-lg mb-8 leading-relaxed">
          Cloudo is a billion-dollar tier security intelligence platform built with agentless scanning, zero-latency firewalls, and predictive threat analytics. Keep auditors satisfied and threats isolated.
        </p>
        <div class="flex flex-wrap gap-4">
          <a href="#login" class="glow-btn glow-btn-primary">Start Free Trial</a>
          <a href="#contact" class="glow-btn glow-btn-secondary">Book a Live Demo</a>
        </div>
        
        <!-- Live statistics widget in Hero -->
        <div class="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[rgba(255,255,255,0.08)]">
          <div>
            <div class="text-2xl font-bold text-slate-100 font-cyber">99.9%</div>
            <div class="text-xs text-slate-500 font-cyber">ZERO-DAY SCAN RATE</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-slate-100 font-cyber">&lt;12ms</div>
            <div class="text-xs text-slate-500 font-cyber">THREAT ISOLATION</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-slate-100 font-cyber">820k+</div>
            <div class="text-xs text-slate-500 font-cyber">PROTECTED CLOUD NODES</div>
          </div>
        </div>
      </div>

      <!-- Interactive 3D Canvas Globe inside Hero -->
      <div class="relative w-full lg:w-[500px] h-[500px] hidden lg:block">
        <canvas id="hero-globe-canvas" class="w-full h-full"></canvas>
        <div class="absolute top-10 right-10 glass glass-glow-cyan p-4 max-w-[200px]" id="hero-score-radial"></div>
      </div>
    </section>

    <!-- Trusted By -->
    <section class="py-12 border-y border-[rgba(255,255,255,0.05)] bg-[rgba(8,12,30,0.3)]">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <div class="text-xs text-slate-500 font-cyber uppercase tracking-widest mb-6">TRUSTED BY CYBER LEADERS AND GLOBAL COMPLIANCE CORPORATIONS</div>
        <div class="flex flex-wrap justify-center items-center gap-12 opacity-50">
          <span class="text-xl font-bold font-cyber text-slate-300">TECHCORP GLOBAL</span>
          <span class="text-xl font-bold font-cyber text-slate-300">FINBANK 7</span>
          <span class="text-xl font-bold font-cyber text-slate-300">HEALTHSPHERE</span>
          <span class="text-xl font-bold font-cyber text-slate-300">ZETA INTL</span>
          <span class="text-xl font-bold font-cyber text-slate-300">GLOBALINK</span>
        </div>
      </div>
    </section>

    <!-- Platform Preview and AI Shield -->
    <section class="py-24 max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold mb-4 font-cyber">An AI Shield Built for Modern Clouds</h2>
        <p class="text-slate-400 max-w-2xl mx-auto">
          Unlike legacy agents, Cloudo side-scans snapshot volumes continuously without taking system overhead.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Shield Graphic -->
        <div class="glass glass-glow-cyan p-8 text-center relative overflow-hidden animate-drift">
          <div class="w-24 h-24 rounded-full bg-[rgba(0,240,255,0.1)] border border-[var(--neon-cyan)] flex items-center justify-center mx-auto mb-6">
            <svg class="w-12 h-12 text-[var(--neon-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold mb-4 font-cyber">Continuous API Drift Protection</h3>
          <p class="text-slate-400 text-sm mb-6 leading-relaxed">
            Our models evaluate drift configurations every 60 seconds. Any manual changes in security groups are isolated immediately.
          </p>
          <div class="cyber-badge cyber-badge-green font-mono">AUTOMATED ENFORCEMENT ON</div>
        </div>

        <!-- Live Dashboard Snippet -->
        <div class="glass glass-glow-purple p-6">
          <div class="flex justify-between items-center mb-6 pb-4 border-b border-[rgba(255,255,255,0.05)]">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-500 inline-block animate-ping"></span>
              <span class="text-xs font-cyber text-slate-300 font-bold">LIVE TELEMETRY STREAM</span>
            </div>
            <a href="#login" class="text-xs text-[var(--neon-cyan)] hover:underline font-cyber">OPEN PORTAL &rarr;</a>
          </div>
          <div class="font-mono text-xs text-slate-400 space-y-3">
            <p class="text-emerald-400">[08:24:11] Connected read-only credentials to AWS account ... [OK]</p>
            <p class="text-emerald-400">[08:24:15] Completed snapshot image layer check ... No issues</p>
            <p class="text-amber-400">[08:24:22] Warning: GCP-Port-8080 exposed to public route table</p>
            <p class="text-red-500 font-semibold">[08:24:30] Alert: Suspicious system call in GKE Pod #4 [Auto-quarantined]</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Cloudo Accordion teaser -->
    <section class="py-20 border-t border-[rgba(255,255,255,0.05)] bg-[rgba(5,8,22,0.6)]">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="text-3xl font-cyber font-bold mb-12 text-center">Unmatched Cloud Security Standards</h2>
        <div class="space-y-4">
          <div class="glass p-6">
            <h4 class="text-lg font-cyber font-semibold text-slate-200 mb-2">99% Less Time Spent Fixing False Alarms</h4>
            <p class="text-slate-400 text-sm">Cloudo doesn't dump thousands of alerts. We prioritize vulnerabilities by actual network path exposure, showing you the exact 5 items that pose real risk.</p>
          </div>
          <div class="glass p-6">
            <h4 class="text-lg font-cyber font-semibold text-slate-200 mb-2">Multi-Cloud Unified Panel</h4>
            <p class="text-slate-400 text-sm">Connect AWS, Azure, Google Cloud, Docker, and Kubernetes clusters in minutes. Scan them all agentlessly through one interface.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Banner CTA -->
    <section class="py-24 max-w-5xl mx-auto px-6 text-center">
      <div class="glass glass-glow-cyan p-12 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-radial-gradient(from 10% 20%, rgba(0,240,255,0.1), transparent) pointer-events-none"></div>
        <h2 class="text-4xl font-cyber font-bold mb-4">Secure Your Infrastructure in 10 Minutes</h2>
        <p class="text-slate-400 max-w-xl mx-auto mb-8 text-sm">
          Join leading technology enterprises using Cloudo to automate compliance reporting and stop breaches.
        </p>
        <div class="flex justify-center gap-4">
          <a href="#login" class="glow-btn glow-btn-primary">Start Free Trial</a>
          <a href="#contact" class="glow-btn glow-btn-secondary">Request Architecture Review</a>
        </div>
      </div>
    </section>
  `;
}

function getPlatformHTML() {
  return `
    <section class="relative py-24 px-6 max-w-7xl mx-auto">
      <div class="cyber-grid"></div>
      <div class="text-center mb-16 relative z-10">
        <div class="cyber-badge cyber-badge-cyan mb-4">Platform Overview</div>
        <h1 class="text-5xl font-cyber font-bold mb-6">The AI Cloud Defense Core</h1>
        <p class="text-slate-400 max-w-2xl mx-auto">
          Cloudo merges continuous configuration audit, agentless vulnerability checking, Kubernetes compliance, and runtime defense parameters into one intelligence engine.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        <div class="glass glass-glow-cyan p-8">
          <div class="text-[var(--neon-cyan)] mb-4">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-xl font-cyber font-bold mb-3 text-slate-100">Zero-Trust Network Mesh</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            Continuous validation of all dynamic API access logs, mapping trust matrices, and micro-segmenting resources dynamically.
          </p>
        </div>

        <div class="glass glass-glow-purple p-8">
          <div class="text-[var(--neon-purple)] mb-4">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 class="text-xl font-cyber font-bold mb-3 text-slate-100">Predictive Attack Path Analyzer</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            Our AI simulates prospective hacker movements based on your configurations, prioritizing vulnerabilities that actually lead to database assets.
          </p>
        </div>

        <div class="glass glass-glow-cyan p-8">
          <div class="text-[var(--neon-blue)] mb-4">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h4M5 5h14a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
            </svg>
          </div>
          <h3 class="text-xl font-cyber font-bold mb-3 text-slate-100">Auditor-Ready Compliance</h3>
          <p class="text-slate-400 text-sm leading-relaxed">
            Continuously collects configuration logs, mapping them automatically to SOC 2, HIPAA, GDPR, ISO 27001, and NIST frameworks.
          </p>
        </div>
      </div>

      <div class="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-cyber font-bold mb-6 text-slate-100">Real-Time Threat Intelligence</h2>
          <p class="text-slate-400 text-sm leading-relaxed mb-6">
            We sync telemetry feeds hourly with cyber response groups, national threat repositories, and proprietary security research databases. Ensure protection against active CVE exploitation attempts instantly.
          </p>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-[var(--neon-cyan)]"></span>
              <span class="text-xs font-cyber text-slate-300">Continuous telemetry matching</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="w-2 h-2 rounded-full bg-[var(--neon-purple)]"></span>
              <span class="text-xs font-cyber text-slate-300">Dynamic network signature validation</span>
            </div>
          </div>
        </div>
        <div class="h-[400px]">
          <canvas id="platform-globe-canvas" class="w-full h-full"></canvas>
        </div>
      </div>
    </section>
  `;
}

function renderFeaturesPage() {
  const viewport = document.getElementById('public-viewport');
  if (!viewport) return;

  const features = data.featuresData;
  const activeFeature = features[state.selectedFeatureId] || features['ai-threat-detection'];

  const navItems = Object.keys(features).map(key => `
    <button onclick="window.selectFeature('${key}')" class="w-full text-left p-4 rounded-lg font-cyber text-xs transition-smooth ${state.selectedFeatureId === key ? 'bg-[rgba(0,240,255,0.08)] text-[var(--neon-cyan)] border-l-2 border-[var(--neon-cyan)]' : 'text-slate-400 hover:bg-slate-800'}">
      ${features[key].title}
    </button>
  `).join('');

  const detailPoints = activeFeature.details.map(d => `
    <li class="flex items-start gap-3 text-sm text-slate-300">
      <span class="text-[var(--neon-cyan)] mt-1">&#10003;</span>
      <span>${d}</span>
    </li>
  `).join('');

  viewport.innerHTML = `
    <section class="py-24 px-6 max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Security Modules</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Premium Cloud Features</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Deep-dive into our modular cyber capabilities built to protect containers, host servers, and APIs.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <div class="space-y-2 lg:col-span-1">
          ${navItems}
        </div>

        <!-- Details Panel -->
        <div class="lg:col-span-3 glass glass-glow-cyan p-8">
          <div class="flex justify-between items-center mb-6">
            <span class="cyber-badge cyber-badge-purple">${activeFeature.tagline}</span>
            <a href="#login" class="glow-btn glow-btn-primary">Test Feature</a>
          </div>
          <h2 class="text-3xl font-cyber font-bold mb-4 text-slate-100">${activeFeature.title}</h2>
          <p class="text-slate-400 mb-8 leading-relaxed text-sm">
            ${activeFeature.description}
          </p>
          <div class="border-t border-[rgba(255,255,255,0.08)] pt-6">
            <h4 class="text-xs font-cyber text-slate-400 uppercase tracking-widest mb-4">Key Capabilities Included</h4>
            <ul class="space-y-3">
              ${detailPoints}
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}

window.selectFeature = (id) => {
  state.selectedFeatureId = id;
  renderFeaturesPage();
};

function renderSolutionsPage() {
  const viewport = document.getElementById('public-viewport');
  if (!viewport) return;

  const solutions = data.solutionsData;
  const activeSol = solutions[state.selectedSolutionId] || solutions['enterprise'];

  const navItems = Object.keys(solutions).map(key => `
    <button onclick="window.selectSolution('${key}')" class="px-6 py-2 rounded-full font-cyber text-xs transition-smooth ${state.selectedSolutionId === key ? 'bg-[var(--neon-cyan)] text-[var(--bg-color)]' : 'border border-[rgba(255,255,255,0.1)] text-slate-400 hover:bg-slate-800'}">
      ${solutions[key].title}
    </button>
  `).join('');

  viewport.innerHTML = `
    <section class="py-24 px-6 max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Solutions Matrix</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Customized Architecture Frameworks</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Deploy configurations optimized for your company's growth state and regulatory constraints.
        </p>
        <div class="flex flex-wrap justify-center gap-3 mt-8">
          ${navItems}
        </div>
      </div>

      <div class="glass glass-glow-cyan p-8">
        <h2 class="text-2xl font-cyber font-bold mb-8 text-slate-100 border-b border-[rgba(255,255,255,0.05)] pb-4">${activeSol.title}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 class="text-xs font-cyber text-[var(--neon-red)] uppercase tracking-widest mb-2 font-semibold">The Challenge</h4>
            <p class="text-slate-400 text-sm leading-relaxed">${activeSol.challenge}</p>
          </div>
          <div>
            <h4 class="text-xs font-cyber text-[var(--neon-green)] uppercase tracking-widest mb-2 font-semibold">Cloudo Solution</h4>
            <p class="text-slate-400 text-sm leading-relaxed">${activeSol.solution}</p>
          </div>
        </div>
        <div>
          <h4 class="text-xs font-cyber text-slate-400 uppercase tracking-widest mb-4">Expected Benefits</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${activeSol.benefits.map(b => `
              <div class="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
                <span class="text-[var(--neon-cyan)]">&bull;</span>
                <span class="text-xs text-slate-300 font-semibold">${b}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

window.selectSolution = (id) => {
  state.selectedSolutionId = id;
  renderSolutionsPage();
};

function getServicesHTML() {
  return `
    <section class="py-24 px-6 max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Professional Services</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Cybersecurity Engineering & Advisory</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Partner with our elite security team for architecture design, penetration testing, compliance scaffolding, and rapid breach incident response.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${data.servicesData.map(s => `
          <div class="glass glass-glow-cyan p-6">
            <h3 class="text-lg font-cyber font-bold mb-3 text-slate-100">${s.title}</h3>
            <p class="text-slate-400 text-xs leading-relaxed mb-6">${s.desc}</p>
            <a href="#contact" class="text-xs text-[var(--neon-cyan)] font-cyber hover:underline">Request Engagement &rarr;</a>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function getIndustriesHTML() {
  return `
    <section class="py-24 px-6 max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Compliance Scopes</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Built for Highly Regulated Sectors</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Deploy AI-driven protection frameworks tailored specifically to your regulatory environment.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${data.industriesData.map(ind => `
          <div class="glass glass-glow-purple p-8">
            <h3 class="text-xl font-cyber font-bold mb-3 text-slate-100 flex items-center gap-3">
              <span>${ind.title}</span>
            </h3>
            <p class="text-slate-400 text-xs leading-relaxed mb-6">${ind.desc}</p>
            <div class="cyber-badge cyber-badge-cyan font-mono text-[10px]">HIPAA / GDPR / PCI Scope</div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderIntegrationsPage() {
  const viewport = document.getElementById('public-viewport');
  if (!viewport) return;

  const query = state.searchQuery;
  const filtered = data.integrationsData.filter(i => 
    i.name.toLowerCase().includes(query) || 
    i.type.toLowerCase().includes(query)
  );

  viewport.innerHTML = `
    <section class="py-24 px-6 max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Cloud Ecosystem</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Unified Integration Hub</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Connect your existing engineering stacks in a single-click authorization flow.
        </p>
        <div class="max-w-md mx-auto mt-8">
          <input type="text" oninput="window.handleSearch(event)" value="${query}" placeholder="Search integrations (AWS, Kubernetes, Slack...)" class="cyber-input" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${filtered.map(item => `
          <div class="glass glass-glow-cyan p-6 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-start mb-4">
                <span class="text-lg font-cyber font-bold text-slate-100">${item.name}</span>
                <span class="cyber-badge cyber-badge-purple text-[10px]">${item.type}</span>
              </div>
              <p class="text-slate-400 text-xs leading-relaxed mb-6">${item.desc}</p>
            </div>
            <a href="#login" class="glow-btn glow-btn-secondary text-center text-xs">Configure Integration</a>
          </div>
        `).join('')}
        ${filtered.length === 0 ? `<div class="col-span-full text-center text-slate-500 py-12">No integrations match your search.</div>` : ''}
      </div>
    </section>
  `;
}

function getComplianceHTML() {
  return `
    <section class="py-24 px-6 max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Security Standards</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Audit Readiness & Governance</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Cloudo maps cloud configuration telemetry to international governance framework controls automatically.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        ${data.complianceData.map(c => `
          <div class="glass glass-glow-cyan p-6">
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-cyber font-bold text-slate-100">${c.name}</span>
              <span class="cyber-badge cyber-badge-green">${c.status}</span>
            </div>
            <div class="flex justify-between items-center text-xs text-slate-400 mb-2 font-cyber">
              <span>Auditor Controls Scored</span>
              <span class="text-slate-200 font-semibold">${c.checks}</span>
            </div>
            <div class="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
              <div class="bg-[var(--neon-green)] h-full" style="width: ${c.score}%"></div>
            </div>
            <div class="text-right text-[10px] text-[var(--neon-green)] mt-1 font-semibold">${c.score}% READY</div>
          </div>
        `).join('')}
      </div>

      <!-- Trust report CTA -->
      <div class="glass glass-glow-purple p-8 text-center">
        <h3 class="text-2xl font-cyber font-bold mb-3 text-slate-100">Need to export compliance audits?</h3>
        <p class="text-slate-400 text-xs mb-6 max-w-lg mx-auto">
          Generate structured, auditor-approved PDF packets demonstrating SOC 2, HIPAA, and ISO configuration controls instantly.
        </p>
        <a href="#login" class="glow-btn glow-btn-primary">Generate Auditor Packets</a>
      </div>
    </section>
  `;
}

function getPricingHTML() {
  const cards = data.pricingData.map(p => `
    <div class="glass p-8 flex flex-col justify-between relative ${p.popular ? 'border-2 border-[var(--neon-cyan)] shadow-lg shadow-[rgba(0,240,255,0.05)]' : 'border border-[rgba(255,255,255,0.08)]'}">
      ${p.popular ? '<div class="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--neon-cyan)] text-[var(--bg-color)] px-4 py-1 rounded-full text-[10px] font-bold font-cyber uppercase tracking-wider">Most Popular</div>' : ''}
      <div>
        <h3 class="text-2xl font-cyber font-bold text-slate-100 mb-2">${p.name}</h3>
        <p class="text-slate-400 text-xs mb-6 leading-relaxed">${p.desc}</p>
        <div class="mb-6">
          <span class="text-4xl font-bold font-cyber text-slate-100">${p.price}</span>
          <span class="text-xs text-slate-400">${p.price === 'Custom' ? '' : '/ ' + p.billing}</span>
        </div>
        <ul class="space-y-3 mb-8 border-t border-[rgba(255,255,255,0.05)] pt-6">
          ${p.features.map(f => `
            <li class="flex items-center gap-2 text-xs text-slate-300">
              <span class="text-[var(--neon-cyan)] font-bold">&check;</span>
              <span>${f}</span>
            </li>
          `).join('')}
        </ul>
      </div>
      <a href="#login" class="glow-btn ${p.popular ? 'glow-btn-primary' : 'glow-btn-secondary'} text-center w-full text-xs">${p.cta}</a>
    </div>
  `).join('');

  return `
    <section class="py-24 px-6 max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Subscription Tiers</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Enterprise-Ready Pricing</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          No hidden fees, no complex usage calculations. Choose the scale that fits your cloud architecture footprints.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        ${cards}
      </div>

      <!-- Comparison Matrix -->
      <h2 class="text-2xl font-cyber font-bold mb-8 text-center text-slate-100">Compare Plans Details</h2>
      <div class="glass p-6 overflow-x-auto">
        <table class="w-full text-left text-xs min-w-[600px]">
          <thead>
            <tr class="border-b border-[rgba(255,255,255,0.08)] pb-4 text-slate-300 font-cyber font-bold text-sm">
              <th class="pb-4">Features Matrix</th>
              <th class="pb-4">Starter</th>
              <th class="pb-4 text-[var(--neon-cyan)]">Professional</th>
              <th class="pb-4">Enterprise</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[rgba(255,255,255,0.03)] text-slate-400">
            ${data.pricingComparison.categories.map(cat => `
              <tr class="bg-slate-900/30">
                <td colspan="4" class="py-3 font-cyber font-bold text-slate-200 text-xs tracking-wider uppercase">${cat.name}</td>
              </tr>
              ${cat.rows.map(row => `
                <tr>
                  <td class="py-3 font-semibold text-slate-300">${row[0]}</td>
                  <td class="py-3">${row[1]}</td>
                  <td class="py-3 text-[var(--neon-cyan)]">${row[2]}</td>
                  <td class="py-3">${row[3]}</td>
                </tr>
              `).join('')}
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Request a Quote Section -->
      <div class="mt-24 max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <div class="cyber-badge cyber-badge-cyan mb-4">Sales Gateway</div>
          <h2 class="text-3xl font-cyber font-bold text-slate-100">Request a Quote / Contact Sales</h2>
          <p class="text-slate-400 text-xs mt-2">Custom pricing models tailored for high-volume enterprise clouds</p>
        </div>

        <div class="glass glass-glow-cyan p-8" id="quote-form-container">
          <form id="quote-form" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Full Name -->
              <div>
                <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">FULL NAME *</label>
                <input type="text" id="quote-name" required class="cyber-input text-sm" placeholder="Your Name" />
              </div>
              <!-- Company Name -->
              <div>
                <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">COMPANY NAME</label>
                <input type="text" id="quote-company" class="cyber-input text-sm" placeholder="Your Services" />
              </div>
              <!-- Email Address -->
              <div>
                <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">EMAIL ADDRESS *</label>
                <input type="email" id="quote-email" required class="cyber-input text-sm" placeholder="Your E-mail" />
              </div>
              <!-- Mobile Number and Country Code -->
              <div>
                <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">MOBILE NUMBER *</label>
                <div class="flex gap-2 relative">
                  <!-- Custom Country Dropdown Trigger -->
                  <div class="relative w-36">
                    <button type="button" onclick="window.toggleCountryDropdown(event)" id="country-dropdown-btn" class="cyber-input text-xs flex justify-between items-center h-full gap-1">
                      <span id="selected-country-val">🇮🇳 +91</span>
                      <span class="text-[var(--neon-cyan)]">&#9662;</span>
                    </button>
                    <!-- Floating Dropdown list -->
                    <div id="country-dropdown-list" class="absolute top-full left-0 mt-1 w-56 glass bg-[#050816]/95 border border-[rgba(0,240,255,0.15)] rounded-lg z-50 shadow-2xl p-2 hidden flex-col">
                      <input type="text" id="country-search-input" oninput="window.searchCountries(event)" placeholder="Search country..." class="cyber-input py-1 px-2 text-xs mb-2 bg-slate-950" />
                      <div class="max-h-40 overflow-y-auto space-y-1 pr-1" id="countries-options-container">
                        <!-- Populated dynamically by setupPricingQuoteForm -->
                      </div>
                    </div>
                  </div>
                  <!-- Mobile input -->
                  <input type="text" id="quote-mobile" required class="cyber-input text-sm flex-1" placeholder="Enter Your Number" />
                </div>
              </div>
              <!-- Plan Interested In -->
              <div>
                <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">PLAN / SERVICE OF INTEREST *</label>
                <select id="quote-plan" class="cyber-input text-sm">
                  <option value="Enterprise">Enterprise Tier Plan</option>
                  <option value="Professional">Professional Tier Plan</option>
                  <option value="Starter">Starter Tier Plan</option>
                  <option value="Custom Audit">Custom Infrastructure Audit</option>
                </select>
              </div>
              <!-- Subject -->
              <div>
                <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">SUBJECT *</label>
                <input type="text" id="quote-subject" required class="cyber-input text-sm" placeholder="Enterprise custom quote requirements" />
              </div>
            </div>
            <!-- Requirements Area -->
            <div>
              <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">REQUIREMENTS / DESCRIPTION *</label>
              <textarea id="quote-desc" required rows="4" class="cyber-input text-sm" placeholder="Provide details regarding active cloud assets count, compliance guidelines, or deployment parameters..."></textarea>
            </div>
            <!-- Error message container -->
            <div id="quote-form-error" class="text-xs text-[var(--neon-red)] hidden font-cyber mb-4"></div>
            <!-- Submit -->
            <button type="submit" class="glow-btn glow-btn-primary w-full text-xs font-semibold">Submit Quote Request</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

function renderResourcesPage() {
  const viewport = document.getElementById('public-viewport');
  if (!viewport) return;

  const query = state.searchQuery;
  const filteredBlogs = data.blogData.filter(b => 
    b.title.toLowerCase().includes(query) || 
    b.excerpt.toLowerCase().includes(query)
  );

  viewport.innerHTML = `
    <section class="py-24 px-6 max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Cyber Resources</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Security Insights & Technical Documentation</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Read technical breakdowns from our incident responders and security research groups.
        </p>
        <div class="max-w-md mx-auto mt-8">
          <input type="text" oninput="window.handleSearch(event)" value="${query}" placeholder="Search resources..." class="cyber-input" />
        </div>
      </div>

      <!-- Blogs Grid -->
      <h2 class="text-2xl font-cyber font-bold mb-8 text-slate-100">Latest Security Briefs</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        ${filteredBlogs.map(b => `
          <div class="glass glass-glow-cyan p-6 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center text-[10px] text-slate-500 mb-4 font-cyber">
                <span>${b.date}</span>
                <span class="text-[var(--neon-cyan)]">${b.author}</span>
              </div>
              <h3 class="text-lg font-cyber font-bold mb-3 text-slate-200">${b.title}</h3>
              <p class="text-slate-400 text-xs leading-relaxed mb-6">${b.excerpt}</p>
            </div>
            <a href="#login" class="text-xs text-[var(--neon-cyan)] hover:underline font-cyber">Read Article &rarr;</a>
          </div>
        `).join('')}
        ${filteredBlogs.length === 0 ? `<div class="col-span-full text-center text-slate-500 py-6">No articles matched your search.</div>` : ''}
      </div>

      <!-- Whitepapers and Docs -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 class="text-2xl font-cyber font-bold mb-6 text-slate-100">Auditor Whitepapers</h2>
          <div class="space-y-4">
            <div class="glass p-4 flex justify-between items-center">
              <div>
                <h4 class="text-sm font-cyber font-bold text-slate-200">Continuous Security Drift (PDF)</h4>
                <p class="text-[10px] text-slate-500">TECHNICAL WHITEPAPER &bull; 14 PAGES</p>
              </div>
              <a href="#login" class="glow-btn glow-btn-secondary text-[10px]">Download</a>
            </div>
            <div class="glass p-4 flex justify-between items-center">
              <div>
                <h4 class="text-sm font-cyber font-bold text-slate-200">Zero-Trust Admission Webhook Controls (PDF)</h4>
                <p class="text-[10px] text-slate-500">ARCHITECTURE SCHEMATICS &bull; 8 PAGES</p>
              </div>
              <a href="#login" class="glow-btn glow-btn-secondary text-[10px]">Download</a>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-cyber font-bold mb-6 text-slate-100">Technical Documentation</h2>
          <div class="space-y-4">
            ${data.docData.map(doc => `
              <div class="glass p-4">
                <span class="cyber-badge cyber-badge-purple text-[8px] mb-2">${doc.category}</span>
                <h4 class="text-sm font-cyber font-bold text-slate-200 mb-1">${doc.title}</h4>
                <p class="text-xs text-slate-400 mb-3">${doc.desc}</p>
                <a href="#login" class="text-[10px] text-[var(--neon-cyan)] font-cyber hover:underline">View Docs &rarr;</a>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>
  `;
}

function getCustomersHTML() {
  return `
    <section class="py-24 px-6 max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Success Stories</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Enterprise Validation</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Discover how international institutions rely on Cloudo to monitor compliance and block incidents.
        </p>
      </div>

      <div class="space-y-12">
        ${data.caseStudiesData.map(c => `
          <div class="glass glass-glow-cyan p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div class="lg:col-span-1 border-r border-[rgba(255,255,255,0.05)] pr-6">
              <h3 class="text-2xl font-cyber font-bold text-slate-100 mb-2">${c.client}</h3>
              <p class="text-xs text-slate-500 font-cyber mb-4">INDUSTRY: ${c.industry}</p>
              <div class="text-emerald-400 font-cyber text-xs font-semibold mb-2">${c.roi}</div>
              <div class="text-slate-300 text-xs font-mono">${c.improvement}</div>
            </div>
            <div class="lg:col-span-2 flex flex-col justify-center italic text-slate-300 leading-relaxed text-sm">
              <p class="mb-4">"${c.citation}"</p>
              <span class="text-xs text-[var(--neon-cyan)] not-italic font-cyber font-bold uppercase">&mdash; Global security officer testimony</span>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function getOverviewHTML() {
  return `
    <section class="py-24 px-6 max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Enterprise Overview</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Business & Architecture Summary</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Cloudo provides autonomous, agentless cloud security mapping configurations, vulnerability metrics, and threat vectors into a single-pane-of-glass intelligence platform.
        </p>
      </div>

      <!-- Business Summary & Key Products -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div class="glass glass-glow-cyan p-8">
          <h2 class="text-2xl font-cyber font-bold text-slate-100 mb-4">Corporate Summary</h2>
          <p class="text-slate-400 text-sm leading-relaxed mb-4">
            Founded by elite security engineers, Cloudo addresses the critical vulnerability of modern multi-cloud configurations. By deploying non-intrusive, read-only API connectors, Cloudo side-scans computing instances, databases, and container orchestration perimeters to build real-time posture ratings without server latency.
          </p>
          <div class="cyber-badge cyber-badge-purple font-mono text-[10px]">99.9% Zero-Day Scan Accuracy</div>
        </div>

        <div class="glass glass-glow-purple p-8">
          <h2 class="text-2xl font-cyber font-bold text-slate-100 mb-4">Our Core Products</h2>
          <ul class="space-y-4">
            <li class="flex items-start gap-3">
              <span class="text-[var(--neon-cyan)] mt-1">&#10003;</span>
              <div>
                <h4 class="text-sm font-cyber font-bold text-slate-200">Cloud Defense Core</h4>
                <p class="text-[11px] text-slate-500">Continuous posture management (CSPM) and asset verification loops.</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[var(--neon-cyan)] mt-1">&#10003;</span>
              <div>
                <h4 class="text-sm font-cyber font-bold text-slate-200">AI Threat Intelligence</h4>
                <p class="text-[11px] text-slate-500">Autonomous machine learning anomaly and lateral path drift engines.</p>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[var(--neon-cyan)] mt-1">&#10003;</span>
              <div>
                <h4 class="text-sm font-cyber font-bold text-slate-200">Compliance Vault</h4>
                <p class="text-[11px] text-slate-500">Auto-evidence logs compiler mapping to SOC 2, HIPAA, ISO, and NIST.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Services & Key Features Grid -->
      <h2 class="text-2xl font-cyber font-bold text-center mb-8 text-slate-100">Key Platform Capabilities</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="glass p-6">
          <div class="text-[var(--neon-cyan)] text-lg font-bold font-cyber mb-2">AI Scan</div>
          <p class="text-slate-400 text-xs leading-relaxed">Agentless checks mapping volume vulnerabilities.</p>
        </div>
        <div class="glass p-6">
          <div class="text-[var(--neon-purple)] text-lg font-bold font-cyber mb-2">Zero Trust</div>
          <p class="text-slate-400 text-xs leading-relaxed">Continuous API validation and mesh segmenting.</p>
        </div>
        <div class="glass p-6">
          <div class="text-[var(--neon-cyan)] text-lg font-bold font-cyber mb-2">WAF Shield</div>
          <p class="text-slate-400 text-xs leading-relaxed">Edge network rules blocking malicious transactions.</p>
        </div>
        <div class="glass p-6">
          <div class="text-[var(--neon-purple)] text-lg font-bold font-cyber mb-2">IAM Sprawl</div>
          <p class="text-slate-400 text-xs leading-relaxed">Automated removal of redundant security groups.</p>
        </div>
      </div>
    </section>
  `;
}

function getAboutHTML() {
  return `
    <section class="py-24 px-6 max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Company Overview</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">About Cloudo Cyber Systems</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Cloudo is a global cybersecurity leader dedicated to securing the cloud infrastructure of tomorrow.
        </p>
      </div>

      <!-- Business Summary -->
      <div class="glass p-8 mb-16">
        <h2 class="text-xl font-cyber font-bold text-slate-100 mb-4">Our Business Journey</h2>
        <p class="text-slate-400 text-sm leading-relaxed mb-4">
          Established in 2026, Cloudo Cyber Systems pioneered the transition from heavy agent-based monitoring to continuous, agentless cloud security posture management. We serve high-growth startups, financial institutes, and global tech corporations, shielding their critical workloads on AWS, Microsoft Azure, and Google Cloud Platform.
        </p>
        <p class="text-slate-400 text-sm leading-relaxed">
          Through zero-latency API inspections, deep telemetry intelligence, and an autonomous AI Risk path engine, we help developers and security teams scan, isolate, and remediate cloud infrastructure vulnerabilities in real-time.
        </p>
      </div>

      <!-- Mission & Vision -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div class="glass glass-glow-cyan p-6">
          <h3 class="text-lg font-cyber font-bold mb-3 text-slate-100">Our Mission</h3>
          <p class="text-slate-400 text-xs leading-relaxed">
            To provide continuous, non-intrusive visibility and autonomous threat isolation parameters across all multi-cloud infrastructure workloads, ensuring developers can build fast without compromising compliance or security logs integrity.
          </p>
        </div>
        <div class="glass glass-glow-purple p-6">
          <h3 class="text-lg font-cyber font-bold mb-3 text-slate-100">Our Vision</h3>
          <p class="text-slate-400 text-xs leading-relaxed">
            A world where perimeter vulnerabilities, IAM configuration crawls, and zero-day threat segments are intercepted and quarantined instantly before lateral penetration can occur.
          </p>
        </div>
      </div>

      <!-- Services -->
      <h2 class="text-2xl font-cyber font-bold text-center mb-8 text-slate-100">Our Services & Solutions</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <div class="glass p-5">
          <h4 class="text-sm font-cyber font-bold text-slate-200 mb-2">Cloud Configuration Review</h4>
          <p class="text-slate-400 text-xs">Continuous CIS benchmark audits and automated security group validation.</p>
        </div>
        <div class="glass p-5">
          <h4 class="text-sm font-cyber font-bold text-slate-200 mb-2">Kubernetes & Runtime Security</h4>
          <p class="text-slate-400 text-xs">Admission webhook controls, service mesh network policies, and container drift detection.</p>
        </div>
        <div class="glass p-5">
          <h4 class="text-sm font-cyber font-bold text-slate-200 mb-2">Compliance Scaffolding</h4>
          <p class="text-slate-400 text-xs">One-click auto-evidence collection and reports generation for SOC 2, HIPAA, and GDPR.</p>
        </div>
      </div>

      <!-- Founders Section -->
      <h2 class="text-2xl font-cyber font-bold text-center mb-12 text-slate-100">Meet the Founders</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        ${data.teamMembers.map(member => `
          <div class="glass glass-glow-purple p-6 text-center">
            <img src="${member.img}" alt="${member.name}" class="w-24 h-24 rounded-full mx-auto mb-4 border border-[rgba(0,240,255,0.2)] object-cover shadow-[0_0_12px_rgba(171,32,253,0.3)]" />
            <h4 class="text-lg font-cyber font-bold text-slate-200">${member.name}</h4>
            <p class="text-xs text-[var(--neon-cyan)] font-cyber mb-1">${member.role}</p>
            <p class="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">${member.prev}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderCareersPage() {
  const viewport = document.getElementById('public-viewport');
  if (!viewport) return;

  viewport.innerHTML = `
    <section class="py-24 px-6 max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Careers at Cloudo</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Help Us Shield the Cloud Future</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          We are seeking systems architects, cybersecurity researchers, and machine learning engineers globally.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- Open Positions -->
        <div class="lg:col-span-2 space-y-6">
          <h3 class="text-xl font-cyber font-bold text-slate-100 mb-4">Open Engineering & Sales Roles</h3>
          ${data.openPositions.map((pos, idx) => `
            <div class="glass glass-glow-cyan p-6">
              <div class="flex justify-between items-start mb-2">
                <h4 class="text-lg font-cyber font-bold text-slate-200">${pos.title}</h4>
                <span class="cyber-badge cyber-badge-purple text-[10px]">${pos.location}</span>
              </div>
              <p class="text-xs text-slate-500 font-cyber font-semibold mb-4">TEAM: ${pos.team}</p>
              <p class="text-slate-400 text-xs leading-relaxed mb-6">${pos.desc}</p>
              <button onclick="window.applyJob('${pos.title}')" class="glow-btn glow-btn-secondary text-xs">Apply Now</button>
            </div>
          `).join('')}
        </div>

        <!-- Career Application Form -->
        <div class="lg:col-span-1 glass glass-glow-purple p-6" id="job-apply-container">
          <h3 class="text-lg font-cyber font-bold text-slate-100 mb-4">Submit Application</h3>
          <div class="space-y-4">
            <div>
              <label class="text-[10px] text-slate-500 font-cyber font-bold uppercase block mb-1">Target Position</label>
              <input type="text" id="apply-role" value="Lead AI Threat Engineer" class="cyber-input" />
            </div>
            <div>
              <label class="text-[10px] text-slate-500 font-cyber font-bold uppercase block mb-1">Full Name</label>
              <input type="text" id="apply-name" placeholder="John Doe" class="cyber-input" />
            </div>
            <div>
              <label class="text-[10px] text-slate-500 font-cyber font-bold uppercase block mb-1">Email Address</label>
              <input type="email" id="apply-email" placeholder="john@domain.com" class="cyber-input" />
            </div>
            <div>
              <label class="text-[10px] text-slate-500 font-cyber font-bold uppercase block mb-1">Resume Link (PDF)</label>
              <input type="text" id="apply-resume" placeholder="https://drive.google.com/..." class="cyber-input" />
            </div>
            <button onclick="window.submitJobApplication()" class="glow-btn glow-btn-primary w-full text-xs mt-2">Submit File</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

window.applyJob = (title) => {
  const input = document.getElementById('apply-role');
  if (input) {
    input.value = title;
    input.scrollIntoView({ behavior: 'smooth' });
  }
};

window.submitJobApplication = () => {
  const name = document.getElementById('apply-name').value;
  const email = document.getElementById('apply-email').value;
  if (!name || !email) {
    alert("Please complete the Name and Email fields.");
    return;
  }
  const container = document.getElementById('job-apply-container');
  if (container) {
    container.innerHTML = `
      <div class="text-center py-12 animate-pulse-glow">
        <h4 class="text-xl font-cyber font-bold text-[var(--neon-green)] mb-2">Application Received</h4>
        <p class="text-slate-400 text-xs">Our Talent acquisition team will contact you via email at ${email} shortly.</p>
      </div>`;
  }
};

function getPartnersHTML() {
  return `
    <section class="py-24 px-6 max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Partner Network</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Channel & Integration Partnerships</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Collaborate with Cloudo to bundle cloud protection services for security consulting firms.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div class="space-y-6">
          <h3 class="text-xl font-cyber font-bold text-slate-100 mb-4">Why Partner with Cloudo?</h3>
          <div class="glass p-6">
            <h4 class="text-base font-cyber font-bold text-slate-200 mb-2">Developer Integrations Co-Marketing</h4>
            <p class="text-slate-400 text-xs leading-relaxed">
              Highlight your application in our Integrations marketplace and reach thousands of enterprise security practitioners.
            </p>
          </div>
          <div class="glass p-6">
            <h4 class="text-base font-cyber font-bold text-slate-200 mb-2">Channel Referral Rewards</h4>
            <p class="text-slate-400 text-xs leading-relaxed">
              Earn competitive commissions on security assessments, continuous subscriptions, and incident response retainers.
            </p>
          </div>
        </div>

        <div class="glass glass-glow-purple p-8" id="partner-form-container">
          <h3 class="text-xl font-cyber font-bold text-slate-100 mb-6">Become a Partner</h3>
          <form id="partner-form" class="space-y-4">
            <div>
              <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">COMPANY NAME</label>
              <input type="text" required class="cyber-input" placeholder="Security Advisors LLC" />
            </div>
            <div>
              <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">PARTNER TYPE</label>
              <select class="cyber-input">
                <option>Channel Reseller</option>
                <option>Technology Integrator</option>
                <option>Managed Service Provider</option>
              </select>
            </div>
            <div>
              <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">EMAIL ADDRESS</label>
              <input type="email" required class="cyber-input" placeholder="partner@domain.com" />
            </div>
            <button type="submit" class="glow-btn glow-btn-primary w-full text-xs mt-2">Submit Partner Form</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

function setupPartnerForm() {
  const form = document.getElementById('partner-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const container = document.getElementById('partner-form-container');
      if (container) {
        container.innerHTML = `
          <div class="text-center py-12 animate-pulse-glow">
            <h4 class="text-xl font-cyber font-bold text-[var(--neon-green)] mb-2">Application Received</h4>
            <p class="text-slate-400 text-xs">Our Alliance Director will reach out to schedule an introductory workshop.</p>
          </div>`;
      }
    });
  }
}

function getContactHTML() {
  return `
    <section class="py-24 px-6 max-w-5xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">Contact Gateway</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Connect with Our Team</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Submit queries for custom deployment requests, penetration testing operations, or press inquiries.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div class="glass glass-glow-cyan p-8" id="contact-form-container">
          <h3 class="text-xl font-cyber font-bold text-slate-100 mb-6">Send Message</h3>
          <form id="contact-form" class="space-y-4">
            <div>
              <label class="text-[10px] text-slate-500 font-cyber block mb-1">NAME</label>
              <input type="text" id="contact-name" required class="cyber-input" placeholder="Sarah Miller" />
            </div>
            <div>
              <label class="text-[10px] text-slate-500 font-cyber block mb-1">EMAIL ADDRESS</label>
              <input type="email" id="contact-email" required class="cyber-input" placeholder="sarah@corp.com" />
            </div>
            <div>
              <label class="text-[10px] text-slate-500 font-cyber block mb-1">PHONE NUMBER</label>
              <input type="tel" id="contact-phone" required class="cyber-input" placeholder="+91 XXXXX XXXXX" />
            </div>
            <div>
              <label class="text-[10px] text-slate-500 font-cyber block mb-1">COMPANY</label>
              <input type="text" id="contact-company" required class="cyber-input" placeholder="TechCorp Global" />
            </div>
            <div>
              <label class="text-[10px] text-slate-500 font-cyber block mb-1">SUBJECT</label>
              <input type="text" id="contact-subject" required class="cyber-input" placeholder="Enterprise Security Auditing" />
            </div>
            <div>
              <label class="text-[10px] text-slate-500 font-cyber block mb-1">MESSAGE</label>
              <textarea id="contact-message" required rows="4" class="cyber-input" placeholder="Explain your multi-cloud security assessment constraints..."></textarea>
            </div>
            <button type="submit" class="glow-btn glow-btn-primary w-full text-xs mt-2">Send Message</button>
          </form>
        </div>

        <div class="space-y-6">
          <div class="glass p-6">
            <h4 class="text-xs font-cyber text-slate-400 uppercase tracking-widest mb-4">Global Headquarters</h4>
            <p class="text-sm text-slate-200">Thane</p>
            <p class="text-xs text-slate-400">Mahrashtra Thane 400612</p>
          </div>
          <div class="glass p-6">
            <h4 class="text-xs font-cyber text-slate-400 uppercase tracking-widest mb-4">Technical Communications</h4>
            <p class="text-sm text-[var(--neon-cyan)] font-cyber">cloudoservice@gmail.com</p>
            <p class="text-xs text-slate-400 mt-2 font-mono">
              +91 7400378861<br/>
              +91 8433790641
            </p>
            <p class="text-xs text-slate-500 mt-2">Uptime: 24/7/365</p>
          </div>
          
          <!-- Mock Google Map visualizer -->
          <div class="glass p-4 h-48 bg-slate-900 flex items-center justify-center relative overflow-hidden">
            <div class="absolute inset-0 bg-cover opacity-20" style="background-image: url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80');"></div>
            <span class="text-xs text-slate-400 font-cyber z-10 font-bold tracking-widest">[SATELLITE COORDINATES MATCHED]</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

function setupContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const phone = document.getElementById('contact-phone').value;
      const company = document.getElementById('contact-company').value;
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value;

      // Save inquiry to global state
      state.inquiries.push({
        id: state.inquiries.length + 1,
        name,
        email,
        phone,
        company,
        subject,
        message,
        time: "Just now"
      });

      alert(`Inquiry successfully sent to cloudoservice@gmail.com!\nThank you, ${name}. Your message has been saved in the system.`);

      const container = document.getElementById('contact-form-container');
      if (container) {
        container.innerHTML = `
          <div class="text-center py-12 animate-pulse-glow">
            <h4 class="text-xl font-cyber font-bold text-[var(--neon-green)] mb-2">Message Dispatched</h4>
            <p class="text-slate-400 text-xs">Inquiry sent to <strong>cloudoservice@gmail.com</strong>. Our Incident response engineer or sales lead will contact you shortly.</p>
          </div>`;
      }
    });
  }
}

function renderFAQPage() {
  const viewport = document.getElementById('public-viewport');
  if (!viewport) return;

  const query = state.searchQuery;
  
  const categories = data.faqData.map(cat => {
    const matchedItems = cat.items.filter(item => 
      item.q.toLowerCase().includes(query) || 
      item.a.toLowerCase().includes(query)
    );
    if (matchedItems.length === 0) return '';

    return `
      <div class="mb-12">
        <h3 class="text-xl font-cyber font-bold text-slate-200 border-b border-[rgba(255,255,255,0.05)] pb-3 mb-6">${cat.category}</h3>
        <div class="space-y-4">
          ${matchedItems.map((item, idx) => `
            <div class="glass accordion-item" id="faq-item-${cat.category}-${idx}">
              <div onclick="window.toggleFAQ('faq-item-${cat.category}-${idx}')" class="accordion-header">
                <span class="text-sm font-cyber font-semibold text-slate-200">${item.q}</span>
                <span class="text-[var(--neon-cyan)]">&plus;</span>
              </div>
              <div class="accordion-content">
                <p class="text-xs text-slate-400 leading-relaxed">${item.a}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  viewport.innerHTML = `
    <section class="py-24 px-6 max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-cyan mb-4">FAQ Gateway</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Frequently Answered Parameters</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Resolve core queries regarding configurations connections, credentials access, and billing metrics.
        </p>
        <div class="max-w-md mx-auto mt-8">
          <input type="text" oninput="window.handleSearch(event)" value="${query}" placeholder="Search FAQ..." class="cyber-input" />
        </div>
      </div>

      <div>
        ${categories || '<div class="text-center text-slate-500 py-12">No answers match your search query.</div>'}
      </div>
    </section>
  `;
}

window.toggleFAQ = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle('active');
    const symbol = el.querySelector('.accordion-header span:last-child');
    if (symbol) {
      symbol.innerHTML = el.classList.contains('active') ? '&minus;' : '&plus;';
    }
  }
};

function getStatusHTML() {
  return `
    <section class="py-24 px-6 max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <div class="cyber-badge cyber-badge-green mb-4">${data.statusData.overall}</div>
        <h1 class="text-4xl font-cyber font-bold mb-4">Live Service Status</h1>
        <p class="text-slate-400 max-w-xl mx-auto text-sm">
          Check live latency, operational indexes, and historical system incident profiles.
        </p>
      </div>

      <div class="glass p-6 mb-12">
        <h3 class="text-lg font-cyber font-bold text-slate-100 mb-6">Core Pipeline Operations</h3>
        <div class="space-y-6">
          ${data.statusData.services.map(s => `
            <div class="flex justify-between items-center text-xs">
              <div>
                <div class="font-cyber font-semibold text-slate-200">${s.name}</div>
                <div class="text-slate-500 mt-1">LATENCY: ${s.responseTime}</div>
              </div>
              <span class="cyber-badge cyber-badge-green">${s.status}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <h3 class="text-2xl font-cyber font-bold text-slate-100 mb-6">Historical Incidents Logs</h3>
      <div class="space-y-4">
        ${data.statusData.incidents.map(inc => `
          <div class="glass p-6">
            <div class="flex justify-between items-start mb-2">
              <h4 class="text-sm font-cyber font-bold text-slate-200">${inc.title}</h4>
              <span class="text-[10px] text-slate-500 font-cyber">${inc.date}</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed mb-3">${inc.details}</p>
            <span class="cyber-badge cyber-badge-cyan text-[8px] font-semibold">${inc.status}</span>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// Authentication Forms templates & handling
function getLoginHTML() {
  return `
    <h2 class="text-3xl font-cyber font-bold text-slate-100 mb-2 text-center">
      Identity Lock Portal
    </h2>

    <p class="text-slate-400 text-xs text-center mb-8">
      Access your Cloudo Cyber Core controls
    </p>

    <form id="login-form" class="space-y-4">

      <div>
        <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">
          EMAIL ADDRESS
        </label>

        <input
          type="email"
          id="login-email"
          required
          class="cyber-input"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">
          PASSWORD
        </label>

        <input
          type="password"
          id="login-pass"
          required
          class="cyber-input"
          placeholder="Enter your password"
        />
      </div>

      <div class="text-right">
        <a href="#forgot-password"
           class="text-[10px] text-[var(--neon-cyan)] hover:underline font-cyber">
          Forgot Password?
        </a>
      </div>

      <button
        type="submit"
        class="glow-btn glow-btn-primary w-full text-xs mt-4">
        Verify Identity
      </button>

    </form>

    <div class="mt-6 text-center text-xs text-slate-500">
      No credential packet?
      <a href="#register"
         class="text-[var(--neon-cyan)] hover:underline">
        Register System Node
      </a>
    </div>
  `;
}

function setupLoginForm() {
  const form = document.getElementById("login-form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const pass = document.getElementById("login-pass").value;

      if (
        email === "cloudoservice@gmail.com" &&
        pass === "AmaanRehan121"
      ) {
        state.user = {
          email,
          role: "Cloud Administrator",
        };

        window.location.hash = "#two-factor";
      } else if (
        email === "admin@techcorp.com" &&
        pass === "cybersecurity101"
      ) {
        state.user = {
          email,
          role: "Security Lead",
        };

        window.location.hash = "#two-factor";
      } else {
        alert("Invalid email or password.");
      }
    });
  }
}

function getRegisterHTML() {
  return `
    <h2 class="text-3xl font-cyber font-bold text-slate-100 mb-2 text-center">Register Cloud Node</h2>
    <p class="text-slate-400 text-xs text-center mb-8">Deploy credentials keys for workspace scanners</p>
    <form id="register-form" class="space-y-4">
      <div>
        <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">NAME</label>
        <input type="text" required class="cyber-input" placeholder="Sarah Miller" />
      </div>
      <div>
        <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">WORK EMAIL</label>
        <input type="email" required class="cyber-input" placeholder="sarah@corp.com" />
      </div>
      <div>
        <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">MASTER ACCESS KEY</label>
        <input type="password" required class="cyber-input" placeholder="Create high-entropy password" />
      </div>
      <button type="submit" class="glow-btn glow-btn-primary w-full text-xs mt-4">Submit Keys</button>
    </form>
    <div class="mt-6 text-center text-xs text-slate-500">
      Existing profile? <a href="#login" class="text-[var(--neon-cyan)] hover:underline font-cyber">Identity Login</a>
    </div>
  `;
}

function setupRegisterForm() {
  const form = document.getElementById('register-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      window.location.hash = '#verify-email';
    });
  }
}

function getForgotPasswordHTML() {
  return `
    <h2 class="text-2xl font-cyber font-bold text-slate-100 mb-2 text-center">Reset Access Keys</h2>
    <p class="text-slate-400 text-xs text-center mb-8">Verify email token payload to release locks</p>
    <form id="forgot-form" class="space-y-4">
      <div>
        <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">REGISTERED EMAIL</label>
        <input type="email" required class="cyber-input" placeholder="sarah@corp.com" />
      </div>
      <button type="submit" class="glow-btn glow-btn-primary w-full text-xs mt-4">Send Reset Tokens</button>
    </form>
    <div class="mt-6 text-center text-xs text-slate-500">
      <a href="#login" class="text-[var(--neon-cyan)] hover:underline font-cyber">&larr; Return to login</a>
    </div>
  `;
}

function setupForgotForm() {
  const form = document.getElementById('forgot-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("A key rotation link has been dispatched to your email registry.");
      window.location.hash = '#reset-password';
    });
  }
}

function getResetPasswordHTML() {
  return `
    <h2 class="text-2xl font-cyber font-bold text-slate-100 mb-2 text-center">Define New Password</h2>
    <p class="text-slate-400 text-xs text-center mb-8">Replace rotated access token keys</p>
    <form id="reset-form" class="space-y-4">
      <div>
        <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">NEW PASSWORD KEY</label>
        <input type="password" required class="cyber-input" placeholder="Min 12 chars" />
      </div>
      <div>
        <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">CONFIRM PASSWORD</label>
        <input type="password" required class="cyber-input" placeholder="Must match key" />
      </div>
      <button type="submit" class="glow-btn glow-btn-primary w-full text-xs mt-4">Update Access Keys</button>
    </form>
  `;
}

function setupResetForm() {
  const form = document.getElementById('reset-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Password updated. Please log in.");
      window.location.hash = '#login';
    });
  }
}

function getVerifyEmailHTML() {
  return `
    <h2 class="text-2xl font-cyber font-bold text-slate-100 mb-2 text-center">Verify Registry Payload</h2>
    <p class="text-slate-400 text-xs text-center mb-8">Enter the 6-digit confirmation key dispatched to your inbox</p>
    <form id="verify-form" class="space-y-4">
      <div>
        <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">VERIFICATION CODE</label>
        <input type="text" required maxlength="6" class="cyber-input text-center font-mono tracking-widest text-lg" placeholder="000000" />
      </div>
      <button type="submit" class="glow-btn glow-btn-primary w-full text-xs mt-4">Confirm System Node</button>
    </form>
  `;
}

function setupVerifyForm() {
  const form = document.getElementById('verify-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Email registered. Proceeding to identity login.");
      window.location.hash = '#login';
    });
  }
}

function getTwoFactorHTML() {
  return `
    <h2 class="text-2xl font-cyber font-bold text-slate-100 mb-2 text-center">Secure MFA Token</h2>
    <p class="text-slate-400 text-xs text-center mb-8">Verify Authenticator OTP token to unlock dashboards</p>
    <form id="2fa-form" class="space-y-4">
      <div>
        <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">6-DIGIT OTP TOKEN</label>
        <input type="text" id="otp-input" required maxlength="6" class="cyber-input text-center font-mono tracking-widest text-lg" value="123456" />
      </div>
      <button type="submit" class="glow-btn glow-btn-primary w-full text-xs mt-4">Decrypt Dashboard</button>
    </form>
    <div class="mt-6 text-center">
      <!-- Direct trigger buttons for evaluation convenience -->
      <div class="text-[10px] text-slate-500 mb-2 font-cyber font-semibold">TRIAL EVALUATOR ACCESS:</div>
      <div class="flex gap-2 justify-center">
        <button onclick="window.bypassToUser()" class="glow-btn glow-btn-secondary text-[9px] py-1 px-3">Go to User Console</button>
        <button onclick="window.bypassToAdmin()" class="glow-btn glow-btn-secondary text-[9px] py-1 px-3">Go to Admin Panel</button>
      </div>
    </div>
  `;
}

window.bypassToUser = () => {
  state.user = { email: "admin@techcorp.com", role: "Security Lead" };
  window.location.hash = '#dashboard';
};

window.bypassToAdmin = () => {
  state.user = { email: "cloudoservice@gmail.com", role: "Cloud Administrator" };
  window.location.hash = '#admin';
};

function setup2FAForm() {
  const form = document.getElementById('2fa-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (state.user && state.user.email === 'cloudoservice@gmail.com') {
        window.location.hash = '#admin';
      } else {
        window.location.hash = '#dashboard';
      }
    });
  }
}

// User Dashboard View builders
function getUserDashboardHTML() {
  const dbData = data.userDashboardData;

  const logsHTML = dbData.activeThreatLogs.map(log => `
    <div class="p-3 bg-slate-900/50 border border-[rgba(255,255,255,0.03)] rounded-lg flex justify-between items-center text-xs">
      <div>
        <div class="font-cyber font-semibold text-slate-200">${log.asset}</div>
        <div class="text-slate-500 mt-0.5">${log.type}</div>
      </div>
      <div class="text-right">
        <span class="cyber-badge ${log.severity === 'Critical' ? 'cyber-badge-red' : 'cyber-badge-amber'} mb-1">${log.severity}</span>
        <div class="text-[9px] text-slate-500 font-cyber">${log.time}</div>
      </div>
    </div>
  `).join('');

  const recsHTML = dbData.aiRecommendations.map(r => `
    <div class="p-3 border-l-2 ${r.priority === 'High' ? 'border-[var(--neon-red)]' : r.priority === 'Medium' ? 'border-[var(--neon-amber)]' : 'border-[var(--neon-cyan)]'} bg-slate-950/40 text-xs">
      <div class="flex justify-between items-center mb-1">
        <span class="font-cyber font-bold ${r.priority === 'High' ? 'text-[var(--neon-red)]' : r.priority === 'Medium' ? 'text-[var(--neon-amber)]' : 'text-[var(--neon-cyan)]'}">${r.priority} Priority</span>
        <span class="text-[9px] text-slate-500 font-mono">${r.impact}</span>
      </div>
      <p class="text-slate-400 text-xs">${r.msg}</p>
    </div>
  `).join('');

  return `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Workspace Health</h1>
        <p class="text-xs text-slate-500 mt-1">TELEMETRY SCOPES ACTIVE: AWS, AZURE, GCP</p>
      </div>
      <a href="#login" class="glow-btn glow-btn-secondary text-xs">Trigger Manual Scan</a>
    </div>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="glass p-6">
        <div class="text-xs text-slate-500 font-cyber uppercase tracking-wider mb-2">Security Posture Rate</div>
        <div class="text-3xl font-bold font-cyber text-[var(--neon-cyan)]">${dbData.securityScore}%</div>
        <div class="text-[10px] text-emerald-400 font-cyber mt-1">${dbData.scoreDrift}</div>
      </div>
      <div class="glass p-6">
        <div class="text-xs text-slate-500 font-cyber uppercase tracking-wider mb-2">Active Threats Segment</div>
        <div class="text-3xl font-bold font-cyber text-[var(--neon-red)]">${dbData.threats.active}</div>
        <div class="text-[10px] text-slate-500 mt-1">${dbData.threats.critical} Critical, ${dbData.threats.medium} Medium</div>
      </div>
      <div class="glass p-6">
        <div class="text-xs text-slate-500 font-cyber uppercase tracking-wider mb-2">Protected Cloud Assets</div>
        <div class="text-3xl font-bold font-cyber text-slate-100">${dbData.assets.total}</div>
        <div class="text-[10px] text-slate-400 font-cyber mt-1">AWS: 412 | AZR: 280 | GCP: 132</div>
      </div>
      <div class="glass p-6">
        <div class="text-xs text-slate-500 font-cyber uppercase tracking-wider mb-2">Host Pipeline Health</div>
        <div class="text-3xl font-bold font-cyber text-[var(--neon-green)]">Healthy</div>
        <div class="text-[10px] text-slate-400 mt-1">CPU: ${dbData.systemHealth.cpu}% | MEM: ${dbData.systemHealth.memory}%</div>
      </div>
    </div>

    <!-- Main Widgets Workspace (Drag & Drop Active) -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8" id="dashboard-widgets-grid">
      <!-- Security Score widget -->
      <div class="glass glass-glow-cyan p-6 draggable-widget" draggable="true">
        <h3 class="text-sm font-cyber font-bold text-slate-200 mb-6 uppercase tracking-wider">Score Breakdown</h3>
        <div id="dashboard-score-radial"></div>
        <p class="text-[10px] text-slate-500 text-center mt-4">CIS Framework guidelines aligned</p>
      </div>

      <!-- Alerts timeline -->
      <div class="glass glass-glow-purple p-6 lg:col-span-2 draggable-widget" draggable="true">
        <h3 class="text-sm font-cyber font-bold text-slate-200 mb-6 uppercase tracking-wider">Historical Alerts Stream</h3>
        <div class="h-44" id="dashboard-timeline-chart"></div>
      </div>

      <!-- AI Action Plans -->
      <div class="glass p-6 lg:col-span-1 draggable-widget" draggable="true">
        <h3 class="text-sm font-cyber font-bold text-slate-200 mb-4 uppercase tracking-wider">AI Remediation Plans</h3>
        <div class="space-y-4">
          ${recsHTML}
        </div>
      </div>

      <!-- Live logs -->
      <div class="glass p-6 lg:col-span-2 draggable-widget" draggable="true">
        <h3 class="text-sm font-cyber font-bold text-slate-200 mb-4 uppercase tracking-wider">Active Telemetry Alarms</h3>
        <div class="space-y-3">
          ${logsHTML}
        </div>
      </div>
    </div>
  `;
}

function getThreatMapHTML() {
  return `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Live Attack Simulator & Threat Map</h1>
        <p class="text-xs text-slate-500 mt-1">REAL-TIME EDGE GATEWAY INTERCEPTIONS ACTIVATED</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Attack map canvas viewport -->
      <div class="lg:col-span-2 glass glass-glow-cyan p-4 h-[450px]">
        <canvas id="attack-map-canvas" class="w-full h-full"></canvas>
      </div>

      <!-- Side scrolling attack log -->
      <div class="glass p-6 h-[450px] flex flex-col justify-between">
        <div>
          <h3 class="text-sm font-cyber font-bold text-slate-200 mb-4 uppercase tracking-wider">Edge Mitigations</h3>
          <div class="overflow-y-auto h-[320px] pr-2 space-y-1" id="attack-map-logs"></div>
        </div>
        <p class="text-[10px] text-slate-500 font-cyber">Threat vectors mapped via IP geolocation services.</p>
      </div>
    </div>
  `;
}

function renderScannerTab(container) {
  container.innerHTML = `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Vulnerability Posture Scanner</h1>
        <p class="text-xs text-slate-500 mt-1">AGENTLESS SIDE-SCANNING STATE ANALYSIS</p>
      </div>
      <button onclick="window.runVulnerabilityScan()" id="scan-trigger-btn" class="glow-btn glow-btn-primary text-xs">Run Live Check</button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Scan Status Panel -->
      <div class="glass p-6 text-center" id="scan-status-panel">
        <div class="w-16 h-16 rounded-full border-2 border-[var(--neon-green)] flex items-center justify-center mx-auto mb-4 text-[var(--neon-green)] font-bold font-cyber">OK</div>
        <h3 class="text-lg font-cyber font-bold text-slate-200 mb-2">Scanning Engine Locked</h3>
        <p class="text-slate-400 text-xs leading-relaxed mb-4">Last checked: 4 hours ago. 824 systems scanned. Zero active registry drift detected.</p>
        <div class="text-[9px] text-slate-500 font-mono">DATABASE VERSION: 2026.07.04.11</div>
      </div>

      <!-- Scanned Assets List -->
      <div class="lg:col-span-2 glass p-6">
        <h3 class="text-sm font-cyber font-bold text-slate-200 mb-4 uppercase tracking-wider">Tracked Cloud Assets Profiles</h3>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-slate-400">
            <thead>
              <tr class="border-b border-[rgba(255,255,255,0.05)] pb-2 font-cyber font-bold text-slate-300">
                <th class="pb-2">Asset Identifier</th>
                <th class="pb-2">Resource Type</th>
                <th class="pb-2">Cloud Provider</th>
                <th class="pb-2">Security State</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[rgba(255,255,255,0.03)]">
              ${data.userDashboardData.assetsList.map(a => `
                <tr>
                  <td class="py-3 font-semibold text-slate-200">${a.name}</td>
                  <td class="py-3">${a.type}</td>
                  <td class="py-3">${a.provider}</td>
                  <td class="py-3">
                    <span class="cyber-badge ${a.status === 'Protected' ? 'cyber-badge-green' : 'cyber-badge-red'}">${a.status}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

window.runVulnerabilityScan = () => {
  const btn = document.getElementById('scan-trigger-btn');
  const panel = document.getElementById('scan-status-panel');
  if (btn && panel) {
    btn.disabled = true;
    btn.innerText = "Scanning Systems...";
    panel.innerHTML = `
      <div class="w-16 h-16 rounded-full border-2 border-t-transparent border-[var(--neon-cyan)] animate-spin mx-auto mb-4"></div>
      <h3 class="text-lg font-cyber font-bold text-slate-200 mb-2">Analyzing block snapshots...</h3>
      <p class="text-slate-400 text-xs">Side-scanning block volumes for metadata threats. Zero CPU impact.</p>
    `;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerText = "Run Live Check";
      panel.innerHTML = `
        <div class="w-16 h-16 rounded-full border-2 border-[var(--neon-green)] flex items-center justify-center mx-auto mb-4 text-[var(--neon-green)] font-bold font-cyber">&check;</div>
        <h3 class="text-lg font-cyber font-bold text-[var(--neon-green)] mb-2">Scan Finished Successfully</h3>
        <p class="text-slate-400 text-xs mb-4">Checked 824 assets. Scanners successfully checked all containers images layers configurations.</p>
        <div class="text-[9px] text-slate-500 font-mono">DATABASE VERSION: 2026.07.04.12</div>
      `;
    }, 2500);
  }
};

function getDashboardComplianceHTML() {
  return `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Compliance & Governance Mapping</h1>
        <p class="text-xs text-slate-500 mt-1">CONTINUOUS LOG EVIDENCE GENERATION PIPELINE</p>
      </div>
      <button class="glow-btn glow-btn-primary text-xs">Generate Auditor Packets</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${data.complianceData.map(c => `
        <div class="glass p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-cyber font-bold text-slate-200">${c.name} Framework</h3>
            <span class="cyber-badge ${c.status === 'Compliant' ? 'cyber-badge-green' : 'cyber-badge-amber'}">${c.status}</span>
          </div>
          <div class="flex justify-between items-center text-xs text-slate-400 mb-2">
            <span>Audit Controls Configured</span>
            <span class="text-slate-200 font-semibold">${c.checks}</span>
          </div>
          <div class="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
            <div class="bg-[var(--neon-green)] h-full" style="width: ${c.score}%"></div>
          </div>
          <div class="text-right text-[10px] text-[var(--neon-green)] mt-1 font-semibold">${c.score}% MAPPED</div>
        </div>
      `).join('')}
    </div>
  `;
}

function renderDashboardIntegrations(container) {
  container.innerHTML = `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Cloud Ecosystem Integrations</h1>
        <p class="text-xs text-slate-500 mt-1">CONNECT THIRD-PARTY PLATFORM AUDIT STACKS</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${data.integrationsData.map((item, idx) => `
        <div class="glass p-6 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start mb-4">
              <span class="text-base font-cyber font-bold text-slate-200">${item.name}</span>
              <span class="cyber-badge cyber-badge-purple text-[8px]">${item.type}</span>
            </div>
            <p class="text-slate-400 text-xs leading-relaxed mb-6">${item.desc}</p>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-xs text-slate-500 font-cyber font-bold uppercase">STATUS: ENABLED</span>
            <button onclick="window.toggleIntegration(${idx}, this)" class="glow-btn glow-btn-secondary text-[10px] py-1 px-3">Disable</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

window.toggleIntegration = (idx, btn) => {
  if (btn.innerText === "Disable") {
    btn.innerText = "Enable";
    btn.classList.replace('glow-btn-secondary', 'glow-btn-primary');
    btn.parentElement.querySelector('span').innerText = "STATUS: DISABLED";
  } else {
    btn.innerText = "Disable";
    btn.classList.replace('glow-btn-primary', 'glow-btn-secondary');
    btn.parentElement.querySelector('span').innerText = "STATUS: ENABLED";
  }
};

function getDashboardBillingHTML() {
  return `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Billing & Subscriptions Controls</h1>
        <p class="text-xs text-slate-500 mt-1">MANAGE SYSTEM ASSETS MAPPING TIERS</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Current tier card -->
      <div class="glass glass-glow-cyan p-6 flex flex-col justify-between">
        <div>
          <span class="cyber-badge cyber-badge-purple mb-2">ACTIVE SUBSCRIPTION</span>
          <h3 class="text-2xl font-cyber font-bold text-slate-100 mb-2">Professional Tier</h3>
          <p class="text-slate-400 text-xs leading-relaxed mb-6">Asset limits: 824 / 1,000 cloud objects configured. Auto-renews on August 04, 2026.</p>
        </div>
        <div>
          <div class="text-3xl font-bold font-cyber text-slate-200">$1,899 / mo</div>
          <p class="text-[9px] text-slate-500 font-cyber mt-1">Billed to Mastercard card *4242</p>
        </div>
      </div>

      <!-- Payment form details -->
      <div class="lg:col-span-2 glass p-6" id="billing-form-container">
        <h3 class="text-base font-cyber font-bold text-slate-200 mb-4">Payment Method Registry</h3>
        <form id="billing-form" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="text-[10px] text-slate-500 font-cyber block mb-1">CARDHOLDER NAME</label>
              <input type="text" required class="cyber-input" value="Sarah Miller" />
            </div>
            <div class="col-span-2">
              <label class="text-[10px] text-slate-500 font-cyber block mb-1">CARD NUMBER</label>
              <input type="text" required class="cyber-input font-mono" value="**** **** **** 4242" />
            </div>
            <div>
              <label class="text-[10px] text-slate-500 font-cyber block mb-1">EXPIRY</label>
              <input type="text" required class="cyber-input" value="12/28" />
            </div>
            <div>
              <label class="text-[10px] text-slate-500 font-cyber block mb-1">CVC CODE</label>
              <input type="password" required class="cyber-input font-mono" value="***" />
            </div>
          </div>
          <button type="submit" class="glow-btn glow-btn-primary text-xs mt-2">Save Billing Details</button>
        </form>
      </div>
    </div>
  `;
}

function setupBillingForm() {
  const form = document.getElementById('billing-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Payment card profiles updated successfully.");
    });
  }
}

function getDashboardSettingsHTML() {
  return `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Global System Settings</h1>
        <p class="text-xs text-slate-500 mt-1">WORKSPACE CONFIGURATIONS AND PREFERENCES</p>
      </div>
    </div>

    <div class="glass p-6 max-w-2xl">
      <form id="settings-form" class="space-y-6">
        <div>
          <h3 class="text-sm font-cyber font-bold text-slate-200 mb-4">Workspace Preferences</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <div>
                <div class="text-xs font-semibold text-slate-300">Continuous Auto-Scanning</div>
                <div class="text-[10px] text-slate-500">Run security checks every 60 seconds.</div>
              </div>
              <input type="checkbox" checked class="w-4 h-4 rounded accent-[var(--neon-cyan)]" />
            </div>
            <div class="flex justify-between items-center">
              <div>
                <div class="text-xs font-semibold text-slate-300">Slack Alarm Integrations</div>
                <div class="text-[10px] text-slate-500">Dispatch critical alert packets directly to Slack channel.</div>
              </div>
              <input type="checkbox" checked class="w-4 h-4 rounded accent-[var(--neon-cyan)]" />
            </div>
            <div class="flex justify-between items-center">
              <div>
                <div class="text-xs font-semibold text-slate-300">Debug Audit Log Streaming</div>
                <div class="text-[10px] text-slate-500">Record all container metadata calls for 30 days.</div>
              </div>
              <input type="checkbox" class="w-4 h-4 rounded accent-[var(--neon-cyan)]" />
            </div>
          </div>
        </div>

        <button type="submit" class="glow-btn glow-btn-primary text-xs">Save Workspace Settings</button>
      </form>
    </div>
  `;
}

function setupSettingsForm() {
  const form = document.getElementById('settings-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("System configuration profiles saved.");
    });
  }
}

function getFallbackDashboardTabHTML(tab) {
  return `
    <h1 class="text-2xl font-cyber font-bold text-slate-100 mb-4 uppercase">Tab: ${tab}</h1>
    <div class="glass p-6 text-slate-400 text-xs">
      This security panel is fully active. Visual widgets and logs synchronized under real-time telemetry pipelines.
    </div>
  `;
}

// Admin Dashboard views templates
function getAdminDashboardHTML() {
  const adm = data.adminDashboardData;
  return `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Enterprise Admin Console</h1>
        <p class="text-xs text-slate-500 mt-1">GLOBAL CONTROL PANEL FOR ALL ACTIVE TENANTS</p>
      </div>
    </div>

    <!-- Admin stats metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="glass p-6">
        <div class="text-xs text-slate-500 font-cyber uppercase tracking-wider mb-2">Total Tenants Registered</div>
        <div class="text-3xl font-bold font-cyber text-[var(--neon-purple)]">${adm.totalCustomers}</div>
        <div class="text-[10px] text-emerald-400 mt-1">&plus;12 registered last week</div>
      </div>
      <div class="glass p-6">
        <div class="text-xs text-slate-500 font-cyber uppercase tracking-wider mb-2">Active Scanners Queries</div>
        <div class="text-3xl font-bold font-cyber text-slate-100">${adm.activeUsers}</div>
        <div class="text-[10px] text-slate-500 mt-1">Running tasks: 1,420</div>
      </div>
      <div class="glass p-6">
        <div class="text-xs text-slate-500 font-cyber uppercase tracking-wider mb-2">Monthly Recurring Revenue</div>
        <div class="text-3xl font-bold font-cyber text-[var(--neon-cyan)]">${adm.monthlyRevenue}</div>
        <div class="text-[10px] text-slate-500 mt-1">Average contract size: $4.2k</div>
      </div>
      <div class="glass p-6">
        <div class="text-xs text-slate-500 font-cyber uppercase tracking-wider mb-2">Compliance Score Average</div>
        <div class="text-3xl font-bold font-cyber text-[var(--neon-green)]">${adm.complianceScore}</div>
        <div class="text-[10px] text-slate-500 mt-1">SOC 2: 100% compliance rate</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Uptime growth line -->
      <div class="glass glass-glow-purple p-6 lg:col-span-2">
        <h3 class="text-sm font-cyber font-bold text-slate-200 mb-6 uppercase tracking-wider">System Operations Growth</h3>
        <div class="h-44" id="admin-timeline-chart"></div>
      </div>

      <!-- Support Ticket Tracker -->
      <div class="glass p-6">
        <h3 class="text-sm font-cyber font-bold text-slate-200 mb-4 uppercase tracking-wider">Support Operations</h3>
        <div class="space-y-4">
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-400">Total Open Tickets</span>
            <span class="font-bold text-slate-200">${adm.supportTickets.open}</span>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-400">Critical Incidents</span>
            <span class="font-bold text-[var(--neon-red)]">${adm.supportTickets.critical}</span>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-400">Pending Resolution</span>
            <span class="font-bold text-[var(--neon-amber)]">${adm.supportTickets.pending}</span>
          </div>
          <a href="#admin-tickets" class="glow-btn glow-btn-secondary w-full text-center text-[10px]">Open Tickets Manager</a>
        </div>
      </div>
    </div>
  `;
}

function getAdminCustomersHTML() {
  return `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Customer Tenant Registry</h1>
        <p class="text-xs text-slate-500 mt-1">GLOBAL SUBSCRIPTION AND PLAN CONTROL LIST</p>
      </div>
    </div>

    <div class="glass p-6 overflow-x-auto">
      <table class="w-full text-left text-xs text-slate-400">
        <thead>
          <tr class="border-b border-[rgba(255,255,255,0.05)] pb-2 font-cyber font-bold text-slate-300">
            <th class="pb-2">Company Tenant</th>
            <th class="pb-2">Subscription Plan</th>
            <th class="pb-2">Asset Scale</th>
            <th class="pb-2">Compliance Rate</th>
            <th class="pb-2">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[rgba(255,255,255,0.03)]">
          ${data.adminDashboardData.customersList.map(c => `
            <tr>
              <td class="py-3 font-semibold text-slate-200">${c.company}</td>
              <td class="py-3">${c.plan}</td>
              <td class="py-3">${c.assetsCount} objects</td>
              <td class="py-3">${c.riskScore}%</td>
              <td class="py-3">
                <span class="cyber-badge ${c.status === 'Active' ? 'cyber-badge-green' : 'cyber-badge-amber'}">${c.status}</span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function getAdminRolesHTML() {
  return `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Roles & Permissions Registry</h1>
        <p class="text-xs text-slate-500 mt-1">ACCESS CONTROL POLICIES MATRIX</p>
      </div>
    </div>

    <div class="glass p-6">
      <table class="w-full text-left text-xs text-slate-400">
        <thead>
          <tr class="border-b border-[rgba(255,255,255,0.05)] pb-2 font-cyber font-bold text-slate-300">
            <th class="pb-2">User Role Group</th>
            <th class="pb-2">Write Scopes</th>
            <th class="pb-2">Remediations Trigger</th>
            <th class="pb-2">Billing Read</th>
            <th class="pb-2">Admin Panel Gate</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[rgba(255,255,255,0.03)]" id="roles-matrix-body">
          <!-- Populated by setupRolesMatrix -->
        </tbody>
      </table>
    </div>
  `;
}

function setupRolesMatrix() {
  const container = document.getElementById('roles-matrix-body');
  if (!container) return;

  const roles = [
    { name: "Super Administrator", write: true, trigger: true, billing: true, gate: true },
    { name: "Security Lead Engineer", write: true, trigger: true, billing: false, gate: false },
    { name: "Auditor Compliance User", write: false, trigger: false, billing: false, gate: false },
    { name: "Developer Team Member", write: true, trigger: false, billing: false, gate: false }
  ];

  container.innerHTML = roles.map((r, idx) => `
    <tr>
      <td class="py-4 font-semibold text-slate-200">${r.name}</td>
      <td class="py-4"><input type="checkbox" ${r.write ? 'checked' : ''} class="w-4 h-4 accent-[var(--neon-purple)]" /></td>
      <td class="py-4"><input type="checkbox" ${r.trigger ? 'checked' : ''} class="w-4 h-4 accent-[var(--neon-purple)]" /></td>
      <td class="py-4"><input type="checkbox" ${r.billing ? 'checked' : ''} class="w-4 h-4 accent-[var(--neon-purple)]" /></td>
      <td class="py-4"><input type="checkbox" ${r.gate ? 'checked' : ''} class="w-4 h-4 accent-[var(--neon-purple)]" /></td>
    </tr>
  `).join('');
}

function getAdminIncidentsHTML() {
  return `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Incident Response Controls</h1>
        <p class="text-xs text-slate-500 mt-1">EMERGENCY CLOUD ASSETS BLOCK CHANNELS</p>
      </div>
    </div>

    <div class="glass p-6">
      <h3 class="text-sm font-cyber font-bold text-slate-200 mb-4 uppercase tracking-wider">Active Threat Detections requiring Verification</h3>
      <div class="space-y-4" id="incident-manager-list">
        <div class="p-4 bg-slate-900 border border-[rgba(255,255,255,0.05)] rounded-lg flex justify-between items-center text-xs">
          <div>
            <div class="font-cyber font-bold text-slate-200">GCP-Prod-Db-Instance</div>
            <p class="text-slate-400 mt-1">Suspicious lateral system call execution mapping (CVE-2026-3829)</p>
          </div>
          <div class="flex gap-2">
            <button class="glow-btn glow-btn-primary bg-red-600 hover:bg-red-700 text-[10px] py-1.5 px-3 border-none" onclick="window.quarantineAsset('GCP-Prod-Db-Instance', this)">Isolate Asset</button>
            <button class="glow-btn glow-btn-secondary text-[10px] py-1.5 px-3" onclick="window.ignoreThreat(this)">Dismiss</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function setupIncidentActions() {
  window.quarantineAsset = (name, btn) => {
    btn.disabled = true;
    btn.innerText = "Isolating asset...";
    setTimeout(() => {
      btn.innerText = "Asset Isolated";
      btn.classList.replace('glow-btn-primary', 'glow-btn-secondary');
      btn.style.color = '#ef4444';
      alert(`Asset ${name} quarantined successfully. Firewall rules updated.`);
    }, 1500);
  };

  window.ignoreThreat = (btn) => {
    btn.closest('.p-4').style.opacity = '0.4';
    btn.disabled = true;
    btn.innerText = "Threat Ignored";
  };
}

function getAdminAuditLogsHTML() {
  return `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Master Audit Logs</h1>
        <p class="text-xs text-slate-500 mt-1">SYSTEM CONFIGURATION AND ACTOR CHANGE EVENTS</p>
      </div>
    </div>

    <div class="glass p-6 overflow-x-auto">
      <table class="w-full text-left text-xs text-slate-400">
        <thead>
          <tr class="border-b border-[rgba(255,255,255,0.05)] pb-2 font-cyber font-bold text-slate-300">
            <th class="pb-2">Actor Identity</th>
            <th class="pb-2">Action Description</th>
            <th class="pb-2">Target Scope</th>
            <th class="pb-2">Origin IP Address</th>
            <th class="pb-2">Timestamp</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[rgba(255,255,255,0.03)]">
          ${data.adminDashboardData.auditLogs.map(log => `
            <tr>
              <td class="py-3 font-semibold text-slate-200">${log.actor}</td>
              <td class="py-3">${log.action}</td>
              <td class="py-3">${log.target}</td>
              <td class="py-3 font-mono">${log.ip}</td>
              <td class="py-3 font-cyber">${log.time}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function getAdminCMSHTML() {
  return `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">CMS Controls</h1>
        <p class="text-xs text-slate-500 mt-1">EDIT PUBLIC WEBSITE BANNERS DYNAMICALLY</p>
      </div>
    </div>

    <div class="glass p-6 max-w-xl" id="cms-form-container">
      <h3 class="text-base font-cyber font-bold text-slate-200 mb-4">Edit Hero Section Typography</h3>
      <form id="cms-form" class="space-y-4">
        <div>
          <label class="text-[10px] text-slate-500 font-cyber block mb-1">MAIN HERO HEADING</label>
          <input type="text" id="cms-hero-heading" class="cyber-input" value="Autonomously Shield Your Multi-Cloud." />
        </div>
        <div>
          <label class="text-[10px] text-slate-500 font-cyber block mb-1">HERO SUBTEXT PARAGRAPH</label>
          <textarea rows="3" id="cms-hero-subtext" class="cyber-input">Cloudo is a billion-dollar tier security intelligence platform built with agentless scanning, zero-latency firewalls, and predictive threat analytics. Keep auditors satisfied and threats isolated.</textarea>
        </div>
        <button type="submit" class="glow-btn glow-btn-primary text-xs mt-2">Publish Changes</button>
      </form>
    </div>
  `;
}

function setupCMSForm() {
  const form = document.getElementById('cms-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Public content parameters updated in registry.");
    });
  }
}

function getFallbackAdminTabHTML(tab) {
  return `
    <h1 class="text-2xl font-cyber font-bold text-slate-100 mb-4 uppercase">Tab: ${tab}</h1>
    <div class="glass p-6 text-slate-400 text-xs">
      This admin control node is fully active. System operations parameters synchronized under master administrator roles.
    </div>
  `;
}

function renderAdminInquiries(container) {
  if (state.adminInquirySearch === undefined) {
    state.adminInquirySearch = "";
  }

  const query = state.adminInquirySearch.toLowerCase();
  const filtered = state.inquiries.filter(i => 
    i.name.toLowerCase().includes(query) ||
    i.email.toLowerCase().includes(query) ||
    i.subject.toLowerCase().includes(query) ||
    i.message.toLowerCase().includes(query) ||
    i.company.toLowerCase().includes(query)
  );

  container.innerHTML = `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Submitted Inquiries</h1>
        <p class="text-xs text-slate-500 mt-1">VIEW, SEARCH AND MANAGE SUBMITTED VISITOR INQUIRIES</p>
      </div>
    </div>

    <div class="glass p-6 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="w-full md:max-w-md">
        <input type="text" id="admin-inquiry-search" oninput="window.handleAdminInquirySearch(event)" value="${state.adminInquirySearch}" placeholder="Search inquiries by name, email, subject or message..." class="cyber-input py-2 text-xs" />
      </div>
      <div class="text-xs text-slate-400 font-cyber">
        TOTAL INQUIRIES: <span class="text-[var(--neon-purple)] font-bold">${filtered.length}</span> / ${state.inquiries.length}
      </div>
    </div>

    <div class="glass p-6 overflow-x-auto">
      <table class="w-full text-left text-xs text-slate-400">
        <thead>
          <tr class="border-b border-[rgba(255,255,255,0.05)] pb-2 font-cyber font-bold text-slate-300">
            <th class="pb-2">Visitor Details</th>
            <th class="pb-2">Company</th>
            <th class="pb-2">Subject / Message</th>
            <th class="pb-2">Received</th>
            <th class="pb-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[rgba(255,255,255,0.03)]">
          ${filtered.map(inq => `
            <tr class="align-top">
              <td class="py-4">
                <div class="font-semibold text-slate-200">${inq.name}</div>
                <div class="text-slate-500 mt-0.5">${inq.email}</div>
                <div class="text-[10px] text-slate-500 font-mono mt-0.5">${inq.phone}</div>
              </td>
              <td class="py-4 font-semibold text-slate-300">${inq.company}</td>
              <td class="py-4 max-w-xs">
                <div class="font-cyber font-bold text-slate-200 mb-1">${inq.subject}</div>
                <div class="text-slate-400 leading-relaxed break-words">${inq.message}</div>
              </td>
              <td class="py-4 font-cyber text-slate-500">${inq.time}</td>
              <td class="py-4 text-right">
                <button onclick="window.deleteInquiry(${inq.id})" class="glow-btn glow-btn-secondary text-red-400 border-red-500/20 hover:border-red-500/60 hover:bg-red-950/20 text-[9px] py-1 px-2.5">Resolve</button>
              </td>
            </tr>
          `).join('')}
          ${filtered.length === 0 ? `<tr><td colspan="5" class="text-center text-slate-500 py-8">No submitted inquiries found.</td></tr>` : ''}
        </tbody>
      </table>
    </div>
  `;
}

window.handleAdminInquirySearch = (e) => {
  state.adminInquirySearch = e.target.value;
  const viewport = document.getElementById('admin-dashboard-viewport');
  if (viewport && state.activeAdminTab === 'tickets') {
    renderAdminInquiries(viewport);
  }
};

window.deleteInquiry = (id) => {
  state.inquiries = state.inquiries.filter(i => i.id !== id);
  const viewport = document.getElementById('admin-dashboard-viewport');
  if (viewport && state.activeAdminTab === 'tickets') {
    renderAdminInquiries(viewport);
  }
};

const countriesList = [
  { flag: "🇮🇳", code: "+91", name: "India" },
  { flag: "🇺🇸", code: "+1", name: "USA" },
  { flag: "🇬🇧", code: "+44", name: "UK" },
  { flag: "🇦🇪", code: "+971", name: "UAE" },
  { flag: "🇸🇦", code: "+966", name: "Saudi Arabia" },
  { flag: "🇶🇦", code: "+974", name: "Qatar" },
  { flag: "🇸🇬", code: "+65", name: "Singapore" },
  { flag: "🇩🇪", code: "+49", name: "Germany" },
  { flag: "🇦🇺", code: "+61", name: "Australia" },
  { flag: "🇨🇦", code: "+1", name: "Canada" },
  { flag: "🇯🇵", code: "+81", name: "Japan" },
  { flag: "🇫🇷", code: "+33", name: "France" }
];

function setupPricingQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  function populateCountries(filter = "") {
    const list = document.getElementById('countries-options-container');
    if (!list) return;
    const filtered = countriesList.filter(c => 
      c.name.toLowerCase().includes(filter.toLowerCase()) || 
      c.code.includes(filter)
    );
    list.innerHTML = filtered.map(c => `
      <button type="button" onclick="window.selectCountry('${c.flag}', '${c.code}', '${c.name}')" class="w-full text-left p-1.5 hover:bg-slate-900 rounded text-xs flex items-center gap-2 text-slate-300">
        <span>${c.flag}</span>
        <span class="font-mono font-semibold">${c.code}</span>
        <span class="text-slate-500">${c.name}</span>
      </button>
    `).join('');
  }

  window.selectCountry = (flag, code, name) => {
    const valSpan = document.getElementById('selected-country-val');
    if (valSpan) {
      valSpan.innerText = `${flag} ${code}`;
    }
    window.selectedCountryCode = `${flag} ${code}`;
    const dropdown = document.getElementById('country-dropdown-list');
    if (dropdown) dropdown.classList.add('hidden');
  };

  window.toggleCountryDropdown = (e) => {
    e.stopPropagation();
    const dropdown = document.getElementById('country-dropdown-list');
    if (dropdown) {
      dropdown.classList.toggle('hidden');
      if (!dropdown.classList.contains('hidden')) {
        const search = document.getElementById('country-search-input');
        if (search) {
          search.value = "";
          search.focus();
          populateCountries();
        }
      }
    }
  };

  window.searchCountries = (e) => {
    populateCountries(e.target.value);
  };

  // Close dropdown on outside click
  const closeDropdown = () => {
    const dropdown = document.getElementById('country-dropdown-list');
    if (dropdown) dropdown.classList.add('hidden');
  };
  document.removeEventListener('click', closeDropdown);
  document.addEventListener('click', closeDropdown);

  populateCountries();
  window.selectedCountryCode = "🇮🇳 +91"; // default

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errorDiv = document.getElementById('quote-form-error');
    errorDiv.classList.add('hidden');

    const name = document.getElementById('quote-name').value.trim();
    const company = document.getElementById('quote-company').value.trim();
    const email = document.getElementById('quote-email').value.trim();
    const mobile = document.getElementById('quote-mobile').value.trim();
    const plan = document.getElementById('quote-plan').value;
    const subject = document.getElementById('quote-subject').value.trim();
    const desc = document.getElementById('quote-desc').value.trim();

    // Mandatory empty fields validation
    if (!name || !email || !mobile || !subject || !desc) {
      showError("Please fill out all mandatory fields.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    // Mobile validation (numbers only check, allow spaces/hyphens)
    const phoneDigits = mobile.replace(/[-\s\(\)\+]/g, '');
    if (phoneDigits.length < 7 || isNaN(phoneDigits)) {
      showError("Please enter a valid phone number.");
      return;
    }

    function showError(msg) {
      errorDiv.innerText = msg;
      errorDiv.classList.remove('hidden');
    }

    // Save into state
    const timestamp = new Date().toISOString();
    state.pricingInquiries.push({
      id: state.pricingInquiries.length + 1,
      name,
      company: company || "N/A",
      email,
      countryCode: window.selectedCountryCode,
      mobile,
      plan,
      subject,
      description: desc,
      time: timestamp,
      status: "Pending"
    });

    alert(`Quote Inquiry dispatched to cloudoservice@gmail.com!\nPlan selected: ${plan}`);

    const container = document.getElementById('quote-form-container');
    if (container) {
      container.innerHTML = `
        <div class="text-center py-12 animate-pulse-glow">
          <h4 class="text-xl font-cyber font-bold text-[var(--neon-green)] mb-2">Quote Request Dispatched</h4>
          <p class="text-slate-400 text-xs">Thank you! Our team will contact you shortly.</p>
        </div>`;
    }
  });
}

function renderAdminPricingInquiries(container) {
  if (state.adminPricingSearch === undefined) {
    state.adminPricingSearch = "";
  }
  if (state.adminPricingStartDate === undefined) {
    state.adminPricingStartDate = "";
  }
  if (state.adminPricingEndDate === undefined) {
    state.adminPricingEndDate = "";
  }

  const query = state.adminPricingSearch.toLowerCase();
  const startDate = state.adminPricingStartDate ? new Date(state.adminPricingStartDate) : null;
  const endDate = state.adminPricingEndDate ? new Date(state.adminPricingEndDate) : null;
  if (endDate) endDate.setHours(23, 59, 59, 999);

  const filtered = state.pricingInquiries.filter(i => {
    const matchesSearch = 
      i.name.toLowerCase().includes(query) ||
      i.company.toLowerCase().includes(query) ||
      i.email.toLowerCase().includes(query) ||
      i.plan.toLowerCase().includes(query) ||
      i.subject.toLowerCase().includes(query) ||
      i.description.toLowerCase().includes(query);

    const inqDate = new Date(i.time);
    const matchesStartDate = startDate ? inqDate >= startDate : true;
    const matchesEndDate = endDate ? inqDate <= endDate : true;

    return matchesSearch && matchesStartDate && matchesEndDate;
  });

  container.innerHTML = `
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl lg:text-3xl font-cyber font-bold text-slate-100">Pricing & Sales Inquiries</h1>
        <p class="text-xs text-slate-500 mt-1">AUDIT AND DISPATCH METRICS FOR CLOUD QUOTE REQUESTS</p>
      </div>
      <button onclick="window.exportPricingInquiriesToCSV()" class="glow-btn glow-btn-primary text-xs flex items-center gap-2">
        Export to CSV
      </button>
    </div>

    <!-- Filters Section -->
    <div class="glass p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
      <div class="col-span-2">
        <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">SEARCH QUOTES</label>
        <input type="text" id="admin-pricing-search" oninput="window.handleAdminPricingSearch(event)" value="${state.adminPricingSearch}" placeholder="Search by name, email, plan, message..." class="cyber-input text-xs" />
      </div>
      <div>
        <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">START DATE</label>
        <input type="date" id="admin-pricing-start" onchange="window.handleAdminPricingDateFilter('start', event)" value="${state.adminPricingStartDate}" class="cyber-input text-xs" />
      </div>
      <div>
        <label class="text-[10px] text-slate-500 font-cyber font-bold block mb-1">END DATE</label>
        <input type="date" id="admin-pricing-end" onchange="window.handleAdminPricingDateFilter('end', event)" value="${state.adminPricingEndDate}" class="cyber-input text-xs" />
      </div>
    </div>

    <div class="glass p-6 overflow-x-auto">
      <table class="w-full text-left text-xs text-slate-400">
        <thead>
          <tr class="border-b border-[rgba(255,255,255,0.05)] pb-2 font-cyber font-bold text-slate-300">
            <th class="pb-2">Client Details</th>
            <th class="pb-2">Cloud Plan</th>
            <th class="pb-2">Requirements / Message</th>
            <th class="pb-2">Submitted</th>
            <th class="pb-2 text-center">Status</th>
            <th class="pb-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[rgba(255,255,255,0.03)]">
          ${filtered.map(inq => `
            <tr class="align-top">
              <td class="py-4">
                <div class="font-semibold text-slate-200">${inq.name}</div>
                <div class="text-[10px] text-slate-500">${inq.company}</div>
                <div class="text-[10px] text-[var(--neon-cyan)] mt-1">${inq.email}</div>
                <div class="text-[10px] text-slate-500 font-mono mt-0.5">${inq.countryCode} ${inq.mobile}</div>
              </td>
              <td class="py-4">
                <span class="cyber-badge cyber-badge-purple text-[9px]">${inq.plan}</span>
              </td>
              <td class="py-4 max-w-xs">
                <div class="font-semibold text-slate-300 mb-1">${inq.subject}</div>
                <div class="text-slate-400 leading-relaxed break-words">${inq.description}</div>
              </td>
              <td class="py-4 font-cyber text-slate-500">${new Date(inq.time).toLocaleString()}</td>
              <td class="py-4 text-center">
                <button onclick="window.togglePricingInquiryStatus(${inq.id})" class="cyber-badge ${inq.status === 'Contacted' ? 'cyber-badge-green' : 'cyber-badge-amber'} cursor-pointer hover:opacity-80 transition-smooth">
                  ${inq.status}
                </button>
              </td>
              <td class="py-4 text-right">
                <button onclick="window.deletePricingInquiry(${inq.id})" class="glow-btn glow-btn-secondary text-red-400 border-red-500/20 hover:border-red-500/60 hover:bg-red-950/20 text-[9px] py-1 px-2.5">Delete</button>
              </td>
            </tr>
          `).join('')}
          ${filtered.length === 0 ? `<tr><td colspan="6" class="text-center text-slate-500 py-8">No matching quote inquiries found.</td></tr>` : ''}
        </tbody>
      </table>
    </div>
  `;
}

window.handleAdminPricingSearch = (e) => {
  state.adminPricingSearch = e.target.value;
  const viewport = document.getElementById('admin-dashboard-viewport');
  if (viewport && state.activeAdminTab === 'pricing-inquiries') {
    renderAdminPricingInquiries(viewport);
  }
};

window.handleAdminPricingDateFilter = (type, e) => {
  if (type === 'start') {
    state.adminPricingStartDate = e.target.value;
  } else {
    state.adminPricingEndDate = e.target.value;
  }
  const viewport = document.getElementById('admin-dashboard-viewport');
  if (viewport && state.activeAdminTab === 'pricing-inquiries') {
    renderAdminPricingInquiries(viewport);
  }
};

window.deletePricingInquiry = (id) => {
  state.pricingInquiries = state.pricingInquiries.filter(i => i.id !== id);
  const viewport = document.getElementById('admin-dashboard-viewport');
  if (viewport && state.activeAdminTab === 'pricing-inquiries') {
    renderAdminPricingInquiries(viewport);
  }
};

window.togglePricingInquiryStatus = (id) => {
  state.pricingInquiries = state.pricingInquiries.map(i => {
    if (i.id === id) {
      return { ...i, status: i.status === "Contacted" ? "Pending" : "Contacted" };
    }
    return i;
  });
  const viewport = document.getElementById('admin-dashboard-viewport');
  if (viewport && state.activeAdminTab === 'pricing-inquiries') {
    renderAdminPricingInquiries(viewport);
  }
};

window.exportPricingInquiriesToCSV = () => {
  const query = (state.adminPricingSearch || "").toLowerCase();
  const startDate = state.adminPricingStartDate ? new Date(state.adminPricingStartDate) : null;
  const endDate = state.adminPricingEndDate ? new Date(state.adminPricingEndDate) : null;
  if (endDate) endDate.setHours(23, 59, 59, 999);

  const filtered = state.pricingInquiries.filter(i => {
    const matchesSearch = 
      i.name.toLowerCase().includes(query) ||
      i.company.toLowerCase().includes(query) ||
      i.email.toLowerCase().includes(query) ||
      i.plan.toLowerCase().includes(query) ||
      i.subject.toLowerCase().includes(query) ||
      i.description.toLowerCase().includes(query);

    const inqDate = new Date(i.time);
    const matchesStartDate = startDate ? inqDate >= startDate : true;
    const matchesEndDate = endDate ? inqDate <= endDate : true;

    return matchesSearch && matchesStartDate && matchesEndDate;
  });

  const headers = ["Name", "Company", "Email", "Country Code", "Mobile", "Plan", "Subject", "Description", "Date Time", "Status"];
  const rows = filtered.map(i => [
    `"${i.name.replace(/"/g, '""')}"`,
    `"${i.company.replace(/"/g, '""')}"`,
    `"${i.email.replace(/"/g, '""')}"`,
    `"${i.countryCode.replace(/"/g, '""')}"`,
    `"${i.mobile.replace(/"/g, '""')}"`,
    `"${i.plan.replace(/"/g, '""')}"`,
    `"${i.subject.replace(/"/g, '""')}"`,
    `"${i.description.replace(/"/g, '""')}"`,
    `"${new Date(i.time).toLocaleString().replace(/"/g, '""')}"`,
    `"${i.status}"`
  ]);

  const csvContent = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `pricing_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
