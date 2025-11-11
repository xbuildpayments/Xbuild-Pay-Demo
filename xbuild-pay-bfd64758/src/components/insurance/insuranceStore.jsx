export const InsuranceStore = {
  policies: [
    {
      id: "GL-2024-8847",
      type: "General Liability",
      provider: "BuildSafe Insurance Co.",
      policyNumber: "GL-2024-8847",
      project: "Downtown Plaza Construction",
      coverage: 2000000,
      premium: 45000,
      deductible: 5000,
      delayThresholdDays: 7,
      autoFreeze: true,
      status: "Active",
      expiry: "2024-12-31"
    },
    {
      id: "WC-2024-3321",
      type: "Workers Compensation",
      provider: "ConstructGuard",
      policyNumber: "WC-2024-3321",
      project: "Harbor View Residential Complex",
      coverage: 1500000,
      premium: 38000,
      deductible: 2500,
      delayThresholdDays: 3,
      autoFreeze: false,
      status: "Active",
      expiry: "2024-11-15"
    },
    {
      id: "BR-2024-5569",
      type: "Builder's Risk",
      provider: "ProjectShield Insurance",
      policyNumber: "BR-2024-5569",
      project: "Tech Campus Phase 2",
      coverage: 5000000,
      premium: 72000,
      deductible: 10000,
      delayThresholdDays: 5,
      autoFreeze: true,
      status: "ExpiringSoon",
      expiry: "2024-02-28"
    }
  ],
  
  incidents: [
    {
      id: "INC-457",
      project: "Harbor View Residential Complex",
      time: "2025-10-28T14:47:00Z",
      type: "Injury",
      evidence: 3,
      geo: "32.715,-117.161",
      delayDays: 4,
      severity: "medium",
      resolved: false
    }
  ],
  
  claims: [
    {
      id: "CLM-9012",
      policyId: "WC-2024-3321",
      incidentId: "INC-457",
      status: "Pending Underwriter",
      payoutEstimate: 28000,
      auditHashes: 2,
      escrowFrozen: true,
      timeline: [
        { step: "Incident Logged", timestamp: "2025-10-28T14:47:00Z", hash: "A1B2...C3D4" },
        { step: "AI Classified", timestamp: "2025-10-28T14:48:30Z", hash: "E5F6...G7H8" }
      ]
    }
  ],
  
  trustScore: {
    "Harbor View Residential Complex": 87,
    "Downtown Plaza Construction": 92,
    "Tech Campus Phase 2": 85
  },
  
  addIncident(incident) {
    this.incidents.push({
      id: `INC-${Math.floor(Math.random() * 1000)}`,
      ...incident,
      time: new Date().toISOString(),
      resolved: false
    });
  },
  
  createClaim(policyId, incidentId, payoutEstimate) {
    const claim = {
      id: `CLM-${Math.floor(Math.random() * 10000)}`,
      policyId,
      incidentId,
      status: "Pending Underwriter",
      payoutEstimate,
      auditHashes: 1,
      escrowFrozen: this.policies.find(p => p.id === policyId)?.autoFreeze || false,
      timeline: [
        { step: "Incident Logged", timestamp: new Date().toISOString(), hash: this.generateHash() },
        { step: "AI Classified", timestamp: new Date().toISOString(), hash: this.generateHash() }
      ]
    };
    this.claims.push(claim);
    return claim;
  },
  
  updateClaimStatus(claimId, status) {
    const claim = this.claims.find(c => c.id === claimId);
    if (claim) {
      claim.status = status;
      claim.timeline.push({
        step: status,
        timestamp: new Date().toISOString(),
        hash: this.generateHash()
      });
    }
  },
  
  generateHash() {
    const chars = '0123456789ABCDEF';
    let hash = '';
    for (let i = 0; i < 4; i++) {
      hash += chars[Math.floor(Math.random() * 16)];
    }
    hash += '...';
    for (let i = 0; i < 4; i++) {
      hash += chars[Math.floor(Math.random() * 16)];
    }
    return hash;
  },
  
  getUnresolvedIncidents() {
    return this.incidents.filter(i => !i.resolved);
  }
};

// Dev tools exposure
if (typeof window !== 'undefined') {
  window.__xbpInsurance = InsuranceStore;
}