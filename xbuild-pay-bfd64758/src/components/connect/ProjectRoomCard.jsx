import React from "react";
import { motion } from "framer-motion";
import { Users, CheckCircle2, Clock, AlertCircle, MessageCircle, ThumbsUp, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function ProjectRoomCard({ room, index }) {
  const navigate = useNavigate();

  const handleAction = (action) => {
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<strong>${action}</strong><br/>${room.name}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl shadow-sm p-6"
      style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-xl mb-2" style={{ color: 'var(--text)' }}>{room.name}</h3>
          <div className="flex items-center gap-6 text-sm mb-3" style={{ color: 'var(--muted)' }}>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {room.participants} participants
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              {room.milestones.completed} completed
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-400" />
              {room.milestones.active} active
            </div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
            <p className="text-sm" style={{ color: 'var(--text)' }}>{room.lastEvent}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>{room.lastEventTime}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => handleAction("Post Milestone")}
          className="btn-primary-bright"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" />
          Post Milestone
        </Button>
        <Button
          onClick={() => handleAction("Endorse Completion")}
          className="btn-outline-contrast"
        >
          <ThumbsUp className="w-4 h-4 mr-2" />
          Endorse
        </Button>
        <Button
          onClick={() => navigate(createPageUrl("Disputes"))}
          className="btn-ghost-light"
        >
          <Flag className="w-4 h-4 mr-2" />
          Flag Issue
        </Button>
        <Button className="btn-ghost-light">
          <MessageCircle className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}