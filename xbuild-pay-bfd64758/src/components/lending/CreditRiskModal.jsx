import React from "react";
import { motion } from "framer-motion";
import { X, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function CreditRiskModal({ loan, onClose }) {
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
        className="rounded-2xl shadow-2xl max-w-3xl w-full"
        style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
      >
        {/* Header */}
        <div className="border-b p-6 flex items-center justify-between" style={{ borderColor: 'var(--line)' }}>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Credit Risk Analysis</h2>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>{loan.type}</p>
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
          {/* Current Risk Score */}
          <div className="text-center p-6 rounded-xl" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
            <p className="text-sm mb-2" style={{ color: 'var(--muted)' }}>Current Risk Score</p>
            <div className="text-5xl font-bold mb-2" style={{ color: loan.riskScore >= 0.85 ? 'var(--success)' : 'var(--warning)' }}>
              {loan.riskScore}
            </div>
            <p className="text-lg font-semibold" style={{ color: 'var(--text)' }}>Grade: {loan.riskGrade}</p>
          </div>

          {/* Risk Timeline */}
          <div>
            <h3 className="font-bold mb-4" style={{ color: 'var(--text)' }}>Risk History</h3>
            <div className="flex items-end gap-3 h-32 p-4 rounded-xl" style={{ background: 'var(--panelAlt)' }}>
              {loan.riskHistory.map((score, i) => {
                const prevScore = i > 0 ? loan.riskHistory[i - 1] : score;
                const trend = score > prevScore ? 'up' : score < prevScore ? 'down' : 'stable';
                
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${score * 100}%` }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      className="w-full rounded-t flex items-center justify-center"
                      style={{
                        background: score >= 0.85 ? 'var(--success)' : score >= 0.7 ? 'var(--warning)' : 'var(--accent)',
                        minHeight: '40px'
                      }}
                    >
                      {trend === 'up' && <TrendingUp className="w-4 h-4 text-white" />}
                      {trend === 'down' && <TrendingDown className="w-4 h-4 text-white" />}
                      {trend === 'stable' && <Minus className="w-4 h-4 text-white" />}
                    </motion.div>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{score}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Risk Factors */}
          <div>
            <h3 className="font-bold mb-4" style={{ color: 'var(--text)' }}>Risk Factors</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--panelAlt)' }}>
                <span style={{ color: 'var(--text)' }}>Payment History</span>
                <span className="font-bold" style={{ color: 'var(--success)' }}>Excellent</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--panelAlt)' }}>
                <span style={{ color: 'var(--text)' }}>Debt-to-Income Ratio</span>
                <span className="font-bold" style={{ color: 'var(--success)' }}>Low</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--panelAlt)' }}>
                <span style={{ color: 'var(--text)' }}>Project Complexity</span>
                <span className="font-bold" style={{ color: 'var(--warning)' }}>Medium</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: 'var(--panelAlt)' }}>
                <span style={{ color: 'var(--text)' }}>Market Conditions</span>
                <span className="font-bold" style={{ color: 'var(--success)' }}>Favorable</span>
              </div>
            </div>
          </div>

          {/* XRPL Pool Info */}
          <div className="p-4 rounded-xl" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
            <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>XRPL Liquidity Pool</h3>
            <p className="text-sm mb-1" style={{ color: 'var(--muted)' }}>Pool ID: {loan.xrplPool}</p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>DeFi Yield: <span className="font-bold" style={{ color: 'var(--success)' }}>{loan.defiYield}% APY</span></p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}