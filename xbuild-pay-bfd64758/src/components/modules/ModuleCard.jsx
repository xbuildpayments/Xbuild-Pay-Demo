
import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { ModuleStore } from "./moduleStore";

const colorConfig = {
  blue: { bg: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.3)", text: "#3b82f6" },
  green: { bg: "rgba(23,201,100,0.15)", border: "rgba(23,201,100,0.3)", text: "#17c964" },
  yellow: { bg: "rgba(244,193,82,0.15)", border: "rgba(244,193,82,0.3)", text: "#f4c152" },
  purple: { bg: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.3)", text: "#a855f7" },
  orange: { bg: "rgba(249,115,22,0.15)", border: "rgba(249,115,22,0.3)", text: "#f97316" },
  gray: { bg: "rgba(167,179,199,0.15)", border: "rgba(167,179,199,0.3)", text: "#a7b3c7" }
};

const impactLabels = {
  dashboard: "Dashboard",
  flow: "Transaction Flow",
  ledger: "Ledger",
  disputes: "Disputes",
  insurance: "Insurance"
};

export default function ModuleCard({ module, Icon, index, onToggle, onConfigure, onSpecialAction }) {
  const colors = colorConfig[module.color] || colorConfig.blue;
  const { met: depsMet, missing } = ModuleStore.checkDependencies(module.key);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="rounded-xl p-6 panel-hover"
      style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: colors.bg }}>
            <Icon className="w-6 h-6" style={{ color: colors.text }} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text)' }}>{module.name}</h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>{module.description}</p>
          </div>
        </div>
        <span
          className="px-3 py-1 text-xs font-semibold rounded-full"
          style={{
            background: module.status === 'enabled' ? 'rgba(23,201,100,0.15)' :
                       module.status === 'available' ? 'rgba(59,130,246,0.15)' :
                       module.status === 'disabled' ? 'rgba(243,18,96,0.15)' :
                       'rgba(167,179,199,0.15)',
            color: module.status === 'enabled' ? '#17c964' :
                   module.status === 'available' ? '#3b82f6' :
                   module.status === 'disabled' ? '#f31260' :
                   '#a7b3c7'
          }}
        >
          {module.status === 'enabled' ? 'Enabled' :
           module.status === 'available' ? 'Available' :
           module.status === 'disabled' ? 'Disabled' :
           'Coming Soon'}
        </span>
      </div>

      {/* Dependencies Warning */}
      {module.dependsOn.length > 0 && !depsMet && module.status !== 'enabled' && (
        <div className="mb-4 p-3 rounded-lg flex items-center gap-2" style={{ background: 'rgba(244,193,82,0.15)', border: '1px solid rgba(244,193,82,0.3)' }}>
          <AlertTriangle className="w-4 h-4" style={{ color: 'var(--warning)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--warning)' }}>
            Requires: {missing.join(", ")}
          </span>
        </div>
      )}

      {/* Dependencies (if enabled or met) */}
      {module.dependsOn.length > 0 && (depsMet || module.status === 'enabled') && (
        <div className="mb-4">
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>Dependencies</p>
          <div className="flex flex-wrap gap-2">
            {module.dependsOn.map(dep => {
              const depModule = ModuleStore.getModule(dep);
              return (
                <span
                  key={dep}
                  className="px-2 py-1 text-xs rounded-full flex items-center gap-1"
                  style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--muted)' }}
                >
                  {depModule?.status === 'enabled' && <CheckCircle2 className="w-3 h-3" style={{ color: 'var(--success)' }} />}
                  {depModule?.name || dep}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Impacts */}
      {module.impacts.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-medium mb-2" style={{ color: 'var(--muted)' }}>Affects</p>
          <div className="flex flex-wrap gap-2">
            {module.impacts.map(impact => (
              <span
                key={impact}
                className="px-2 py-1 text-xs rounded-full"
                style={{ background: colors.bg, color: colors.text }}
              >
                {impactLabels[impact] || impact}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        {module.status === 'enabled' && (
          <>
            {module.category === 'intelligence' ? (
              <>
                {module.actions.includes('Configure') && (
                  <button
                    onClick={() => onConfigure(module.key)}
                    className="px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                    style={{ background: '#3b82f6', color: '#ffffff' }}
                  >
                    Configure
                  </button>
                )}
                {module.actions.filter(a => a !== 'Configure').map(action => (
                  <button
                    key={action}
                    onClick={() => onSpecialAction(module.key, action)}
                    className="px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                    style={{ background: 'var(--panelAlt)', color: 'var(--text)', border: '1px solid var(--line)' }}
                  >
                    {action}
                  </button>
                ))}
              </>
            ) : (
              <>
                <button
                  onClick={() => onConfigure(module.key)}
                  className="px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                  style={{ background: '#3b82f6', color: '#ffffff' }}
                >
                  Configure
                </button>
                <button
                  onClick={() => onToggle(module.key)}
                  className="px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                  style={{ background: 'var(--panelAlt)', color: 'var(--text)', border: '1px solid var(--line)' }}
                >
                  Disable
                </button>
              </>
            )}
          </>
        )}
        
        {(module.status === 'available' || module.status === 'disabled') && (
          <>
            <button
              onClick={() => onToggle(module.key)}
              disabled={!depsMet}
              className="px-4 py-2 rounded-lg font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: depsMet ? '#3b82f6' : 'var(--panelAlt)', color: depsMet ? '#ffffff' : 'var(--muted)' }}
            >
              Enable
            </button>
            {module.status === 'available' && module.actions.includes('View Scan') && (
              <button
                onClick={() => onSpecialAction(module.key, 'View Scan')}
                className="px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                style={{ background: 'var(--panelAlt)', color: 'var(--text)', border: '1px solid var(--line)' }}
              >
                View Scan
              </button>
            )}
            {module.status === 'disabled' && (
              <span className="px-4 py-2 text-xs" style={{ color: 'var(--muted)' }}>
                (Previously enabled)
              </span>
            )}
          </>
        )}
        
        {module.status === 'soon' && (
          <button
            disabled
            className="px-4 py-2 rounded-lg font-semibold text-sm opacity-50 cursor-not-allowed"
            style={{ background: 'var(--panelAlt)', color: 'var(--muted)' }}
          >
            Coming Soon
          </button>
        )}

        {/* Quick Actions */}
        {module.status === 'enabled' && module.category !== 'intelligence' && module.actions.slice(1).map(action => (
          <button
            key={action}
            onClick={() => onSpecialAction(module.key, action)}
            className="px-3 py-1 rounded text-xs font-medium transition-all"
            style={{ background: 'var(--panelAlt)', color: 'var(--accent)', border: '1px solid var(--line)' }}
          >
            {action}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
