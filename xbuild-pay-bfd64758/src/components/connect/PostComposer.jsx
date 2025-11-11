import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, MessageCircle, AlertCircle, DollarSign, MapPin, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function PostComposer({ onClose }) {
  const [postType, setPostType] = useState("milestone");
  const [content, setContent] = useState("");

  const postTypes = [
    { key: "milestone", label: "Milestone Completion", icon: CheckCircle2, color: "text-green-400" },
    { key: "advice", label: "Advice Request", icon: MessageCircle, color: "text-blue-400" },
    { key: "alert", label: "Alert", icon: AlertCircle, color: "text-yellow-400" },
    { key: "opportunity", label: "Opportunity", icon: DollarSign, color: "text-purple-400" }
  ];

  const handleSubmit = () => {
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<strong>Post Published</strong><br/>Your post is now live`;
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
        className="rounded-2xl shadow-2xl max-w-2xl w-full"
        style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--line)' }}>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Create Post</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'var(--panelAlt)', color: 'var(--muted)' }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Post Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: 'var(--text)' }}>Post Type</label>
            <div className="grid grid-cols-2 gap-3">
              {postTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.key}
                    onClick={() => setPostType(type.key)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      postType === type.key
                        ? 'border-blue-600 bg-blue-600/10'
                        : 'border-transparent'
                    }`}
                    style={{ background: postType === type.key ? undefined : 'var(--panelAlt)' }}
                  >
                    <Icon className={`w-6 h-6 ${type.color} mx-auto mb-2`} />
                    <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{type.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={6}
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            />
          </div>

          {/* Attachments */}
          <div className="flex gap-2">
            <Button className="btn-ghost-light">
              <Image className="w-4 h-4 mr-2" />
              Add Photos
            </Button>
            <Button className="btn-ghost-light">
              <MapPin className="w-4 h-4 mr-2" />
              Add Location
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onClose}
              className="flex-1 btn-ghost-light"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!content}
              className="flex-1 btn-primary-bright"
            >
              Publish Post
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}