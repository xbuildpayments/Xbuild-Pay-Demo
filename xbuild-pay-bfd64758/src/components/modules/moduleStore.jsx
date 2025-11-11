import { Bus } from "@/components/utils/bus";

export const ModuleStore = {
  modules: [
    {
      key: "smart_escrow",
      name: "Smart Escrow Automation",
      description: "Milestone escrow, holdbacks, and conditional releases on XRPL",
      status: "enabled",
      icon: "Wallet",
      color: "blue",
      category: "core",
      dependsOn: [],
      impacts: ["flow", "ledger", "disputes", "insurance"],
      actions: ["Configure", "Pause All", "Resume All"],
      settings: {
        defaultHoldback: 10,
        partialReleaseEnabled: true
      }
    },
    {
      key: "insurance_bonding",
      name: "Insurance & Bonding",
      description: "Policy checks, claim triggers, and escrow freeze/resume",
      status: "enabled",
      icon: "Shield",
      color: "green",
      category: "core",
      dependsOn: ["smart_escrow", "oracles"],
      impacts: ["insurance", "ledger", "flow", "disputes"],
      actions: ["Configure", "Simulate Claim"],
      settings: {
        autoFreeze: true,
        autoApproveThreshold: 50000
      }
    },
    {
      key: "oracles",
      name: "Compliance Oracles",
      description: "License, COI, progress, and risk validation signals",
      status: "enabled",
      icon: "CheckCircle2",
      color: "yellow",
      category: "core",
      dependsOn: [],
      impacts: ["flow", "insurance", "disputes"],
      actions: ["Configure"],
      settings: {
        licenseCheck: true,
        coiCheck: true,
        progressCheck: true
      }
    },
    {
      key: "trustscore",
      name: "TrustScore Analytics",
      description: "Composite risk signal from milestones, disputes, peer reviews",
      status: "available",
      icon: "Award",
      color: "purple",
      category: "core",
      dependsOn: [],
      impacts: ["dashboard", "insurance", "disputes"],
      actions: ["Enable", "View Factors"],
      settings: {
        confidence: 0.92
      }
    },
    {
      key: "multisig",
      name: "Multi-Signature Approvals",
      description: "Require multiple approvers for high-value releases",
      status: "available",
      icon: "Lock",
      color: "orange",
      category: "core",
      dependsOn: [],
      impacts: ["flow", "ledger"],
      actions: ["Enable", "Assign Approvers"],
      settings: {
        thresholdUSD: 100000,
        approvers: ["Owner", "Bank", "PM"]
      }
    },
    {
      key: "notifications",
      name: "Instant Notifications",
      description: "Real-time alerts for payments, disputes, and updates",
      status: "enabled",
      icon: "Bell",
      color: "blue",
      category: "core",
      dependsOn: [],
      impacts: ["dashboard", "flow", "ledger", "disputes", "insurance"],
      actions: ["Configure", "Disable"],
      settings: {
        email: true,
        sms: false,
        inApp: true
      }
    },
    {
      key: "api_integration",
      name: "API Integration",
      description: "Connect to Procore/Autodesk, export webhooks",
      status: "available",
      icon: "Zap",
      color: "yellow",
      category: "core",
      dependsOn: [],
      impacts: ["ledger", "flow"],
      actions: ["Enable", "View Keys"],
      settings: {
        apiKey: "xbp_demo_" + Math.random().toString(36).substring(7),
        webhookUrl: "https://api.xbuildpay.com/webhooks/demo"
      }
    },
    {
      key: "compliance_reporting",
      name: "Compliance Tracking",
      description: "Automated compliance monitoring and regulatory reporting",
      status: "soon",
      icon: "FileText",
      color: "gray",
      category: "core",
      dependsOn: ["oracles"],
      impacts: ["dashboard", "disputes"],
      actions: [],
      settings: {}
    },
    {
      key: "lending",
      name: "Working Capital / Draw Lending",
      description: "Pre-fund milestones using risk-based pricing",
      status: "available",
      icon: "DollarSign",
      color: "green",
      category: "core",
      dependsOn: ["trustscore", "oracles"],
      impacts: ["dashboard", "flow", "ledger"],
      actions: ["Enable", "Simulate Offer"],
      settings: {
        maxAdvance: 80,
        baseAPR: 8.5,
        riskMultiplier: 1.2
      }
    },
    // Intelligence & Automation
    {
      key: "echo",
      name: "Echo — Ambient Voice & Recall Intelligence",
      description: "Ambient voice capture, transcripts, recall",
      status: "enabled",
      icon: "Mic",
      color: "purple",
      category: "intelligence",
      dependsOn: [],
      impacts: ["flow", "disputes", "insurance"],
      actions: ["Configure", "Simulate"],
      settings: {
        autoApprove: true,
        confidenceThreshold: 0.85
      }
    },
    {
      key: "ciim",
      name: "CIIM — Correspondence Intelligence Integration",
      description: "Email/RFI parsing → contract triggers & audit",
      status: "enabled",
      icon: "Mail",
      color: "blue",
      category: "intelligence",
      dependsOn: [],
      impacts: ["flow", "disputes", "insurance"],
      actions: ["Connect", "Run Classifier"],
      settings: {
        emailConnected: true,
        autoClassify: true
      }
    },
    {
      key: "omniscan",
      name: "OmniScan — Subsurface & Trade Validation",
      description: "GPR/Ultrasonic/IR validation → escrow logic",
      status: "available",
      icon: "Scan",
      color: "green",
      category: "intelligence",
      dependsOn: [],
      impacts: ["flow", "insurance"],
      actions: ["Enable", "View Scan", "Score Milestone"],
      settings: {
        releaseThreshold: 0.9,
        partialThreshold: 0.6
      }
    }
  ],

  getModule(key) {
    return this.modules.find(m => m.key === key);
  },

  updateStatus(key, status) {
    const module = this.getModule(key);
    if (module) {
      module.status = status;
      Bus.emit("modules:changed", { key, status, settings: module.settings });
      
      // Emit specific events for demo wiring
      if (key === "trustscore" && status === "enabled") {
        Bus.emit("dashboard:trustscore:on");
      }
      if (key === "multisig" && status === "enabled") {
        Bus.emit("flow:multisig:on", module.settings);
      }
      if (key === "lending" && status === "enabled") {
        Bus.emit("dashboard:lending:on", module.settings);
      }
      if (key === "api_integration" && status === "enabled") {
        Bus.emit("ledger:api:on");
      }
      if (key === "notifications" && status === "disabled") {
        Bus.emit("notifications:disabled");
      }
      if (key === "omniscan" && status === "enabled") {
        Bus.emit("flow:omniscan:on");
      }
    }
  },

  updateSettings(key, settings) {
    const module = this.getModule(key);
    if (module) {
      module.settings = { ...module.settings, ...settings };
      Bus.emit("modules:changed", { key, status: module.status, settings: module.settings });
      
      // Re-emit specific events with updated settings
      if (key === "multisig" && module.status === "enabled") {
        Bus.emit("flow:multisig:on", module.settings);
      }
      if (key === "lending" && module.status === "enabled") {
        Bus.emit("dashboard:lending:on", module.settings);
      }
    }
  },

  checkDependencies(key) {
    const module = this.getModule(key);
    if (!module) return { met: false, missing: [] };
    
    const missing = module.dependsOn.filter(depKey => {
      const dep = this.getModule(depKey);
      return !dep || dep.status !== "enabled";
    });
    
    return { met: missing.length === 0, missing };
  },

  getStats() {
    return {
      enabled: this.modules.filter(m => m.status === "enabled").length,
      available: this.modules.filter(m => m.status === "available").length,
      soon: this.modules.filter(m => m.status === "soon").length
    };
  },

  getModulesByCategory(category) {
    return this.modules.filter(m => m.category === category);
  }
};

// Dev tools exposure
if (typeof window !== 'undefined') {
  window.__xbpModules = ModuleStore;
}