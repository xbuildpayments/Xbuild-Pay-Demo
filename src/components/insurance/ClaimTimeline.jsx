import React from "react";
import { CheckCircle2, Hash } from "lucide-react";
import { format } from "date-fns";

export default function ClaimTimeline({ claim }) {
  return (
    <div className="rounded-xl p-6" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
      <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Claim Timeline</h3>
      
      <div className="space-y-3">
        {claim.timeline.map((step, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(23,201,100,0.2)' }}>
              <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--success)' }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium" style={{ color: 'var(--text)' }}>{step.step}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  {format(new Date(step.timestamp), 'MMM d, h:mm a')}
                </p>
              </div>
              {step.hash && (
                <div className="flex items-center gap-1 mt-1">
                  <Hash className="w-3 h-3" style={{ color: 'var(--muted)' }} />
                  <code className="text-xs font-mono" style={{ color: 'var(--accent)' }}>{step.hash}</code>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}