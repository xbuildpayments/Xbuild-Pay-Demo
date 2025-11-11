import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Mail, Phone, Shield, Award, TrendingUp, AlertCircle, DollarSign, MessageCircle, UserPlus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContractorCard({ connection, index }) {
  const [showActions, setShowActions] = useState(false);

  const roleConfig = {
    contractor: { icon: Award, color: "text-blue-400" },
    insurer: { icon: Shield, color: "text-green-400" },
    legal: { icon: FileText, color: "text-purple-400" },
    liquidity: { icon: DollarSign, color: "text-yellow-400" }
  };

  const config = roleConfig[connection.role];
  const RoleIcon = config.icon;

  const handleAction = (action) => {
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<strong>${action}</strong><br/>${connection.name}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="rounded-xl shadow-sm p-6 panel-hover"
      style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'var(--panelAlt)' }}>
            <RoleIcon className={`w-8 h-8 ${config.color}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>{connection.name}</h3>
              {connection.status === 'verified' && (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              )}
              {connection.trustScore && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-600/20 text-yellow-400">
                  <Award className="w-3 h-3 inline mr-1" />
                  Trust {connection.trustScore}
                </span>
              )}
            </div>
            <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>{connection.type}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-3">
              {connection.role === 'contractor' && (
                <>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>Projects</p>
                    <p className="font-semibold" style={{ color: 'var(--text)' }}>{connection.projects}</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>On-Time</p>
                    <p className="font-semibold text-green-400">{connection.onTimePayment}%</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>Disputes</p>
                    <p className="font-semibold" style={{ color: 'var(--text)' }}>{connection.disputeRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>Insurance</p>
                    <p className="font-semibold text-green-400">{connection.insuranceStatus}</p>
                  </div>
                </>
              )}
              {connection.role !== 'contractor' && (
                <div className="col-span-4">
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>Active on {connection.projects} projects</p>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <Mail className="w-4 h-4" />
                {connection.contact}
              </div>
              {connection.phone && (
                <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                  <Phone className="w-4 h-4" />
                  {connection.phone}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col gap-2"
            >
              {connection.role === 'contractor' && (
                <>
                  <Button
                    onClick={() => handleAction("Invite to Project")}
                    className="btn-primary-bright"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite to Project
                  </Button>
                  <Button
                    onClick={() => handleAction("View Ledger")}
                    className="btn-outline-contrast"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Ledger
                  </Button>
                </>
              )}
              {connection.role === 'insurer' && (
                <Button
                  onClick={() => handleAction("Request Underwriter Review")}
                  className="btn-primary-bright"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Request Review
                </Button>
              )}
              {connection.role === 'legal' && (
                <Button
                  onClick={() => handleAction("Open Dispute Consult")}
                  className="btn-primary-bright"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Consult
                </Button>
              )}
              {connection.role === 'liquidity' && (
                <Button
                  onClick={() => handleAction("Offer Financing")}
                  className="btn-primary-bright"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Request Financing
                </Button>
              )}
              <Button
                onClick={() => handleAction("Message")}
                className="btn-ghost-light"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}