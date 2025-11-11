import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function NewCaseModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    project: "",
    amount: "",
    description: "",
    file: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.project || !formData.amount || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit({
      project: formData.project,
      amount: parseFloat(formData.amount),
      description: formData.description
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
        <DialogHeader>
          <DialogTitle style={{ color: 'var(--text)' }}>New Dispute Case</DialogTitle>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Submit a new case for arbitration (demo mode)</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text)' }}>
              Project Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.project}
              onChange={(e) => setFormData({...formData, project: e.target.value})}
              placeholder="e.g., Downtown Plaza Construction"
              required
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text)' }}>
              Amount in Dispute (USD) <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="45000"
              required
              min="1"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text)' }}>
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the nature of the dispute..."
              required
              className="h-32"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--muted)' }}>
              Evidence Upload (Optional)
            </label>
            <div 
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer"
              style={{ borderColor: 'var(--line)', background: 'var(--panelAlt)' }}
            >
              <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--muted)' }} />
              <p className="text-sm" style={{ color: 'var(--muted)' }}>
                Click to upload or drag and drop<br/>
                <span className="text-xs">PDF, JPG, PNG up to 10MB (demo only)</span>
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
            <Button 
              type="button"
              onClick={onClose} 
              className="btn-secondary rounded-lg px-4 py-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="btn-primary rounded-lg px-4 py-2"
            >
              Create Case
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}