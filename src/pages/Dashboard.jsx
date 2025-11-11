
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Search, Play } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ProjectCard from "../components/dashboard/ProjectCard";
import AIIntegrityBanner from "../components/dashboard/AIIntegrityBanner";
import { DemoStore } from "@/components/utils/demoStore";
import { Bus } from "@/components/utils/bus";
import { animateCountUp } from "@/components/utils/animationHelpers";

export default function Dashboard() {
  const navigate = useNavigate();
  const [totals, setTotals] = useState({ ...DemoStore.totals });
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const projectsData = await base44.entities.Project.list();
      return projectsData.map(p => ({
        ...p,
        trustScore: 89 + Math.floor(Math.random() * 10),
        insuranceStatus: "Policy Active",
        kyc: "Verified",
        lastMilestone: {
          id: `M-${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 9)}`,
          title: "Recent milestone completion",
          payoutPct: 15
        }
      }));
    },
    initialData: [],
  });

  useEffect(() => {
    // Subscribe to totals changes
    const handleTotalsChange = (newTotals) => {
      // Animate paid USD
      animateCountUp(
        newTotals.paidUSD,
        totals.paidUSD,
        (value) => {
          setTotals(prev => ({ ...prev, paidUSD: value }));
        }
      );
      
      // Animate paid XRP
      animateCountUp(
        newTotals.paidXRP,
        totals.paidXRP,
        (value) => {
          setTotals(prev => ({ ...prev, paidXRP: value }));
        }
      );
      
      // Animate tx count
      animateCountUp(
        newTotals.txCount,
        totals.txCount,
        (value) => {
          setTotals(prev => ({ ...prev, txCount: value }));
        }
      );
    };

    Bus.on("totals:changed", handleTotalsChange);

    return () => {
      Bus.off("totals:changed", handleTotalsChange);
    };
  }, [totals]);

  const launchInvestorView = () => {
    navigate(createPageUrl("InvestorDemo"));
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <motion.div 
        className="border-b px-8 py-6"
        style={{ background: 'var(--panel)', borderColor: 'var(--line)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Dashboard</h1>
          <div className="flex items-center gap-4">
            <motion.div 
              className="relative w-80"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted)' }} />
              <Input 
                placeholder="Search projects..."
                className="pl-10 rounded-lg transition-all duration-200"
                style={{
                  background: 'var(--panelAlt)',
                  border: '1px solid var(--line)',
                  color: 'var(--text)'
                }}
              />
            </motion.div>
            <Button
              onClick={launchInvestorView}
              className="px-6 shadow-lg font-semibold rounded-lg"
              style={{
                background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                color: '#ffffff'
              }}
            >
              <Play className="w-4 h-4 mr-2" />
              Launch Investor View
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <AIIntegrityBanner />
          
          {/* Live Stats Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-4 mb-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Live Ledger Stats • <span className="text-green-600">${totals.paidUSD.toLocaleString()}</span> paid • <span className="text-blue-600">{totals.txCount} transactions</span>
                </p>
                <p className="text-xs text-gray-600">Real-time updates via XRPL</p>
              </div>
              <Button
                onClick={() => navigate(createPageUrl("Ledger"))}
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-300 hover:bg-blue-50"
              >
                View Ledger
              </Button>
            </div>
          </motion.div>
          
          {isLoading ? (
            <div className="text-center py-12" style={{ color: 'var(--muted)' }}>Loading projects...</div>
          ) : (
            <div className="space-y-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
