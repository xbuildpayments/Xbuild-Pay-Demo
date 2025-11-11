
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, MapPin, AlertCircle, TrendingUp, CheckCircle2, Shield, FileText, ExternalLink, Clock, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ChatPanel from "../components/collaboration/ChatPanel";
import DocumentManager from "../components/collaboration/DocumentManager";
import AIProjectInsights from "../components/ai/AIProjectInsights";

export default function ProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');
  const [showChat, setShowChat] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);

  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const projects = await base44.entities.Project.list();
      return projects.find(p => p.id === projectId);
    },
  });

  const { data: milestones, isLoading } = useQuery({
    queryKey: ['milestones', projectId],
    queryFn: async () => {
      const all = await base44.entities.Milestone.list();
      return all.filter(m => m.project_id === projectId).sort((a, b) => a.order - b.order);
    },
    initialData: [],
  });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="text-center" style={{ color: 'var(--muted)' }}>Loading project...</div>
      </div>
    );
  }

  const completedMilestones = milestones.filter(m => m.status === 'completed').length;
  const inProgressMilestones = milestones.filter(m => m.status === 'pending').length;

  const flowStages = [
    { key: "D", label: "Deposit", completed: true },
    { key: "E", label: "Escrow", completed: true },
    { key: "C", label: "Compliance", completed: true },
    { key: "S", label: "Supplier", completed: false },
    { key: "R", label: "Reserve", completed: false }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header with Back Button */}
      <motion.div 
        className="border-b px-8 py-6"
        style={{ background: 'var(--panel)', borderColor: 'var(--line)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link
          to={createPageUrl("Dashboard")}
          className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-4"
          style={{ color: 'var(--muted)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
        
        {/* Add AI Insights Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Project Details</h1>
          </div>
          <Button
            onClick={() => setShowAIInsights(!showAIInsights)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {showAIInsights ? 'Hide AI Insights' : 'Show AI Insights'}
          </Button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* AI Insights Section (Collapsible) */}
          <AnimatePresence>
            {showAIInsights && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <AIProjectInsights project={project} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Project Header Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 md:p-8 shadow-lg ring-1"
            style={{ background: 'rgba(15, 23, 42, 0.6)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--text)' }}>
                  {project.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color: 'var(--muted)' }}>
                  <span className="font-medium" style={{ color: 'var(--text)' }}>{project.contractor}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="rounded-xl"
                style={{ 
                  background: 'transparent',
                  border: '1px solid var(--line)',
                  color: 'var(--muted)'
                }}
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Alerts
              </Button>
            </div>
          </motion.div>

          {/* KPI Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                Contract Value
              </p>
              <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                ${project.total_budget.toLocaleString()}
              </p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>USD • Fixed-price GC</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                Escrow Balance
              </p>
              <p className="text-3xl font-bold mb-1" style={{ color: 'var(--accent)' }}>
                ${project.escrow_balance.toLocaleString()}
              </p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>XRPL Smart Escrow</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                Progress
              </p>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
                  {project.progress_percentage}%
                </p>
                <TrendingUp className="w-5 h-5" style={{ color: 'var(--success)' }} />
              </div>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>on schedule</p>
            </motion.div>
          </div>

          {/* Trust & Compliance + Transaction Flow Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trust & Compliance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <h3 className="text-sm font-semibold uppercase mb-4" style={{ color: 'var(--text)', letterSpacing: '0.05em' }}>
                Trust & Compliance
              </h3>
              <div className="flex flex-wrap gap-2">
                <span 
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-all cursor-pointer"
                  style={{ 
                    background: 'rgba(30, 41, 59, 0.7)',
                    color: 'var(--text)',
                    ringColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  TrustScore 90
                </span>
                <Link
                  to={createPageUrl(`Insurance?project=${projectId}`)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-all"
                  style={{ 
                    background: 'rgba(30, 41, 59, 0.7)',
                    color: 'var(--text)',
                    ringColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <Shield className="w-3.5 h-3.5 text-blue-400" />
                  Insurance: Policy Active
                </Link>
                <span 
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-all cursor-pointer"
                  style={{ 
                    background: 'rgba(30, 41, 59, 0.7)',
                    color: 'var(--text)',
                    ringColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  KYC & Licensing: Verified
                </span>
                <Link
                  to={createPageUrl(`Ledger?project=${projectId}`)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-all"
                  style={{ 
                    background: 'rgba(30, 41, 59, 0.7)',
                    color: 'var(--text)',
                    ringColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <FileText className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
                  Audit Trail
                </Link>
              </div>
            </motion.div>

            {/* Transaction Flow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <h3 className="text-sm font-semibold uppercase mb-4" style={{ color: 'var(--text)', letterSpacing: '0.05em' }}>
                Transaction Flow
              </h3>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {flowStages.map((stage, idx) => (
                    <React.Fragment key={stage.key}>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                        style={{
                          background: stage.completed ? 'var(--accent)' : 'transparent',
                          border: stage.completed ? 'none' : '2px solid var(--line)',
                          color: stage.completed ? '#ffffff' : 'var(--muted)'
                        }}
                        title={stage.label}
                      >
                        {stage.key}
                      </div>
                      {idx < flowStages.length - 1 && (
                        <div 
                          className="w-4 h-0.5"
                          style={{ background: stage.completed ? 'var(--accent)' : 'var(--line)' }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs" style={{ color: 'var(--muted)' }}>
                  Escrow Release • 15%
                </p>
                <Link
                  to={createPageUrl(`InvestorDemo?project=${projectId}`)}
                  className="inline-flex items-center gap-1 text-xs font-medium hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--accent)' }}
                >
                  View Flow
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Collaboration Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <h3 className="text-sm font-semibold uppercase mb-3" style={{ color: 'var(--text)', letterSpacing: '0.05em' }}>
                Team Communication
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                Real-time messaging with your project team
              </p>
              <Button
                onClick={() => setShowChat(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Open Project Chat
              </Button>
            </div>

            <div className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <h3 className="text-sm font-semibold uppercase mb-3" style={{ color: 'var(--text)', letterSpacing: '0.05em' }}>
                Project Documents
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                Share contracts, drawings, and reports
              </p>
              <Button
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold"
              >
                <FileText className="w-4 h-4 mr-2" />
                View Documents Below
              </Button>
            </div>
          </motion.div>

          {/* Summary Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-xl p-5 shadow-sm ring-1"
            style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Milestones</p>
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>
                    {inProgressMilestones} In Progress
                  </p>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: 'var(--success)' }} />
                    <span className="font-semibold" style={{ color: 'var(--text)' }}>In Progress</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Alerts</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: 'var(--success)' }} />
                    <span className="font-semibold" style={{ color: 'var(--text)' }}>Inspection Passed</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Milestone Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Milestone Details</h2>
            
            {/* Progress Rail */}
            <div className="rounded-xl p-6 shadow-sm ring-1 mb-6"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--muted)' }}>
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
                <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'linear-gradient(90deg, var(--accent), var(--success))' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress_percentage}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </div>
                <p className="text-right text-xs mt-2" style={{ color: 'var(--muted)' }}>
                  Current Progress: {project.progress_percentage}%
                </p>
              </div>
            </div>

            {/* Milestone Cards */}
            {isLoading ? (
              <div className="text-center py-12" style={{ color: 'var(--muted)' }}>Loading milestones...</div>
            ) : (
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="rounded-xl p-5 shadow-sm ring-1"
                    style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
                            {milestone.name}
                          </h3>
                          <span
                            className="px-3 py-1 text-xs font-semibold rounded-full"
                            style={{
                              background: milestone.status === 'completed' 
                                ? 'rgba(34, 197, 94, 0.2)' 
                                : milestone.status === 'pending'
                                ? 'rgba(59, 130, 246, 0.2)'
                                : 'rgba(100, 116, 139, 0.2)',
                              color: milestone.status === 'completed'
                                ? 'var(--success)'
                                : milestone.status === 'pending'
                                ? 'var(--accent)'
                                : 'var(--muted)'
                            }}
                          >
                            {milestone.status === 'completed' ? 'Passed' : 
                             milestone.status === 'pending' ? 'Submitted' : 'Queued'}
                          </span>
                        </div>
                        {milestone.description && (
                          <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
                            {milestone.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Due: {new Date(milestone.due_date).toLocaleDateString()}
                          </span>
                          {milestone.completion_date && (
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" style={{ color: 'var(--success)' }} />
                              Completed {new Date(milestone.completion_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <p className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>
                          ${milestone.amount.toLocaleString()}
                        </p>
                        {milestone.status === 'pending' && (
                          <Button
                            onClick={() => window.location.href = createPageUrl(`EscrowRelease?id=${milestone.id}&projectId=${projectId}`)}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md focus-visible:ring-2 focus-visible:ring-blue-500"
                          >
                            Submit Payment
                          </Button>
                        )}
                        {milestone.status === 'completed' && (
                          <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--success)' }}>
                            <CheckCircle2 className="w-4 h-4" />
                            Payment Released
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Document Manager Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <DocumentManager projectId={projectId} />
          </motion.div>
        </div>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {showChat && (
          <ChatPanel
            projectId={projectId}
            channelName={project?.name || 'Project Chat'}
            onClose={() => setShowChat(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
