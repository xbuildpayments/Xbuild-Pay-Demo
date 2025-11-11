import React, { useState } from "react";
import { Wallet, Pause, Play, DollarSign } from "lucide-react";

export default function EscrowCoordination({ claim, policy }) {
  const [escrowState, setEscrowState] = useState(claim.escrowFrozen ? 'Frozen' : 'Active');

  const pauseEscrow = () => setEscrowState('Frozen');
  const resumeEscrow = () => setEscrowState('Active');
  const partialRelease = () => {
    alert('Partial release of 50% processed (demo)');
    setEscrowState('Partial Holdback');
  };

  return (
    <div className="rounded-xl p-6" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
      <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Escrow Coordination</h3>
      
      {/* Linked Project */}
      <div className="mb-4 p-3 rounded-lg" style={{ background: 'var(--panel)' }}>
        <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Linked Project</p>
        <p className="font-medium" style={{ color: 'var(--text)' }}>{policy.project}</p>
      </div>

      {/* Escrow State */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>Escrow State</p>
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
          escrowState === 'Active' ? 'bg-green-900/30 text-green-400' :
          escrowState === 'Frozen' ? 'bg-red-900/30 text-red-400' :
          'bg-yellow-900/30 text-yellow-400'
        }`}>
          <Wallet className="w-4 h-4" />
          {escrowState}
        </span>
      </div>

      {/* Auto-Freeze Info */}
      {policy.autoFreeze && (
        <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}>
          <p className="text-xs" style={{ color: '#3b82f6' }}>
            ⚠️ Auto-freeze enabled on this policy
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="space-y-2">
        <button
          onClick={pauseEscrow}
          disabled={escrowState === 'Frozen'}
          className="w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          style={{
            background: escrowState === 'Frozen' ? 'var(--panel)' : '#f31260',
            color: '#ffffff',
            border: `1px solid ${escrowState === 'Frozen' ? 'var(--line)' : '#f31260'}`
          }}
        >
          <Pause className="w-4 h-4" />
          Pause Escrow
        </button>

        <button
          onClick={partialRelease}
          disabled={escrowState === 'Active'}
          className="w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          style={{
            background: escrowState === 'Active' ? 'var(--panel)' : '#f4c152',
            color: '#000000',
            border: `1px solid ${escrowState === 'Active' ? 'var(--line)' : '#f4c152'}`
          }}
        >
          <DollarSign className="w-4 h-4" />
          Partial Release (50%)
        </button>

        <button
          onClick={resumeEscrow}
          disabled={escrowState === 'Active' || claim.status !== 'Approved'}
          className="w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          style={{
            background: (escrowState === 'Active' || claim.status !== 'Approved') ? 'var(--panel)' : '#17c964',
            color: '#ffffff',
            border: `1px solid ${(escrowState === 'Active' || claim.status !== 'Approved') ? 'var(--line)' : '#17c964'}`
          }}
        >
          <Play className="w-4 h-4" />
          Resume Escrow
        </button>
      </div>

      {claim.status !== 'Approved' && escrowState !== 'Active' && (
        <p className="text-xs mt-3 text-center" style={{ color: 'var(--muted)' }}>
          Claim must be approved to resume escrow
        </p>
      )}
    </div>
  );
}