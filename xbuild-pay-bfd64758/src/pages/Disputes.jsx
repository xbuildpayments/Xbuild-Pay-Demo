
import React, { useState } from "react";
import { Search, Plus, AlertTriangle, Clock, CheckCircle2, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CaseDrawer from "../components/disputes/CaseDrawer";
import NewCaseModal from "../components/disputes/NewCaseModal";

const disputeCases = [
  {
    id: "DSP-2024-001",
    project: "Downtown Plaza Construction",
    status: "open",
    filed: "2024-01-15",
    amountUSD: 45000,
    amountXRP: 86520,
    parties: { developer: "rDev…8H2", contractor: "rGC…4K8", supplier: "rSup…2L9" },
    escrow: { state: "Paused", heldPct: 20 },
    timeline: [
      { step: "Submitted", ts: "2024-01-15 10:12", actor: "Contractor" },
      { step: "Evidence Uploaded", ts: "2024-01-16 09:01", actor: "Contractor" },
      { step: "Mediation Started", ts: "2024-01-17 15:40", actor: "Arbitrator" }
    ],
    ai: { confidence: 0.81, flags: ["Scope mismatch in BoQ"] },
    trustImpact: { win: 3, lose: -5, settle: 1 },
    hash: "7C1A…9F2",
    evidence: [
      { type: "PDF", name: "Change_Order_17.pdf" },
      { type: "JPG", name: "Ceiling_Run_Photo.jpg" }
    ],
    issue: "Delayed milestone payment approval",
    messages: [
      { from: "Contractor", message: "Payment was approved by site manager on 1/14", timestamp: "2024-01-15 10:15" },
      { from: "Developer", message: "Site manager approval process was not completed properly", timestamp: "2024-01-15 14:30" },
      { from: "Arbitrator", message: "Reviewing submission documentation", timestamp: "2024-01-17 15:42" }
    ]
  },
  {
    id: "DSP-2024-002",
    project: "Harbor View Residential Complex",
    status: "under_review",
    filed: "2024-01-10",
    amountUSD: 28000,
    amountXRP: 53710,
    parties: { developer: "rDev…8H2", contractor: "rGC…4K8" },
    escrow: { state: "Held", heldPct: 15 },
    timeline: [
      { step: "Submitted", ts: "2024-01-10 11:25", actor: "Contractor" },
      { step: "Evidence Uploaded", ts: "2024-01-11 08:05", actor: "Contractor" }
    ],
    ai: { confidence: 0.74, flags: ["Conflicting inspection notes"] },
    trustImpact: { win: 2, lose: -4, settle: 1 },
    hash: "B4E8…2D0",
    evidence: [{ type: "MOV", name: "HVAC_Install_Video.mov" }],
    issue: "Quality dispute on HVAC installation",
    messages: [
      { from: "Contractor", message: "Installation completed per spec", timestamp: "2024-01-10 11:30" },
      { from: "Developer", message: "Quality inspection failed thermal efficiency test", timestamp: "2024-01-11 09:20" }
    ]
  },
  {
    id: "DSP-2023-087",
    project: "Tech Campus Phase 2",
    status: "resolved",
    filed: "2023-12-20",
    amountUSD: 15000,
    amountXRP: 28800,
    parties: { developer: "rDev…8H2", contractor: "rGC…4K8" },
    escrow: { state: "Released", heldPct: 0 },
    timeline: [
      { step: "Submitted", ts: "2023-12-20 09:32", actor: "Contractor" },
      { step: "Mediation Started", ts: "2023-12-21 10:05", actor: "Arbitrator" },
      { step: "Decision Issued", ts: "2023-12-23 14:41", actor: "Arbitrator" },
      { step: "Funds Released", ts: "2023-12-23 14:42", actor: "System" }
    ],
    ai: { confidence: 0.89, flags: [] },
    trustImpact: { win: 2, lose: -5, settle: 1 },
    hash: "A93F…77C",
    evidence: [{ type: "PDF", name: "Final_Settlement.pdf" }],
    issue: "Additional work scope disagreement",
    resolution: "Settled via smart contract arbitration",
    messages: [
      { from: "Contractor", message: "Additional work was approved verbally", timestamp: "2023-12-20 09:35" },
      { from: "Developer", message: "No written approval was provided", timestamp: "2023-12-20 15:10" },
      { from: "Arbitrator", message: "Settlement proposed: 50% of claimed amount", timestamp: "2023-12-22 11:00" },
      { from: "Both Parties", message: "Settlement accepted", timestamp: "2023-12-23 14:30" }
    ]
  }
];

export default function Disputes() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCase, setSelectedCase] = useState(null);
  const [cases, setCases] = useState(disputeCases);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);

  const statusConfig = {
    open: { color: "text-red-600", bg: "bg-red-100", label: "Open", icon: AlertTriangle },
    under_review: { color: "text-yellow-600", bg: "bg-yellow-100", label: "Under Review", icon: Clock },
    resolved: { color: "text-green-600", bg: "bg-green-100", label: "Resolved", icon: CheckCircle2 }
  };

  const filteredCases = statusFilter === "all" ? cases : cases.filter(c => c.status === statusFilter);

  const updateCase = (caseId, updates) => {
    setCases(prevCases => 
      prevCases.map(c => c.id === caseId ? { ...c, ...updates } : c)
    );
    if (selectedCase?.id === caseId) {
      setSelectedCase(prev => ({ ...prev, ...updates }));
    }
  };

  const createNewCase = (caseData) => {
    const newCase = {
      id: `DSP-2025-${String(cases.length + 1).padStart(3, '0')}`,
      project: caseData.project,
      status: "open",
      filed: new Date().toISOString().split('T')[0],
      amountUSD: caseData.amount,
      amountXRP: Math.round(caseData.amount / 0.52),
      parties: { developer: "rDev…NEW", contractor: "rGC…NEW" },
      escrow: { state: "Held", heldPct: 100 },
      timeline: [
        { step: "Submitted", ts: new Date().toLocaleString(), actor: "Developer" }
      ],
      ai: { confidence: 0.0, flags: ["Awaiting review"] },
      trustImpact: { win: 2, lose: -3, settle: 1 },
      hash: "",
      evidence: [],
      issue: caseData.description,
      messages: []
    };

    setCases([newCase, ...cases]);
    
    // Show toast
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = `Case ${newCase.id} created (demo mode)`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const totalCases = cases.length;
  const openCases = cases.filter(c => c.status === 'open').length;
  const underReviewCases = cases.filter(c => c.status === 'under_review').length;
  const avgResolutionTime = "4.2 days";

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

      {/* Header */}
      <motion.div 
        className="border-b px-8 py-6"
        style={{ background: 'var(--panel)', borderColor: 'var(--line)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Arbitration Center</h1>
            <p className="mt-1" style={{ color: 'var(--muted)' }}>Blockchain-verified dispute resolution</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted)' }} />
              <Input 
                placeholder="Search disputes..."
                className="pl-10 rounded-lg"
                style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
              />
            </div>
            <Button 
              onClick={() => setShowNewCaseModal(true)}
              className="btn-primary rounded-lg px-4 py-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Case
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20"> {/* Added pb-20 here as per outline */}
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl shadow-sm p-6 panel-hover"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <p className="text-sm font-medium mb-2 uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Total Cases</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{totalCases}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-xl shadow-sm p-6 panel-hover"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <p className="text-sm font-medium mb-2 uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Open Cases</p>
              <p className="text-3xl font-bold text-red-600">{openCases}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-xl shadow-sm p-6 panel-hover"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <p className="text-sm font-medium mb-2 uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Under Review</p>
              <p className="text-3xl font-bold text-yellow-600">{underReviewCases}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-xl shadow-sm p-6 panel-hover"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <p className="text-sm font-medium mb-2 uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Avg Resolution Time</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{avgResolutionTime}</p>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="rounded-xl shadow-sm p-4"
            style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>Filter by Status:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 rounded-lg" style={{ border: '1px solid var(--line)', background: 'var(--panelAlt)', color: 'var(--text)' }}>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                  <SelectItem value="all">All Cases</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Disputes List */}
          <div className="space-y-4">
            {filteredCases.map((dispute, index) => {
              const config = statusConfig[dispute.status];
              const StatusIcon = config.icon;
              return (
                <motion.div
                  key={dispute.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="rounded-xl shadow-sm p-6 panel-hover cursor-pointer"
                  style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                  onClick={() => setSelectedCase(dispute)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>{dispute.id}</h3>
                        <span className={`inline-flex items-center gap-1 px-3 py-1 ${config.bg} ${config.color} text-xs font-semibold rounded-full`}>
                          <StatusIcon className="w-3 h-3" />
                          {config.label}
                        </span>
                      </div>
                      <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>{dispute.issue}</p>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p style={{ color: 'var(--muted)' }}>Project</p>
                          <p className="font-medium" style={{ color: 'var(--text)' }}>{dispute.project}</p>
                        </div>
                        <div>
                          <p style={{ color: 'var(--muted)' }}>Amount in Dispute</p>
                          <p className="font-medium" style={{ color: 'var(--text)' }}>${dispute.amountUSD.toLocaleString()}</p>
                          <p className="text-xs" style={{ color: 'var(--muted)' }}>{dispute.amountXRP.toLocaleString()} XRP</p>
                        </div>
                        <div>
                          <p style={{ color: 'var(--muted)' }}>Filed Date</p>
                          <p className="font-medium" style={{ color: 'var(--text)' }}>{dispute.filed}</p>
                        </div>
                      </div>
                      {dispute.evidence && (
                        <div className="mt-3 flex items-center gap-2">
                          <FileText className="w-4 h-4" style={{ color: 'var(--muted)' }} />
                          <span className="text-xs" style={{ color: 'var(--muted)' }}>
                            {dispute.evidence.length} evidence files submitted
                          </span>
                        </div>
                      )}
                    </div>
                    <Button 
                      className="btn-secondary rounded-lg px-4 py-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCase(dispute);
                      }}
                    >
                      View Case
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Case Drawer */}
      {selectedCase && (
        <CaseDrawer
          disputeCase={selectedCase}
          onClose={() => setSelectedCase(null)}
          onUpdate={updateCase}
        />
      )}

      {/* New Case Modal */}
      {showNewCaseModal && (
        <NewCaseModal
          onClose={() => setShowNewCaseModal(false)}
          onSubmit={createNewCase}
        />
      )}
    </div>
  );
}
