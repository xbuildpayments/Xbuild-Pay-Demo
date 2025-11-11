import React, { useState } from "react";
import { ArrowLeft, Sparkles, Zap, FileText, DollarSign, CheckCircle2, AlertTriangle, TrendingUp, Plus, Settings, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";

export default function AIAutomation() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showRuleModal, setShowRuleModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: automationRules, isLoading } = useQuery({
    queryKey: ['automation-rules'],
    queryFn: async () => {
      return await base44.entities.AutomationRule.list();
    },
    initialData: [],
  });

  const { data: invoices } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      return await base44.entities.Invoice.list('-created_date');
    },
    initialData: [],
  });

  const { data: reconciliations } = useQuery({
    queryKey: ['reconciliations'],
    queryFn: async () => {
      return await base44.entities.Reconciliation.list('-created_date');
    },
    initialData: [],
  });

  const toggleRuleMutation = useMutation({
    mutationFn: async ({ ruleId, enabled }) => {
      const rule = automationRules.find(r => r.id === ruleId);
      return await base44.entities.AutomationRule.update(ruleId, { ...rule, enabled });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['automation-rules'] });
    },
  });

  const createInvoiceMutation = useMutation({
    mutationFn: async (invoiceData) => {
      return await base44.entities.Invoice.create(invoiceData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });

  // Demo stats
  const stats = {
    totalAutomations: automationRules.length || 12,
    activeRules: automationRules.filter(r => r.enabled).length || 8,
    invoicesGenerated: invoices.filter(i => i.ai_generated).length || 47,
    reconciliationRate: 94,
    timeSaved: "156 hrs",
    accuracyScore: 98
  };

  const demoRules = [
    {
      id: 'rule1',
      name: 'Auto-Invoice on Milestone Completion',
      type: 'invoice_generation',
      enabled: true,
      trigger: 'Milestone status = Completed',
      actions: ['Generate invoice', 'Send to contractor', 'Log to ledger'],
      executions: 23,
      lastRun: '2 hours ago',
      confidence: 96
    },
    {
      id: 'rule2',
      name: 'Smart Escrow Release',
      type: 'escrow_release',
      enabled: true,
      trigger: 'TrustScore > 85 AND Invoice paid',
      actions: ['Verify documents', 'Release escrow', 'Notify parties'],
      executions: 18,
      lastRun: '5 hours ago',
      confidence: 92
    },
    {
      id: 'rule3',
      name: 'Bank Transfer Reconciliation',
      type: 'reconciliation',
      enabled: true,
      trigger: 'New bank transaction received',
      actions: ['Match to ledger', 'Flag discrepancies', 'Update balances'],
      executions: 156,
      lastRun: '15 minutes ago',
      confidence: 98
    },
    {
      id: 'rule4',
      name: 'Payment Reminder Notifications',
      type: 'notification',
      enabled: false,
      trigger: 'Invoice due in 3 days',
      actions: ['Send email', 'In-app notification', 'SMS alert'],
      executions: 42,
      lastRun: '1 day ago',
      confidence: 100
    }
  ];

  const demoInvoices = [
    {
      id: 'inv1',
      number: 'INV-2025-0042',
      project: 'Downtown Plaza Construction',
      milestone: 'Level 2 Electrical Install',
      amount: 45000,
      status: 'sent',
      date: '2025-01-15',
      aiGenerated: true,
      confidence: 96
    },
    {
      id: 'inv2',
      number: 'INV-2025-0041',
      project: 'Harbor View Residential Complex',
      milestone: 'HVAC Installation Complete',
      amount: 55000,
      status: 'paid',
      date: '2025-01-14',
      aiGenerated: true,
      confidence: 94
    },
    {
      id: 'inv3',
      number: 'INV-2025-0040',
      project: 'Tech Campus Phase 2',
      milestone: 'Foundation Waterproofing',
      amount: 32000,
      status: 'draft',
      date: '2025-01-13',
      aiGenerated: false,
      confidence: null
    }
  ];

  const demoReconciliations = [
    {
      id: 'rec1',
      bankTx: 'BNK-8421-001',
      ledgerTx: 'TXN-7C1A9F2',
      amount: 45000,
      project: 'Downtown Plaza',
      status: 'matched',
      confidence: 98,
      method: 'ai_suggested',
      date: '2025-01-15'
    },
    {
      id: 'rec2',
      bankTx: 'BNK-0094-017',
      ledgerTx: 'TXN-B4E82D0',
      amount: 125000,
      project: 'Harbor View',
      status: 'matched',
      confidence: 97,
      method: 'exact',
      date: '2025-01-14'
    },
    {
      id: 'rec3',
      bankTx: 'BNK-8421-002',
      ledgerTx: null,
      amount: 1250,
      project: null,
      status: 'unmatched',
      confidence: 42,
      method: 'fuzzy',
      date: '2025-01-13'
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>AI Automation Hub</h1>
              <p className="mt-1" style={{ color: 'var(--muted)' }}>
                Intelligent automation for invoicing, payments, and reconciliation
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowRuleModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Automation
          </Button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2 rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))', ringColor: 'rgba(139, 92, 246, 0.3)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5" style={{ color: '#a78bfa' }} />
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                  AI Accuracy
                </p>
              </div>
              <p className="text-4xl font-bold mb-1" style={{ color: 'var(--text)' }}>{stats.accuracyScore}%</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Across all automations</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                Active Rules
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--success)' }}>{stats.activeRules}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>of {stats.totalAutomations}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                Invoices
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{stats.invoicesGenerated}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>AI-generated</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                Reconciliation
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--success)' }}>{stats.reconciliationRate}%</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>Match rate</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                Time Saved
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>{stats.timeSaved}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>This month</p>
            </motion.div>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl p-1"
            style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
          >
            <div className="flex gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: Sparkles },
                { id: 'invoices', label: 'Invoices', icon: FileText },
                { id: 'escrow', label: 'Escrow Release', icon: DollarSign },
                { id: 'reconciliation', label: 'Reconciliation', icon: CheckCircle2 }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                  <div className="flex items-start gap-4">
                    <Sparkles className="w-8 h-8 flex-shrink-0" style={{ color: '#60a5fa' }} />
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>AI-Powered Automation</h3>
                      <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
                        XBuild Pay uses advanced AI to automatically generate invoices, release escrow payments, and reconcile transactions with {stats.accuracyScore}% accuracy.
                      </p>
                      <div className="flex gap-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(34, 197, 94, 0.2)', color: 'var(--success)' }}>
                          ✓ {stats.invoicesGenerated} invoices auto-generated
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent)' }}>
                          ⚡ {stats.timeSaved} saved
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Automation Rules</h2>
                
                <div className="space-y-4">
                  {demoRules.map((rule, index) => (
                    <motion.div
                      key={rule.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-xl p-6"
                      style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>{rule.name}</h3>
                            <span
                              className="px-3 py-1 text-xs font-semibold rounded-full"
                              style={{
                                background: rule.enabled ? 'rgba(34, 197, 94, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                                color: rule.enabled ? 'var(--success)' : 'var(--muted)'
                              }}
                            >
                              {rule.enabled ? 'Active' : 'Paused'}
                            </span>
                            <span
                              className="px-3 py-1 text-xs font-semibold rounded-full"
                              style={{
                                background: 'rgba(139, 92, 246, 0.2)',
                                color: '#a78bfa'
                              }}
                            >
                              AI {rule.confidence}%
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Trigger</p>
                              <p style={{ color: 'var(--text)' }}>{rule.trigger}</p>
                            </div>
                            <div>
                              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Actions</p>
                              <p style={{ color: 'var(--text)' }}>{rule.actions.join(' → ')}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--muted)' }}>
                            <span>Executed {rule.executions}× • Last run {rule.lastRun}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 ml-6">
                          <Switch
                            checked={rule.enabled}
                            onCheckedChange={(enabled) => {
                              const toast = document.createElement('div');
                              toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                              toast.textContent = `Rule ${enabled ? 'enabled' : 'paused'}`;
                              document.body.appendChild(toast);
                              setTimeout(() => toast.remove(), 2000);
                            }}
                          />
                          <Button variant="ghost" size="icon" className="rounded-lg">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'invoices' && (
              <motion.div
                key="invoices"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>AI-Generated Invoices</h2>
                  <Button
                    onClick={() => {
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                      toast.textContent = 'Manual invoice creation coming soon!';
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 3000);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Generate Invoice
                  </Button>
                </div>

                <div className="rounded-xl overflow-hidden" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                  <div className="grid grid-cols-7 gap-4 p-4 border-b font-semibold text-xs uppercase" style={{ background: 'var(--panelAlt)', borderColor: 'var(--line)', color: 'var(--muted)' }}>
                    <div>Invoice #</div>
                    <div className="col-span-2">Project / Milestone</div>
                    <div>Amount</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div>AI</div>
                  </div>
                  {demoInvoices.map((invoice, index) => (
                    <motion.div
                      key={invoice.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-7 gap-4 p-4 border-b items-center cursor-pointer hover:bg-slate-800/30"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <div className="font-mono text-sm" style={{ color: 'var(--accent)' }}>{invoice.number}</div>
                      <div className="col-span-2 text-sm">
                        <p className="font-medium" style={{ color: 'var(--text)' }}>{invoice.project}</p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>{invoice.milestone}</p>
                      </div>
                      <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>${invoice.amount.toLocaleString()}</div>
                      <div className="text-sm" style={{ color: 'var(--muted)' }}>{invoice.date}</div>
                      <div>
                        <span
                          className="px-3 py-1 text-xs font-semibold rounded-full"
                          style={{
                            background: invoice.status === 'paid' ? 'rgba(34, 197, 94, 0.2)' : 
                                       invoice.status === 'sent' ? 'rgba(59, 130, 246, 0.2)' :
                                       'rgba(100, 116, 139, 0.2)',
                            color: invoice.status === 'paid' ? 'var(--success)' : 
                                   invoice.status === 'sent' ? 'var(--accent)' :
                                   'var(--muted)'
                          }}
                        >
                          {invoice.status}
                        </span>
                      </div>
                      <div>
                        {invoice.aiGenerated && (
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4" style={{ color: '#a78bfa' }} />
                            <span className="text-xs font-semibold" style={{ color: '#a78bfa' }}>{invoice.confidence}%</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'escrow' && (
              <motion.div
                key="escrow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Automated Escrow Release</h2>
                
                <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Smart Release Conditions</h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                    AI automatically validates conditions before releasing escrow funds. All releases are logged on XRPL for transparency.
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg p-4" style={{ background: 'var(--panel)' }}>
                      <CheckCircle2 className="w-6 h-6 mb-2" style={{ color: 'var(--success)' }} />
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>Milestone Verified</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>Photos, docs, signatures</p>
                    </div>
                    <div className="rounded-lg p-4" style={{ background: 'var(--panel)' }}>
                      <CheckCircle2 className="w-6 h-6 mb-2" style={{ color: 'var(--success)' }} />
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>TrustScore Check</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>Reputation threshold met</p>
                    </div>
                    <div className="rounded-lg p-4" style={{ background: 'var(--panel)' }}>
                      <CheckCircle2 className="w-6 h-6 mb-2" style={{ color: 'var(--success)' }} />
                      <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>Invoice Validated</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>Amount matches contract</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl p-6" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                  <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>Recent Auto-Releases</h3>
                  <div className="space-y-3">
                    {[
                      { project: 'Downtown Plaza', amount: '$45,000', date: '2 hours ago', confidence: 96 },
                      { project: 'Harbor View Complex', amount: '$55,000', date: '5 hours ago', confidence: 94 },
                      { project: 'Tech Campus Phase 2', amount: '$32,000', date: '1 day ago', confidence: 92 }
                    ].map((release, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 rounded-lg"
                        style={{ background: 'var(--panelAlt)' }}
                      >
                        <div>
                          <p className="font-semibold mb-1" style={{ color: 'var(--text)' }}>{release.project}</p>
                          <p className="text-xs" style={{ color: 'var(--muted)' }}>Released {release.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold mb-1" style={{ color: 'var(--success)' }}>{release.amount}</p>
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3" style={{ color: '#a78bfa' }} />
                            <span className="text-xs font-semibold" style={{ color: '#a78bfa' }}>{release.confidence}% confidence</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'reconciliation' && (
              <motion.div
                key="reconciliation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Bank Reconciliation</h2>

                <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 197, 94, 0.1))', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>AI Matching Engine</h3>
                      <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        Automatically matches bank transfers to ledger entries with {stats.reconciliationRate}% accuracy
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold" style={{ color: 'var(--success)' }}>{stats.reconciliationRate}%</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>Match rate</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                  <div className="grid grid-cols-7 gap-4 p-4 border-b font-semibold text-xs uppercase" style={{ background: 'var(--panelAlt)', borderColor: 'var(--line)', color: 'var(--muted)' }}>
                    <div>Bank TX</div>
                    <div>Ledger TX</div>
                    <div>Amount</div>
                    <div>Project</div>
                    <div>Date</div>
                    <div>Status</div>
                    <div>AI Confidence</div>
                  </div>
                  {demoReconciliations.map((rec, index) => (
                    <motion.div
                      key={rec.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-7 gap-4 p-4 border-b items-center cursor-pointer hover:bg-slate-800/30"
                      style={{ borderColor: 'var(--line)' }}
                    >
                      <div className="font-mono text-xs" style={{ color: 'var(--accent)' }}>{rec.bankTx}</div>
                      <div className="font-mono text-xs" style={{ color: rec.ledgerTx ? 'var(--accent)' : 'var(--muted)' }}>
                        {rec.ledgerTx || '—'}
                      </div>
                      <div className="text-sm font-bold" style={{ color: 'var(--text)' }}>${rec.amount.toLocaleString()}</div>
                      <div className="text-sm" style={{ color: 'var(--text)' }}>{rec.project || '—'}</div>
                      <div className="text-sm" style={{ color: 'var(--muted)' }}>{rec.date}</div>
                      <div>
                        <span
                          className="px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1"
                          style={{
                            background: rec.status === 'matched' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            color: rec.status === 'matched' ? 'var(--success)' : '#ef4444'
                          }}
                        >
                          {rec.status === 'matched' ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                          {rec.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" style={{ color: rec.confidence > 85 ? '#a78bfa' : 'var(--warning)' }} />
                        <span className="text-xs font-semibold" style={{ color: rec.confidence > 85 ? '#a78bfa' : 'var(--warning)' }}>
                          {rec.confidence}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}