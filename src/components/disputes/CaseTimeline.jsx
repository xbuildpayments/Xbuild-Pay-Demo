import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

export default function CaseTimeline({ timeline }) {
  return (
    <div className="space-y-4">
      {timeline.map((event, index) => {
        const isCompleted = true;
        const isCurrent = index === timeline.length - 1;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4"
          >
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isCurrent ? 'bg-blue-600' : 'bg-green-600'
              }`}>
                {isCurrent ? (
                  <Circle className="w-5 h-5 text-white" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                )}
              </div>
              {index < timeline.length - 1 && (
                <div className="w-0.5 h-12 bg-green-600 mt-2" />
              )}
            </div>
            <div className="flex-1 pb-8">
              <p className="font-semibold mb-1" style={{ color: 'var(--text)' }}>{event.step}</p>
              <p className="text-xs mb-1" style={{ color: 'var(--muted)' }}>{event.ts} • {event.actor}</p>
              {event.note && (
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{event.note}</p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}