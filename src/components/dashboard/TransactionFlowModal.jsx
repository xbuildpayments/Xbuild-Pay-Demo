import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, RotateCcw, ExternalLink, Wallet, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const demoHashes = ["7C1A…9F2", "B4E8…2D0", "A93F…77C"];

export default function TransactionFlowModal({ isOpen, onClose, project }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [showComplete, setShowComplete] = useState(false);

  const stages = [
    { id: 0, name: "Submission", description: "Milestone documentation uploaded", color: "blue" },
    { id: 1, name: "TrustScore", description: `TrustScore ${project?.trustScore || 92} validated`, color: "yellow" },
    { id: 2, name: "AI Check", description: "AI Integrity confidence 96%", color: "yellow" },
    { id: 3, name: "Escrow Release", description: `${project?.lastMilestone?.payoutPct || 15}% released`, color: "green" },
    { id: 4, name: "XRPL Hash", description: "Transaction recorded on-chain", color: "green" }
  ];

  const wallets = [
    { label: "Developer", amount: "$" + (project?.total_budget || 0).toLocaleString() },
    { label: "Escrow", amount: "$" + (project?.escrow_balance || 0).toLocaleString() },
    { label: "Contractor", amount: "80%" },
    { label: "Supplier", amount: "15%" }
  ];

  const runDemo = async () => {
    setIsPlaying(true);
    setShowComplete(false);
    setCurrentStage(0);

    for (let i = 0; i <= 4; i++) {
      setCurrentStage(i);
      await new Promise(resolve => setTimeout(resolve, i === 1 || i === 2 ? 1500 : 1200));
    }

    const randomHash = demoHashes[Math.floor(Math.random() * demoHashes.length)];
    setTxHash(randomHash);
    setShowComplete(true);
    setIsPlaying(false);
  };

  const reset = () => {
    setCurrentStage(0);
    setIsPlaying(false);
    setShowComplete(false);
    setTxHash("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto" style={{ background: 'var(--panel)', border: '1px solid var(--line)', color: 'var(--text)' }}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Transaction Flow Visualization</DialogTitle>
          <p className="text-sm" style={{ color: 'var(--muted)' }}>{project?.name}</p>
        </DialogHeader>

        {/* Timeline */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            {stages.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <div className="flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: currentStage === index ? [1, 1.2, 1] : 1,
                      backgroundColor: currentStage >= index ? 
                        (stage.color === 'blue' ? '#3B82F6' : stage.color === 'yellow' ? '#F59E0B' : '#10B981') 
                        : 'var(--line)'
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                  >
                    {currentStage > index ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
                  </motion.div>
                  <p className="text-xs font-medium mt-2 text-center max-w-[100px]" style={{ color: 'var(--muted)' }}>{stage.name}</p>
                </div>
                {index < stages.length - 1 && (
                  <div className="flex-1 h-1 mx-2 rounded" style={{ background: 'var(--line)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: currentStage > index ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                      className="h-full rounded"
                      style={{ background: 'var(--success)' }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Flow Visualization */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="rounded-lg p-6" style={{ background: 'var(--panelAlt)' }}>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>Payment Flow</h3>
            <div className="space-y-4">
              {wallets.map((wallet, index) => (
                <motion.div
                  key={wallet.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: currentStage >= index ? 1 : 0.3,
                    x: 0 
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                >
                  <Wallet className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                  <div className="flex-1">
                    <p className="font-medium text-sm" style={{ color: 'var(--text)' }}>{wallet.label}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{wallet.amount}</p>
                  </div>
                  {currentStage >= index && (
                    <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--success)' }} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="rounded-lg p-6" style={{ background: 'var(--panelAlt)' }}>
            <h3 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>Stage Details</h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <div>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>Stage</p>
                  <p className="font-bold text-lg" style={{ color: 'var(--text)' }}>{stages[currentStage].name}</p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>Description</p>
                  <p className="text-sm" style={{ color: 'var(--text)' }}>{stages[currentStage].description}</p>
                </div>
                <div>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>Milestone</p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{project?.lastMilestone?.id || "M-212.7"}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{project?.lastMilestone?.title || "Electrical Install Complete"}</p>
                </div>
                {showComplete && txHash && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-4 p-3 rounded-lg"
                    style={{ background: 'rgba(23,201,100,.14)', border: '1px solid var(--success)' }}
                  >
                    <p className="text-sm mb-1" style={{ color: 'var(--muted)' }}>XRPL Transaction Hash</p>
                    <code className="text-sm font-mono font-bold" style={{ color: 'var(--success)' }}>{txHash}</code>
                    <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>✓ Recorded on XRPL (demo)</p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between border-t pt-4" style={{ borderColor: 'var(--line)' }}>
          <div className="flex gap-3">
            <Button
              onClick={runDemo}
              disabled={isPlaying}
              style={{ background: 'linear-gradient(90deg, #2563eb, #3b82f6)', color: '#ffffff' }}
            >
              <Play className="w-4 h-4 mr-2" />
              {isPlaying ? 'Running Demo...' : 'Run Demo Transaction'}
            </Button>
            <Button onClick={reset} variant="outline" style={{ border: '1px solid var(--line)', color: 'var(--text)' }}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Replay
            </Button>
          </div>
          {txHash && (
            <a
              href={`https://testnet.xrpl.org/transactions/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm flex items-center gap-1"
              style={{ color: 'var(--accent)' }}
            >
              View on XRPL (test hash)
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}