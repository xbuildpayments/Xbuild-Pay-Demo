import React from "react";
import { format } from "date-fns";
import { CheckCircle2, Clock, AlertTriangle, ExternalLink } from "lucide-react";

export default function TransactionRow({ transaction, projectName, milestoneName }) {
  const statusConfig = {
    paid: {
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      label: "Paid"
    },
    pending: {
      icon: Clock,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      label: "Pending"
    },
    disputed: {
      icon: AlertTriangle,
      color: "text-red-600",
      bg: "bg-red-50",
      label: "Disputed"
    }
  };

  const config = statusConfig[transaction.status];
  const Icon = config.icon;

  return (
    <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 text-sm items-center">
      <div className="text-gray-600">
        {format(new Date(transaction.transaction_date), "MMM d, yyyy")}
      </div>
      <div className="font-medium text-gray-900">{projectName}</div>
      <div className="text-gray-600 truncate">{milestoneName}</div>
      <div>
        <p className="font-bold text-gray-900">${transaction.amount.toLocaleString()}</p>
        <p className="text-xs text-gray-500">{transaction.xrp_amount} XRP</p>
      </div>
      <div>
        <span className={`inline-flex items-center gap-1 px-3 py-1 ${config.bg} ${config.color} text-xs font-semibold rounded-full`}>
          <Icon className="w-3 h-3" />
          {config.label}
        </span>
      </div>
      <div>
        {transaction.xrp_transaction_hash ? (
          <a 
            href={`https://livenet.xrpl.org/transactions/${transaction.xrp_transaction_hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs font-mono"
          >
            {transaction.xrp_transaction_hash.substring(0, 8)}...
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-gray-400 text-xs">-</span>
        )}
      </div>
    </div>
  );
}