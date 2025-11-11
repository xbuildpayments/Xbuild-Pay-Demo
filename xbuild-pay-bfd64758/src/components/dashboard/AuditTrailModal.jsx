import React from "react";
import { motion } from "framer-motion";
import { X, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";

export default function AuditTrailModal({ isOpen, onClose, project }) {
  const events = [
    { stage: "Submitted", timestamp: new Date(Date.now() - 7200000), detail: `Milestone ${project?.lastMilestone?.id || 'M-212.7'}` },
    { stage: "TrustScore Validated", timestamp: new Date(Date.now() - 6900000), detail: `Score: ${project?.trustScore || 92}` },
    { stage: "AI Confidence Check", timestamp: new Date(Date.now() - 6600000), detail: "96% confidence" },
    { stage: "Escrow Released", timestamp: new Date(Date.now() - 6300000), detail: `${project?.lastMilestone?.payoutPct || 15}% of contract` },
    { stage: "XRPL Hash Confirmed", timestamp: new Date(Date.now() - 6000000), detail: "7C1A…9F2" }
  ];

  const exportJSON = () => {
    const data = {
      project: project?.name,
      events: events.map(e => ({
        stage: e.stage,
        timestamp: e.timestamp.toISOString(),
        detail: e.detail
      }))
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-trail-${project?.id || 'project'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" style={{ background: 'var(--panel)', border: '1px solid var(--line)', color: 'var(--text)' }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Audit Trail</DialogTitle>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{project?.name}</p>
        </DialogHeader>

        <div className="space-y-4 my-4">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-lg"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--success)' }} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{event.stage}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{format(event.timestamp, 'MMM d, yyyy h:mm a')}</p>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{event.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-end gap-3 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
          <Button onClick={exportJSON} variant="outline" style={{ border: '1px solid var(--line)', color: 'var(--text)' }}>
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
          <Button onClick={onClose} style={{ background: 'linear-gradient(90deg, #2563eb, #3b82f6)', color: '#ffffff' }}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}