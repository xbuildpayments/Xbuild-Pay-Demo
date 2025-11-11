import React, { useState } from "react";
import { ArrowLeft, Plus, Key, Copy, Trash2, Eye, EyeOff, Code, Book, CheckCircle2, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";

export default function APIAccess() {
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [showKey, setShowKey] = useState(null);
  const [activeTab, setActiveTab] = useState('keys');

  const apiKeys = [
    {
      id: 1,
      name: "Production API",
      key: "xbp_live_sk_1234567890abcdefghij",
      created: "2025-01-01",
      lastUsed: "2 hours ago",
      requests: 15234,
      rateLimit: 10000,
      status: "active"
    },
    {
      id: 2,
      name: "Development API",
      key: "xbp_test_sk_abcdefghij1234567890",
      created: "2025-01-15",
      lastUsed: "5 minutes ago",
      requests: 456,
      rateLimit: 1000,
      status: "active"
    }
  ];

  const codeExamples = {
    javascript: `// Initialize XBuild Pay SDK
const xbuildPay = require('@xbuildpay/sdk');
const client = new xbuildPay.Client({
  apiKey: 'your_api_key_here'
});

// Fetch projects
const projects = await client.projects.list({
  status: 'active',
  limit: 10
});

// Create a transaction
const transaction = await client.transactions.create({
  project_id: 'proj_123',
  amount: 50000,
  currency: 'USD',
  type: 'payment'
});

// Get project details
const project = await client.projects.get('proj_123');`,

    python: `# Initialize XBuild Pay SDK
import xbuildpay

client = xbuildpay.Client(api_key='your_api_key_here')

# Fetch projects
projects = client.projects.list(
    status='active',
    limit=10
)

# Create a transaction
transaction = client.transactions.create(
    project_id='proj_123',
    amount=50000,
    currency='USD',
    type='payment'
)

# Get project details
project = client.projects.get('proj_123')`,

    curl: `# Fetch projects
curl -X GET "https://api.xbuildpay.com/v1/projects" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json"

# Create a transaction
curl -X POST "https://api.xbuildpay.com/v1/transactions" \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_id": "proj_123",
    "amount": 50000,
    "currency": "USD",
    "type": "payment"
  }'

# Get project details
curl -X GET "https://api.xbuildpay.com/v1/projects/proj_123" \\
  -H "Authorization: Bearer your_api_key_here"`
  };

  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = 'Copied to clipboard!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const createNewKey = () => {
    const newKey = `xbp_live_sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
    setShowKey(newKey);
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = '<strong>API Key Created!</strong><br/>Make sure to copy it now.';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>API Access</h1>
              <p className="mt-1" style={{ color: 'var(--muted)' }}>
                Manage API keys and access programmatic data
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://docs.xbuildpay.com/api" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="rounded-xl">
                <Book className="w-4 h-4 mr-2" />
                API Docs
              </Button>
            </a>
            <Button
              onClick={() => setShowNewKeyModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Key
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-1"
            style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
          >
            <div className="flex gap-2">
              {[
                { id: 'keys', label: 'API Keys', icon: Key },
                { id: 'docs', label: 'Documentation', icon: Book },
                { id: 'examples', label: 'Code Examples', icon: Code }
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
            {activeTab === 'keys' && (
              <motion.div
                key="keys"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Your API Keys</h2>
                
                {/* Show New Key if just created */}
                {showKey && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl p-6"
                    style={{ background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(59, 130, 246, 0.1))', border: '1px solid rgba(34, 197, 94, 0.3)' }}
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--success)' }} />
                      <div className="flex-1">
                        <p className="font-semibold mb-2" style={{ color: 'var(--text)' }}>
                          API Key Created Successfully!
                        </p>
                        <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
                          Make sure to copy your API key now. You won't be able to see it again!
                        </p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 px-4 py-2 rounded-lg font-mono text-sm" style={{ background: 'var(--panel)', color: 'var(--text)' }}>
                            {showKey}
                          </code>
                          <Button
                            onClick={() => copyToClipboard(showKey)}
                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {apiKeys.map((key, index) => (
                  <motion.div
                    key={key.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl p-6"
                    style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>
                          {key.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-mono" style={{ color: 'var(--muted)' }}>
                            {key.key.substring(0, 20)}...
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(key.key)}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <span
                        className="px-3 py-1 text-xs font-semibold rounded-full"
                        style={{ background: 'rgba(34, 197, 94, 0.2)', color: 'var(--success)' }}
                      >
                        ● Active
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                      <div>
                        <p style={{ color: 'var(--muted)' }}>Created</p>
                        <p className="font-semibold" style={{ color: 'var(--text)' }}>{key.created}</p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--muted)' }}>Last Used</p>
                        <p className="font-semibold" style={{ color: 'var(--text)' }}>{key.lastUsed}</p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--muted)' }}>Requests</p>
                        <p className="font-semibold" style={{ color: 'var(--text)' }}>{key.requests.toLocaleString()}</p>
                      </div>
                      <div>
                        <p style={{ color: 'var(--muted)' }}>Rate Limit</p>
                        <p className="font-semibold" style={{ color: 'var(--text)' }}>{key.rateLimit}/hr</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg">
                        View Usage
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-lg text-red-500">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Revoke
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'docs' && (
              <motion.div
                key="docs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="rounded-xl p-6" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                  <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text)' }}>API Documentation</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Authentication</h3>
                      <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
                        All API requests require authentication using your API key in the Authorization header:
                      </p>
                      <code className="block px-4 py-3 rounded-lg font-mono text-sm" style={{ background: 'var(--panelAlt)', color: 'var(--text)' }}>
                        Authorization: Bearer your_api_key_here
                      </code>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Base URL</h3>
                      <code className="block px-4 py-3 rounded-lg font-mono text-sm" style={{ background: 'var(--panelAlt)', color: 'var(--text)' }}>
                        https://api.xbuildpay.com/v1
                      </code>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text)' }}>Available Endpoints</h3>
                      <div className="space-y-2">
                        {[
                          { method: 'GET', endpoint: '/projects', description: 'List all projects' },
                          { method: 'GET', endpoint: '/projects/:id', description: 'Get project details' },
                          { method: 'POST', endpoint: '/transactions', description: 'Create a transaction' },
                          { method: 'GET', endpoint: '/transactions', description: 'List transactions' },
                          { method: 'GET', endpoint: '/milestones', description: 'List milestones' },
                          { method: 'POST', endpoint: '/invoices', description: 'Create an invoice' }
                        ].map((endpoint, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-3 rounded-lg"
                            style={{ background: 'var(--panelAlt)' }}
                          >
                            <span
                              className="px-2 py-1 text-xs font-bold rounded"
                              style={{
                                background: endpoint.method === 'GET' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                color: endpoint.method === 'GET' ? 'var(--success)' : 'var(--accent)'
                              }}
                            >
                              {endpoint.method}
                            </span>
                            <code className="flex-1 font-mono text-sm" style={{ color: 'var(--text)' }}>
                              {endpoint.endpoint}
                            </code>
                            <span className="text-sm" style={{ color: 'var(--muted)' }}>
                              {endpoint.description}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>Rate Limits</h3>
                      <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        Production keys: 10,000 requests/hour<br/>
                        Development keys: 1,000 requests/hour
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'examples' && (
              <motion.div
                key="examples"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="rounded-xl p-6" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Code Examples</h2>
                    <div className="flex gap-2">
                      {['javascript', 'python', 'curl'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setSelectedLanguage(lang)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            selectedLanguage === lang
                              ? 'bg-blue-600 text-white'
                              : 'bg-slate-800 text-slate-300 hover:text-white'
                          }`}
                        >
                          {lang.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <Button
                      onClick={() => copyToClipboard(codeExamples[selectedLanguage])}
                      className="absolute top-4 right-4 z-10 bg-slate-700 hover:bg-slate-600"
                      size="sm"
                    >
                      <Copy className="w-3 h-3 mr-2" />
                      Copy
                    </Button>
                    <pre className="rounded-lg p-6 overflow-x-auto" style={{ background: '#1e1e1e', color: '#d4d4d4' }}>
                      <code className="text-sm font-mono whitespace-pre">{codeExamples[selectedLanguage]}</code>
                    </pre>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Create Key Modal */}
      <AnimatePresence>
        {showNewKeyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8"
            onClick={() => setShowNewKeyModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-xl p-6 max-w-md w-full"
              style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>
                Create API Key
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>
                    Key Name
                  </label>
                  <Input
                    placeholder="e.g., Production API"
                    className="rounded-lg"
                    style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>
                    Permissions
                  </label>
                  <div className="space-y-2">
                    {['Read Projects', 'Write Projects', 'Read Transactions', 'Write Transactions'].map((perm) => (
                      <label key={perm} className="flex items-center gap-3">
                        <Switch defaultChecked />
                        <span className="text-sm" style={{ color: 'var(--text)' }}>{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={() => setShowNewKeyModal(false)}
                    variant="outline"
                    className="flex-1 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      setShowNewKeyModal(false);
                      createNewKey();
                    }}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                  >
                    Create Key
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