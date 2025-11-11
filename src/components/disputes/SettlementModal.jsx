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

export default function SettlementModal({ onClose, onSubmit, disputeCase }) {
  const [offerType, setOfferType] = useState("percent");
  const [amount, setAmount] = useState("");
  const [payee, setPayee] = useState("contractor");
  const [notes, setNotes] = useState("");

  const handleSubmit = (action) => {
    onSubmit({
      action,
      offerType,
      amount,
      payee,
      notes
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
        <DialogHeader>
          <DialogTitle style={{ color: 'var(--text)' }}>Settlement Engine</DialogTitle>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Propose or accept settlement offer</p>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text)' }}>Offer Type</label>
            <Select value={offerType} onValueChange={setOfferType}>
              <SelectTrigger style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                <SelectItem value="percent">Percentage Split</SelectItem>
                <SelectItem value="lump">Lump Sum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text)' }}>
              {offerType === "percent" ? "Percentage" : "Amount (USD)"}
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={offerType === "percent" ? "50" : "22500"}
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text)' }}>Primary Payee</label>
            <Select value={payee} onValueChange={setPayee}>
              <SelectTrigger style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                <SelectItem value="contractor">Contractor</SelectItem>
                <SelectItem value="developer">Developer</SelectItem>
                {disputeCase.parties.supplier && (
                  <SelectItem value="supplier">Supplier</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text)' }}>Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add settlement notes..."
              className="h-24"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
          <Button onClick={onClose} variant="outline" style={{ border: '1px solid var(--line)', color: 'var(--text)' }}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmit("send")} variant="outline" style={{ border: '1px solid var(--line)', color: 'var(--text)' }}>
            Send Offer
          </Button>
          <Button onClick={() => handleSubmit("accept")} style={{ background: 'linear-gradient(90deg, #2563eb, #3b82f6)', color: '#ffffff' }}>
            Accept Offer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}