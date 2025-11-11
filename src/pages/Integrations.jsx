import React, { useState } from "react";
import { ArrowLeft, Plus, CheckCircle2, AlertCircle, RefreshCw, Settings, Zap, Shield, DollarSign, Building2, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

export default function Integrations() {
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  const integrations = [
    {
      id: 1,
      name: "QuickBooks Online",
      type: "accounting",
      icon: DollarSign,
      description: "Sync invoices, expenses, and financial data",
      status: "connected",
      lastSync: "2 hours ago",
      syncFrequency: "hourly",
      color: "#2ca01c",
      features: ["Two-way sync", "Invoice automation", "Expense tracking"]
    },
    {
      id: 2,
      name: "Xero",
      type: "accounting",
      icon: DollarSign,
      description: "Cloud accounting software integration",
      status: "disconnected",
      lastSync: null,
      syncFrequency: "daily",
      color: "#13b5ea",
      features: ["Real-time sync", "Bank reconciliation", "Payroll integration"]
    },
    {
      id: 3,
      name: "Procore",
      type: "construction_management",
      icon: Building2,
      description: "Construction project management platform",
      status: "connected",
      lastSync: "30 minutes ago",
      syncFrequency: "realtime",
      color: "#ff6900",
      features: ["Project sync", "Document management", "RFI tracking"]
    },
    {
      id: 4,
      name: "Bank of America",
      type: "banking",
      icon: CreditCard,
      description: "Direct bank account integration",
      status: "connected",
      lastSync: "1 hour ago",
      syncFrequency: "hourly",
      color: "#e31837",
      features: ["Transaction sync", "Balance updates", "Payment processing"]
    },
    {
      id: 5,
      name: "Chase Business",
      type: "banking",
      icon: CreditCard,
      description: "Business banking integration",
      status: "disconnected",
      lastSync: null,
      syncFrequency: "hourly",
      color: "#117aca",
      features: ["Account sync", "Wire transfers", "ACH payments"]
    },
    {
      id: 6,
      name: "ADP Payroll",
      type: "payroll",
      icon: Shield,
      description: "Payroll and HR management",
      status: "disconnected",
      lastSync: null,
      syncFrequency: "weekly",
      color: "#d71920",
      features: ["Payroll sync", "Time tracking", "Benefits management"]
    }
  ];

  const [connectedIntegrations, setConnectedIntegrations] = useState(
    integrations.filter(i => i.status === "connected")
  );

  const syncIntegration = (integration) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = `Syncing ${integration.name}...`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.textContent = `✓ ${integration.name} synced successfully`;
      setTimeout(() => toast.remove(), 2000);
    }, 1500);
  };

  const connectIntegration = (integration) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<strong>${integration.name} Connected!</strong><br/>Data sync will begin shortly.`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const configureIntegration = (integration) => {
    setSelectedIntegration(integration);
    setShowConfigModal(true);
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
          to={createPageUrl("Settings")}
          className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-4"
          style={{ color: 'var(--muted)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Settings
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Integrations</h1>
              <p className="mt-1" style={{ color: 'var(--muted)' }}>
                Connect with accounting software, banks, and construction management tools
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {connectedIntegrations.length}/{integrations.length}
            </p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>Connected</p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Active Integrations Banner */}
          {connectedIntegrations.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-6"
              style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))', border: '1px solid rgba(34, 197, 94, 0.3)' }}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--success)' }} />
                <div>
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>
                    {connectedIntegrations.length} Active Integration{connectedIntegrations.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>
                    Data syncing automatically • Last sync: {connectedIntegrations[0].lastSync}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Integration Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((integration, index) => {
              const Icon = integration.icon;
              return (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl p-6"
                  style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ background: `${integration.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: integration.color }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>
                          {integration.name}
                        </h3>
                        <p className="text-xs" style={{ color: 'var(--muted)' }}>
                          {integration.type.replace('_', ' ').toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <span
                      className="px-3 py-1 text-xs font-semibold rounded-full"
                      style={{
                        background: integration.status === 'connected' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                        color: integration.status === 'connected' ? 'var(--success)' : 'var(--muted)'
                      }}
                    >
                      {integration.status === 'connected' ? '● Connected' : '○ Not Connected'}
                    </span>
                  </div>

                  <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                    {integration.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    {integration.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs" style={{ color: 'var(--text)' }}>
                        <CheckCircle2 className="w-3 h-3" style={{ color: 'var(--success)' }} />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {integration.status === 'connected' && (
                    <div className="mb-4 p-3 rounded-lg" style={{ background: 'var(--panelAlt)' }}>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span style={{ color: 'var(--muted)' }}>Sync Frequency</span>
                        <span className="font-semibold" style={{ color: 'var(--text)' }}>
                          {integration.syncFrequency}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span style={{ color: 'var(--muted)' }}>Last Sync</span>
                        <span className="font-semibold" style={{ color: 'var(--text)' }}>
                          {integration.lastSync}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {integration.status === 'connected' ? (
                      <>
                        <Button
                          onClick={() => syncIntegration(integration)}
                          variant="outline"
                          className="flex-1 rounded-lg"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Sync Now
                        </Button>
                        <Button
                          onClick={() => configureIntegration(integration)}
                          variant="outline"
                          className="flex-1 rounded-lg"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Configure
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => connectIntegration(integration)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                      >
                        Connect
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Add Custom Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-xl p-8 text-center"
            style={{ background: 'var(--panel)', border: '2px dashed var(--line)' }}
          >
            <Plus className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
              Need Another Integration?
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
              Request a custom integration or use our API to build your own
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                className="rounded-lg"
                onClick={() => {
                  const toast = document.createElement('div');
                  toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                  toast.textContent = 'Integration request submitted!';
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 3000);
                }}
              >
                Request Integration
              </Button>
              <Link to={createPageUrl("APIAccess")}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                  View API Docs
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Configuration Modal */}
      <AnimatePresence>
        {showConfigModal && selectedIntegration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8"
            onClick={() => setShowConfigModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-xl p-6 max-w-2xl w-full"
              style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>
                Configure {selectedIntegration.name}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>
                    Sync Frequency
                  </label>
                  <Select defaultValue={selectedIntegration.syncFrequency}>
                    <SelectTrigger className="rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="manual">Manual Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <span className="text-sm" style={{ color: 'var(--text)' }}>
                      Auto-sync new transactions
                    </span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <Switch defaultChecked />
                    <span className="text-sm" style={{ color: 'var(--text)' }}>
                      Two-way synchronization
                    </span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center gap-3">
                    <Switch />
                    <span className="text-sm" style={{ color: 'var(--text)' }}>
                      Send email notifications on sync errors
                    </span>
                  </label>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => setShowConfigModal(false)}
                    variant="outline"
                    className="flex-1 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setShowConfigModal(false);
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                      toast.textContent = 'Settings saved successfully!';
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 3000);
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                  >
                    Save Changes
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