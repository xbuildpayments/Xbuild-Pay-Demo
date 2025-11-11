
import React, { useState } from "react";
import { Search, DollarSign, TrendingUp, Clock, CheckCircle2, AlertCircle, Info, ArrowLeft, LineChart, Users, Shield, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import CapitalSystemsMonitor from "@/components/lending/CapitalSystemsMonitor";
import CreditRiskModal from "@/components/lending/CreditRiskModal";
import DAOGovernance from "@/components/lending/DAOGovernance";
import { Bus } from "@/components/utils/bus";

export default function Lending() {
  const [showMonitor, setShowMonitor] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const lendingOptions = [
    {
      id: 1,
      type: "Construction Line of Credit",
      provider: "BuildFin Capital",
      amount: 500000,
      rate: 6.5,
      term: "24 months",
      status: "active",
      utilized: 325000,
      available: 175000,
      riskScore: 0.88,
      riskGrade: "A",
      defiYield: 4.2,
      xrplPool: "XRP-BUILD-LC-001",
      compliant: true,
      escrowLinked: true,
      riskHistory: [0.85, 0.86, 0.87, 0.88, 0.88]
    },
    {
      id: 2,
      type: "Project-Based Loan",
      provider: "Infrastructure Lending Group",
      amount: 1200000,
      rate: 5.8,
      term: "36 months",
      status: "approved",
      utilized: 0,
      available: 1200000,
      riskScore: 0.91,
      riskGrade: "A+",
      defiYield: 3.8,
      xrplPool: "XRP-BUILD-PBL-002",
      compliant: true,
      escrowLinked: true,
      riskHistory: [0.89, 0.90, 0.90, 0.91, 0.91]
    },
    {
      id: 3,
      type: "Equipment Financing",
      provider: "XRP Construction Finance",
      amount: 250000,
      rate: 7.2,
      term: "12 months",
      status: "pending",
      utilized: 0,
      available: 0,
      riskScore: 0.75,
      riskGrade: "B+",
      defiYield: 5.1,
      xrplPool: "XRP-BUILD-EQ-003",
      compliant: true,
      escrowLinked: false,
      riskHistory: [0.72, 0.73, 0.74, 0.75, 0.75]
    }
  ];

  const totalAvailable = lendingOptions.reduce((sum, l) => sum + l.available, 0);
  const totalUtilized = lendingOptions.reduce((sum, l) => sum + l.utilized, 0);
  const avgRate = (lendingOptions.reduce((sum, l) => sum + l.rate, 0) / lendingOptions.length).toFixed(1);
  const avgRiskScore = (lendingOptions.reduce((sum, l) => sum + l.riskScore, 0) / lendingOptions.length).toFixed(2);

  const handleDrawFunds = (loan) => {
    Bus.emit('lending:drawFunds', loan.id);
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<strong>Drawing Funds</strong><br/>$${(loan.available / 1000).toFixed(0)}K from ${loan.type}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleActivateLoan = (loan) => {
    Bus.emit('lending:activate', loan.id);
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<strong>Loan Activated</strong><br/>${loan.type} is now active`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleSimulateYield = (loan) => {
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<strong>DeFi Yield Simulated</strong><br/>Pool: ${loan.xrplPool} • APY: ${loan.defiYield}%`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <style>{`
        .btn-ghost-light {
          background-color: rgba(255, 255, 255, 0.08);
          color: #E4E6EB;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-ghost-light:hover {
          background-color: rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.25);
        }

        .btn-outline-contrast {
          border: 1px solid rgba(255,255,255,0.3);
          color: #E4E6EB;
          background: transparent;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-outline-contrast:hover {
          background-color: rgba(255,255,255,0.12);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.4);
        }

        .btn-primary-bright {
          background: #3b82f6;
          color: #ffffff;
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: 600;
          transition: all 0.2s ease;
          box-shadow: 0 0 0 1px rgba(59,130,246,0.25);
        }
        .btn-primary-bright:hover {
          background: #2563eb;
          box-shadow: 0 0 0 2px rgba(59,130,246,0.5);
        }

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
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.4);
        }
      `}</style>

      {/* Header */}
      <motion.div 
        className="border-b px-8 py-6"
        style={{ background: 'var(--panel)', borderColor: 'var(--line)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <Link
            to={createPageUrl("Dashboard")}
            className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
            style={{ color: 'var(--muted)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <motion.img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fd9eaa10a3803cbfd64758/b4cb4ccad_xbuildcapitalLogo.png"
            alt="Xbuild Capital"
            className="h-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Lending & Capital Markets</h1>
            <p className="mt-1" style={{ color: 'var(--muted)' }}>Blockchain-backed Financing via Xbuild Capital</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted)' }} />
              <Input 
                placeholder="Search financing options..."
                className="pl-10 rounded-lg"
                style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
              />
            </div>
            <Button 
              onClick={() => setShowMonitor(!showMonitor)}
              className="rounded-lg font-semibold"
              style={{ background: 'var(--accent)', color: '#ffffff' }}
            >
              <Zap className="w-4 h-4 mr-2" />
              Capital Monitor
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Top Metrics */}
          <div className="grid grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl shadow-sm p-6 panel-gradient"
              style={{ border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Total Available</p>
                <DollarSign className="w-5 h-5" style={{ color: 'var(--success)' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--success)' }}>${(totalAvailable / 1000).toFixed(0)}K</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl shadow-sm p-6 panel-gradient"
              style={{ border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Utilized</p>
                <TrendingUp className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>${(totalUtilized / 1000).toFixed(0)}K</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl shadow-sm p-6 panel-gradient"
              style={{ border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Avg Rate</p>
                <Clock className="w-5 h-5" style={{ color: 'var(--warning)' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{avgRate}%</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl shadow-sm p-6 panel-gradient"
              style={{ border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Risk Score</p>
                <Shield className="w-5 h-5" style={{ color: 'var(--success)' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--success)' }}>A • {avgRiskScore}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl shadow-sm p-6 panel-gradient"
              style={{ border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>DAO Participation</p>
                <Users className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }}>2.4K</p>
            </motion.div>
          </div>

          {/* Lending Options */}
          <div className="space-y-6">
            {lendingOptions.map((loan, index) => {
              const statusConfig = {
                active: { color: "text-green-600", bg: "bg-green-600/20", label: "Active" },
                approved: { color: "text-blue-600", bg: "bg-blue-600/20", label: "Approved" },
                pending: { color: "text-yellow-600", bg: "bg-yellow-600/20", label: "Pending" }
              };
              const config = statusConfig[loan.status];

              return (
                <motion.div
                  key={loan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="rounded-xl shadow-sm panel-hover"
                  style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                >
                  {/* Card Header */}
                  <div className="p-6 border-b" style={{ borderColor: 'var(--line)' }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold" style={{ color: 'var(--text)' }}>{loan.type}</h3>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}>
                            {config.label}
                          </span>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            loan.riskScore >= 0.85 ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'
                          }`}>
                            Risk: {loan.riskGrade}
                          </span>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--muted)' }}>{loan.provider}</p>
                      </div>
                      <motion.img 
                        src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68fd9eaa10a3803cbfd64758/b4cb4ccad_xbuildcapitalLogo.png"
                        alt="Xbuild Capital"
                        className="h-8 opacity-60"
                        whileHover={{ opacity: 1 }}
                      />
                    </div>

                    {/* Compliance Ribbon */}
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                      loan.compliant && loan.riskScore >= 0.7 
                        ? 'bg-green-600/10 border border-green-600/30' 
                        : 'bg-yellow-600/10 border border-yellow-600/30'
                    }`}>
                      <CheckCircle2 className={`w-4 h-4 ${
                        loan.compliant && loan.riskScore >= 0.7 ? 'text-green-400' : 'text-yellow-400'
                      }`} />
                      <span className={`text-xs font-medium ${
                        loan.compliant && loan.riskScore >= 0.7 ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {loan.compliant ? 'Compliant' : 'Review Required'} • {loan.escrowLinked ? 'Escrow Linked' : 'Pending Link'}
                      </span>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-4 divide-x p-6" style={{ borderColor: 'var(--line)' }}>
                    <div className="pr-6">
                      <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>
                        Credit Limit
                      </p>
                      <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                        ${(loan.amount / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div className="px-6">
                      <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>
                        Available
                      </p>
                      <p className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
                        ${(loan.available / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <div className="px-6">
                      <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>
                        Interest Rate
                      </p>
                      <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                        {loan.rate}%
                      </p>
                    </div>
                    <div className="pl-6">
                      <p className="text-xs font-medium uppercase mb-2" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>
                        Term
                      </p>
                      <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                        {loan.term}
                      </p>
                    </div>
                  </div>

                  {/* DeFi Yield Row */}
                  <div className="px-6 py-4 border-t border-b" style={{ borderColor: 'var(--line)', background: 'var(--panelAlt)' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5" style={{ color: 'var(--success)' }} />
                        <div>
                          <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>
                            DeFi Yield: <span style={{ color: 'var(--success)' }}>{loan.defiYield}% APY</span>
                          </p>
                          <p className="text-xs" style={{ color: 'var(--muted)' }}>Pool: {loan.xrplPool}</p>
                        </div>
                      </div>
                      <button
                        className="text-xs flex items-center gap-1 hover:underline"
                        style={{ color: 'var(--accent)' }}
                        title="DeFi yield is generated from unused credit through XRPL liquidity pools"
                      >
                        <Info className="w-3 h-3" />
                        How it works
                      </button>
                    </div>
                  </div>

                  {/* Credit Risk Timeline */}
                  <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--line)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <LineChart className="w-4 h-4" style={{ color: 'var(--muted)' }} />
                        <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>Credit Risk Timeline</p>
                      </div>
                      <button
                        onClick={() => setSelectedLoan(loan)}
                        className="text-xs hover:underline"
                        style={{ color: 'var(--accent)' }}
                      >
                        View Full Analysis
                      </button>
                    </div>
                    <div className="flex items-end gap-2 h-16">
                      {loan.riskHistory.map((score, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${score * 100}%` }}
                          transition={{ delay: 0.5 + index * 0.1 + i * 0.05, duration: 0.3 }}
                          className="flex-1 rounded-t"
                          style={{
                            background: score >= 0.85 ? 'var(--success)' : score >= 0.7 ? 'var(--warning)' : 'var(--accent)',
                            minHeight: '8px'
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 flex gap-3">
                    {loan.status === 'active' && (
                      <button
                        onClick={() => handleDrawFunds(loan)}
                        className="btn-primary-bright flex-1 flex items-center justify-center gap-2"
                      >
                        <DollarSign className="w-4 h-4" />
                        Draw Funds
                      </button>
                    )}
                    {loan.status === 'approved' && (
                      <button
                        onClick={() => handleActivateLoan(loan)}
                        className="btn-success flex-1 flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Activate
                      </button>
                    )}
                    {loan.status === 'pending' && (
                      <button
                        disabled
                        className="btn-primary-bright flex-1 flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                      >
                        <Clock className="w-4 h-4" />
                        Pending Approval
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedLoan(loan)}
                      className="btn-outline-contrast flex-1 flex items-center justify-center gap-2"
                    >
                      <LineChart className="w-4 h-4" />
                      View Details
                    </button>
                    <button
                      onClick={() => handleSimulateYield(loan)}
                      className="btn-ghost-light flex items-center justify-center gap-2 px-4"
                    >
                      <Zap className="w-4 h-4" />
                      Simulate Yield
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* DAO Governance */}
          <DAOGovernance />
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showMonitor && <CapitalSystemsMonitor onClose={() => setShowMonitor(false)} />}
        {selectedLoan && <CreditRiskModal loan={selectedLoan} onClose={() => setSelectedLoan(null)} />}
      </AnimatePresence>
    </div>
  );
}
