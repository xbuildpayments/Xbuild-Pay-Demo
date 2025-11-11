import React, { useState } from "react";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, CheckCircle2, AlertTriangle, Shield, Filter, Calendar, Download, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6m');
  const [selectedProject, setSelectedProject] = useState('all');
  const [drillDownView, setDrillDownView] = useState(null);

  // Demo data for financial trends
  const financialData = [
    { month: 'Jul', contractValue: 280000, actualSpend: 245000, variance: -35000 },
    { month: 'Aug', contractValue: 320000, actualSpend: 298000, variance: -22000 },
    { month: 'Sep', contractValue: 385000, actualSpend: 412000, variance: 27000 },
    { month: 'Oct', contractValue: 425000, actualSpend: 419000, variance: -6000 },
    { month: 'Nov', contractValue: 480000, actualSpend: 465000, variance: -15000 },
    { month: 'Dec', contractValue: 520000, actualSpend: 502000, variance: -18000 }
  ];

  // Milestone completion rate
  const milestoneData = [
    { month: 'Jul', completed: 85, onTime: 75, delayed: 10 },
    { month: 'Aug', completed: 88, onTime: 80, delayed: 8 },
    { month: 'Sep', completed: 82, onTime: 70, delayed: 12 },
    { month: 'Oct', completed: 91, onTime: 85, delayed: 6 },
    { month: 'Nov', completed: 89, onTime: 82, delayed: 7 },
    { month: 'Dec', completed: 93, onTime: 88, delayed: 5 }
  ];

  // Dispute frequency
  const disputeData = [
    { month: 'Jul', disputes: 3, resolved: 2, pending: 1 },
    { month: 'Aug', disputes: 5, resolved: 4, pending: 1 },
    { month: 'Sep', disputes: 2, resolved: 2, pending: 0 },
    { month: 'Oct', disputes: 4, resolved: 3, pending: 1 },
    { month: 'Nov', disputes: 1, resolved: 1, pending: 0 },
    { month: 'Dec', disputes: 2, resolved: 1, pending: 1 }
  ];

  // Compliance risk by project
  const complianceData = [
    { project: 'Downtown Plaza', riskScore: 15, status: 'Low', issues: 2 },
    { project: 'Harbor View', riskScore: 45, status: 'Medium', issues: 5 },
    { project: 'Tech Campus', riskScore: 25, status: 'Low', issues: 3 },
    { project: 'Residential Complex', riskScore: 65, status: 'High', issues: 8 }
  ];

  // Project performance breakdown
  const projectBreakdown = [
    { name: 'Downtown Plaza', value: 1250000, percentage: 35, status: 'On Track' },
    { name: 'Harbor View', value: 980000, percentage: 28, status: 'At Risk' },
    { name: 'Tech Campus', value: 750000, percentage: 21, status: 'On Track' },
    { name: 'Others', value: 570000, percentage: 16, status: 'On Track' }
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'];
  const RISK_COLORS = { Low: '#10b981', Medium: '#f59e0b', High: '#ef4444' };

  // KPI calculations
  const totalContractValue = financialData.reduce((sum, d) => sum + d.contractValue, 0);
  const totalActualSpend = financialData.reduce((sum, d) => sum + d.actualSpend, 0);
  const avgMilestoneCompletion = Math.round(milestoneData.reduce((sum, d) => sum + d.completed, 0) / milestoneData.length);
  const totalDisputes = disputeData.reduce((sum, d) => sum + d.disputes, 0);
  const avgComplianceScore = Math.round(complianceData.reduce((sum, d) => sum + d.riskScore, 0) / complianceData.length);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg p-3 shadow-lg" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
          <p className="font-semibold mb-2" style={{ color: 'var(--text)' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: ${typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
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
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Analytics Dashboard</h1>
              <p className="mt-1" style={{ color: 'var(--muted)' }}>
                Advanced insights into project performance and compliance
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-48 rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="plaza">Downtown Plaza</SelectItem>
                <SelectItem value="harbor">Harbor View</SelectItem>
                <SelectItem value="campus">Tech Campus</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="rounded-xl"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-5 shadow-sm ring-1 cursor-pointer hover:ring-2"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
              onClick={() => setDrillDownView('financial')}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                  Budget Variance
                </p>
                <TrendingDown className="w-4 h-4" style={{ color: 'var(--success)' }} />
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                -2.8%
              </p>
              <p className="text-xs" style={{ color: 'var(--success)' }}>Under budget</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl p-5 shadow-sm ring-1 cursor-pointer hover:ring-2"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
              onClick={() => setDrillDownView('milestones')}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                  Milestone Rate
                </p>
                <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--success)' }} />
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                {avgMilestoneCompletion}%
              </p>
              <p className="text-xs" style={{ color: 'var(--success)' }}>+5% vs last period</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl p-5 shadow-sm ring-1 cursor-pointer hover:ring-2"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
              onClick={() => setDrillDownView('disputes')}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                  Total Disputes
                </p>
                <AlertTriangle className="w-4 h-4" style={{ color: 'var(--warning)' }} />
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                {totalDisputes}
              </p>
              <p className="text-xs" style={{ color: 'var(--success)' }}>-15% vs last period</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl p-5 shadow-sm ring-1 cursor-pointer hover:ring-2"
              style={{ background: 'rgba(15, 23, 42, 0.5)', ringColor: 'rgba(255, 255, 255, 0.1)' }}
              onClick={() => setDrillDownView('compliance')}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                  Avg Risk Score
                </p>
                <Shield className="w-4 h-4" style={{ color: 'var(--success)' }} />
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                {avgComplianceScore}
              </p>
              <p className="text-xs" style={{ color: 'var(--success)' }}>Low risk</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-xl p-5 shadow-sm ring-1"
              style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))', ringColor: 'rgba(59, 130, 246, 0.3)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.05em' }}>
                  Total Value
                </p>
                <DollarSign className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              </div>
              <p className="text-3xl font-bold mb-1" style={{ color: 'var(--text)' }}>
                $3.55M
              </p>
              <p className="text-xs" style={{ color: 'var(--accent)' }}>Active contracts</p>
            </motion.div>
          </div>

          {/* Main Charts Section */}
          <AnimatePresence mode="wait">
            {!drillDownView ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Financial Trends */}
                <div className="rounded-xl p-6" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Financial Trends</h3>
                      <p className="text-sm" style={{ color: 'var(--muted)' }}>Contract value vs. actual spend</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDrillDownView('financial')}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      View Details →
                    </Button>
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={financialData}>
                      <defs>
                        <linearGradient id="contractGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                      <XAxis dataKey="month" stroke="#a7b3c7" />
                      <YAxis stroke="#a7b3c7" />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Area type="monotone" dataKey="contractValue" name="Contract Value" stroke="#3b82f6" fillOpacity={1} fill="url(#contractGradient)" />
                      <Area type="monotone" dataKey="actualSpend" name="Actual Spend" stroke="#8b5cf6" fillOpacity={1} fill="url(#spendGradient)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Milestone & Disputes Row */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Milestone Completion */}
                  <div className="rounded-xl p-6" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Milestone Completion</h3>
                        <p className="text-sm" style={{ color: 'var(--muted)' }}>On-time vs. delayed</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDrillDownView('milestones')}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Details →
                      </Button>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={milestoneData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                        <XAxis dataKey="month" stroke="#a7b3c7" />
                        <YAxis stroke="#a7b3c7" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="onTime" name="On Time" fill="#10b981" />
                        <Bar dataKey="delayed" name="Delayed" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Dispute Frequency */}
                  <div className="rounded-xl p-6" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Dispute Frequency</h3>
                        <p className="text-sm" style={{ color: 'var(--muted)' }}>Resolved vs. pending</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDrillDownView('disputes')}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Details →
                      </Button>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={disputeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                        <XAxis dataKey="month" stroke="#a7b3c7" />
                        <YAxis stroke="#a7b3c7" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="disputes" name="Total Disputes" stroke="#ef4444" strokeWidth={2} />
                        <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#10b981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Compliance & Project Breakdown Row */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Compliance Risk */}
                  <div className="rounded-xl p-6" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Compliance Risk Scoring</h3>
                        <p className="text-sm" style={{ color: 'var(--muted)' }}>By project</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDrillDownView('compliance')}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Details →
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {complianceData.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-lg p-4 cursor-pointer hover:bg-opacity-80 transition-all"
                          style={{ background: 'var(--panelAlt)' }}
                          onClick={() => setDrillDownView('compliance')}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold" style={{ color: 'var(--text)' }}>{item.project}</p>
                            <span
                              className="px-3 py-1 text-xs font-semibold rounded-full"
                              style={{
                                background: `${RISK_COLORS[item.status]}20`,
                                color: RISK_COLORS[item.status]
                              }}
                            >
                              {item.status} Risk
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
                              <div
                                className="h-full transition-all"
                                style={{
                                  width: `${item.riskScore}%`,
                                  background: RISK_COLORS[item.status]
                                }}
                              />
                            </div>
                            <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>{item.riskScore}</span>
                          </div>
                          <p className="text-xs mt-2" style={{ color: 'var(--muted)' }}>{item.issues} compliance issues</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Project Value Breakdown */}
                  <div className="rounded-xl p-6" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                    <div className="mb-6">
                      <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Project Value Distribution</h3>
                      <p className="text-sm" style={{ color: 'var(--muted)' }}>Active contracts</p>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={projectBreakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name} (${percentage}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {projectBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="drilldown"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Back Button */}
                <Button
                  onClick={() => setDrillDownView(null)}
                  variant="outline"
                  className="rounded-lg"
                  style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Overview
                </Button>

                {/* Drill-Down Content */}
                {drillDownView === 'financial' && (
                  <div className="rounded-xl p-6" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                    <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>Financial Deep Dive</h3>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="rounded-lg p-4" style={{ background: 'var(--panelAlt)' }}>
                        <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Total Contract Value</p>
                        <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>${(totalContractValue / 1000000).toFixed(2)}M</p>
                      </div>
                      <div className="rounded-lg p-4" style={{ background: 'var(--panelAlt)' }}>
                        <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Total Actual Spend</p>
                        <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>${(totalActualSpend / 1000000).toFixed(2)}M</p>
                      </div>
                      <div className="rounded-lg p-4" style={{ background: 'var(--panelAlt)' }}>
                        <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Variance</p>
                        <p className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
                          -${((totalContractValue - totalActualSpend) / 1000).toFixed(0)}K
                        </p>
                      </div>
                    </div>

                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={financialData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                        <XAxis dataKey="month" stroke="#a7b3c7" />
                        <YAxis stroke="#a7b3c7" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="contractValue" name="Contract Value" fill="#3b82f6" />
                        <Bar dataKey="actualSpend" name="Actual Spend" fill="#8b5cf6" />
                        <Bar dataKey="variance" name="Variance" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="mt-6 rounded-lg p-4" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                      <h4 className="font-bold mb-2" style={{ color: 'var(--text)' }}>Key Insights</h4>
                      <ul className="space-y-2 text-sm" style={{ color: 'var(--muted)' }}>
                        <li>• Overall spending is 2.8% under budget across all projects</li>
                        <li>• September showed a temporary overspend due to material cost increases</li>
                        <li>• Q4 spending has stabilized with improved forecasting</li>
                        <li>• Recommend maintaining current budget allocation strategy</li>
                      </ul>
                    </div>
                  </div>
                )}

                {drillDownView === 'milestones' && (
                  <div className="rounded-xl p-6" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                    <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>Milestone Performance Analysis</h3>
                    
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={milestoneData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                        <XAxis dataKey="month" stroke="#a7b3c7" />
                        <YAxis stroke="#a7b3c7" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="completed" name="Total Completed" fill="#3b82f6" />
                        <Bar dataKey="onTime" name="On Time" fill="#10b981" />
                        <Bar dataKey="delayed" name="Delayed" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="grid grid-cols-2 gap-6 mt-6">
                      <div className="rounded-lg p-4" style={{ background: 'var(--panelAlt)' }}>
                        <h4 className="font-bold mb-3" style={{ color: 'var(--text)' }}>Performance Trends</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span style={{ color: 'var(--muted)' }}>Avg Completion Rate</span>
                            <span className="font-bold" style={{ color: 'var(--text)' }}>{avgMilestoneCompletion}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span style={{ color: 'var(--muted)' }}>Best Month</span>
                            <span className="font-bold" style={{ color: 'var(--success)' }}>Dec (93%)</span>
                          </div>
                          <div className="flex justify-between">
                            <span style={{ color: 'var(--muted)' }}>Improvement</span>
                            <span className="font-bold" style={{ color: 'var(--success)' }}>+8% since Jul</span>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg p-4" style={{ background: 'var(--panelAlt)' }}>
                        <h4 className="font-bold mb-3" style={{ color: 'var(--text)' }}>Delay Analysis</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span style={{ color: 'var(--muted)' }}>Total Delays</span>
                            <span className="font-bold" style={{ color: 'var(--text)' }}>48</span>
                          </div>
                          <div className="flex justify-between">
                            <span style={{ color: 'var(--muted)' }}>Avg Delay Duration</span>
                            <span className="font-bold" style={{ color: 'var(--warning)' }}>5.2 days</span>
                          </div>
                          <div className="flex justify-between">
                            <span style={{ color: 'var(--muted)' }}>Main Cause</span>
                            <span className="font-bold" style={{ color: 'var(--text)' }}>Weather</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {drillDownView === 'disputes' && (
                  <div className="rounded-xl p-6" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                    <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>Dispute Resolution Analysis</h3>
                    
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={disputeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f2a44" />
                        <XAxis dataKey="month" stroke="#a7b3c7" />
                        <YAxis stroke="#a7b3c7" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="disputes" name="New Disputes" fill="#ef4444" />
                        <Bar dataKey="resolved" name="Resolved" fill="#10b981" />
                        <Bar dataKey="pending" name="Pending" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="rounded-lg p-4" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                        <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Total Disputes</p>
                        <p className="text-3xl font-bold" style={{ color: '#ef4444' }}>{totalDisputes}</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>6-month period</p>
                      </div>
                      <div className="rounded-lg p-4" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Resolution Rate</p>
                        <p className="text-3xl font-bold" style={{ color: 'var(--success)' }}>76%</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Within 30 days</p>
                      </div>
                      <div className="rounded-lg p-4" style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                        <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Avg Resolution Time</p>
                        <p className="text-3xl font-bold" style={{ color: 'var(--warning)' }}>18d</p>
                        <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Industry avg: 45d</p>
                      </div>
                    </div>
                  </div>
                )}

                {drillDownView === 'compliance' && (
                  <div className="rounded-xl p-6" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                    <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>Compliance Risk Deep Dive</h3>
                    
                    <div className="space-y-4">
                      {complianceData.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="rounded-lg p-6"
                          style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>{item.project}</h4>
                              <p className="text-sm" style={{ color: 'var(--muted)' }}>{item.issues} compliance issues identified</p>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-bold mb-1" style={{ color: RISK_COLORS[item.status] }}>{item.riskScore}</p>
                              <span
                                className="px-3 py-1 text-xs font-semibold rounded-full"
                                style={{
                                  background: `${RISK_COLORS[item.status]}20`,
                                  color: RISK_COLORS[item.status]
                                }}
                              >
                                {item.status} Risk
                              </span>
                            </div>
                          </div>
                          <div className="h-3 rounded-full overflow-hidden mb-4" style={{ background: 'var(--line)' }}>
                            <div
                              className="h-full transition-all"
                              style={{
                                width: `${item.riskScore}%`,
                                background: RISK_COLORS[item.status]
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p style={{ color: 'var(--muted)' }}>KYC Status</p>
                              <p className="font-semibold" style={{ color: 'var(--success)' }}>✓ Verified</p>
                            </div>
                            <div>
                              <p style={{ color: 'var(--muted)' }}>Insurance</p>
                              <p className="font-semibold" style={{ color: 'var(--success)' }}>✓ Active</p>
                            </div>
                            <div>
                              <p style={{ color: 'var(--muted)' }}>Last Audit</p>
                              <p className="font-semibold" style={{ color: 'var(--text)' }}>2 weeks ago</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}