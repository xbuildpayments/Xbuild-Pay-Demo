import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bus } from "@/components/utils/bus";

export default function CIIMClassifierModal({ onClose }) {
  const handleRunClassifier = () => {
    // Emit bus event
    Bus.emit("ciim:email:classified", {
      subject: "Notice of Delay",
      action: "PAUSE_ESCROW",
      duration: "2 days",
      trustScoreImpact: -2
    });

    // Show toast
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = 'Escrow Paused: 2 days (from CIIM)';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);

    // Emit to insurance
    Bus.emit("insurance:risk:detected", { source: "CIIM", severity: "medium" });

    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-lg w-full rounded-xl shadow-2xl"
          style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
        >
          {/* Header */}
          <div className="p-6 border-b" style={{ borderColor: 'var(--line)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.15)' }}>
                  <Mail className="w-5 h-5" style={{ color: '#3b82f6' }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>CIIM — Email Classifier</h2>
              </div>
              <button onClick={onClose} className="text-2xl" style={{ color: 'var(--muted)' }}>
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-lg" style={{ background: 'rgba(244,193,82,0.1)', border: '1px solid rgba(244,193,82,0.3)' }}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5" style={{ color: '#f4c152' }} />
                <p className="font-semibold" style={{ color: 'var(--text)' }}>Notice of Delay Detected</p>
              </div>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>From: site-manager@buildcorp.com</p>
            </div>

            <div className="p-4 rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>EMAIL EXCERPT</p>
              <p className="text-sm" style={{ color: 'var(--text)' }}>
                "Due to unforeseen weather conditions, we are experiencing a 2-day delay on the foundation work. We will need to pause the current milestone..."
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>Classification Confidence: 92%</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}>
                <Clock className="w-4 h-4 mb-1" style={{ color: '#3b82f6' }} />
                <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Action</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Pause Escrow: 2 days</p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: 'rgba(243,18,96,0.1)', border: '1px solid rgba(243,18,96,0.3)' }}>
                <AlertTriangle className="w-4 h-4 mb-1" style={{ color: '#f31260' }} />
                <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>TrustScore</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>Impact: -2 points</p>
              </div>
            </div>

            <div className="p-4 rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--text)' }}>Audit Trail Entry</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Email will be archived in Arbitration Vault with contract trigger log</p>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 border-t flex justify-end gap-3" style={{ borderColor: 'var(--line)' }}>
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-lg"
              style={{ borderColor: 'var(--line)', color: 'var(--text)' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRunClassifier}
              className="rounded-lg"
              style={{ background: '#3b82f6', color: '#ffffff' }}
            >
              Apply Actions
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}