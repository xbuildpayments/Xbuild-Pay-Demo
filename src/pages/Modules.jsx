
import React, { useState, useEffect } from "react";
import { Search, ArrowLeft, Zap, Shield, Wallet, Award, Lock, Bell, FileText, DollarSign, CheckCircle2, Mic, Mail, Scan } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ModuleStore } from "@/components/modules/moduleStore";
import ModuleCard from "@/components/modules/ModuleCard";
import ConfigureModal from "@/components/modules/ConfigureModal";
import EchoSimulateModal from "@/components/modules/EchoSimulateModal";
import CIIMClassifierModal from "@/components/modules/CIIMClassifierModal";
import OmniScanModal from "@/components/modules/OmniScanModal";

const iconMap = {
  Wallet,
  Shield,
  CheckCircle2,
  Award,
  Lock,
  Bell,
  Zap,
  FileText,
  DollarSign,
  Mic,
  Mail,
  Scan
};

export default function Modules() {
  const [modules, setModules] = useState(ModuleStore.modules);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showEchoModal, setShowEchoModal] = useState(false);
  const [showCIIMModal, setShowCIIMModal] = useState(false);
  const [showOmniScanModal, setShowOmniScanModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const stats = ModuleStore.getStats();

  useEffect(() => {
    // Listen for module changes from other sources
    const handleModuleChange = () => {
      setModules([...ModuleStore.modules]);
    };

    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleToggle = (key) => {
    const module = ModuleStore.getModule(key);
    if (!module) return;

    if (module.status === "enabled") {
      ModuleStore.updateStatus(key, "disabled");
    } else if (module.status === "available" || module.status === "disabled") {
      // Check dependencies
      const { met, missing } = ModuleStore.checkDependencies(key);
      if (!met) {
        alert(`Cannot enable: Missing dependencies: ${missing.join(", ")}`);
        return;
      }
      ModuleStore.updateStatus(key, "enabled");
    }
    setModules([...ModuleStore.modules]);
  };

  const handleConfigure = (key) => {
    const module = ModuleStore.getModule(key);
    setSelectedModule(module);
  };

  const handleSpecialAction = (key, action) => {
    if (key === "echo" && action === "Simulate") {
      setShowEchoModal(true);
    } else if (key === "ciim" && action === "Run Classifier") {
      setShowCIIMModal(true);
    } else if (key === "omniscan" && (action === "View Scan" || action === "Score Milestone")) {
      setShowOmniScanModal(true);
    } else if (action === "Simulate Claim") {
      // Insurance simulation
      const event = new CustomEvent('xbp:simulate-claim');
      window.dispatchEvent(event);
    }
  };

  const handleSaveSettings = (key, settings) => {
    ModuleStore.updateSettings(key, settings);
    setModules([...ModuleStore.modules]);
    setSelectedModule(null);
  };

  const filteredModules = modules.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const coreModules = filteredModules.filter(m => m.category === "core");
  const intelligenceModules = filteredModules.filter(m => m.category === "intelligence");

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <style>{`
        .btn-ghost-light {
          background-color: rgba(255, 255, 255, 0.08);
          color: #E4E6EB;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-ghost-light:hover {
          background-color: rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.25);
        }

        .btn-outline-contrast {
          border: 1px solid rgba(255,255,255,0.3);
          color: #E4E6EB;
          background: transparent;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-outline-contrast:hover {
          background-color: rgba(255,255,255,0.12);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.4);
        }

        .btn-primary-bright {
          background: #3b82f6;
          color: #ffffff;
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: 600;
          transition: all 0.2s ease;
          box-shadow: 0 0 0 1px rgba(59,130,246,0.25);
        }
        .btn-primary-bright:hover {
          background: #2563eb;
          box-shadow: 0 0 0 2px rgba(59,130,246,0.5);
        }
      `}</style>

      {/* Header */}
      <motion.div
        className="border-b px-8 py-6"
        style={{ background: 'var(--panel)', borderColor: 'var(--line)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <Link
            to={createPageUrl("Dashboard")}
            className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
            style={{ color: 'var(--muted)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 rounded-lg" style={{ background: 'rgba(23,201,100,0.15)', border: '1px solid rgba(23,201,100,0.3)' }}>
              <span className="text-xs font-medium" style={{ color: 'var(--success)' }}>
                Enabled: {stats.enabled}
              </span>
            </div>
            <div className="px-4 py-2 rounded-lg" style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
              <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
                Available: {stats.available}
              </span>
            </div>
            <div className="px-4 py-2 rounded-lg" style={{ background: 'rgba(167,179,199,0.15)', border: '1px solid rgba(167,179,199,0.3)' }}>
              <span className="text-xs font-medium" style={{ color: 'var(--muted)' }}>
                Coming Soon: {stats.soon}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Platform Modules</h1>
            <p className="mt-1" style={{ color: 'var(--muted)' }}>Extend XBuild Pay with powerful integrations</p>
          </div>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted)' }} />
            <Input
              placeholder="Search modules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-lg"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Core Modules */}
          {coreModules.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Core Infrastructure</h2>
              <div className="grid grid-cols-2 gap-6">
                {coreModules.map((module, index) => {
                  const Icon = iconMap[module.icon] || Zap;
                  return (
                    <ModuleCard
                      key={module.key}
                      module={module}
                      Icon={Icon}
                      index={index}
                      onToggle={handleToggle}
                      onConfigure={handleConfigure}
                      onSpecialAction={handleSpecialAction}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Intelligence & Automation */}
          {intelligenceModules.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Intelligence & Automation</h2>
              <div className="grid grid-cols-3 gap-6">
                {intelligenceModules.map((module, index) => {
                  const Icon = iconMap[module.icon] || Zap;
                  return (
                    <ModuleCard
                      key={module.key}
                      module={module}
                      Icon={Icon}
                      index={index}
                      onToggle={handleToggle}
                      onConfigure={handleConfigure}
                      onSpecialAction={handleSpecialAction}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {selectedModule && selectedModule.category !== "intelligence" && (
        <ConfigureModal
          module={selectedModule}
          onClose={() => setSelectedModule(null)}
          onSave={handleSaveSettings}
        />
      )}

      {showEchoModal && (
        <EchoSimulateModal onClose={() => setShowEchoModal(false)} />
      )}

      {showCIIMModal && (
        <CIIMClassifierModal onClose={() => setShowCIIMModal(false)} />
      )}

      {showOmniScanModal && (
        <OmniScanModal onClose={() => setShowOmniScanModal(false)} />
      )}
    </div>
  );
}
