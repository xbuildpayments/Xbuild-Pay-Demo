import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Shield, Zap, CheckCircle2, Search, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EscrowRelease() {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const urlParams = new URLSearchParams(window.location.search);
  const milestoneId = urlParams.get('id');
  const projectId = urlParams.get('projectId');

  const { data: milestone } = useQuery({
    queryKey: ['milestone', milestoneId],
    queryFn: async () => {
      const all = await base44.entities.Milestone.list();
      return all.find(m => m.id === milestoneId);
    },
  });

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const all = await base44.entities.Project.list();
      return all.find(p => p.id === projectId);
    },
  });

  const releaseFunds = async () => {
    setIsProcessing(true);
    
    // Step 1: Initiating
    setProcessingStep(1);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Step 2: Processing on XRPL
    setProcessingStep(2);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Step 3: Confirming
    setProcessingStep(3);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    await base44.entities.Milestone.update(milestoneId, {
      ...milestone,
      status: 'completed',
      completion_date: new Date().toISOString().split('T')[0]
    });

    await base44.entities.Transaction.create({
      project_id: projectId,
      milestone_id: milestoneId,
      transaction_type: 'payment',
      amount: milestone.amount,
      xrp_amount: (milestone.amount / 0.52).toFixed(2),
      status: 'paid',
      transaction_date: new Date().toISOString().split('T')[0],
      recipient: project.contractor,
      xrp_transaction_hash: 'XRP' + Math.random().toString(36).substring(2, 15).toUpperCase()
    });

    setIsProcessing(false);
    setProcessingStep(0);
    setShowSuccessModal(true);
  };

  const handleSuccess = () => {
    setShowSuccessModal(false);
    navigate(createPageUrl("Ledger"));
  };

  if (!milestone || !project) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  const xrpAmount = (milestone.amount / 0.52).toFixed(2);

  const processingSteps = [
    { label: "Initiating Payment", description: "Preparing transaction..." },
    { label: "Processing on XRPL", description: "Submitting to blockchain..." },
    { label: "Confirming Transaction", description: "Waiting for consensus..." }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.div 
        className="bg-white border-b border-gray-200 px-8 py-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <Link to={createPageUrl(`ProjectDetail?id=${projectId}`)} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Project
          </Link>
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input 
              placeholder="Search..."
              className="pl-10 bg-gray-50 border-gray-200 rounded-lg transition-all duration-200"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Submit Payment</h1>
      </motion.div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Payment Flow Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-6">Payment Flow</h2>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="font-semibold text-gray-900">Escrow</p>
                  <p className="text-xs text-gray-500">${milestone.amount.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex-shrink-0 px-8">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-8 h-8 text-gray-400" />
                </motion.div>
              </div>
              <div className="flex-1">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="font-semibold text-gray-900">{project.contractor}</p>
                  <p className="text-xs text-gray-500">Contractor</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Milestone Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">Milestone Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Project</span>
                <span className="font-semibold text-gray-900">{project.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Milestone</span>
                <span className="font-semibold text-gray-900">{milestone.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contractor</span>
                <span className="font-semibold text-gray-900">{project.contractor}</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-blue-50 rounded-xl border border-blue-200 p-6"
          >
            <h2 className="text-sm font-semibold text-blue-900 uppercase mb-4">Payment Amount</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Contract Value (USD)</span>
                <span className="text-4xl font-bold text-gray-900">${milestone.amount.toLocaleString()}</span>
              </div>
              <div className="border-t border-blue-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">XRP Settlement</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{xrpAmount} XRP</p>
                    <p className="text-xs text-gray-500">Rate: $0.52 USD/XRP</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Instant XRPL Settlement</h3>
                <p className="text-sm text-gray-600">
                  Funds will be released instantly via the XRP Ledger. Transaction confirms in 3-5 seconds with minimal network fees.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex gap-4"
          >
            <Button 
              variant="outline"
              onClick={() => navigate(createPageUrl(`ProjectDetail?id=${projectId}`))}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg h-12 font-semibold transition-all duration-200"
            >
              Cancel
            </Button>
            <Button 
              onClick={releaseFunds}
              disabled={isProcessing}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-12 font-semibold shadow-sm transition-all duration-200"
            >
              {isProcessing ? 'Processing...' : 'Submit Payment'}
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Processing Modal */}
      <Dialog open={isProcessing} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Zap className="w-8 h-8 text-blue-600" />
                </motion.div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Processing Payment</h2>
            </DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-4">
            {processingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: processingStep >= index + 1 ? 1 : 0.3,
                  x: 0 
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-3"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  processingStep > index + 1 ? 'bg-green-500' : processingStep === index + 1 ? 'bg-blue-500' : 'bg-gray-200'
                }`}>
                  {processingStep > index + 1 ? (
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  ) : (
                    <span className="text-white font-bold">{index + 1}</span>
                  )}
                </div>
                <div>
                  <p className={`font-semibold ${processingStep >= index + 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
            <DialogContent className="sm:max-w-md overflow-hidden">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center relative"
                    >
                      <motion.div
                        className="absolute inset-0 bg-green-400 rounded-full"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 1, repeat: 2 }}
                      />
                      <CheckCircle2 className="w-10 h-10 text-green-600 relative z-10" />
                    </motion.div>
                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-2xl font-bold text-gray-900"
                    >
                      Payment Released!
                    </motion.h2>
                  </DialogTitle>
                </DialogHeader>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center py-4"
                >
                  <p className="text-gray-600 mb-2">
                    <span className="font-bold text-green-600">${milestone.amount.toLocaleString()}</span> successfully transferred
                  </p>
                  <p className="text-sm text-gray-500">Transaction confirmed on XRPL in 4 seconds</p>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="h-1 bg-green-500 rounded-full mt-4"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Button 
                    onClick={handleSuccess}
                    className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg h-12 font-semibold transition-all duration-200"
                  >
                    View Transaction Details
                  </Button>
                </motion.div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}