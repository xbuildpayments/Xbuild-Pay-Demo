import React from "react";
import { Shield, CheckCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustComplianceStrip({ trustScore, insuranceStatus, kyc, onAuditTrailClick }) {
  const getTrustScoreColor = (score) => {
    if (score >= 85) return "bg-green-100 text-green-700 border-green-300";
    if (score >= 70) return "bg-yellow-100 text-yellow-700 border-yellow-300";
    return "bg-red-100 text-red-700 border-red-300";
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getTrustScoreColor(trustScore)}`}
        aria-label={`Trust Score: ${trustScore} out of 100`}
        title={`Trust Score: ${trustScore}/100`}
      >
        <CheckCircle className="w-3.5 h-3.5" />
        TrustScore {trustScore}
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-300"
        aria-label={`Insurance: ${insuranceStatus}`}
        title={`Insurance: ${insuranceStatus}`}
      >
        <Shield className="w-3.5 h-3.5" />
        Insurance: {insuranceStatus}
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-300"
        aria-label={`KYC & Licensing: ${kyc}`}
        title={`KYC & Licensing: ${kyc}`}
      >
        <CheckCircle className="w-3.5 h-3.5" />
        KYC & Licensing: {kyc}
      </motion.div>

      <button
        onClick={onAuditTrailClick}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        aria-label="View Audit Trail"
      >
        <FileText className="w-3.5 h-3.5" />
        Audit Trail
      </button>
    </div>
  );
}