import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DemoStore } from "@/components/utils/demoStore";
import { Bus } from "@/components/utils/bus";

export default function PartialReleaseModal({ onClose, onSubmit, disputeCase }) {
  const [percent, setPercent] = useState("15");
  const [payee, setPayee] = useState("contractor");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    const releasePercent = parseFloat(percent || 0);
    const amountUSD = Math.round((disputeCase.amountUSD * releasePercent) / 100);
    const amountXRP = Math.round((disputeCase.amountXRP * releasePercent) / 100);
    
    // Generate XRPL hash
    const hash = DemoStore.nextHash();
    
    // Create ledger entry
    const ledgerEntry = {
      id: `tx-${Date.now()}`,
      ts: new Date().toISOString(),
      project: disputeCase.project,
      milestone: disputeCase.issue || "Dispute Settlement Release",
      direction: payee === "supplier" ? "Escrow→Supplier" : payee === "developer" ? "Escrow→Developer" : "Escrow→Contractor",
      amountUSD,
      amountXRP,
      status: "Completed",
      hash,
      recipient: disputeCase.parties[payee] || "Unknown"
    };
    
    // Update demo store
    DemoStore.addLedgerEntry(ledgerEntry);
    
    // Emit events for live updates
    Bus.emit("ledger:new", ledgerEntry);
    Bus.emit("totals:changed", { ...DemoStore.totals });
    
    // Show toast with hash
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<div class="font-semibold">XRPL demo tx recorded</div><div class="text-sm opacity-90">${hash}</div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
    
    // Call original submit handler
    onSubmit({
      percent: releasePercent,
      payee,
      note,
      hash
    });
    
    onClose();
  };

  const calculatedAmount = (disputeCase.amountUSD * parseFloat(percent || 0) / 100).toFixed(0);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
        <DialogHeader>
          <DialogTitle style={{ color: 'var(--text)' }}>Partial Release</DialogTitle>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Release a portion of escrowed funds</p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text)' }}>Release Percentage</label>
            <Input
              type="number"
              value={percent}
              onChange={(e) => setPercent(e.target.value)}
              placeholder="15"
              max={disputeCase.escrow.heldPct}
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            />
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
              Amount: ${calculatedAmount} ({(disputeCase.amountXRP * parseFloat(percent || 0) / 100).toFixed(0)} XRP)
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Max available: {disputeCase.escrow.heldPct}%
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text)' }}>Payee</label>
            <Select value={payee} onValueChange={setPayee}>
              <SelectTrigger style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                <SelectItem value="contractor">Contractor ({disputeCase.parties.contractor})</SelectItem>
                <SelectItem value="developer">Developer ({disputeCase.parties.developer})</SelectItem>
                {disputeCase.parties.supplier && (
                  <SelectItem value="supplier">Supplier ({disputeCase.parties.supplier})</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text)' }}>Note</label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add note for this release..."
              className="h-20"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
          <Button onClick={onClose} variant="outline" style={{ border: '1px solid var(--line)', color: 'var(--text)' }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} style={{ background: 'linear-gradient(90deg, #2563eb, #3b82f6)', color: '#ffffff' }}>
            Confirm Release
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}