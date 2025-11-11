import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Circle } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function MilestoneItem({ milestone, projectId }) {
  const navigate = useNavigate();

  const statusConfig = {
    completed: {
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      label: "Passed",
      dotColor: "bg-green-500"
    },
    pending: {
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      label: "In progress",
      dotColor: "bg-blue-500"
    },
    upcoming: {
      icon: Circle,
      color: "text-gray-400",
      bg: "bg-gray-50",
      border: "border-gray-200",
      label: "Upcoming",
      dotColor: "bg-gray-300"
    }
  };

  const config = statusConfig[milestone.status];
  const Icon = config.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.01, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{milestone.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Assigned</span>
              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 text-xs font-semibold rounded-full ${config.bg} ${config.color}`}
              >
                {config.label}
              </motion.span>
            </div>
          </div>
          
          {milestone.description && (
            <p className="text-sm text-gray-600 mb-3">{milestone.description}</p>
          )}

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Due: {format(new Date(milestone.due_date), "MMM d, yyyy")}</span>
            {milestone.completion_date && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <motion.div 
                    className={`w-2 h-2 rounded-full ${config.dotColor}`}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span>Completed {format(new Date(milestone.completion_date), "MMM d, yyyy")}</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="text-right ml-6 flex flex-col items-end gap-3">
          <p className="text-2xl font-bold text-gray-900">${milestone.amount.toLocaleString()}</p>
          {milestone.status === 'pending' && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => navigate(createPageUrl(`EscrowRelease?id=${milestone.id}&projectId=${projectId}`))}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-sm transition-all duration-200"
              >
                Submit Payment
              </Button>
            </motion.div>
          )}
          {milestone.status === 'completed' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="flex items-center gap-2 text-sm text-green-600 font-medium"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Payment Released</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}