import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ConfigureModal({ module, onClose, onSave }) {
  const [settings, setSettings] = useState({ ...module.settings });

  const handleSave = () => {
    onSave(module.key, settings);
  };

  const renderSettingInput = (key, value) => {
    if (typeof value === 'boolean') {
      return (
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings[key]}
            onChange={(e) => setSettings({ ...settings, [key]: e.target.checked })}
            className="w-4 h-4"
          />
          <span className="text-sm" style={{ color: 'var(--text)' }}>
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </span>
        </label>
      );
    }

    if (typeof value === 'number') {
      return (
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text)' }}>
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <Input
            type="number"
            value={settings[key]}
            onChange={(e) => setSettings({ ...settings, [key]: parseFloat(e.target.value) || 0 })}
            className="rounded-lg"
            style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
          />
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text)' }}>
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {value.map((item, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full"
                style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      );
    }

    return (
        <div>
          <label className="text-sm font-medium mb-1 block" style={{ color: 'var(--text)' }}>
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </label>
          <Input
            type="text"
            value={settings[key]}
            onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
            className="rounded-lg"
            style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            readOnly={key === 'apiKey' || key === 'webhookUrl'}
          />
        </div>
      );
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-xl shadow-2xl"
          style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
        >
          {/* Header */}
          <div className="p-6 border-b" style={{ borderColor: 'var(--line)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Configure {module.name}</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{module.description}</p>
              </div>
              <button onClick={onClose} className="text-2xl" style={{ color: 'var(--muted)' }}>
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="p-6 space-y-4">
            {Object.entries(settings).length === 0 ? (
              <p className="text-center" style={{ color: 'var(--muted)' }}>No configurable settings for this module</p>
            ) : (
              Object.entries(settings).map(([key, value]) => (
                <div key={key}>
                  {renderSettingInput(key, value)}
                </div>
              ))
            )}
          </div>

          {/* Actions */}
          <div className="p-6 border-t flex justify-end gap-3" style={{ borderColor: 'var(--line)' }}>
            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-lg"
              style={{ borderColor: 'var(--line)', color: 'var(--text)' }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="rounded-lg"
              style={{ background: '#3b82f6', color: '#ffffff' }}
            >
              Save Changes
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}