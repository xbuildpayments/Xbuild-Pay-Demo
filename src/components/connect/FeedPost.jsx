import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, ThumbsUp, MessageCircle, Share2, Award, TrendingUp, TrendingDown, AlertCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FeedPost({ post, onEndorse, index }) {
  const typeConfig = {
    milestone: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-600/20", label: "Milestone Completed" },
    advice: { icon: MessageCircle, color: "text-blue-400", bg: "bg-blue-600/20", label: "Advice Request" },
    alert: { icon: AlertCircle, color: "text-yellow-400", bg: "bg-yellow-600/20", label: "Alert" },
    opportunity: { icon: Award, color: "text-purple-400", bg: "bg-purple-600/20", label: "Opportunity" }
  };

  const config = typeConfig[post.type];
  const Icon = config.icon;

  const getTrustScoreColor = (score) => {
    if (score >= 85) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.1 }}
      className="rounded-xl shadow-sm p-6"
      style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'var(--accent)' }}>
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold" style={{ color: 'var(--text)' }}>{post.author}</h3>
              {post.verified && (
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
              )}
              <span className={`px-2 py-0.5 rounded text-xs font-semibold bg-yellow-600/20 ${getTrustScoreColor(post.authorTrustScore)}`}>
                TrustScore {post.authorTrustScore}
              </span>
              {post.trustChange !== 0 && (
                <span className={`px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1 ${
                  post.trustChange > 0 ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                }`}>
                  {post.trustChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {post.trustChange > 0 ? '+' : ''}{(post.trustChange * 100).toFixed(0)}
                </span>
              )}
            </div>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>{post.timestamp}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color} flex items-center gap-1`}>
          <Icon className="w-3 h-3" />
          {config.label}
        </span>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p style={{ color: 'var(--text)' }}>{post.content}</p>
        {post.project && (
          <div className="mt-3 p-3 rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{post.project}</p>
            {post.milestone && <p className="text-xs" style={{ color: 'var(--muted)' }}>{post.milestone}</p>}
          </div>
        )}
        {post.location && (
          <div className="flex items-center gap-2 mt-3 text-sm" style={{ color: 'var(--muted)' }}>
            <MapPin className="w-4 h-4" />
            {post.location}
          </div>
        )}
        
        {/* Trust Signals */}
        {post.signals && post.signals.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.signals.map((signal, i) => (
              <span key={i} className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-blue-600/20 text-blue-400 border border-blue-600/30">
                <Shield className="w-3 h-3" />
                {signal}
              </span>
            ))}
          </div>
        )}
        
        {post.tags && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 rounded text-xs font-medium"
                style={{ background: 'var(--panelAlt)', color: 'var(--muted)' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--line)' }}>
        <Button
          onClick={() => onEndorse(post.id)}
          className="btn-ghost-light flex-1"
        >
          <ThumbsUp className="w-4 h-4 mr-2" />
          Endorse {post.endorsements && `(${post.endorsements})`}
        </Button>
        <Button className="btn-ghost-light flex-1">
          <MessageCircle className="w-4 h-4 mr-2" />
          Comment {post.comments && `(${post.comments})`}
        </Button>
        <Button className="btn-ghost-light">
          <Share2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}