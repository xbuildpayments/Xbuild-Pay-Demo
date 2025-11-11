import React, { useState, useEffect } from "react";
import { CheckCircle2, Clock, Send, FileCheck } from "lucide-react";

export default function UnderwriterPanel({ claim, onDecision, autoApprove }) {
  const [apiDelivered, setApiDelivered] = useState(false);

  useEffect(() => {
    if (autoApprove && claim.payoutEstimate < 50000 && claim.status === 'Pending Underwriter') {
      setTimeout(() => onDecision(claim.id, 'approve'), 1000);
    }
  }, [autoApprove, claim, onDecision]);

  const sendPacket = () => {
    setApiDelivered(true);
    onDecision(claim.id, 'Under Review');
  };

  const requiredDocs = [
    { name: "Incident Summary", complete: true },
    { name: "Policy Match Proof", complete: true },
    { name: "Payout Estimate", complete: true },
    { name: "Audit Hashes", complete: claim.auditHashes >= 2 }
  ];

  return (
    <div className="rounded-xl p-6" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
      <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Underwriter Panel</h3>
      
      {/* Status */}
      <div className="mb-4">
        <p className="text-sm mb-2" style={{ color: 'var(--muted)' }}>Status</p>
        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold ${
          claim.status === 'Approved' ? 'bg-green-900/30 text-green-400' :
          claim.status === 'Rejected' ? 'bg-red-900/30 text-red-400' :
          claim.status === 'Under Review' ? 'bg-yellow-900/30 text-yellow-400' :
          'bg-blue-900/30 text-blue-400'
        }`}>
          {claim.status === 'Approved' && <CheckCircle2 className="w-4 h-4" />}
          {claim.status === 'Under Review' && <Clock className="w-4 h-4" />}
          {claim.status}
        </span>
      </div>

      {/* API Handoff */}
      <div className="mb-4 p-3 rounded-lg" style={{ background: 'var(--panel)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>API Handoff</span>
          <div className={`w-3 h-3 rounded-full ${apiDelivered || claim.status !== 'Pending Underwriter' ? 'bg-green-500' : 'bg-gray-500'}`} />
        </div>
        <p className="text-xs" style={{ color: 'var(--muted)' }}>
          {apiDelivered || claim.status !== 'Pending Underwriter' ? '✅ Payload posted' : 'Queued'}
        </p>
      </div>

      {/* Required Docs */}
      <div className="mb-4">
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>Required Documents</p>
        <div className="space-y-2">
          {requiredDocs.map((doc, i) => (
            <div key={i} className="flex items-center justify-between text-xs p-2 rounded" style={{ background: 'var(--panel)' }}>
              <span style={{ color: 'var(--muted)' }}>{doc.name}</span>
              {doc.complete ? (
                <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--success)' }} />
              ) : (
                <Clock className="w-4 h-4" style={{ color: 'var(--warning)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        {claim.status === 'Pending Underwriter' && (
          <button
            onClick={sendPacket}
            className="w-full py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all"
            style={{ background: '#3b82f6', color: '#ffffff' }}
          >
            <Send className="w-4 h-4" />
            Send Packet to Underwriter
          </button>
        )}

        {claim.status === 'Under Review' && (
          <>
            <button
              onClick={() => onDecision(claim.id, 'approve')}
              className="w-full py-2 rounded-lg font-semibold transition-all"
              style={{ background: '#17c964', color: '#ffffff' }}
            >
              Approve Claim
            </button>
            <button
              onClick={() => onDecision(claim.id, 'reject')}
              className="w-full py-2 rounded-lg font-semibold transition-all"
              style={{ background: '#f31260', color: '#ffffff' }}
            >
              Reject Claim
            </button>
          </>
        )}

        {claim.status === 'Approved' && (
          <div className="p-3 rounded-lg" style={{ background: 'rgba(23,201,100,0.1)', border: '1px solid var(--success)' }}>
            <p className="text-sm font-medium" style={{ color: 'var(--success)' }}>
              ✓ Claim approved - Escrow can be resumed
            </p>
          </div>
        )}

        {claim.status === 'Rejected' && (
          <div className="p-3 rounded-lg" style={{ background: 'rgba(243,18,96,0.1)', border: '1px solid #f31260' }}>
            <p className="text-sm font-medium text-red-400">
              ✗ Claim rejected - Consider opening dispute
            </p>
          </div>
        )}
      </div>

      {/* Payout Estimate */}
      <div className="mt-4 p-3 rounded-lg" style={{ background: 'var(--panel)' }}>
        <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Estimated Payout</p>
        <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>${claim.payoutEstimate.toLocaleString()}</p>
      </div>
    </div>
  );
}