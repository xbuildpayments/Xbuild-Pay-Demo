import React from "react";
import { motion } from "framer-motion";
import { Users, Bell, BellOff, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ChannelCard({ channel, index }) {
  const handleJoin = () => {
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<strong>Joined Channel</strong><br/>${channel.name}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl shadow-sm p-6 panel-hover"
      style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg mb-1" style={{ color: 'var(--text)' }}>{channel.name}</h3>
          <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--muted)' }}>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {channel.members} members
            </div>
            <div>
              Last activity: {channel.lastActivity}
            </div>
          </div>
        </div>
        {channel.unread > 0 && (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
            {channel.unread}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={handleJoin}
          className="btn-primary-bright flex-1"
        >
          <Users className="w-4 h-4 mr-2" />
          Join
        </Button>
        <Button className="btn-outline-contrast flex-1">
          <ExternalLink className="w-4 h-4 mr-2" />
          Open
        </Button>
        <Button className="btn-ghost-light">
          <BellOff className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}