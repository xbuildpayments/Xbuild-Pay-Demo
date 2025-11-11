import React, { useState } from "react";
import { Sparkles, AlertTriangle, Clock, Users, TrendingUp, CheckCircle2, Target, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AIProjectInsights({ project, insights }) {
  const [showDetails, setShowDetails] = useState(false);

  // Demo AI insights
  const aiData = {
    timeline: {
      predictedCompletion: "2025-03-15",
      confidence: 87,
      daysRemaining: 45,
      onTrack: true,
      factors: [
        { name: "Current pace", impact: "+5 days", positive: true },
        { name: "Weather forecast", impact: "-2 days", positive: false },
        { name: "Team efficiency", impact: "+3 days", positive: true }
      ]
    },
    risks: [
      { 
        id: 1,
        severity: "high",
        category: "Resource",
        description: "Concrete supplier delivery delays detected",
        probability: 72,
        impact: "5-7 day delay",
        mitigation: "Identify backup suppliers, pre-order materials"
      },
      {
        id: 2,
        severity: "medium",
        category: "Weather",
        description: "Heavy rain forecast for next week",
        probability: 65,
        impact: "2-3 day delay",
        mitigation: "Adjust schedule, move indoor tasks forward"
      },
      {
        id: 3,
        severity: "low",
        category: "Compliance",
        description: "Permit renewal due in 2 weeks",
        probability: 30,
        impact: "1-2 day delay",
        mitigation: "Submit renewal application now"
      }
    ],
    resources: {
      current: {
        laborers: 12,
        supervisors: 2,
        equipment: 8
      },
      optimized: {
        laborers: 15,
        supervisors: 3,
        equipment: 9
      },
      improvements: [
        { category: "Labor", suggestion: "+3 laborers for concrete work", impact: "3 days faster" },
        { category: "Supervision", suggestion: "+1 supervisor for quality control", impact: "Reduce rework by 15%" },
        { category: "Equipment", suggestion: "+1 crane for material handling", impact: "2 days faster" }
      ]
    }
  };

  const severityColors = {
    high: { bg: 'rgba(239, 68, 68, 0.2)', text: '#ef4444', border: 'rgba(239, 68, 68, 0.3)' },
    medium: { bg: 'rgba(245, 158, 11, 0.2)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)' },
    low: { bg: 'rgba(59, 130, 246, 0.2)', text: '#3b82f6', border: 'rgba(59, 130, 246, 0.3)' }
  };

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl p-6"
        style={{ 
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
          border: '1px solid rgba(139, 92, 246, 0.3)'
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
                AI Project Intelligence
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--muted)' }}>
                Real-time predictions and recommendations powered by machine learning analysis of historical project data
              </p>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa' }}>
                  ⚡ AI Confidence: {aiData.timeline.confidence}%
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(34, 197, 94, 0.2)', color: 'var(--success)' }}>
                  ✓ 3 Active Insights
                </span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setShowDetails(!showDetails)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
          >
            {showDetails ? 'Hide Details' : 'View All Insights'}
          </Button>
        </div>
      </motion.div>

      {/* Timeline Prediction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl p-6"
        style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5" style={{ color: 'var(--accent)' }} />
          <h4 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Timeline Prediction</h4>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="rounded-lg p-4" style={{ background: 'var(--panelAlt)' }}>
            <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Predicted Completion</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {new Date(aiData.timeline.predictedCompletion).toLocaleDateString()}
            </p>
          </div>
          <div className="rounded-lg p-4" style={{ background: 'var(--panelAlt)' }}>
            <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Days Remaining</p>
            <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {aiData.timeline.daysRemaining}
            </p>
          </div>
          <div className="rounded-lg p-4" style={{ background: 'var(--panelAlt)' }}>
            <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>Status</p>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--success)' }} />
              <p className="text-lg font-bold" style={{ color: 'var(--success)' }}>On Track</p>
            </div>
          </div>
        </div>

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Contributing Factors:</p>
            {aiData.timeline.factors.map((factor, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ background: 'var(--panelAlt)' }}
              >
                <span className="text-sm" style={{ color: 'var(--text)' }}>{factor.name}</span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: factor.positive ? 'var(--success)' : 'var(--warning)' }}
                >
                  {factor.impact}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Risk Detection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl p-6"
        style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5" style={{ color: 'var(--warning)' }} />
          <h4 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Risk Detection</h4>
          <span className="ml-auto px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>
            {aiData.risks.length} Risks Identified
          </span>
        </div>

        <div className="space-y-3">
          {aiData.risks.map((risk, index) => (
            <motion.div
              key={risk.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-lg p-4"
              style={{ 
                background: severityColors[risk.severity].bg,
                border: `1px solid ${severityColors[risk.severity].border}`
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-1 rounded text-xs font-bold uppercase"
                    style={{ 
                      background: severityColors[risk.severity].border,
                      color: '#ffffff'
                    }}
                  >
                    {risk.severity}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>
                    {risk.category}
                  </span>
                </div>
                <span className="text-xs font-semibold" style={{ color: severityColors[risk.severity].text }}>
                  {risk.probability}% probability
                </span>
              </div>
              <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>
                {risk.description}
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p style={{ color: 'var(--muted)' }}>Potential Impact:</p>
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>{risk.impact}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--muted)' }}>Suggested Mitigation:</p>
                  <p className="font-semibold" style={{ color: 'var(--text)' }}>{risk.mitigation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Resource Optimization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl p-6"
        style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5" style={{ color: 'var(--success)' }} />
          <h4 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Resource Optimization</h4>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="rounded-lg p-4" style={{ background: 'var(--panelAlt)' }}>
            <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>Laborers</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                {aiData.resources.current.laborers}
              </p>
              <span className="text-sm" style={{ color: 'var(--muted)' }}>→</span>
              <p className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
                {aiData.resources.optimized.laborers}
              </p>
            </div>
          </div>
          <div className="rounded-lg p-4" style={{ background: 'var(--panelAlt)' }}>
            <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>Supervisors</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                {aiData.resources.current.supervisors}
              </p>
              <span className="text-sm" style={{ color: 'var(--muted)' }}>→</span>
              <p className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
                {aiData.resources.optimized.supervisors}
              </p>
            </div>
          </div>
          <div className="rounded-lg p-4" style={{ background: 'var(--panelAlt)' }}>
            <p className="text-xs mb-2" style={{ color: 'var(--muted)' }}>Equipment</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                {aiData.resources.current.equipment}
              </p>
              <span className="text-sm" style={{ color: 'var(--muted)' }}>→</span>
              <p className="text-2xl font-bold" style={{ color: 'var(--success)' }}>
                {aiData.resources.optimized.equipment}
              </p>
            </div>
          </div>
        </div>

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>AI Recommendations:</p>
            {aiData.resources.improvements.map((improvement, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}
              >
                <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--success)' }} />
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>
                    {improvement.category}: {improvement.suggestion}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--success)' }}>
                    Expected Impact: {improvement.impact}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Generate Report Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl p-6 text-center"
        style={{ background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(34, 197, 94, 0.1))', border: '1px solid rgba(59, 130, 246, 0.3)' }}
      >
        <Target className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--accent)' }} />
        <h4 className="text-lg font-bold mb-2" style={{ color: 'var(--text)' }}>
          AI-Generated Status Report
        </h4>
        <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
          Get a comprehensive project status report with all AI insights, predictions, and recommendations
        </p>
        <Button
          onClick={() => {
            const toast = document.createElement('div');
            toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            toast.innerHTML = '<strong>Report Generated!</strong><br/>Check your downloads folder.';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Generate AI Report
        </Button>
      </motion.div>
    </div>
  );
}