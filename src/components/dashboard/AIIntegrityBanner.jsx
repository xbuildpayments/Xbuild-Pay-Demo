import React from "react";
import { Sparkles, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function AIIntegrityBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200 p-4 mb-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              AI Integrity Engine • <span className="text-green-600">96% validation confidence</span> • No anomalies detected
            </p>
            <p className="text-xs text-gray-600">Real-time compliance monitoring across all projects</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Synced: just now</span>
        </div>
      </div>
    </motion.div>
  );
}