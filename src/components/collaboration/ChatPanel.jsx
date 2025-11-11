import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Send, X, Paperclip, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function ChatPanel({ projectId, channelName, onClose }) {
  const [message, setMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await base44.auth.me();
        setCurrentUser(user);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };
    fetchUser();
  }, []);

  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages', channelName, projectId],
    queryFn: async () => {
      const query = { channel_name: channelName };
      if (projectId) {
        query.project_id = projectId;
      }
      const msgs = await base44.entities.Message.filter(query, '-created_date');
      return msgs.reverse();
    },
    initialData: [],
    refetchInterval: 3000,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageData) => {
      return await base44.entities.Message.create(messageData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', channelName, projectId] });
      setMessage("");
    },
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !currentUser) return;

    sendMessageMutation.mutate({
      project_id: projectId || null,
      channel_name: channelName,
      sender_name: currentUser.full_name || currentUser.email,
      sender_email: currentUser.email,
      message_text: message.trim(),
      message_type: "text",
      is_read: false
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="fixed right-0 top-0 h-full w-96 shadow-2xl z-50 flex flex-col"
      style={{ background: 'var(--panel)', borderLeft: '1px solid var(--line)' }}
    >
      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--line)' }}>
        <div>
          <h3 className="font-bold" style={{ color: 'var(--text)' }}>{channelName}</h3>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>
            {projectId ? 'Project Chat' : 'General Channel'}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="rounded-full"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="text-center" style={{ color: 'var(--muted)' }}>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8" style={{ color: 'var(--muted)' }}>
            No messages yet. Start the conversation!
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${msg.sender_email === currentUser?.email ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender_email === currentUser?.email
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-3 h-3" />
                    <span className="text-xs font-semibold">{msg.sender_name}</span>
                  </div>
                  <p className="text-sm">{msg.message_text}</p>
                  <div className="flex items-center gap-1 mt-1 opacity-70">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">
                      {format(new Date(msg.created_date), 'HH:mm')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t" style={{ borderColor: 'var(--line)' }}>
        <div className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 resize-none rounded-lg"
            style={{
              background: 'var(--panelAlt)',
              border: '1px solid var(--line)',
              color: 'var(--text)'
            }}
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <Button
            type="submit"
            disabled={!message.trim() || sendMessageMutation.isPending}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </motion.div>
  );
}