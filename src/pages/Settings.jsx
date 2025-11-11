import React, { useState, useEffect } from "react";
import { ArrowLeft, Sun, Moon, Monitor, Save, Bell, Lock, User, Zap, Code, BarChart3, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

export default function Settings() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("xbp-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("xbp-theme", theme);
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: theme }));
  }, [theme]);

  const saveSettings = () => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.textContent = 'Settings saved successfully!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const quickLinks = [
    {
      title: "Integrations",
      description: "Connect with QuickBooks, Xero, Procore, and more",
      icon: Zap,
      color: "from-green-600 to-blue-600",
      path: "Integrations"
    },
    {
      title: "API Access",
      description: "Manage API keys and programmatic access",
      icon: Code,
      color: "from-cyan-600 to-blue-600",
      path: "APIAccess"
    },
    {
      title: "Custom Reports",
      description: "Build and schedule custom analytics reports",
      icon: BarChart3,
      color: "from-purple-600 to-pink-600",
      path: "CustomReports"
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
        <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Settings</h1>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Quick Access Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Quick Access</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link key={link.path} to={createPageUrl(link.path)}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-xl p-6 cursor-pointer transition-all hover:scale-105"
                      style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center mb-3`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-bold mb-1 flex items-center gap-2" style={{ color: 'var(--text)' }}>
                        {link.title}
                        <ExternalLink className="w-4 h-4" style={{ color: 'var(--muted)' }} />
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        {link.description}
                      </p>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl p-6"
            style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Sun className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Appearance</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-3" style={{ color: 'var(--text)' }}>
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'light', label: 'Light', icon: Sun },
                    { value: 'dark', label: 'Dark', icon: Moon },
                    { value: 'auto', label: 'Auto', icon: Monitor }
                  ].map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          theme === option.value
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-2 ${
                          theme === option.value ? 'text-blue-500' : 'text-gray-400'
                        }`} />
                        <p className={`text-sm font-medium ${
                          theme === option.value ? 'text-blue-500' : 'text-gray-400'
                        }`}>
                          {option.label}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl p-6"
            style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Account</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>
                  Full Name
                </label>
                <Input
                  defaultValue="John Doe"
                  className="rounded-lg"
                  style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>
                  Email
                </label>
                <Input
                  type="email"
                  defaultValue="john@example.com"
                  className="rounded-lg"
                  style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>
                  Organization
                </label>
                <Input
                  defaultValue="Acme Construction"
                  className="rounded-lg"
                  style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl p-6"
            style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium" style={{ color: 'var(--text)' }}>Email Notifications</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>Receive email updates about your projects</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium" style={{ color: 'var(--text)' }}>Payment Alerts</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>Get notified when payments are released</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium" style={{ color: 'var(--text)' }}>Dispute Notifications</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>Alerts for new disputes or resolutions</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium" style={{ color: 'var(--text)' }}>Weekly Reports</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>Receive weekly project summaries</p>
                </div>
                <Switch />
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl p-6"
            style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>Security</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium" style={{ color: 'var(--text)' }}>Two-Factor Authentication</p>
                  <p className="text-sm" style={{ color: 'var(--muted)' }}>Add an extra layer of security</p>
                </div>
                <Switch />
              </div>
              <div>
                <Button
                  variant="outline"
                  className="w-full rounded-lg"
                  style={{ borderColor: 'var(--line)' }}
                >
                  Change Password
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={saveSettings}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 font-semibold shadow-lg"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}