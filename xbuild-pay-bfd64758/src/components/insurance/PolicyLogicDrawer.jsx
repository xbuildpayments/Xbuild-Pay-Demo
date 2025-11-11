import React from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

export default function PolicyLogicDrawer({ policy, incidents, onClose, onRunCheck }) {
  const relatedIncidents = incidents.filter(i => i.project === policy.project && !i.resolved);

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
        className="w-[500px] h-full shadow-2xl overflow-y-auto"
        style={{ background: 'var(--panel)', borderLeft: '1px solid var(--line)' }}
      >
        <div className="p-6 border-b sticky top-0 z-10" style={{ background: 'var(--panel)', borderColor: 'var(--line)' }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Policy Logic</h2>
            <button onClick={onClose} className="text-2xl" style={{ color: 'var(--muted)' }}>×</button>
          </div>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{policy.type} • {policy.policyNumber}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Coverage Details */}
          <div className="rounded-lg p-4" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>Coverage Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted)' }}>Coverage Amount</span>
                <span className="font-medium" style={{ color: 'var(--text)' }}>${(policy.coverage / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted)' }}>Deductible</span>
                <span className="font-medium" style={{ color: 'var(--text)' }}>${policy.deductible.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted)' }}>Delay Threshold</span>
                <span className="font-medium" style={{ color: 'var(--text)' }}>{policy.delayThresholdDays} days</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--muted)' }}>Auto-Freeze Escrow</span>
                <span className="font-medium" style={{ color: policy.autoFreeze ? 'var(--success)' : 'var(--muted)' }}>
                  {policy.autoFreeze ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>

          {/* Related Incidents */}
          <div>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>Related Incidents</h3>
            {relatedIncidents.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--muted)' }}>No unresolved incidents for this project</p>
            ) : (
              <div className="space-y-3">
                {relatedIncidents.map(incident => {
                  const eligible = incident.delayDays >= policy.delayThresholdDays;
                  return (
                    <div key={incident.id} className="rounded-lg p-4" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium" style={{ color: 'var(--text)' }}>{incident.id}</p>
                          <p className="text-xs" style={{ color: 'var(--muted)' }}>{incident.type} • {incident.severity} severity</p>
                        </div>
                        {eligible ? (
                          <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--success)' }} />
                        ) : (
                          <XCircle className="w-5 h-5" style={{ color: 'var(--muted)' }} />
                        )}
                      </div>
                      <div className="text-xs space-y-1 mb-3" style={{ color: 'var(--muted)' }}>
                        <p>Delay: {incident.delayDays} days {eligible ? '≥' : '<'} threshold {policy.delayThresholdDays} days</p>
                        <p>Evidence files: {incident.evidence}</p>
                      </div>
                      {eligible && (
                        <div className="flex items-center gap-2 p-2 rounded" style={{ background: 'rgba(23,201,100,0.1)' }}>
                          <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--success)' }} />
                          <span className="text-xs font-medium" style={{ color: 'var(--success)' }}>Eligible for claim</span>
                        </div>
                      )}
                      <button
                        onClick={() => onRunCheck(incident)}
                        className="w-full mt-3 py-2 rounded-lg text-sm font-semibold transition-all"
                        style={{
                          background: eligible ? '#3b82f6' : 'var(--panelAlt)',
                          color: eligible ? '#ffffff' : 'var(--muted)',
                          border: `1px solid ${eligible ? '#3b82f6' : 'var(--line)'}`
                        }}
                      >
                        Validate Against Incident
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}