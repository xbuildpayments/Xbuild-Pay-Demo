import React, { useState } from "react";
import { ArrowLeft, Plus, Check, X, Copy, ExternalLink, AlertCircle, Shield, Wallet as WalletIcon, CreditCard, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";

export default function Wallet() {
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'bank';
  });
  const [showBankModal, setShowBankModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showEscrowModal, setShowEscrowModal] = useState(false);

  // Demo data
  const [linkedBanks, setLinkedBanks] = useState([
    { id: 1, name: "First National Bank", type: "Checking", last4: "8421", status: "Verified", lastSync: "2 minutes ago" },
    { id: 2, name: "CityTrust", type: "Escrow Account", last4: "0094", status: "Pending", lastSync: "5 minutes ago" }
  ]);

  const [linkedWallets, setLinkedWallets] = useState([
    { id: 1, network: "XRPL", address: "rXb1...9QK", label: "Operations Wallet", status: "Verified", multiSig: false },
    { id: 2, network: "Xahau", address: "xa1...7Zp", label: "Disbursements", status: "Pending", multiSig: true, threshold: "2/3" }
  ]);

  const [escrowAccounts, setEscrowAccounts] = useState([
    { id: 1, project: "Downtown Plaza Construction", balanceFiat: 425000, balanceXRP: 81654, state: "Released 15%", progress: 15 },
    { id: 2, project: "Tech Campus Phase 2", balanceFiat: 275000, balanceXRP: 52840, state: "Hold 5% retainage", progress: 95 }
  ]);

  const transactions = [
    { id: 1, date: "2025-01-15", type: "Release", source: "Escrow", dest: "Operations Wallet", project: "Downtown Plaza", amount: "$45,000", hash: "7C1A...9F2", status: "Completed" },
    { id: 2, date: "2025-01-14", type: "Deposit", source: "First National", dest: "Escrow", project: "Harbor View", amount: "$125,000", hash: "B4E8...2D0", status: "Completed" },
    { id: 3, date: "2025-01-13", type: "Transfer", source: "XRPL Wallet", dest: "CityTrust", project: "Tech Campus", amount: "$32,000", hash: "A93F...77C", status: "Pending" }
  ];

  const updateTab = (tab) => {
    setActiveTab(tab);
    const url = new URL(window.location);
    url.searchParams.set('tab', tab);
    window.history.pushState({}, '', url);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = 'Copied to clipboard!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

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
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Wallet & Payouts</h1>
            <p className="mt-1" style={{ color: 'var(--muted)' }}>
              Connect bank accounts and XRPL/Xahau wallets, manage escrow, and review transactions.
            </p>
          </div>
          <Link to={createPageUrl("Lending")}>
            <Button
              variant="outline"
              className="rounded-xl"
              style={{ 
                background: 'var(--panelAlt)',
                border: '1px solid var(--line)',
                color: 'var(--text)'
              }}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Capital Monitor
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Summary Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                Total Wallet Balance
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>$1.58M</p>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>On-chain + Fiat</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                Linked Accounts
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>6</p>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Bank + Crypto</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                Pending Payouts
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--warning)' }}>3</p>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>$92K Total</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                Compliance Status
              </p>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5" style={{ color: 'var(--success)' }} />
                <p className="text-sm font-semibold" style={{ color: 'var(--success)' }}>Verified</p>
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>KYC & Licensing</p>
            </motion.div>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl p-1"
            style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
          >
            <div className="flex gap-2">
              {[
                { id: 'bank', label: 'Bank Accounts' },
                { id: 'xrpl', label: 'XRPL / Xahau' },
                { id: 'escrow', label: 'Escrow' },
                { id: 'tx', label: 'Transactions' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => updateTab(tab.id)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'bank' && (
              <motion.div
                key="bank"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Bank Accounts</h2>
                  <Button
                    onClick={() => setShowBankModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Link Bank Account
                  </Button>
                </div>

                {linkedBanks.length === 0 ? (
                  <div className="rounded-xl p-12 text-center" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                    <CreditCard className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
                    <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>No bank accounts yet</p>
                    <p style={{ color: 'var(--muted)' }}>Connect your first bank account to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {linkedBanks.map((bank, index) => (
                      <motion.div
                        key={bank.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-xl p-5 flex items-center justify-between"
                        style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center">
                            <CreditCard className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-bold" style={{ color: 'var(--text)' }}>{bank.name}</h3>
                              <span
                                className="px-3 py-1 text-xs font-semibold rounded-full"
                                style={{
                                  background: bank.status === 'Verified' ? 'rgba(23,201,100,0.2)' : 'rgba(244,193,82,0.2)',
                                  color: bank.status === 'Verified' ? 'var(--success)' : 'var(--warning)'
                                }}
                              >
                                {bank.status}
                              </span>
                            </div>
                            <p className="text-sm" style={{ color: 'var(--muted)' }}>
                              {bank.type} •••• {bank.last4} • Last synced {bank.lastSync}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="rounded-lg">
                            Set Default
                          </Button>
                          {bank.status === 'Pending' && (
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                              Verify
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-red-500 rounded-lg">
                            Remove
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'xrpl' && (
              <motion.div
                key="xrpl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>XRPL / Xahau Wallets</h2>
                  <Button
                    onClick={() => setShowWalletModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Wallet
                  </Button>
                </div>

                {linkedWallets.length === 0 ? (
                  <div className="rounded-xl p-12 text-center" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                    <WalletIcon className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
                    <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>No wallets yet</p>
                    <p style={{ color: 'var(--muted)' }}>Add your first XRPL or Xahau wallet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {linkedWallets.map((wallet, index) => (
                      <motion.div
                        key={wallet.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-xl p-5"
                        style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span
                              className="px-3 py-1 text-xs font-bold rounded-full"
                              style={{
                                background: wallet.network === 'XRPL' ? 'rgba(59,130,246,0.2)' : 'rgba(168,85,247,0.2)',
                                color: wallet.network === 'XRPL' ? 'var(--accent)' : '#a855f7'
                              }}
                            >
                              {wallet.network}
                            </span>
                            <h3 className="font-bold" style={{ color: 'var(--text)' }}>{wallet.label}</h3>
                            <span
                              className="px-3 py-1 text-xs font-semibold rounded-full"
                              style={{
                                background: wallet.status === 'Verified' ? 'rgba(23,201,100,0.2)' : 'rgba(244,193,82,0.2)',
                                color: wallet.status === 'Verified' ? 'var(--success)' : 'var(--warning)'
                              }}
                            >
                              {wallet.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <code className="text-sm font-mono" style={{ color: 'var(--accent)' }}>
                            {wallet.address}
                          </code>
                          <button onClick={() => copyToClipboard(wallet.address)} className="hover:opacity-70">
                            <Copy className="w-4 h-4" style={{ color: 'var(--muted)' }} />
                          </button>
                        </div>
                        {wallet.multiSig && (
                          <div className="mb-3 p-2 rounded-lg" style={{ background: 'var(--panelAlt)' }}>
                            <p className="text-xs" style={{ color: 'var(--muted)' }}>
                              Multi-sig: Requires {wallet.threshold} approvals
                            </p>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="rounded-lg">
                            Set as Payout
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-lg">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            View on Explorer
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-500 rounded-lg">
                            Remove
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
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
                <div className="rounded-lg p-4 mb-4" style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)' }}>
                  <p className="text-sm" style={{ color: 'var(--text)' }}>
                    <strong>Smart escrow</strong> ties milestone release to oracles & policy logic.
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Escrow Accounts</h2>
                  <Button
                    onClick={() => setShowEscrowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Escrow
                  </Button>
                </div>

                {escrowAccounts.length === 0 ? (
                  <div className="rounded-xl p-12 text-center" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                    <Shield className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
                    <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>No escrows created</p>
                    <p style={{ color: 'var(--muted)' }}>Create your first escrow account</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {escrowAccounts.map((escrow, index) => (
                      <motion.div
                        key={escrow.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-xl p-6"
                        style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                      >
                        <div className="grid grid-cols-3 gap-6">
                          <div>
                            <h3 className="font-bold mb-2" style={{ color: 'var(--text)' }}>{escrow.project}</h3>
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className="px-3 py-1 text-xs font-semibold rounded-full"
                                style={{
                                  background: 'rgba(23,201,100,0.2)',
                                  color: 'var(--success)'
                                }}
                              >
                                {escrow.state}
                              </span>
                              <span
                                className="px-3 py-1 text-xs font-semibold rounded-full"
                                style={{
                                  background: 'rgba(59,130,246,0.2)',
                                  color: 'var(--accent)'
                                }}
                              >
                                Compliant
                              </span>
                            </div>
                          </div>

                          <div>
                            <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Balance</p>
                            <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                              ${escrow.balanceFiat.toLocaleString()}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--muted)' }}>
                              {escrow.balanceXRP.toLocaleString()} XRP
                            </p>
                            <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
                              <div
                                className="h-full bg-gradient-to-r from-blue-600 to-green-600"
                                style={{ width: `${escrow.progress}%` }}
                              />
                            </div>
                          </div>

                          <div className="flex items-center justify-end gap-2">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                              Draw Funds
                            </Button>
                            <Button variant="outline" className="rounded-lg">
                              Partial Release
                            </Button>
                            <Button variant="outline" className="rounded-lg">
                              Freeze
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'tx' && (
              <motion.div
                key="tx"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Transaction History</h2>
                  <Button variant="outline" className="rounded-xl">
                    Export
                  </Button>
                </div>

                <div className="rounded-xl overflow-hidden" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                  <div className="grid grid-cols-7 gap-4 p-4 border-b font-semibold text-xs uppercase" style={{ background: 'var(--panelAlt)', borderColor: 'var(--line)', color: 'var(--muted)' }}>
                    <div>Date</div>
                    <div>Type</div>
                    <div>Source</div>
                    <div>Destination</div>
                    <div>Project</div>
                    <div>Amount</div>
                    <div>Status</div>
                  </div>
                  {transactions.map((tx, index) => (
                    <motion.div
                      key={tx.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="grid grid-cols-7 gap-4 p-4 border-b items-center cursor-pointer hover:bg-slate-800/30"
                      style={{ borderColor: 'var(--line)', color: 'var(--text)' }}
                    >
                      <div className="text-sm" style={{ color: 'var(--muted)' }}>{tx.date}</div>
                      <div className="text-sm font-medium">{tx.type}</div>
                      <div className="text-sm">{tx.source}</div>
                      <div className="text-sm">{tx.dest}</div>
                      <div className="text-sm">{tx.project}</div>
                      <div className="text-sm font-bold">{tx.amount}</div>
                      <div>
                        <span
                          className="px-3 py-1 text-xs font-semibold rounded-full"
                          style={{
                            background: tx.status === 'Completed' ? 'rgba(23,201,100,0.2)' : 'rgba(244,193,82,0.2)',
                            color: tx.status === 'Completed' ? 'var(--success)' : 'var(--warning)'
                          }}
                        >
                          {tx.status}
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

      {/* Modals */}
      <AnimatePresence>
        {showBankModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8"
            onClick={() => setShowBankModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-xl p-6 max-w-md w-full"
              style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Link Bank Account</h3>
                <button onClick={() => setShowBankModal(false)} className="text-2xl" style={{ color: 'var(--muted)' }}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>Institution</label>
                  <Input
                    placeholder="Bank name"
                    className="rounded-lg"
                    style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>Account Type</label>
                  <Select>
                    <SelectTrigger className="rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking</SelectItem>
                      <SelectItem value="savings">Savings</SelectItem>
                      <SelectItem value="escrow">Escrow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowBankModal(false)}
                    variant="outline"
                    className="flex-1 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setShowBankModal(false);
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                      toast.textContent = 'Bank account connection initiated!';
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 3000);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Connect
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showWalletModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8"
            onClick={() => setShowWalletModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-xl p-6 max-w-md w-full"
              style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Add Wallet</h3>
                <button onClick={() => setShowWalletModal(false)} className="text-2xl" style={{ color: 'var(--muted)' }}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>Network</label>
                  <Select>
                    <SelectTrigger className="rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                      <SelectValue placeholder="Select network" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xrpl">XRPL</SelectItem>
                      <SelectItem value="xahau">Xahau</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>Address</label>
                  <Input
                    placeholder="Wallet address"
                    className="rounded-lg font-mono"
                    style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>Label</label>
                  <Input
                    placeholder="e.g. Operations Wallet"
                    className="rounded-lg"
                    style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowWalletModal(false)}
                    variant="outline"
                    className="flex-1 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setShowWalletModal(false);
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                      toast.textContent = 'Wallet added successfully!';
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 3000);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Add Wallet
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showEscrowModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8"
            onClick={() => setShowEscrowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-xl p-6 max-w-md w-full"
              style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Create Escrow</h3>
                <button onClick={() => setShowEscrowModal(false)} className="text-2xl" style={{ color: 'var(--muted)' }}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>Project</label>
                  <Select>
                    <SelectTrigger className="rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plaza">Downtown Plaza Construction</SelectItem>
                      <SelectItem value="campus">Tech Campus Phase 2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>Source</label>
                  <Select>
                    <SelectTrigger className="rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Account</SelectItem>
                      <SelectItem value="xrpl">XRPL Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowEscrowModal(false)}
                    variant="outline"
                    className="flex-1 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setShowEscrowModal(false);
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                      toast.textContent = 'Escrow account created!';
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 3000);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Create Escrow
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}