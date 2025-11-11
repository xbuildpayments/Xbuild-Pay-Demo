import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Check, Clock, Shield, Wallet, Building2, Package, FileText, ExternalLink } from "lucide-react";

export default function TransactionFlow() {
  const [flowStarted, setFlowStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [txHash, setTxHash] = useState("");

  const steps = [
    {
      id: 1,
      title: "Milestone Payment Initiated",
      description: "Developer locks $50,000 in XRPL smart contract escrow",
      icon: Building2,
      color: "blue",
      from: "Developer",
      to: "Smart Contract Escrow",
      amount: "$50,000",
      xrp: "96,154 XRP",
      status: "locked"
    },
    {
      id: 2,
      title: "Compliance Validation",
      description: "Oracle verifies contractor license, progress report, and insurance",
      icon: Shield,
      color: "yellow",
      checks: ["✓ License Valid", "✓ Progress Report Approved", "✓ Insurance Current"],
      status: "validating"
    },
    {
      id: 3,
      title: "Funds Released to Contractor",
      description: "80% transferred to general contractor wallet",
      icon: Wallet,
      color: "green",
      from: "Smart Contract",
      to: "GC Wallet (rNx...4K8)",
      amount: "$40,000",
      xrp: "76,923 XRP",
      status: "completed"
    },
    {
      id: 4,
      title: "Supplier Payment",
      description: "15% auto-transferred to linked supplier",
      icon: Package,
      color: "green",
      from: "Smart Contract",
      to: "Supplier (rPk...2L9)",
      amount: "$7,500",
      xrp: "14,423 XRP",
      status: "completed"
    },
    {
      id: 5,
      title: "Insurance Reserve",
      description: "5% held in bonding account for 90 days",
      icon: Shield,
      color: "green",
      from: "Smart Contract",
      to: "Insurance Reserve",
      amount: "$2,500",
      xrp: "4,808 XRP",
      status: "completed"
    }
  ];

  const runDemoTransaction = async () => {
    setFlowStarted(true);
    setCurrentStep(0);
    setShowSuccess(false);

    // Generate mock transaction hash
    const mockHash = 'XRP' + Math.random().toString(36).substring(2, 15).toUpperCase() + Math.random().toString(36).substring(2, 15).toUpperCase();
    setTxHash(mockHash);

    // Step through the flow
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, i === 1 ? 2500 : 2000));
    }

    setCurrentStep(steps.length);
    await new Promise(resolve => setTimeout(resolve, 500));
    setShowSuccess(true);
  };

  const resetFlow = () => {
    setFlowStarted(false);
    setCurrentStep(0);
    setShowSuccess(false);
    setTxHash("");
  };

  const getStepStatus = (stepIndex) => {
    if (!flowStarted) return "pending";
    if (currentStep > stepIndex) return "completed";
    if (currentStep === stepIndex) return "active";
    return "pending";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div 
        className="bg-white border-b border-gray-200 px-8 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Milestone Payment Flow</h1>
            <p className="text-gray-600 mt-1">Real-time XRPL transaction demonstration</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fd9eaa10a3803cbfd64758/d47cf260c_XbuildPaylogo.png"
              alt="XBuild Pay"
              className="h-8 mix-blend-multiply"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">Interactive Transaction Demo</h2>
                <p className="text-sm text-gray-600">Click to simulate a real milestone payment on XRPL</p>
              </div>
              {!flowStarted ? (
                <Button 
                  onClick={runDemoTransaction}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-12 px-6 font-semibold"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Run Demo Transaction
                </Button>
              ) : showSuccess ? (
                <Button 
                  onClick={resetFlow}
                  variant="outline"
                  className="border-gray-300 rounded-lg h-12 px-6 font-semibold"
                >
                  Reset Demo
                </Button>
              ) : (
                <div className="flex items-center gap-2 text-blue-600">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="w-5 h-5" />
                  </motion.div>
                  <span className="font-semibold">Processing...</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Transaction Flow */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const status = getStepStatus(index);
              const Icon = step.icon;
              
              const colorConfig = {
                blue: { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700", icon: "text-blue-600" },
                yellow: { bg: "bg-yellow-50", border: "border-yellow-300", text: "text-yellow-700", icon: "text-yellow-600" },
                green: { bg: "bg-green-50", border: "border-green-300", text: "text-green-700", icon: "text-green-600" }
              };
              
              const colors = colorConfig[step.color];

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: status === "pending" && !flowStarted ? 0.4 : 1,
                    x: 0 
                  }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`bg-white rounded-xl shadow-sm border-2 ${
                    status === "active" ? colors.border : "border-gray-200"
                  } p-6 relative overflow-hidden`}
                >
                  {/* Active Status Indicator */}
                  {status === "active" && (
                    <motion.div
                      className={`absolute inset-0 ${colors.bg} opacity-50`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-14 h-14 ${colors.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        {status === "completed" ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            <Check className="w-7 h-7 text-green-600" />
                          </motion.div>
                        ) : (
                          <Icon className={`w-7 h-7 ${colors.icon}`} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{step.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                          </div>
                          
                          {/* Status Badge */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: status !== "pending" ? 1 : 0 }}
                            className={`px-3 py-1 ${colors.bg} ${colors.text} text-xs font-semibold rounded-full`}
                          >
                            {status === "completed" ? "✓ Completed" : status === "active" ? "Processing..." : "Pending"}
                          </motion.div>
                        </div>

                        {/* Compliance Checks */}
                        {step.checks && status !== "pending" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.4 }}
                            className="space-y-1 mt-3"
                          >
                            {step.checks.map((check, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="text-sm text-gray-700 flex items-center gap-2"
                              >
                                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                  <Check className="w-3 h-3 text-green-600" />
                                </div>
                                {check}
                              </motion.div>
                            ))}
                          </motion.div>
                        )}

                        {/* Transaction Details */}
                        {step.from && step.to && status !== "pending" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            transition={{ duration: 0.4 }}
                            className="mt-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500 mb-1">From</p>
                                <p className="font-semibold text-gray-900">{step.from}</p>
                              </div>
                              <div>
                                <p className="text-gray-500 mb-1">To</p>
                                <p className="font-semibold text-gray-900">{step.to}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-gray-500 mb-1">Amount</p>
                                <p className="font-bold text-gray-900">{step.amount}</p>
                                <p className="text-xs text-gray-500">{step.xrp}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Success Summary */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg border-2 border-green-300 p-8"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center"
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Transaction Finalized!</h2>
                  <p className="text-gray-600 mb-6">All funds distributed successfully via XRPL smart contract</p>
                  
                  <div className="bg-white rounded-lg p-6 mb-6 max-w-2xl mx-auto">
                    <div className="grid grid-cols-2 gap-6 mb-4">
                      <div className="text-left">
                        <p className="text-sm text-gray-500 mb-1">Transaction Hash</p>
                        <div className="flex items-center gap-2">
                          <code className="text-xs font-mono text-blue-600">{txHash.substring(0, 24)}...</code>
                          <a 
                            href={`https://livenet.xrpl.org/transactions/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Confirmation Time</p>
                        <p className="font-bold text-gray-900">3.2 seconds</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 text-sm text-gray-600">
                      <div className="flex items-center justify-between mb-2">
                        <span>Total Distributed:</span>
                        <span className="font-bold text-gray-900">$50,000 (96,154 XRP)</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span>Network Fee:</span>
                        <span className="font-semibold text-gray-700">0.00001 XRP (~$0.000005)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Processing Time:</span>
                        <span className="font-semibold text-green-600">99.2% faster than traditional banking</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <img 
                      src="https://xrpl.org/assets/img/xrp-symbol.svg" 
                      alt="XRPL"
                      className="w-5 h-5"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                    <span className="font-semibold">Powered by XRP Ledger</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-blue-50 rounded-xl border border-blue-200 p-6"
          >
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">Transparent Audit Trail</h3>
                <p className="text-sm text-blue-800">
                  Every transaction is permanently recorded on the XRP Ledger blockchain. All parties can independently verify payments, 
                  compliance checks, and fund distribution through the public ledger explorer. This eliminates disputes and ensures 
                  complete transparency in construction payment workflows.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}