import React from "react";
import { motion } from "framer-motion";
import { X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EvidenceModal({ evidence, onClose }) {
  if (!evidence) return null;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh]" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between" style={{ color: 'var(--text)' }}>
            <div>
              <span className={`px-3 py-1 text-xs font-semibold rounded mr-3 ${
                evidence.type === 'PDF' ? 'bg-red-100 text-red-700' :
                evidence.type === 'JPG' ? 'bg-blue-100 text-blue-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {evidence.type}
              </span>
              {evidence.name}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="py-8">
          <div className="flex items-center justify-center h-96 rounded-lg" style={{ background: 'var(--panelAlt)' }}>
            <div className="text-center">
              <p className="text-lg font-medium mb-2" style={{ color: 'var(--text)' }}>Preview Not Available</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>This is a demo. File preview would appear here in production.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
          <Button variant="outline" style={{ border: '1px solid var(--line)', color: 'var(--text)' }}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={onClose} style={{ background: 'linear-gradient(90deg, #2563eb, #3b82f6)', color: '#ffffff' }}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}