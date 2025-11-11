
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Wallet, MessageSquare, FileText, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import CaseTimeline from "./CaseTimeline";
import AITrustBox from "./AITrustBox";
import EvidenceModal from "./EvidenceModal";
import SettlementModal from "./SettlementModal";
import PartialReleaseModal from "./PartialReleaseModal";

export default function CaseDrawer({ disputeCase, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState("evidence");
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [showSettlementModal, setShowSettlementModal] = useState(false);
  const [showPartialReleaseModal, setShowPartialReleaseModal] = useState(false);
  const [localCase, setLocalCase] = useState(disputeCase);

  const statusConfig = {
    open: { color: "text-red-600", bg: "bg-red-100", label: "Open" },
    under_review: { color: "text-yellow-600", bg: "bg-yellow-100", label: "Under Review" },
    resolved: { color: "text-green-600", bg: "bg-green-100", label: "Resolved" }
  };

  const config = statusConfig[localCase.status];

  const showToast = (message) => {
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const toggleEscrow = () => {
    const newState = localCase.escrow.state === "Paused" ? "Held" : "Paused";
    const updatedCase = {
      ...localCase,
      escrow: { ...localCase.escrow, state: newState },
      timeline: [
        ...localCase.timeline,
        {
          step: newState === "Paused" ? "Escrow Paused" : "Escrow Resumed",
          ts: new Date().toLocaleString(),
          actor: "System"
        }
      ]
    };
    setLocalCase(updatedCase);
    onUpdate(localCase.id, updatedCase);
    showToast(`Escrow ${newState === "Paused" ? "paused" : "resumed"}`);
  };

  const handlePartialRelease = (data) => {
    const updatedCase = {
      ...localCase,
      escrow: { ...localCase.escrow, heldPct: Math.max(0, localCase.escrow.heldPct - data.percent) },
      timeline: [
        ...localCase.timeline,
        {
          step: `Partial Release ${data.percent}%`,
          ts: new Date().toLocaleString(),
          actor: "System",
          note: `To ${data.payee}: $${(localCase.amountUSD * data.percent / 100).toFixed(0)}`
        }
      ]
    };
    setLocalCase(updatedCase);
    onUpdate(localCase.id, updatedCase);
    showToast(`Partial release of ${data.percent}% issued`);
  };

  const handleSettlement = (data) => {
    const updatedCase = {
      ...localCase,
      timeline: [
        ...localCase.timeline,
        {
          step: data.action === "send" ? "Offer Sent" : "Settlement Accepted",
          ts: new Date().toLocaleString(),
          actor: data.action === "send" ? "Arbitrator" : "Both Parties",
          note: data.notes
        }
      ]
    };
    setLocalCase(updatedCase);
    onUpdate(localCase.id, updatedCase);
    showToast(data.action === "send" ? "Settlement offer sent" : "Settlement accepted");
    
    if (data.action === "accept") {
      setTimeout(() => setShowPartialReleaseModal(true), 500);
    }
  };

  const copyHash = () => {
    navigator.clipboard.writeText(localCase.hash);
    showToast("Hash copied to clipboard!");
  };

  const isEscrowDisabled = localCase.escrow.state === "Released";

  return (
    <>
      <style>{`
        .btn-primary {
          background: #3b82f6;
          color: #ffffff;
          font-weight: 600;
          border: none;
          box-shadow: 0 0 0 1px rgba(59,130,246,0.25);
        }
        .btn-primary:hover:not(:disabled) {
          background: #2563eb;
          box-shadow: 0 0 0 2px rgba(59,130,246,0.5);
        }
        .btn-primary:disabled {
          background: rgba(59,130,246,0.25);
          color: rgba(255,255,255,0.45);
          cursor: not-allowed;
        }
        .btn-primary:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
        .btn-secondary {
          background: var(--panelAlt);
          color: var(--text);
          font-weight: 600;
          border: 1px solid var(--line);
        }
        .btn-secondary:hover:not(:disabled) {
          background: var(--panel);
          border-color: #3b82f6;
          color: #ffffff;
        }
        .btn-secondary:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 z-50"
          onClick={onClose}
        />
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30 }}
          className="fixed right-0 top-0 h-screen w-[1024px] overflow-y-auto z-50"
          style={{ background: 'var(--panel)', borderLeft: '1px solid var(--line)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 px-8 py-6 border-b" style={{ background: 'var(--panel)', borderColor: 'var(--line)' }}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{localCase.id}</h2>
                  <span className={`inline-flex items-center px-3 py-1 ${config.bg} ${config.color} text-xs font-semibold rounded-full`}>
                    {config.label}
                  </span>
                </div>
                <p className="text-sm mb-1" style={{ color: 'var(--muted)' }}>{localCase.project}</p>
                <p className="text-sm" style={{ color: 'var(--muted)' }}>Filed: {localCase.filed}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg transition-colors"
                style={{ color: 'var(--muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--panelAlt)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Amount & Parties */}
            <div className="rounded-xl p-6" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
              <h3 className="text-sm font-semibold uppercase mb-4" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Dispute Details</h3>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div>
                  <p className="text-sm mb-1" style={{ color: 'var(--muted)' }}>Amount in Dispute</p>
                  <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>${localCase.amountUSD.toLocaleString()}</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>{localCase.amountXRP.toLocaleString()} XRP</p>
                </div>
                <div>
                  <p className="text-sm mb-1" style={{ color: 'var(--muted)' }}>Issue</p>
                  <p className="font-medium" style={{ color: 'var(--text)' }}>{localCase.issue}</p>
                </div>
              </div>
              <div className="border-t pt-4" style={{ borderColor: 'var(--line)' }}>
                <p className="text-sm mb-3 font-semibold" style={{ color: 'var(--muted)' }}>Parties</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'var(--text)' }}>Developer</span>
                    <code className="text-xs font-mono" style={{ color: 'var(--accent)' }}>{localCase.parties.developer}</code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'var(--text)' }}>Contractor</span>
                    <code className="text-xs font-mono" style={{ color: 'var(--accent)' }}>{localCase.parties.contractor}</code>
                  </div>
                  {localCase.parties.supplier && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm" style={{ color: 'var(--text)' }}>Supplier</span>
                      <code className="text-xs font-mono" style={{ color: 'var(--accent)' }}>{localCase.parties.supplier}</code>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Smart Escrow Status */}
            <div className="rounded-xl p-6" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                <h3 className="text-sm font-semibold uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Smart Escrow Status</h3>
              </div>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm" style={{ color: 'var(--text)' }}>State</span>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    localCase.escrow.state === "Paused" ? 'bg-yellow-100 text-yellow-700' :
                    localCase.escrow.state === "Held" ? 'bg-blue-100 text-blue-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {localCase.escrow.state}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: 'var(--text)' }}>Funds Held</span>
                  <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>{localCase.escrow.heldPct}%</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={toggleEscrow}
                  disabled={isEscrowDisabled}
                  className="btn-secondary flex-1 rounded-lg px-4 py-2"
                >
                  {localCase.escrow.state === "Paused" ? "Resume" : "Pause"} Escrow
                </Button>
                <Button
                  onClick={() => setShowPartialReleaseModal(true)}
                  disabled={isEscrowDisabled || localCase.escrow.heldPct === 0}
                  className="btn-secondary flex-1 rounded-lg px-4 py-2"
                >
                  Partial Release
                </Button>
                <Button
                  onClick={() => setShowSettlementModal(true)}
                  disabled={isEscrowDisabled}
                  className="btn-primary flex-1 rounded-lg px-4 py-2"
                >
                  Propose Settlement
                </Button>
              </div>
            </div>

            {/* Evidence & Messages Tabs */}
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--line)' }}>
              <div className="flex border-b" style={{ background: 'var(--panelAlt)', borderColor: 'var(--line)' }}>
                <button
                  onClick={() => setActiveTab("evidence")}
                  className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === "evidence" ? 'border-b-2' : ''
                  }`}
                  style={{
                    color: activeTab === "evidence" ? 'var(--accent)' : 'var(--muted)',
                    borderColor: activeTab === "evidence" ? 'var(--accent)' : 'transparent'
                  }}
                >
                  <FileText className="w-4 h-4 inline mr-2" />
                  Evidence
                </button>
                <button
                  onClick={() => setActiveTab("messages")}
                  className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === "messages" ? 'border-b-2' : ''
                  }`}
                  style={{
                    color: activeTab === "messages" ? 'var(--accent)' : 'var(--muted)',
                    borderColor: activeTab === "messages" ? 'var(--accent)' : 'transparent'
                  }}
                >
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Messages
                </button>
              </div>

              <div className="p-6" style={{ background: 'var(--panel)' }}>
                {activeTab === "evidence" ? (
                  <div className="grid grid-cols-2 gap-4">
                    {localCase.evidence.map((file, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedEvidence(file);
                          setShowEvidenceModal(true);
                        }}
                        className="p-4 rounded-lg border text-left transition-all"
                        style={{ background: 'var(--panelAlt)', borderColor: 'var(--line)' }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--line)'}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`px-3 py-1 text-xs font-semibold rounded ${
                            file.type === 'PDF' ? 'bg-red-100 text-red-700' :
                            file.type === 'JPG' ? 'bg-blue-100 text-blue-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            {file.type}
                          </div>
                          <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{file.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {localCase.messages.map((msg, index) => (
                      <div key={index} className="p-4 rounded-lg" style={{ background: 'var(--panelAlt)' }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{msg.from}</span>
                          <span className="text-xs" style={{ color: 'var(--muted)' }}>{msg.timestamp}</span>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--text)' }}>{msg.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Case Timeline */}
            <div className="rounded-xl p-6" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
              <h3 className="text-sm font-semibold uppercase mb-6" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Case Timeline</h3>
              <CaseTimeline timeline={localCase.timeline} />
            </div>

            {/* AI & TrustScore */}
            <AITrustBox ai={localCase.ai} trustImpact={localCase.trustImpact} />

            {/* On-Chain Record */}
            {localCase.status === "resolved" && (
              <div className="rounded-xl p-6" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
                <h3 className="text-sm font-semibold uppercase mb-4" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>On-Chain Record</h3>
                {localCase.resolution && (
                  <div className="mb-4">
                    <p className="text-sm mb-1" style={{ color: 'var(--muted)' }}>Decision</p>
                    <p className="font-medium" style={{ color: 'var(--text)' }}>{localCase.resolution}</p>
                  </div>
                )}
                <div className="flex items-center gap-3 p-4 rounded-lg" style={{ background: 'rgba(23,201,100,.14)', border: '1px solid var(--success)' }}>
                  <div className="flex-1">
                    <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>XRPL Transaction Hash</p>
                    <code className="text-sm font-mono font-bold" style={{ color: 'var(--success)' }}>{localCase.hash}</code>
                  </div>
                  <Button onClick={copyHash} variant="outline" size="sm" className="rounded-lg" style={{ border: '1px solid var(--success)', color: 'var(--success)' }}>
                    Copy
                  </Button>
                  <a
                    href={`https://livenet.xrpl.org/transactions/${localCase.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="rounded-lg" style={{ border: '1px solid var(--success)', color: 'var(--success)' }}>
                      Explorer
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modals */}
      {showEvidenceModal && (
        <EvidenceModal
          evidence={selectedEvidence}
          onClose={() => setShowEvidenceModal(false)}
        />
      )}
      {showSettlementModal && (
        <SettlementModal
          onClose={() => setShowSettlementModal(false)}
          onSubmit={handleSettlement}
          disputeCase={localCase}
        />
      )}
      {showPartialReleaseModal && (
        <PartialReleaseModal
          onClose={() => setShowPartialReleaseModal(false)}
          onSubmit={handlePartialRelease}
          disputeCase={localCase}
        />
      )}
    </>
  );
}
