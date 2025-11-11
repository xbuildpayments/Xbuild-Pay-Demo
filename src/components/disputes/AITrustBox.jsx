import React from "react";
import { Brain, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function AITrustBox({ ai, trustImpact }) {
  return (
    <div className="rounded-xl p-6" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
      <h3 className="text-sm font-semibold uppercase mb-4" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>AI & TrustScore Analysis</h3>
      
      {/* AI Review */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5" style={{ color: 'var(--accent)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>AI Integrity Review</span>
        </div>
        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs" style={{ color: 'var(--muted)' }}>Confidence</span>
            <span className="text-lg font-bold" style={{ color: 'var(--text)' }}>{(ai.confidence * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
            <div 
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${ai.confidence * 100}%` }}
            />
          </div>
        </div>
        {ai.flags.length > 0 && (
          <div className="mt-3 space-y-2">
            <p className="text-xs font-medium" style={{ color: 'var(--muted)' }}>Flags:</p>
            {ai.flags.map((flag, index) => (
              <div key={index} className="px-3 py-2 rounded text-xs" style={{ background: 'rgba(244,193,82,.18)', color: '#f4c152' }}>
                {flag}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TrustScore Impact */}
      <div className="border-t pt-4" style={{ borderColor: 'var(--line)' }}>
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>TrustScore Impact (Projected)</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: 'var(--muted)' }}>If Win</span>
            <div className="flex items-center gap-1" style={{ color: 'var(--success)' }}>
              <TrendingUp className="w-4 h-4" />
              <span className="font-bold">+{trustImpact.win}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: 'var(--muted)' }}>If Lose</span>
            <div className="flex items-center gap-1 text-red-600">
              <TrendingDown className="w-4 h-4" />
              <span className="font-bold">{trustImpact.lose}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: 'var(--muted)' }}>If Settle</span>
            <div className="flex items-center gap-1" style={{ color: 'var(--warning)' }}>
              <Minus className="w-4 h-4" />
              <span className="font-bold">+{trustImpact.settle}</span>
            </div>
          </div>
        </div>
        <p className="text-xs mt-3" style={{ color: 'var(--muted)' }}>
          ℹ️ Scores update when decision posts on-chain
        </p>
      </div>
    </div>
  );
}