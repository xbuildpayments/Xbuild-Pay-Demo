import React, { useState } from "react";
import { ArrowLeft, Plus, Download, Play, Save, Filter, Calendar, BarChart3, Table, FileText, Trash2, Copy } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomReports() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [reportName, setReportName] = useState("");
  const [reportType, setReportType] = useState("financial");
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [filters, setFilters] = useState([]);

  const savedReports = [
    {
      id: 1,
      name: "Monthly Financial Summary",
      type: "financial",
      lastRun: "2 hours ago",
      schedule: "Monthly",
      recipients: 3,
      format: "PDF"
    },
    {
      id: 2,
      name: "Project Status Overview",
      type: "project_status",
      lastRun: "1 day ago",
      schedule: "Weekly",
      recipients: 5,
      format: "Excel"
    },
    {
      id: 3,
      name: "Compliance Audit Report",
      type: "compliance",
      lastRun: "3 days ago",
      schedule: "Quarterly",
      recipients: 2,
      format: "PDF"
    }
  ];

  const availableColumns = {
    financial: [
      "Project Name", "Contract Value", "Actual Spend", "Variance", "Payment Status", "Invoice Number", "Due Date"
    ],
    project_status: [
      "Project Name", "Progress %", "Milestone Status", "Start Date", "End Date", "Contractor", "Location"
    ],
    compliance: [
      "Project Name", "TrustScore", "Insurance Status", "KYC Status", "Risk Level", "Last Audit", "Issues"
    ]
  };

  const availableFilters = [
    { label: "Date Range", type: "date" },
    { label: "Project", type: "select" },
    { label: "Status", type: "select" },
    { label: "Amount Range", type: "number" },
    { label: "Contractor", type: "select" }
  ];

  const toggleColumn = (column) => {
    setSelectedColumns(prev =>
      prev.includes(column)
        ? prev.filter(c => c !== column)
        : [...prev, column]
    );
  };

  const addFilter = () => {
    setFilters([...filters, { type: "", value: "" }]);
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const saveReport = () => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<strong>Report Saved!</strong><br/>${reportName}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
    setShowBuilder(false);
  };

  const runReport = (report) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<strong>Generating Report...</strong><br/>${report.name}`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
      toast.innerHTML = `<strong>Report Ready!</strong><br/>Check your downloads.`;
      setTimeout(() => toast.remove(), 2000);
    }, 2000);
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
          to={createPageUrl("Analytics")}
          className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity mb-4"
          style={{ color: 'var(--muted)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Analytics
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Custom Reports</h1>
              <p className="mt-1" style={{ color: 'var(--muted)' }}>
                Create, save, and schedule custom reports tailored to your needs
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowBuilder(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Report
          </Button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Saved Reports */}
          <div>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Saved Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl p-6"
                  style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="w-8 h-8" style={{ color: 'var(--accent)' }} />
                    <span
                      className="px-3 py-1 text-xs font-semibold rounded-full"
                      style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa' }}
                    >
                      {report.type.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
                    {report.name}
                  </h3>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--muted)' }}>Schedule</span>
                      <span className="font-semibold" style={{ color: 'var(--text)' }}>{report.schedule}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--muted)' }}>Recipients</span>
                      <span className="font-semibold" style={{ color: 'var(--text)' }}>{report.recipients} users</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--muted)' }}>Last Run</span>
                      <span className="font-semibold" style={{ color: 'var(--text)' }}>{report.lastRun}</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: 'var(--muted)' }}>Format</span>
                      <span className="font-semibold" style={{ color: 'var(--text)' }}>{report.format}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => runReport(report)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Run
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-lg">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-lg text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Report Builder Modal */}
      <AnimatePresence>
        {showBuilder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8 overflow-y-auto"
            onClick={() => setShowBuilder(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-xl p-6 max-w-4xl w-full my-8"
              style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>
                Build Custom Report
              </h3>

              <div className="space-y-6">
                {/* Report Name */}
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>
                    Report Name
                  </label>
                  <Input
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    placeholder="e.g., Q4 Financial Summary"
                    className="rounded-lg"
                    style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
                  />
                </div>

                {/* Report Type */}
                <div>
                  <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>
                    Report Type
                  </label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger className="rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="project_status">Project Status</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="analytics">Analytics</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Column Selection */}
                <div>
                  <label className="text-sm font-medium block mb-3" style={{ color: 'var(--text)' }}>
                    Select Columns
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {availableColumns[reportType]?.map((column) => (
                      <label
                        key={column}
                        className="flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all"
                        style={{
                          background: selectedColumns.includes(column) ? 'rgba(59, 130, 246, 0.2)' : 'var(--panelAlt)',
                          border: `1px solid ${selectedColumns.includes(column) ? '#3b82f6' : 'var(--line)'}`
                        }}
                      >
                        <Switch
                          checked={selectedColumns.includes(column)}
                          onCheckedChange={() => toggleColumn(column)}
                        />
                        <span className="text-sm" style={{ color: 'var(--text)' }}>{column}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filters */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                      Filters
                    </label>
                    <Button
                      onClick={addFilter}
                      variant="outline"
                      size="sm"
                      className="rounded-lg"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Filter
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {filters.map((filter, index) => (
                      <div key={index} className="flex gap-2">
                        <Select
                          value={filter.type}
                          onValueChange={(value) => {
                            const newFilters = [...filters];
                            newFilters[index].type = value;
                            setFilters(newFilters);
                          }}
                        >
                          <SelectTrigger className="flex-1 rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                            <SelectValue placeholder="Select filter" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableFilters.map((f) => (
                              <SelectItem key={f.label} value={f.label}>{f.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Value"
                          className="flex-1 rounded-lg"
                          style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
                        />
                        <Button
                          onClick={() => removeFilter(index)}
                          variant="ghost"
                          size="icon"
                          className="rounded-lg text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Schedule & Format */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>
                      Schedule
                    </label>
                    <Select defaultValue="manual">
                      <SelectTrigger className="rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-2" style={{ color: 'var(--text)' }}>
                      Output Format
                    </label>
                    <Select defaultValue="pdf">
                      <SelectTrigger className="rounded-lg" style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShowBuilder(false)}
                    variant="outline"
                    className="flex-1 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={saveReport}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                    disabled={!reportName || selectedColumns.length === 0}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Report
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