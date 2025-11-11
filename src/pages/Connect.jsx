
import React, { useState } from "react";
import { Search, Plus, Users, CheckCircle2, TrendingUp, DollarSign, Shield, Mail, Phone, ArrowLeft, MessageCircle, UserPlus, FileText, AlertCircle, MapPin, Award, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Bus } from "@/components/utils/bus";
import InviteConnectionModal from "@/components/connect/InviteConnectionModal";
import PostComposer from "@/components/connect/PostComposer";
import FeedPost from "@/components/connect/FeedPost";
import ChannelCard from "@/components/connect/ChannelCard";
import ProjectRoomCard from "@/components/connect/ProjectRoomCard";
import ContractorCard from "@/components/connect/ContractorCard";

export default function Connect() {
  const [activeTab, setActiveTab] = useState("feed");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showPostComposer, setShowPostComposer] = useState(false);

  const connections = [
    {
      id: 1,
      name: "BuildRight Construction Co.",
      type: "General Contractor",
      role: "contractor",
      projects: 3,
      totalPaid: 2450000,
      status: "verified",
      contact: "contact@buildright.com",
      phone: "+1 (555) 123-4567",
      trustScore: 92,
      onTimePayment: 98,
      disputeRate: 2,
      insuranceStatus: "Active",
      kyb: "Verified"
    },
    {
      id: 2,
      name: "Coastal Builders Inc.",
      type: "Subcontractor",
      role: "contractor",
      projects: 2,
      totalPaid: 890000,
      status: "verified",
      contact: "info@coastalbuilders.com",
      phone: "+1 (555) 234-5678",
      trustScore: 89,
      onTimePayment: 95,
      disputeRate: 5,
      insuranceStatus: "Active",
      kyb: "Verified"
    },
    {
      id: 3,
      name: "BuildSafe Insurance Co.",
      type: "Insurance Provider",
      role: "insurer",
      projects: 8,
      totalPaid: 0,
      status: "verified",
      contact: "claims@buildsafe.com",
      phone: "+1 (555) 345-6789",
      trustScore: 95,
      kyb: "Verified"
    },
    {
      id: 4,
      name: "Capital Lending Group",
      type: "Financing Partner",
      role: "liquidity",
      projects: 5,
      totalPaid: 0,
      status: "verified",
      contact: "loans@capitallending.com",
      phone: "+1 (555) 456-7890",
      trustScore: 91,
      kyb: "Verified"
    },
    {
      id: 5,
      name: "Construction Legal Advisors",
      type: "Legal Consultant",
      role: "legal",
      projects: 12,
      totalPaid: 0,
      status: "verified",
      contact: "info@constructionlegal.com",
      phone: "+1 (555) 567-8901",
      trustScore: 94,
      kyb: "Verified"
    }
  ];

  const feedPosts = [
    {
      id: "P001",
      type: "milestone",
      author: "Sarah Lee — Project Manager, Apex Construction",
      authorRole: "Project Manager",
      authorTrustScore: 91,
      verified: true,
      timestamp: "2 hours ago",
      content: "Milestone #4 completed for Riverside Apartments ahead of schedule. Inspections passed via OmniScan integration.",
      project: "Riverside Apartments",
      milestone: "Milestone #4",
      location: "San Diego, CA",
      signals: ["Verified Media", "Geo-Tagged", "Cross-Module Audit"],
      endorsements: 12,
      comments: 3,
      trustChange: +0.02
    },
    {
      id: "P002",
      type: "advice",
      author: "Michael Tan — Procurement Director, Structura Ltd",
      authorRole: "Procurement Director",
      authorTrustScore: 87,
      verified: true,
      timestamp: "5 hours ago",
      content: "Seeking recommendations for bonding coverage automation tied to smart escrow releases. Any insurer partners integrated yet?",
      location: "Austin, TX",
      signals: ["Engagement-Weighted", "Insurer Inquiry"],
      tags: ["Insurance", "Smart Escrow", "Bonding"],
      endorsements: 6,
      comments: 5,
      trustChange: 0
    },
    {
      id: "P003",
      type: "alert",
      author: "Lena Garza — Civil Engineer, Meridian Group",
      authorRole: "Engineer",
      authorTrustScore: 73,
      verified: false,
      timestamp: "1 day ago",
      content: "⚠️ Unexpected material shortage causing delay on Milestone #2. CIIM detected RFI notice — awaiting supplier confirmation.",
      location: "Toronto, Canada",
      signals: ["RFI Logged", "Pending Verification"],
      urgency: "high",
      endorsements: 4,
      comments: 7,
      trustChange: -0.01
    },
    {
      id: "P004",
      type: "opportunity",
      author: "David Osei — Independent Contractor",
      authorRole: "Subcontractor",
      authorTrustScore: 85,
      verified: true,
      timestamp: "2 days ago",
      content: "Available for smart-contract linked projects (structural framing). Fully KYB verified and insured.",
      location: "Accra, Ghana",
      signals: ["KYB Verified", "Bonded"],
      tags: ["Structural", "KYB", "Available"],
      endorsements: 10,
      comments: 2,
      trustChange: +0.01
    }
  ];

  const channels = [
    { id: 1, name: "SF Bay Area Construction", type: "region", members: 1247, unread: 5, lastActivity: "10m ago" },
    { id: 2, name: "Electrical Contractors", type: "trade", members: 892, unread: 0, lastActivity: "1h ago" },
    { id: 3, name: "HVAC Professionals", type: "trade", members: 654, unread: 2, lastActivity: "30m ago" },
    { id: 4, name: "BuildRight Team", type: "organization", members: 45, unread: 12, lastActivity: "5m ago" },
    { id: 5, name: "Insurance & Risk Management", type: "specialty", members: 438, unread: 0, lastActivity: "2h ago" }
  ];

  const projectRooms = [
    {
      id: 1,
      name: "Downtown Plaza Construction",
      participants: 12,
      milestones: { completed: 5, active: 3, upcoming: 2 },
      lastEvent: "Milestone completed: Level 2 Electrical",
      lastEventTime: "2h ago",
      status: "active"
    },
    {
      id: 2,
      name: "Harbor View Residential Complex",
      participants: 8,
      milestones: { completed: 3, active: 2, upcoming: 4 },
      lastEvent: "Site inspection scheduled",
      lastEventTime: "1d ago",
      status: "active"
    }
  ];

  const verifiedConnections = connections.filter(c => c.status === 'verified').length;
  const totalTransacted = connections.reduce((sum, c) => sum + c.totalPaid, 0);
  const activeProjects = connections.filter(c => c.role === 'contractor').reduce((sum, c) => sum + c.projects, 0);
  const avgTrustScore = Math.round(connections.reduce((sum, c) => sum + c.trustScore, 0) / connections.length);
  const avgOnTimePayment = Math.round(connections.filter(c => c.onTimePayment).reduce((sum, c) => sum + (c.onTimePayment || 0), 0) / connections.filter(c => c.onTimePayment).length);

  const handleEndorse = (postId) => {
    const post = feedPosts.find(p => p.id === postId);
    Bus.emit('connect:endorse', postId);
    
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    toast.innerHTML = `<strong>Endorsement Recorded</strong><br/>TrustScore updated: ${post.trustChange > 0 ? '+' : ''}${(post.trustChange * 100).toFixed(0)} points<br/>Smart contract evaluating release...`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
      
      // Show escrow decision
      if (post.type === 'milestone' && post.trustChange > 0) {
        const decision = document.createElement('div');
        decision.setAttribute('role', 'status');
        decision.setAttribute('aria-live', 'polite');
        decision.className = 'fixed top-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        decision.innerHTML = `<strong>✓ Funds Released</strong><br/>$45,000 transferred via XRPL<br/>Hash: 7C1A...9F2`;
        document.body.appendChild(decision);
        setTimeout(() => decision.remove(), 4000);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <style>{`
        .btn-ghost-light {
          background-color: rgba(255, 255, 255, 0.08);
          color: #E4E6EB;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-ghost-light:hover {
          background-color: rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.25);
        }

        .btn-outline-contrast {
          border: 1px solid rgba(255,255,255,0.3);
          color: #E4E6EB;
          background: transparent;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .btn-outline-contrast:hover {
          background-color: rgba(255,255,255,0.12);
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.4);
        }

        .tab-button {
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          border-radius: 0.75rem;
          transition: all 0.2s ease;
          color: var(--muted);
          background: transparent;
        }
        .tab-button:hover {
          color: var(--text);
          background: rgba(255,255,255,0.05);
        }
        .tab-button.active {
          color: #ffffff;
          background: rgba(59,130,246,0.2);
          box-shadow: 0 0 0 1px rgba(59,130,246,0.3);
        }
      `}</style>

      {/* Header */}
      <motion.div 
        className="border-b px-8 py-6"
        style={{ background: 'var(--panel)', borderColor: 'var(--line)' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <Link
            to={createPageUrl("Dashboard")}
            className="inline-flex items-center gap-2 text-sm hover:opacity-70 transition-opacity"
            style={{ color: 'var(--muted)' }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>Network Connect</h1>
            <p className="mt-1" style={{ color: 'var(--muted)' }}>Build trust, collaborate, and grow your network</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: 'var(--muted)' }} />
              <Input 
                placeholder="Search connections..."
                className="pl-10 rounded-lg"
                style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)', color: 'var(--text)' }}
              />
            </div>
            <Button 
              onClick={() => setShowInviteModal(true)}
              className="btn-primary-bright"
            >
              <Plus className="w-4 h-4 mr-2" />
              Invite Connection
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="p-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-6 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl shadow-sm p-4"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Connections</p>
                <Users className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{connections.length}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="rounded-xl shadow-sm p-4"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Verified</p>
                <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--success)' }} />
              </div>
              <p className="text-2xl font-bold text-green-400">{verifiedConnections}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-xl shadow-sm p-4"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Transacted</p>
                <DollarSign className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>${(totalTransacted / 1000000).toFixed(1)}M</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-xl shadow-sm p-4"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Projects</p>
                <TrendingUp className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text)' }}>{activeProjects}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl shadow-sm p-4"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>Avg Trust</p>
                <Award className="w-4 h-4" style={{ color: 'var(--warning)' }} />
              </div>
              <p className="text-2xl font-bold text-yellow-400">{avgTrustScore}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-xl shadow-sm p-4"
              style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium uppercase" style={{ color: 'var(--muted)', letterSpacing: '0.02em' }}>On-Time</p>
                <Clock className="w-4 h-4" style={{ color: 'var(--success)' }} />
              </div>
              <p className="text-2xl font-bold text-green-400">{avgOnTimePayment}%</p>
            </motion.div>
          </div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl p-2 inline-flex gap-2"
            style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
          >
            <button
              onClick={() => setActiveTab("feed")}
              className={`tab-button ${activeTab === "feed" ? "active" : ""}`}
            >
              Feed
            </button>
            <button
              onClick={() => setActiveTab("channels")}
              className={`tab-button ${activeTab === "channels" ? "active" : ""}`}
            >
              Channels
            </button>
            <button
              onClick={() => setActiveTab("rooms")}
              className={`tab-button ${activeTab === "rooms" ? "active" : ""}`}
            >
              Project Rooms
            </button>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "feed" && (
              <motion.div
                key="feed"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {/* Post Composer Button */}
                <div className="rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                  onClick={() => setShowPostComposer(true)}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'var(--accent)' }}>
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <p style={{ color: 'var(--muted)' }}>Share an update, ask for advice, or post an opportunity...</p>
                </div>

                {/* Feed Posts */}
                {feedPosts.map((post, index) => (
                  <FeedPost key={post.id} post={post} onEndorse={handleEndorse} index={index} />
                ))}

                {/* Contractor Cards */}
                <div>
                  <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Your Network</h2>
                  <div className="space-y-4">
                    {connections.map((connection, index) => (
                      <ContractorCard key={connection.id} connection={connection} index={index} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "channels" && (
              <motion.div
                key="channels"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>City & Region Channels</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {channels.filter(c => c.type === 'region').map((channel, index) => (
                      <ChannelCard key={channel.id} channel={channel} index={index} />
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Trade-Specific Channels</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {channels.filter(c => c.type === 'trade').map((channel, index) => (
                      <ChannelCard key={channel.id} channel={channel} index={index} />
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>Organization Groups</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {channels.filter(c => c.type === 'organization').map((channel, index) => (
                      <ChannelCard key={channel.id} channel={channel} index={index} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "rooms" && (
              <motion.div
                key="rooms"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-4"
              >
                {projectRooms.map((room, index) => (
                  <ProjectRoomCard key={room.id} room={room} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
      {showInviteModal && (
        <InviteConnectionModal onClose={() => setShowInviteModal(false)} />
      )}

      {showPostComposer && (
        <PostComposer onClose={() => setShowPostComposer(false)} />
      )}
    </div>
  );
}
