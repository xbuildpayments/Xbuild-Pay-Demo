
import React, { useState } from "react";
import { Search, Plus, Shield, AlertCircle, CheckCircle2, Clock, MapPin, FileText, ArrowLeft, Play, Pause } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { InsuranceStore } from "@/components/insurance/insuranceStore";
import PolicyLogicDrawer from "@/components/insurance/PolicyLogicDrawer";
import UnderwriterPanel from "@/components/insurance/UnderwriterPanel";
import EscrowCoordination from "@/components/insurance/EscrowCoordination";
import ClaimTimeline from "@/components/insurance/ClaimTimeline";
import TrustScoreDrawer from "@/components/insurance/TrustScoreDrawer";

export default function Insurance() {
  const [policies] = useState(InsuranceStore.policies);
  const [incidents, setIncidents] = useState(InsuranceStore.incidents);
  const [claims, setClaims] = useState(InsuranceStore.claims);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [showTrustScore, setShowTrustScore] = useState(false);
  const [trustScoreProject, setTrustScoreProject] = useState(null);
  const [autoApprove, setAutoApprove] = useState(false);

  const unresolvedIncidents = incidents.filter(i => !i.resolved);
  const totalCoverage = policies.reduce((sum, p) => sum + p.coverage, 0);
  const totalPremium = policies.reduce((sum, p) => sum + p.premium, 0);
  const expiringCount = policies.filter(p => p.status === 'ExpiringSoon').length;

  const simulateIncident = () => {
    const newIncident = {
      project: "Downtown Plaza Construction",
      type: "Damage",
      evidence: 2,
      geo: "34.052,-118.243",
      delayDays: 8,
      severity: "high"
    };
    InsuranceStore.addIncident(newIncident);
    setIncidents([...InsuranceStore.incidents]);
  };

  const runPolicyCheck = (incident) => {
    const policy = policies.find(p => p.project === incident.project);
    if (!policy) {
      alert("No policy found for this project");
      return;
    }

    const eligible = incident.delayDays >= policy.delayThresholdDays;
    if (eligible) {
      const existingClaim = claims.find(c => c.incidentId === incident.id);
      if (!existingClaim) {
        const newClaim = InsuranceStore.createClaim(policy.id, incident.id, incident.severity === 'high' ? 45000 : 28000);
        setClaims([...InsuranceStore.claims]);
        setSelectedClaim(newClaim);
      } else {
        setSelectedClaim(existingClaim);
      }
    } else {
      alert(`Incident delay (${incident.delayDays} days) does not meet threshold (${policy.delayThresholdDays} days)`);
    }
  };

  const handleUnderwriterDecision = (claimId, decision) => {
    InsuranceStore.updateClaimStatus(claimId, decision === 'approve' ? 'Approved' : 'Rejected');
    const claim = InsuranceStore.claims.find(c => c.id === claimId);
    if (decision === 'approve') {
      claim.escrowFrozen = false;
    }
    setClaims([...InsuranceStore.claims]);
    setSelectedClaim(claim);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <style>{`
        .btn-primary {
          background: #3b82f6;
          color: #ffffff;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          padding: 10px 20px;
          transition: all 0.2s ease;
          box-shadow: 0 0 0 1px rgba(59,130,246,0.25);
        }
        .btn-primary:hover:not(:disabled) {
          background: #2563eb;
          box-shadow: 0 0 0 2px rgba(59,130,246,0.5);
        }
        .btn-secondary {
          background: var(--panelAlt);
          color: var(--text);
          font-weight: 600;
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 10px 20px;
          transition: all 0.2s ease;
        }
        .btn-secondary:hover:not(:disabled) {
          background: var(--panel);
          border-color: #3b82f6;
        }
        .incident-banner {
          background: linear-gradient(90deg, rgba(59,130,246,0.15), rgba(59,130,246,0.08));
          border: 1px solid rgba(59,130,246,0.3);
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }
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
          <Link to={createPageUrl("Dashboard")} className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity" style={{ color: 'var(--muted)' }}>
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={simulateIncident}
              className="btn-secondary text-sm"
            >
              Simulate Incident
            </button>
            <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--text)' }}>
              <input
                type="checkbox"
                checked={autoApprove}
                onChange={(e) => setAutoApprove(e.target.checked)}
                className="w-4 h-4"
              />
              Auto-Approve Under $50k
            </label>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Insurance Management</h1>
            <p className="mt-1" style={{ color: 'var(--muted)' }}>Smart claim processing & escrow coordination</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted)' }} />
              <Input 
                placeholder="Search policies..."
                className="pl-10 rounded-lg"
                style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
              />
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Policy
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl shadow-sm p-6 panel-hover"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Active Policies</p>
                <Shield className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{policies.length}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl shadow-sm p-6 panel-hover"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Total Coverage</p>
                <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--success)' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>${(totalCoverage / 1000000).toFixed(1)}M</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl shadow-sm p-6 panel-hover"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Annual Premium</p>
                <FileText className="w-5 h-5" style={{ color: 'var(--warning)' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>${totalPremium.toLocaleString()}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl shadow-sm p-6 panel-hover"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Expiring Soon</p>
                <AlertCircle className="w-5 h-5" style={{ color: 'var(--warning)' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--warning)' }}>{expiringCount}</p>
            </motion.div>
          </div>

          {/* Incident Trigger Banner */}
          <AnimatePresence>
            {unresolvedIncidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="incident-banner"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <AlertCircle className="w-6 h-6" style={{ color: '#3b82f6' }} />
                    <div>
                      <p className="font-bold" style={{ color: 'var(--text)' }}>
                        Field Event Detected: {incident.id}
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                        {incident.evidence} evidence files • delay = {incident.delayDays} days • 
                        <MapPin className="w-3 h-3 inline ml-2 mr-1" />
                        geo-tag OK ({incident.geo})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="btn-secondary text-sm">
                      View Evidence
                    </button>
                    <button 
                      onClick={() => runPolicyCheck(incident)}
                      className="btn-primary text-sm"
                    >
                      Run Policy Check
                    </button>
                    {claims.find(c => c.incidentId === incident.id) && (
                      <button 
                        onClick={() => setSelectedClaim(claims.find(c => c.incidentId === incident.id))}
                        className="btn-primary text-sm"
                      >
                        Open Claim {claims.find(c => c.incidentId === incident.id).id}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Policy Cards */}
          <div className="space-y-4">
            {policies.map((policy, index) => (
              <motion.div
                key={policy.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="rounded-xl shadow-sm p-6 panel-hover"
                style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                      <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>{policy.type}</h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        policy.status === 'Active' 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-yellow-900/30 text-yellow-400'
                      }`}>
                        {policy.status === 'Active' ? 'Active' : 'Expiring Soon'}
                      </span>
                      {policy.autoFreeze && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-900/30 text-blue-400">
                          Auto-Freeze: ON
                        </span>
                      )}
                    </div>
                    <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                      {policy.provider} • Policy #{policy.policyNumber}
                    </p>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p style={{ color: 'var(--muted)' }}>Project</p>
                        <p className="font-medium" style={{ color: 'var(--text)' }}>{policy.project}</p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--muted)' }}>Coverage Amount</p>
                        <p className="font-medium" style={{ color: 'var(--text)' }}>${(policy.coverage / 1000000).toFixed(1)}M</p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--muted)' }}>Deductible</p>
                        <p className="font-medium" style={{ color: 'var(--text)' }}>${policy.deductible.toLocaleString()}</p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--muted)' }}>Delay Threshold</p>
                        <p className="font-medium" style={{ color: 'var(--text)' }}>{policy.delayThresholdDays} days</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedPolicy(policy)}
                      className="btn-secondary"
                    >
                      View Policy Logic
                    </button>
                    <button
                      onClick={() => {
                        setTrustScoreProject(policy.project);
                        setShowTrustScore(true);
                      }}
                      className="btn-secondary"
                    >
                      TrustScore
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Policy Logic Drawer */}
      {selectedPolicy && (
        <PolicyLogicDrawer
          policy={selectedPolicy}
          incidents={incidents}
          onClose={() => setSelectedPolicy(null)}
          onRunCheck={(incident) => runPolicyCheck(incident)}
        />
      )}

      {/* Underwriter Panel & Related */}
      <AnimatePresence>
        {selectedClaim && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedClaim(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
              style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
            >
              <div className="p-6 border-b" style={{ borderColor: 'var(--line)' }}>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Claim {selectedClaim.id}</h2>
                  <button
                    onClick={() => setSelectedClaim(null)}
                    className="text-2xl" style={{ color: 'var(--muted)' }}
                  >
                    ×
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Claim Timeline */}
                <ClaimTimeline claim={selectedClaim} />

                <div className="grid grid-cols-2 gap-6">
                  {/* Underwriter Panel */}
                  <UnderwriterPanel
                    claim={selectedClaim}
                    onDecision={handleUnderwriterDecision}
                    autoApprove={autoApprove}
                  />

                  {/* Escrow Coordination */}
                  <EscrowCoordination
                    claim={selectedClaim}
                    policy={policies.find(p => p.id === selectedClaim.policyId)}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TrustScore Drawer */}
      {showTrustScore && (
        <TrustScoreDrawer
          project={trustScoreProject}
          score={InsuranceStore.trustScore[trustScoreProject]}
          onClose={() => {
            setShowTrustScore(false);
            setTrustScoreProject(null);
          }}
        />
      )}
    </div>
  );
}
