import React from "react";
import { motion } from "framer-motion";
import { Award, TrendingUp, FileCheck, AlertTriangle } from "lucide-react";

export default function TrustScoreDrawer({ project, score, onClose }) {
  const factors = [
    { name: "On-time milestones", value: 92, icon: TrendingUp },
    { name: "Open disputes", value: 1, icon: AlertTriangle, warning: true },
    { name: "Peer reviews", value: 4.5, icon: Award },
    { name: "Document compliance", value: 98, icon: FileCheck }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-end justify-end"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: 400 }}
        animate={{ x: 0 }}
        exit={{ x: 400 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-[450px] h-full shadow-2xl overflow-y-auto"
        style={{ background: 'var(--panel)', borderLeft: '1px solid var(--line)' }}
      >
        <div className="p-6 border-b sticky top-0 z-10" style={{ background: 'var(--panel)', borderColor: 'var(--line)' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>TrustScore</h2>
            <button onClick={onClose} className="text-2xl" style={{ color: 'var(--muted)' }}>×</button>
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{project}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Score Display */}
          <div className="text-center p-6 rounded-xl" style={{ background: 'var(--panelAlt)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--muted)' }}>Project Risk Profile</p>
            <div className="text-6xl font-bold mb-2" style={{ color: 'var(--success)' }}>
              {score}
              <span className="text-3xl" style={{ color: 'var(--muted)' }}>/100</span>
            </div>
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${score}%`, background: 'var(--success)' }}
              />
            </div>
          </div>

          {/* Factors */}
          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>Risk Factors</h3>
            <div className="space-y-3">
              {factors.map((factor, i) => {
                const Icon = factor.icon;
                return (
                  <div key={i} className="rounded-lg p-4" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" style={{ color: factor.warning ? 'var(--warning)' : 'var(--accent)' }} />
                        <span className="font-medium" style={{ color: 'var(--text)' }}>{factor.name}</span>
                      </div>
                      <span className="font-bold" style={{ color: factor.warning ? 'var(--warning)' : 'var(--success)' }}>
                        {factor.value}{typeof factor.value === 'number' && factor.value <= 5 ? '' : '%'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}