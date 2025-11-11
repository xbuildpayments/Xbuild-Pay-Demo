import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bus } from "@/components/utils/bus";

export default function EchoSimulateModal({ onClose }) {
  const handleSimulate = () => {
    // Emit bus event
    Bus.emit("echo:approval:detected", {
      milestone: "Milestone #12",
      transcript: "Verbal approval detected for Milestone #12",
      action: "RELEASE"
    });

    // Show toast
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = 'Escrow flag: RELEASE (from Echo)';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);

    // Emit to flow
    Bus.emit("flow:compliance:validated", { source: "Echo", status: "approved" });

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
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(168,85,247,0.15)' }}>
                  <Mic className="w-5 h-5" style={{ color: '#a855f7' }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Echo — Voice Approval Detected</h2>
              </div>
              <button onClick={onClose} className="text-2xl" style={{ color: 'var(--muted)' }}>
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-lg" style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)' }}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: '#a855f7' }} />
                <p className="font-semibold" style={{ color: 'var(--text)' }}>Verbal Approval Detected</p>
              </div>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>Milestone #12: Foundation Waterproofing</p>
            </div>

            <div className="p-4 rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>TRANSCRIPT SNIPPET</p>
              <p className="text-sm font-mono" style={{ color: 'var(--text)' }}>
                "...approved for release, milestone twelve looks good, proceed with payment..."
              </p>
              <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>Confidence: 94% • Speaker: Project Manager</p>
            </div>

            <div className="p-4 rounded-lg" style={{ background: 'rgba(23,201,100,0.1)', border: '1px solid rgba(23,201,100,0.3)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--success)' }}>Action: RELEASE ESCROW</p>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Transcript will be appended to Arbitration Vault</p>
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
              onClick={handleSimulate}
              className="rounded-lg"
              style={{ background: '#a855f7', color: '#ffffff' }}
            >
              Confirm & Apply
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}