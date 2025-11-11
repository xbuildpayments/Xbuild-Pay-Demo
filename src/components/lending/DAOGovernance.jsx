import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, ThumbsUp, ThumbsDown, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DAOGovernance() {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null);

  const proposals = [
    {
      id: 1,
      title: "Reduce Base APR by 0.5%",
      description: "Lower the base interest rate to 8.0% to attract more borrowers",
      votesFor: 1847,
      votesAgainst: 623,
      deadline: "2025-01-20",
      status: "active",
      txHash: "F8C3...A12"
    },
    {
      id: 2,
      title: "Increase Risk Multiplier for Grade B loans",
      description: "Adjust risk-based pricing to better reflect market conditions",
      votesFor: 2103,
      votesAgainst: 412,
      deadline: "2025-01-18",
      status: "active",
      txHash: "D7B2...E45"
    }
  ];

  const handleVote = (proposalId, vote) => {
    setSelectedVote({ proposalId, vote });
    setHasVoted(true);
    
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<strong>Vote Recorded</strong><br/>Your vote has been submitted to the DAO`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="rounded-xl shadow-sm p-6"
      style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
    >
      <style>{`
        .btn-success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #ffffff;
          font-weight: 600;
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          transition: all 0.2s ease;
        }
        .btn-success:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          box-shadow: 0 0 10px rgba(0, 255, 0, 0.4);
        }
      `}</style>

      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6" style={{ color: 'var(--accent)' }} />
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>DAO Governance</h2>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>Vote on rate changes and policy updates</p>
        </div>
      </div>

      <div className="space-y-4">
        {proposals.map((proposal, index) => {
          const totalVotes = proposal.votesFor + proposal.votesAgainst;
          const forPercentage = ((proposal.votesFor / totalVotes) * 100).toFixed(1);
          const againstPercentage = ((proposal.votesAgainst / totalVotes) * 100).toFixed(1);
          const userVoted = hasVoted && selectedVote?.proposalId === proposal.id;

          return (
            <motion.div
              key={proposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="rounded-xl p-6"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-white">{proposal.title}</h4>
                    {userVoted && (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-600/20 text-green-400">
                        Voted
                      </span>
                    )}
                  </div>
                  <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>{proposal.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs mb-4" style={{ color: 'var(--muted)' }}>
                <Clock className="w-4 h-4" />
                <span>Voting ends {proposal.deadline}</span>
              </div>

              {/* Vote Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4" style={{ color: 'var(--success)' }} />
                    <span style={{ color: 'var(--text)' }}>{proposal.votesFor.toLocaleString()} ({forPercentage}%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: 'var(--text)' }}>{proposal.votesAgainst.toLocaleString()} ({againstPercentage}%)</span>
                    <ThumbsDown className="w-4 h-4" style={{ color: 'var(--warning)' }} />
                  </div>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'var(--panel)' }}>
                  <div className="h-full flex">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${forPercentage}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      className="h-full"
                      style={{ background: 'linear-gradient(90deg, #10b981, #059669)' }}
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${againstPercentage}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                      style={{ background: 'var(--warning)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Vote Buttons */}
              {!userVoted && (
                <div className="flex gap-3 mb-3">
                  <button
                    onClick={() => handleVote(proposal.id, 'for')}
                    className="btn-success flex-1 flex items-center justify-center gap-2"
                  >
                    👍 Vote For
                  </button>
                  <button
                    onClick={() => handleVote(proposal.id, 'against')}
                    className="btn-ghost-light flex-1 flex items-center justify-center gap-2"
                  >
                    👎 Vote Against
                  </button>
                </div>
              )}

              {/* Transaction Hash */}
              <p className="text-[10px]" style={{ color: 'var(--muted)' }}>
                TX Hash: #{proposal.txHash}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}