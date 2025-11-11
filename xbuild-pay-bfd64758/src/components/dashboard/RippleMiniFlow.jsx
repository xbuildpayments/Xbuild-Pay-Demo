import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function RippleMiniFlow({ stage = "SUBMISSION", payoutPct, onViewFlow }) {
  const stages = [
    { key: "SUBMISSION", label: "Developer", color: "bg-blue-500" },
    { key: "TRUSTSCORE", label: "Escrow", color: "bg-yellow-500" },
    { key: "AI_CHECK", label: "Contractor", color: "bg-green-500" },
    { key: "ESCROW", label: "Supplier", color: "bg-green-600" }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === stage);

  const getStageLabel = () => {
    switch(stage) {
      case "SUBMISSION": return "Pending Submission";
      case "TRUSTSCORE": return "TrustScore Validation";
      case "AI_CHECK": return "AI Verification";
      case "ESCROW": return `Escrow Release • ${payoutPct}%`;
      case "XRPL_HASH": return "XRPL Confirmed";
      default: return "Processing";
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          {stages.map((s, index) => (
            <React.Fragment key={s.key}>
              <motion.div
                animate={{
                  scale: index === currentStageIndex ? [1, 1.2, 1] : 1,
                  opacity: index <= currentStageIndex ? 1 : 0.3
                }}
                transition={{ duration: 0.5 }}
                className={`w-8 h-8 rounded-full ${index <= currentStageIndex ? s.color : 'bg-gray-300'} flex items-center justify-center text-white text-xs font-bold`}
                title={s.label}
              >
                {s.label.charAt(0)}
              </motion.div>
              {index < stages.length - 1 && (
                <div className={`flex-1 h-1 rounded ${index < currentStageIndex ? s.color : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="text-xs text-gray-600 font-medium">{getStageLabel()}</p>
      </div>
      <button
        onClick={onViewFlow}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
        aria-label="View Transaction Flow"
      >
        View Flow
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}