import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { MapPin, TrendingUp, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import TrustComplianceStrip from "./TrustComplianceStrip";
import RippleMiniFlow from "./RippleMiniFlow";
import TransactionFlowModal from "./TransactionFlowModal";
import AuditTrailModal from "./AuditTrailModal";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();
  const [showFlowModal, setShowFlowModal] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);

  return (
    <>
      <motion.div 
        className="rounded-xl overflow-hidden panel-hover panel-gradient"
        style={{ border: '1px solid var(--line)' }}
        whileHover={{ scale: 1.01 }}
      >
        {/* Header */}
        <div className="p-6 border-b" style={{ borderColor: 'var(--line)' }}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>{project.name}</h2>
              <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>{project.contractor}</p>
              <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--muted)' }}>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {project.location}
                </div>
              </div>
            </div>
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <button 
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
                style={{
                  background: 'var(--panelAlt)',
                  color: 'var(--text)'
                }}
              >
                <span className="text-sm font-medium">Alerts</span>
                <AlertCircle className="w-4 h-4" style={{ color: 'var(--warning)' }} />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 divide-x" style={{ borderColor: 'var(--line)' }}>
          <div className="p-6">
            <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Contract Value</p>
            <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>${project.total_budget.toLocaleString()}</p>
          </div>
          <div className="p-6">
            <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Escrow Balance</p>
            <motion.p 
              className="text-3xl font-bold"
              style={{ color: 'var(--accent)' }}
              whileHover={{ scale: 1.05 }}
            >
              ${project.escrow_balance.toLocaleString()}
            </motion.p>
          </div>
          <div className="p-6">
            <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Progress</p>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{project.progress_percentage}%</p>
              <TrendingUp className="w-5 h-5" style={{ color: 'var(--success)' }} />
            </div>
          </div>
        </div>

        {/* NEW: Trust & Compliance + Ripple Flow */}
        <div className="p-6 border-t" style={{ background: 'var(--panelAlt)', borderColor: 'var(--line)' }}>
          <div className="grid grid-cols-2 gap-6 mb-4">
            <div>
              <p className="text-xs font-medium uppercase mb-3" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Trust & Compliance</p>
              <TrustComplianceStrip
                trustScore={project.trustScore || 92}
                insuranceStatus={project.insuranceStatus || "Policy Active"}
                kyc={project.kyc || "Verified"}
                onAuditTrailClick={() => setShowAuditModal(true)}
              />
            </div>
            <div>
              <p className="text-xs font-medium uppercase mb-3" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Transaction Flow</p>
              <RippleMiniFlow
                stage="ESCROW"
                payoutPct={project.lastMilestone?.payoutPct || 15}
                onViewFlow={() => setShowFlowModal(true)}
              />
            </div>
          </div>

          {/* Milestones Section */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-xs font-medium uppercase mb-1" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Milestones</p>
              <p className="text-lg font-bold" style={{ color: 'var(--text)' }}>3 In Progress</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase mb-1" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Status</p>
              <div className="flex items-center gap-2">
                <motion.div 
                  className="w-2 h-2 rounded-full"
                  style={{ background: 'var(--success)' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>In Progress</span>
              </div>
            </div>
            <div>
              <p className="text-xs font-medium uppercase mb-1" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Alerts</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: 'var(--success)' }}></div>
                <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>Inspection Passed</span>
              </div>
            </div>
          </div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              onClick={() => navigate(createPageUrl(`ProjectDetail?id=${project.id}`))}
              className="w-full rounded-lg h-11 font-semibold shadow-sm transition-all duration-200"
              style={{
                background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                color: '#ffffff'
              }}
            >
              View Project Details
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <TransactionFlowModal
        isOpen={showFlowModal}
        onClose={() => setShowFlowModal(false)}
        project={project}
      />

      <AuditTrailModal
        isOpen={showAuditModal}
        onClose={() => setShowAuditModal(false)}
        project={project}
      />
    </>
  );
}