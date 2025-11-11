import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function InviteConnectionModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    trade: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<strong>Invitation Sent</strong><br/>Invite sent to ${formData.name}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    onClose();
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
        className="rounded-2xl shadow-2xl max-w-md w-full"
        style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--line)' }}>
          <div className="flex items-center gap-3">
            <UserPlus className="w-6 h-6" style={{ color: 'var(--accent)' }} />
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Invite Connection</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'var(--panelAlt)', color: 'var(--muted)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter name"
              required
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email"
              required
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>Role</label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                <SelectItem value="contractor">General Contractor</SelectItem>
                <SelectItem value="subcontractor">Subcontractor</SelectItem>
                <SelectItem value="supplier">Supplier</SelectItem>
                <SelectItem value="insurer">Insurance Provider</SelectItem>
                <SelectItem value="legal">Legal Consultant</SelectItem>
                <SelectItem value="liquidity">Financing Partner</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>Trade/Specialty</label>
            <Input
              value={formData.trade}
              onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
              placeholder="e.g. Electrical, HVAC, Plumbing"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 btn-ghost-light"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 btn-primary-bright"
            >
              Send Invitation
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}