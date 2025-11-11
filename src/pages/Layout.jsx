

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { LayoutDashboard, FileText, Settings, AlertTriangle, Shield, Grid3x3, DollarSign, Users, Play, Sun, Moon, Wallet, Sparkles, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

// Utility to normalize path
function getPath() {
  let p = (window.location.pathname || "/").toLowerCase();
  if (p.endsWith("/")) p = p.slice(0, -1);
  p = p.replace(/\/+/g, "/");
  return p || "/";
}

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("xbp-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("xbp-theme", theme);
  }, [theme]);

  // Listen for theme changes from Settings page
  useEffect(() => {
    const handleThemeChange = (e) => {
      setTheme(e.detail);
    };
    window.addEventListener('theme-changed', handleThemeChange);
    return () => window.removeEventListener('theme-changed', handleThemeChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: newTheme }));
  };

  const menuItems = [
    { key: "dashboard", name: "Dashboard", icon: LayoutDashboard, path: "Dashboard", href: "/" },
    { key: "flow", name: "Live Transaction Flow", icon: Play, path: "InvestorDemo", href: "/investordemo", highlight: true },
    { key: "analytics", name: "Analytics", icon: BarChart3, path: "Analytics", href: "/analytics" },
    { key: "ledger", name: "Ledger", icon: FileText, path: "Ledger", href: "/ledger" },
    { key: "disputes", name: "Disputes", icon: AlertTriangle, path: "Disputes", href: "/disputes" },
    { key: "insurance", name: "Insurance", icon: Shield, path: "Insurance", href: "/insurance" },
    { key: "modules", name: "Modules", icon: Grid3x3, path: "Modules", href: "/modules" },
    { key: "lending", name: "Lending", icon: DollarSign, path: "Lending", href: "/lending" },
    { key: "wallet", name: "Wallet", icon: Wallet, path: "Wallet", href: "/wallet" },
    { key: "ai", name: "AI Automation", icon: Sparkles, path: "AIAutomation", href: "/aiautomation" },
    { key: "connect", name: "Connect", icon: Users, path: "Connect", href: "/connect" },
    { key: "settings", name: "Settings", icon: Settings, path: "Settings", href: "/settings" },
  ];

  // Robust active detection
  const isActive = (href) => {
    const current = getPath();
    if (href === "/") return current === "/" || current === "/dashboard";
    return current === href || current.startsWith(href + "/");
  };

  // Update active states on mount and route change
  useEffect(() => {
    const current = getPath();
    document.querySelectorAll('.sidebar a.nav-item').forEach(el => {
      const href = (el.getAttribute('data-href') || '').toLowerCase();
      const shouldBeActive = href === '/' 
        ? (current === '/' || current === '/dashboard')
        : (current === href || current.startsWith(href + '/'));
      
      if (shouldBeActive) {
        el.classList.add('active');
        el.setAttribute('aria-current', 'page');
      } else {
        el.classList.remove('active');
        el.removeAttribute('aria-current');
      }
    });
  }, [location.pathname]);

  // Click fallback for optimistic updates
  useEffect(() => {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    const handleClick = (e) => {
      const a = e.target.closest('a.nav-item');
      if (!a) return;
      const href = a.getAttribute('data-href');
      if (!href) return;
      
      // Optimistically set active
      document.querySelectorAll('.sidebar a.nav-item.active')
        .forEach(el => el.classList.remove('active'));
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    };

    sidebar.addEventListener('click', handleClick);
    return () => sidebar.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      <style>{`
        @import url('/styles/buttons.css');

        :root {
          --bg: #0b1220;
          --panel: #111a2e;
          --panelAlt: #0e1830;
          --text: #e6eef8;
          --muted: #a7b3c7;
          --line: #1f2a44;
          --accent: #3b82f6;
          --success: #17c964;
          --warning: #f4c152;
          --sidebar-bg: #1a2332;
          --sidebar-hover: #273548;
          --ripple-blue: #1F6FEB;
        }
        
        [data-theme="light"] {
          --bg: #f7fafc;
          --panel: #ffffff;
          --panelAlt: #f1f5f9;
          --text: #0b1220;
          --muted: #4b5563;
          --line: #e5e7eb;
          --accent: #2563eb;
          --success: #16a34a;
          --warning: #eab308;
          --sidebar-bg: #ffffff;
          --sidebar-hover: #f1f5f9;
        }
        
        .logo-blend {
          mix-blend-mode: screen;
        }
        
        .ripple-glow {
          position: relative;
        }
        
        .ripple-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 0.5rem;
          background: var(--ripple-blue);
          opacity: 0.3;
          filter: blur(8px);
          animation: ripple-pulse 2s ease-in-out infinite;
        }
        
        @keyframes ripple-pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.02);
          }
        }
        
        .ripple-glow-icon {
          filter: drop-shadow(0 0 4px var(--ripple-blue));
        }
        
        .panel-gradient {
          background: linear-gradient(180deg, var(--panelAlt), var(--panel));
        }
        
        .panel-hover:hover {
          box-shadow: 0 0 0 1px rgba(59,130,246,.15), 0 8px 24px rgba(2,6,23,.35);
        }
        
        [data-theme="light"] .panel-hover:hover {
          box-shadow: 0 0 0 1px rgba(37,99,235,.1), 0 8px 24px rgba(0,0,0,.08);
        }
        
        /* Enhanced Navigation with Higher Specificity */
        .sidebar a.nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--muted);
          border-left: 3px solid transparent;
          padding: 12px 16px;
          border-radius: 10px;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
          text-decoration: none;
          position: relative;
        }
        
        .sidebar a.nav-item:hover {
          background: rgba(59,130,246,0.08);
          color: #e6eef8;
        }
        
        .sidebar a.nav-item.active {
          background: rgba(59,130,246,0.16) !important;
          color: #ffffff !important;
          border-left-color: #3b82f6 !important;
          font-weight: 600;
          box-shadow: 0 0 0 1px rgba(59,130,246,0.18), 0 6px 18px rgba(2,6,23,0.35);
        }
        
        .sidebar a.nav-item.active svg {
          color: #3b82f6 !important;
          filter: drop-shadow(0 0 6px rgba(59,130,246,0.5));
        }
        
        .sidebar a.nav-item:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        
        /* Light theme overrides */
        [data-theme="light"] .sidebar a.nav-item.active {
          background: rgba(37,99,235,0.12) !important;
          color: #0b1220 !important;
          border-left-color: #2563eb !important;
          box-shadow: 0 0 0 1px rgba(37,99,235,0.15), 0 4px 12px rgba(0,0,0,0.08);
        }
        
        [data-theme="light"] .sidebar a.nav-item.active svg {
          color: #2563eb !important;
          filter: drop-shadow(0 0 6px rgba(37,99,235,0.4));
        }
        
        [data-theme="light"] .sidebar a.nav-item:hover {
          background: rgba(37,99,235,0.06);
          color: #1f2937;
        }
        
        .quick-theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 0.75rem;
          background: var(--panelAlt);
          border: 1px solid var(--line);
          color: var(--muted);
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .quick-theme-toggle:hover {
          background: var(--sidebar-hover);
          color: var(--text);
          border-color: var(--accent);
        }
        
        .quick-theme-toggle svg {
          width: 1.25rem;
          height: 1.25rem;
          transition: transform 0.3s ease;
        }
        
        .quick-theme-toggle:hover svg {
          transform: rotate(15deg);
        }
      `}</style>
      
      {/* Sidebar */}
      <aside className="sidebar w-64 min-h-screen flex flex-col" style={{ backgroundColor: 'var(--sidebar-bg)', borderRight: '1px solid var(--line)' }}>
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: 'var(--line)' }}>
          <Link to={createPageUrl("Dashboard")} className="block">
            <motion.img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fd9eaa10a3803cbfd64758/d47cf260c_XbuildPaylogo.png"
              alt="XBuild Pay"
              className="w-full h-auto logo-blend"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              const isHighlight = item.highlight;
              
              return (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={isHighlight ? 'ripple-glow' : ''}
                >
                  <Link
                    to={createPageUrl(item.path)}
                    className={`nav-item ${active ? 'active' : ''} ${isHighlight ? 'relative z-10' : ''}`}
                    data-href={item.href}
                    aria-current={active ? 'page' : undefined}
                  >
                    <Icon className={`w-5 h-5 ${isHighlight ? 'ripple-glow-icon' : ''}`} />
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* Quick Theme Toggle at bottom */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--line)' }}>
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="quick-theme-toggle w-full"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
        
        {/* Single Footer - Only rendered once here */}
        <footer className="py-6 px-8 border-t" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
          <div className="text-center text-sm">
            <p>© 2025 Xbuild Payments Inc. All rights reserved.</p>
            <p className="mt-1">Built on XRPL | Powered by Transparency | Engineered for Industry</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

