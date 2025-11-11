import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Scan, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bus } from "@/components/utils/bus";

export default function OmniScanModal({ onClose }) {
  const [scanScore] = useState(0.92);

  const handleScore = () => {
    let action = "";
    let message = "";
    
    if (scanScore >= 0.9) {
      action = "RELEASE";
      message = `Score ${scanScore}: Full Release`;
    } else if (scanScore >= 0.6) {
      action = "PARTIAL_50";
      message = `Score ${scanScore}: Partial Release 50%`;
    } else {
      action = "HOLD";
      message = `Score ${scanScore}: Hold Escrow`;
    }

    // Emit bus event
    Bus.emit("omniscan:scored", {
      score: scanScore,
      action,
      milestone: "Structural Integrity Check"
    });

    // Show toast
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = message + ' (from OmniScan)';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);

    // Emit to flow
    Bus.emit("flow:compliance:validated", { source: "OmniScan", status: "approved", score: scanScore });

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
          className="max-w-2xl w-full rounded-xl shadow-2xl"
          style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
        >
          {/* Header */}
          <div className="p-6 border-b" style={{ borderColor: 'var(--line)' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(23,201,100,0.15)' }}>
                  <Scan className="w-5 h-5" style={{ color: '#17c964' }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>OmniScan — Subsurface Validation</h2>
              </div>
              <button onClick={onClose} className="text-2xl" style={{ color: 'var(--muted)' }}>
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Scan Heatmap */}
            <div className="p-4 rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
              <p className="text-xs font-medium mb-3" style={{ color: 'var(--muted)' }}>GPR/ULTRASONIC/IR COMPOSITE SCAN</p>
              <div className="relative h-32 rounded-lg overflow-hidden" style={{ background: 'linear-gradient(90deg, rgba(243,18,96,0.3) 0%, rgba(244,193,82,0.3) 50%, rgba(23,201,100,0.3) 100%)' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm font-mono" style={{ color: 'var(--text)' }}>Scan visualization: Structural integrity validated</p>
                </div>
              </div>
            </div>

            {/* Score */}
            <div className="p-6 rounded-lg text-center" style={{ background: 'rgba(23,201,100,0.1)', border: '1px solid rgba(23,201,100,0.3)' }}>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>COMPOSITE SCORE</p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="text-6xl font-bold" style={{ color: '#17c964' }}
              >
                {scanScore}
              </motion.div>
              <p className="text-sm mt-2" style={{ color: 'var(--muted)' }}>Confidence: 96% • Method: Multi-spectrum</p>
            </div>

            {/* KPI Chips */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg text-center" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
                <CheckCircle2 className="w-5 h-5 mx-auto mb-1" style={{ color: '#17c964' }} />
                <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>GPR</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>0.94</p>
              </div>
              <div className="p-3 rounded-lg text-center" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
                <CheckCircle2 className="w-5 h-5 mx-auto mb-1" style={{ color: '#17c964' }} />
                <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Ultrasonic</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>0.91</p>
              </div>
              <div className="p-3 rounded-lg text-center" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
                <CheckCircle2 className="w-5 h-5 mx-auto mb-1" style={{ color: '#17c964' }} />
                <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Thermal IR</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>0.90</p>
              </div>
            </div>

            {/* Recommendation */}
            <div className="p-4 rounded-lg" style={{ background: 'rgba(23,201,100,0.1)', border: '1px solid rgba(23,201,100,0.3)' }}>
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--success)' }}>Recommendation</p>
              <p className="text-sm" style={{ color: 'var(--text)' }}>Score ≥ 0.90 → Full Release • Scan data will be archived in Arbitration Vault</p>
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
              onClick={handleScore}
              className="rounded-lg"
              style={{ background: '#17c964', color: '#ffffff' }}
            >
              Score & Apply
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}