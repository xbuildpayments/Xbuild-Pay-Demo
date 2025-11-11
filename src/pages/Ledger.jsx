
import React, { useState, useEffect, useRef } from "react";
import { Download, Search, Copy, ExternalLink, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { DemoStore } from "@/components/utils/demoStore";
import { Bus } from "@/components/utils/bus";

export default function Ledger() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [transactions, setTransactions] = useState([...DemoStore.ledger]);
  const [highlightedId, setHighlightedId] = useState(null);
  const tableRef = useRef(null);

  useEffect(() => {
    // Subscribe to new ledger entries
    const handleNewEntry = (entry) => {
      setTransactions(prev => [entry, ...prev]);
      setHighlightedId(entry.id);
      
      // Remove highlight after animation
      setTimeout(() => setHighlightedId(null), 2000);
      
      // Show toast
      const toast = document.createElement('div');
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      toast.textContent = 'New ledger entry added';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    };

    Bus.on("ledger:new", handleNewEntry);

    return () => {
      Bus.off("ledger:new", handleNewEntry);
    };
  }, []);

  const filteredTransactions = statusFilter === "all" 
    ? transactions 
    : transactions.filter(t => t.status.toLowerCase() === statusFilter);

  const copyHash = (hash) => {
    navigator.clipboard.writeText(hash);
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = 'Hash copied to clipboard!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const downloadPDF = () => {
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = 'Exported Ledger Data (demo only)';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const totalPaid = DemoStore.totals.paidUSD;
  const totalTx = DemoStore.totals.txCount;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <style>{`
        @keyframes highlight-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
            background: var(--panel);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.35);
            background: rgba(59, 130, 246, 0.07);
          }
        }
        .highlight-row {
          animation: highlight-pulse 2s ease-in-out;
        }
        .exportBtn {
          background: #3b82f6;
          color: #ffffff;
          font-weight: 600;
          border-radius: 10px;
          padding: 8px 16px;
          transition: all .2s ease;
          border: none;
          box-shadow: 0 0 0 1px rgba(59,130,246,0.25);
        }
        .exportBtn:hover:not(:disabled) {
          background: #2563eb;
          box-shadow: 0 0 0 2px rgba(59,130,246,0.5);
        }
        .exportBtn:disabled {
          background: rgba(59,130,246,0.25);
          color: rgba(255,255,255,0.65); /* Improved contrast for disabled text */
          cursor: not-allowed;
        }
        .exportBtn:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>

      {/* Header */}
      <motion.div 
        className="border-b px-8 py-6"
        style={{ background: 'var(--panel)', borderColor: 'var(--line)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Transaction Ledger</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted)' }} />
              <Input 
                placeholder="Search transactions..."
                className="pl-10 rounded-lg"
                style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
              />
            </div>
            <button 
              onClick={downloadPDF}
              className="exportBtn flex items-center gap-2"
              aria-label="Export ledger data"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <motion.div 
              className="rounded-xl shadow-sm p-6 panel-gradient"
              style={{ border: '1px solid var(--line)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-sm font-medium mb-2 uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Total Paid</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }} id="ledger-total-paid">
                ${totalPaid.toLocaleString()}
              </p>
            </motion.div>
            <motion.div 
              className="rounded-xl shadow-sm p-6 panel-gradient"
              style={{ border: '1px solid var(--line)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-sm font-medium mb-2 uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Transactions</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--text)' }} id="ledger-tx-count">
                {totalTx}
              </p>
            </motion.div>
            <motion.div 
              className="rounded-xl shadow-sm p-6 panel-gradient"
              style={{ border: '1px solid var(--line)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm font-medium mb-2 uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Via XRPL</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>100%</p>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div
            className="rounded-xl shadow-sm p-4"
            style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>Filter:</span>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 rounded-lg" style={{ border: '1px solid var(--line)', background: 'var(--panelAlt)', color: 'var(--text)' }}>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="verifying">Verifying</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Transactions Table */}
          <motion.div
            ref={tableRef}
            className="rounded-xl shadow-sm overflow-hidden"
            style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="grid grid-cols-6 gap-4 p-4 border-b font-semibold text-xs uppercase" style={{ background: 'var(--panelAlt)', borderColor: 'var(--line)', color: 'var(--muted)', letterSpacing: '0.02em' }}>
              <div>Date</div>
              <div>Project</div>
              <div>Milestone</div>
              <div>Amount</div>
              <div>Status</div>
              <div>TX Hash</div>
            </div>
            {filteredTransactions.length === 0 ? (
              <div className="p-12 text-center" style={{ color: 'var(--muted)' }}>No transactions found</div>
            ) : (
              <div>
                <AnimatePresence>
                  {filteredTransactions.map((transaction, index) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.02 }}
                      className={`grid grid-cols-6 gap-4 p-4 border-b text-sm items-center cursor-pointer ${
                        highlightedId === transaction.id ? 'highlight-row' : ''
                      }`}
                      style={{ borderColor: 'var(--line)', color: 'var(--text)' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(59,130,246,.07)';
                      }}
                      onMouseLeave={(e) => {
                        if (highlightedId !== transaction.id) {
                          e.currentTarget.style.background = 'transparent';
                        }
                      }}
                    >
                      <div style={{ color: 'var(--muted)' }}>
                        {new Date(transaction.ts).toLocaleDateString()}
                      </div>
                      <div style={{ color: 'var(--text)' }} className="font-medium truncate">
                        {transaction.project}
                      </div>
                      <div style={{ color: 'var(--muted)' }} className="truncate">
                        {transaction.milestone}
                      </div>
                      <div>
                        <p className="font-bold" style={{ color: 'var(--text)' }}>
                          ${transaction.amountUSD.toLocaleString()}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>
                          {transaction.amountXRP.toLocaleString()} XRP
                        </p>
                      </div>
                      <div>
                        <span 
                          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full"
                          style={{
                            background: transaction.status === 'Completed' ? 'rgba(23,201,100,.14)' : 
                                      transaction.status === 'Verifying' ? 'rgba(244,193,82,.18)' : 
                                      'rgba(59,130,246,.14)',
                            color: transaction.status === 'Completed' ? '#17c964' : 
                                   transaction.status === 'Verifying' ? '#f4c152' : 
                                   '#93c5fd'
                          }}
                        >
                          {transaction.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                          {transaction.status}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <code className="text-xs font-mono" style={{ color: 'var(--accent)' }}>
                            {transaction.hash}
                          </code>
                          <button 
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              copyHash(transaction.hash); 
                            }} 
                            className="hover:opacity-70"
                            aria-label="Copy hash"
                          >
                            <Copy className="w-3 h-3" style={{ color: 'var(--muted)' }} />
                          </button>
                          <a 
                            href={`https://livenet.xrpl.org/transactions/${transaction.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()} 
                            className="hover:opacity-70"
                            aria-label="View on XRPL explorer"
                          >
                            <ExternalLink className="w-3 h-3" style={{ color: 'var(--muted)' }} />
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
