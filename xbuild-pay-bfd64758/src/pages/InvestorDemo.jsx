
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, CheckCircle2, Shield, Zap, Camera, FileCheck, Wallet, Award, TrendingUp, QrCode, AlertCircle } from "lucide-react";

export default function InvestorDemo() {
  const [currentFlow, setCurrentFlow] = useState(1);
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const flow1Scenes = [
    {
      id: 1,
      title: "Milestone Submission",
      subtitle: "Subcontractor completes Level 2 Electrical Install",
      description: "Uploads 3 geo-tagged photos, checklist, and digital signature",
      icon: Camera,
      color: "blue",
      action: "Submit Milestone",
      status: "Submitted ✔",
      timestamp: "2:47 PM PST",
      location: "Pacific Towers - Phase 2",
      details: ["3 Photos Uploaded", "Safety Checklist Complete", "Digital Signature Verified"]
    },
    {
      id: 2,
      title: "TrustScore Validation",
      subtitle: "System validates subcontractor reputation",
      description: "TrustScore 88/100 with verified history",
      icon: Award,
      color: "yellow",
      trustScore: 88,
      badges: ["14 Verified Milestones", "1 Resolved Dispute", "GC Endorsed × 3 Projects"],
      confidence: 96
    },
    {
      id: 3,
      title: "AI Integrity Check",
      subtitle: "Workflow Engine analyzes submission",
      description: "AI reviews RFIs + BoQ for accuracy",
      icon: Zap,
      color: "yellow",
      aiConfidence: 96,
      checks: ["✓ Documentation Complete", "✓ Budget Alignment Verified", "✓ Timeline Consistency Check"]
    },
    {
      id: 4,
      title: "Escrow Release Trigger",
      subtitle: "Smart Contract executes payment",
      description: "15% of contract sum released via XRPL",
      icon: Wallet,
      color: "green",
      amount: "$45,000",
      xrp: "86,538 XRP",
      from: "Developer Escrow",
      to: "Subcontractor Wallet",
      txHash: "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855"
    },
    {
      id: 5,
      title: "Audit & Notifications",
      subtitle: "Transaction recorded on-chain",
      description: "GC and finance team auto-alerted",
      icon: CheckCircle2,
      color: "green",
      notifications: ["GC Dashboard Updated", "Finance Alert Sent", "Ledger Entry Confirmed"],
      ledger: "XRPL Block #48,952,031"
    }
  ];

  const flow2Scenes = [
    {
      id: 1,
      title: "Field Completion + QR Verification",
      subtitle: "Subcontractor logs completion",
      description: "Site Manager scans QR and signs with wallet",
      icon: QrCode,
      color: "blue",
      action: "Scan QR Code",
      verification: "Verified by Site Manager",
      siteManager: "James Chen - Lead Supervisor",
      timestamp: "4:12 PM PST"
    },
    {
      id: 2,
      title: "TrustScore Boost + AI Forecast",
      subtitle: "Reputation score increases",
      description: "Score +2 points, AI forecasts low risk",
      icon: TrendingUp,
      color: "yellow",
      trustScoreBefore: 88,
      trustScoreAfter: 90,
      riskLevel: "Low",
      forecast: "98% on-time probability for next milestone"
    },
    {
      id: 3,
      title: "Insurance Trigger Logic",
      subtitle: "Condition met - Insurance node activated",
      description: "Underwriter dashboard updates status",
      icon: Shield,
      color: "yellow",
      trigger: "Policy Check Activated",
      status: "Monitored",
      coverage: "$2.5M Active Coverage",
      underwriter: "BuildSafe Insurance Co."
    },
    {
      id: 4,
      title: "Smart Escrow Disbursement",
      subtitle: "Multi-party payment execution",
      description: "Funds auto-released per contract terms",
      icon: Wallet,
      color: "green",
      payments: [
        { party: "Contractor", percentage: 80, amount: "$80,000", xrp: "153,846 XRP" },
        { party: "Supplier", percentage: 15, amount: "$15,000", xrp: "28,846 XRP" },
        { party: "Bond Reserve", percentage: 5, amount: "$5,000", xrp: "9,615 XRP" }
      ],
      totalAmount: "$100,000",
      totalXrp: "192,307 XRP"
    },
    {
      id: 5,
      title: "Underwriter & Ledger Sync",
      subtitle: "Payment recorded and mirrored",
      description: "Insurance log updated with XRPL confirmation",
      icon: CheckCircle2,
      color: "green",
      txHash: "D7A8FBB307D7809469CA9ABCB0082E4F8D5651E46D3CDB762D02D0BF37C9E592",
      confirmationTime: "3.8 seconds",
      ledgerBlock: "XRPL Block #48,952,089"
    }
  ];

  const scenes = currentFlow === 1 ? flow1Scenes : flow2Scenes;
  const flowTitle = currentFlow === 1 ? "Mid-Size Contractor Workflow" : "Subcontractor Milestone Flow";
  const flowSubtitle = currentFlow === 1 ? "Real-Time Milestone Payment via XRPL Smart Escrow" : "Verified Field Completion & Insurance Trigger";

  useEffect(() => {
    let interval;
    if (isPlaying && currentScene < scenes.length - 1) {
      interval = setInterval(() => {
        setCurrentScene(prev => prev + 1);
      }, 4500);
    } else if (currentScene >= scenes.length - 1) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentScene, scenes.length]);

  useEffect(() => {
    setProgress((currentScene / (scenes.length - 1)) * 100);
  }, [currentScene, scenes.length]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setCurrentScene(0);
    setIsPlaying(false);
    setProgress(0);
  };

  const handleFlowSwitch = (flowNum) => {
    setCurrentFlow(flowNum);
    setCurrentScene(0);
    setIsPlaying(false);
    setProgress(0);
  };

  const colorConfig = {
    blue: { bg: "bg-blue-50", border: "border-blue-400", text: "text-blue-700", glow: "shadow-blue-500/50" },
    yellow: { bg: "bg-yellow-50", border: "border-yellow-400", text: "text-yellow-700", glow: "shadow-yellow-500/50" },
    green: { bg: "bg-green-50", border: "border-green-400", text: "text-green-700", glow: "shadow-green-500/50" }
  };

  const currentSceneData = scenes[currentScene];
  const colors = colorConfig[currentSceneData.color];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Import button styles */}
      <style>{`
        @import url('/styles/buttons.css');
      `}</style>

      <div className="bg-black/40 backdrop-blur-sm border-b border-gray-700 px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Xbuild Pay - Ripple Swell 2025</h1>
            <p className="text-sm text-gray-400">Interactive Transaction Simulation</p>
          </div>
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fd9eaa10a3803cbfd64758/d47cf260c_XbuildPaylogo.png"
            alt="XBuild Pay"
            className="h-10 mix-blend-screen"
          />
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex gap-4">
            <Button
              onClick={() => handleFlowSwitch(1)}
              className={`flex-1 h-16 text-lg font-semibold rounded-xl transition-all ${
                currentFlow === 1
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700'
              }`}
            >
              Flow 1: Mid-Size Contractor
            </Button>
            <Button
              onClick={() => handleFlowSwitch(2)}
              className={`flex-1 h-16 text-lg font-semibold rounded-xl transition-all ${
                currentFlow === 2
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-100 border border-gray-700'
              }`}
            >
              Flow 2: Subcontractor Milestone
            </Button>
          </div>

          <motion.div
            key={flowTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-2">{flowTitle}</h2>
            <p className="text-lg text-gray-400">{flowSubtitle}</p>
          </motion.div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              {scenes.map((scene, index) => {
                const Icon = scene.icon;
                const isActive = index === currentScene;
                const isCompleted = index < currentScene;
                const sceneColors = colorConfig[scene.color];
                
                return (
                  <div key={scene.id} className="flex-1 flex items-center">
                    <button
                      onClick={() => setCurrentScene(index)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted ? 'bg-green-600 shadow-lg shadow-green-500/50' :
                        isActive ? `${sceneColors.bg.replace('50', '600')} shadow-lg ${sceneColors.glow}` :
                        'bg-gray-700'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      )}
                    </button>
                    {index < scenes.length - 1 && (
                      <div className={`flex-1 h-1 mx-2 rounded transition-all ${
                        index < currentScene ? 'bg-green-600' : 'bg-gray-700'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 via-yellow-500 to-green-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentFlow}-${currentScene}`}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border-2 ${colors.border} p-8 shadow-2xl ${colors.glow}`}
            >
              <div className="flex items-start gap-6 mb-6">
                <div className={`w-20 h-20 ${colors.bg} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <currentSceneData.icon className={`w-10 h-10 ${colors.text}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{currentSceneData.title}</h3>
                    <span className={`px-4 py-1 ${colors.bg} ${colors.text} text-sm font-semibold rounded-full`}>
                      Scene {currentScene + 1} of {scenes.length}
                    </span>
                  </div>
                  <p className="text-lg text-gray-300 mb-2">{currentSceneData.subtitle}</p>
                  <p className="text-gray-400">{currentSceneData.description}</p>
                </div>
              </div>

              <div className="space-y-4">
                {currentFlow === 1 && currentScene === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
                  >
                    <div className="grid grid-cols-2 gap-6 mb-4">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Status</p>
                        <p className="text-xl font-bold text-green-400">{currentSceneData.status}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Time</p>
                        <p className="text-xl font-bold text-white">{currentSceneData.timestamp}</p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-1">Location</p>
                      <p className="text-lg font-semibold text-white">{currentSceneData.location}</p>
                    </div>
                    <div className="space-y-2">
                      {currentSceneData.details.map((detail, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <span className="text-gray-300">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentFlow === 1 && currentScene === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 rounded-xl p-6 border border-yellow-600/50">
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-400 mb-2">TrustScore</p>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.3 }}
                          className="text-6xl font-bold text-yellow-400"
                        >
                          {currentSceneData.trustScore}
                          <span className="text-3xl text-gray-400">/100</span>
                        </motion.div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {currentSceneData.badges.map((badge, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="bg-gray-800/50 rounded-lg p-3 text-center"
                          >
                            <Award className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-300">{badge}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                      <p className="text-sm text-gray-400 mb-2">AI Confidence</p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-4 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${currentSceneData.confidence}%` }}
                            transition={{ delay: 0.7, duration: 1 }}
                            className="h-full bg-gradient-to-r from-green-600 to-green-400"
                          />
                        </div>
                        <span className="text-2xl font-bold text-green-400">{currentSceneData.confidence}%</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentFlow === 1 && currentScene === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 rounded-xl p-6 border border-yellow-600/50 text-center">
                      <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-400 mb-2">AI Integrity Confidence</p>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.3 }}
                        className="text-6xl font-bold text-yellow-400 mb-4"
                      >
                        {currentSceneData.aiConfidence}%
                      </motion.div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full font-semibold"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Validated ✅
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      {currentSceneData.checks.map((check, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                          className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 flex items-center gap-3"
                        >
                          <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{check}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentFlow === 1 && currentScene === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-xl p-6 border border-green-600/50">
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-400 mb-2">From</p>
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <Wallet className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                            <p className="font-semibold text-white">{currentSceneData.from}</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400 mb-2">To</p>
                          <div className="bg-gray-800/50 rounded-lg p-4">
                            <Wallet className="w-8 h-8 text-green-400 mx-auto mb-2" />
                            <p className="font-semibold text-white">{currentSceneData.to}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-center mb-4">
                        <p className="text-sm text-gray-400 mb-2">Amount</p>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.4 }}
                        >
                          <p className="text-5xl font-bold text-green-400">{currentSceneData.amount}</p>
                          <p className="text-xl text-gray-400 mt-1">{currentSceneData.xrp}</p>
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="h-2 bg-gradient-to-r from-blue-600 via-green-400 to-green-600 rounded-full mb-4"
                      />
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">Transaction Hash</p>
                      <code className="text-xs font-mono text-green-400 break-all">{currentSceneData.txHash}</code>
                    </div>
                  </motion.div>
                )}

                {currentFlow === 1 && currentScene === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-xl p-6 border border-green-600/50 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ duration: 1, delay: 0.2 }}
                      >
                        <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-4" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-white mb-2">Ledger Recorded on XRPL</h4>
                      <p className="text-gray-400 mb-4">{currentSceneData.ledger}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {currentSceneData.notifications.map((notification, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 text-center"
                        >
                          <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-300">{notification}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentFlow === 2 && currentScene === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 rounded-xl p-6 border border-blue-600/50 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ delay: 0.3, repeat: 2 }}
                      >
                        <QrCode className="w-24 h-24 text-blue-400 mx-auto mb-4" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-full font-semibold"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        {currentSceneData.verification}
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Site Manager</p>
                        <p className="font-semibold text-white">{currentSceneData.siteManager}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Timestamp</p>
                        <p className="font-semibold text-white">{currentSceneData.timestamp}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentFlow === 2 && currentScene === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 rounded-xl p-6 border border-yellow-600/50">
                      <div className="flex items-center justify-center gap-8 mb-6">
                        <div className="text-center">
                          <p className="text-sm text-gray-400 mb-2">Previous Score</p>
                          <div className="text-4xl font-bold text-gray-400">{currentSceneData.trustScoreBefore}</div>
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, x: [0, 10, 0] }}
                          transition={{ delay: 0.4, duration: 0.8 }}
                        >
                          <TrendingUp className="w-12 h-12 text-green-400" />
                        </motion.div>
                        <div className="text-center">
                          <p className="text-sm text-gray-400 mb-2">New Score</p>
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.6 }}
                            className="text-4xl font-bold text-green-400"
                          >
                            {currentSceneData.trustScoreAfter}
                          </motion.div>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="inline-flex items-center gap-2 px-6 py-2 bg-green-600/20 text-green-400 rounded-full font-semibold">
                          +2 Points
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                      <p className="text-sm text-gray-400 mb-2">AI Risk Forecast</p>
                      <div className="flex items-center gap-4">
                        <span className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg font-semibold">
                          {currentSceneData.riskLevel} Risk
                        </span>
                        <span className="text-gray-300">{currentSceneData.forecast}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentFlow === 2 && currentScene === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 rounded-xl p-6 border border-yellow-600/50 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.3 }}
                      >
                        <Shield className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-full font-semibold mb-4"
                      >
                        <AlertCircle className="w-5 h-5" />
                        {currentSceneData.trigger}
                      </motion.div>
                      <p className="text-xl font-semibold text-white mb-2">Status: {currentSceneData.status}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Coverage</p>
                        <p className="text-xl font-bold text-green-400">{currentSceneData.coverage}</p>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                        <p className="text-sm text-gray-400 mb-1">Underwriter</p>
                        <p className="font-semibold text-white">{currentSceneData.underwriter}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentFlow === 2 && currentScene === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-xl p-6 border border-green-600/50">
                      <div className="text-center mb-6">
                        <p className="text-sm text-gray-400 mb-2">Total Disbursement</p>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.3 }}
                        >
                          <p className="text-5xl font-bold text-green-400">{currentSceneData.totalAmount}</p>
                          <p className="text-xl text-gray-400 mt-1">{currentSceneData.totalXrp}</p>
                        </motion.div>
                      </div>
                      <div className="space-y-3">
                        {currentSceneData.payments.map((payment, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + i * 0.15 }}
                            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Wallet className="w-6 h-6 text-green-400" />
                                <div>
                                  <p className="font-semibold text-white">{payment.party}</p>
                                  <p className="text-xs text-gray-400">{payment.percentage}% of total</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-xl font-bold text-green-400">{payment.amount}</p>
                                <p className="text-xs text-gray-400">{payment.xrp}</p>
                              </div>
                            </div>
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              transition={{ delay: 0.7 + i * 0.15, duration: 0.5 }}
                              className="h-1 bg-gradient-to-r from-green-600 to-green-400 rounded-full mt-2"
                              style={{ transformOrigin: 'left' }}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentFlow === 2 && currentScene === 4 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 rounded-xl p-6 border border-green-600/50 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ duration: 1, delay: 0.2 }}
                      >
                        <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-4" />
                      </motion.div>
                      <h4 className="text-2xl font-bold text-white mb-2">Funds Released on XRPL</h4>
                      <p className="text-gray-400 mb-4">{currentSceneData.ledgerBlock}</p>
                      <span className="inline-flex items-center gap-2 px-6 py-2 bg-green-600/20 text-green-400 rounded-full font-semibold">
                        Confirmation: {currentSceneData.confirmationTime}
                      </span>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">Transaction Hash</p>
                      <code className="text-xs font-mono text-green-400 break-all">{currentSceneData.txHash}</code>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Control Buttons with Fixed Structure */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleReset}
                className="btn btn-secondary flex items-center gap-2"
                id="btn-reset"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              <button
                onClick={handlePlayPause}
                className={`btn ${isPlaying ? 'btn-secondary' : 'btn-primary'} flex items-center gap-2 px-8`}
                id="btn-start"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause Demo
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    {currentScene === 0 ? 'Start Demo' : 'Resume Demo'}
                  </>
                )}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentScene(Math.max(0, currentScene - 1))}
                  disabled={currentScene === 0}
                  className={`btn ${currentScene === 0 ? 'btn-disabled' : 'btn-secondary'}`}
                  id="btn-prev"
                  aria-disabled={currentScene === 0}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentScene(Math.min(scenes.length - 1, currentScene + 1))}
                  disabled={currentScene === scenes.length - 1}
                  className={`btn ${currentScene === scenes.length - 1 ? 'btn-disabled' : 'btn-secondary'}`}
                  id="btn-next"
                  aria-disabled={currentScene === scenes.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
