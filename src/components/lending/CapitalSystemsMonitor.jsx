import React from "react";
import { motion } from "framer-motion";
import { X, Shield, TrendingUp, DollarSign, Award, Activity } from "lucide-react";

export default function CapitalSystemsMonitor({ onClose }) {
  const systemData = {
    escrow: { total: 3750000, available: 2850000, status: "Healthy", uptime: 99.8 },
    insurance: { activePolicies: 12, totalCoverage: 8500000, claims: 3, status: "Active" },
    trustScore: { average: 87, high: 94, low: 72, trend: "up" },
    defiYield: { totalStaked: 1250000, avgAPY: 4.3, pools: 6, status: "Optimized" }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
      >
        {/* Header */}
        <div className="sticky top-0 border-b p-6 flex items-center justify-between"
          style={{ background: 'var(--panel)', borderColor: 'var(--line)', zIndex: 10 }}>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Capital Systems Monitor</h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>Real-time cross-module data</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'var(--panelAlt)', color: 'var(--muted)' }}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Escrow System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-6"
            style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6" style={{ color: 'var(--accent)' }} />
              <div>
                <h3 className="font-bold" style={{ color: 'var(--text)' }}>Smart Escrow</h3>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Status: {systemData.escrow.status}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Total Escrowed</p>
                <p className="text-xl font-bold" style={{ color: 'var(--text)' }}>${(systemData.escrow.total / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Available</p>
                <p className="text-xl font-bold" style={{ color: 'var(--success)' }}>${(systemData.escrow.available / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Uptime</p>
                <p className="text-xl font-bold" style={{ color: 'var(--success)' }}>{systemData.escrow.uptime}%</p>
              </div>
            </div>
          </motion.div>

          {/* Insurance System */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl p-6"
            style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6" style={{ color: 'var(--success)' }} />
              <div>
                <h3 className="font-bold" style={{ color: 'var(--text)' }}>Insurance & Bonding</h3>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Status: {systemData.insurance.status}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Active Policies</p>
                <p className="text-xl font-bold" style={{ color: 'var(--text)' }}>{systemData.insurance.activePolicies}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Total Coverage</p>
                <p className="text-xl font-bold" style={{ color: 'var(--success)' }}>${(systemData.insurance.totalCoverage / 1000000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Open Claims</p>
                <p className="text-xl font-bold" style={{ color: 'var(--warning)' }}>{systemData.insurance.claims}</p>
              </div>
            </div>
          </motion.div>

          {/* TrustScore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl p-6"
            style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-6 h-6" style={{ color: 'var(--warning)' }} />
              <div>
                <h3 className="font-bold" style={{ color: 'var(--text)' }}>TrustScore Analytics</h3>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Trend: {systemData.trustScore.trend === 'up' ? '↑ Improving' : '↓ Declining'}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Average Score</p>
                <p className="text-xl font-bold" style={{ color: 'var(--text)' }}>{systemData.trustScore.average}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Highest</p>
                <p className="text-xl font-bold" style={{ color: 'var(--success)' }}>{systemData.trustScore.high}</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Lowest</p>
                <p className="text-xl font-bold" style={{ color: 'var(--warning)' }}>{systemData.trustScore.low}</p>
              </div>
            </div>
          </motion.div>

          {/* DeFi Yield */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl p-6"
            style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6" style={{ color: 'var(--success)' }} />
              <div>
                <h3 className="font-bold" style={{ color: 'var(--text)' }}>DeFi Yield Optimization</h3>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Status: {systemData.defiYield.status}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Total Staked</p>
                <p className="text-xl font-bold" style={{ color: 'var(--text)' }}>${(systemData.defiYield.totalStaked / 1000).toFixed(0)}K</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Avg APY</p>
                <p className="text-xl font-bold" style={{ color: 'var(--success)' }}>{systemData.defiYield.avgAPY}%</p>
              </div>
              <div>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>Active Pools</p>
                <p className="text-xl font-bold" style={{ color: 'var(--text)' }}>{systemData.defiYield.pools}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}