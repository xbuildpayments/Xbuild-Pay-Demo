export const DemoStore = {
  ledger: [],
  totals: {
    paidUSD: 0,
    paidXRP: 0,
    txCount: 0
  },
  
  nextHash() {
    const stubs = ["7C1A…9F2", "B4E8…2D0", "A93F…77C", "5FD2…0AE", "9B11…4C7"];
    return stubs[Math.floor(Math.random() * stubs.length)];
  },
  
  addLedgerEntry(entry) {
    this.ledger.unshift(entry);
    this.totals.paidUSD += entry.amountUSD;
    this.totals.paidXRP += entry.amountXRP;
    this.totals.txCount += 1;
  },
  
  initialize() {
    // Initialize with some demo data if empty
    if (this.ledger.length === 0) {
      const initialEntries = [
        {
          id: "1",
          ts: "2025-01-15T14:47:00",
          project: "Downtown Plaza Construction",
          milestone: "Level 2 Electrical Install",
          direction: "Escrow→Contractor",
          amountUSD: 45000,
          amountXRP: 86538,
          status: "Completed",
          hash: "7C1A…9F2",
          recipient: "GC Construction"
        },
        {
          id: "2",
          ts: "2025-01-14T11:20:00",
          project: "Harbor View Residential Complex",
          milestone: "HVAC Installation Complete",
          direction: "Escrow→Contractor",
          amountUSD: 55000,
          amountXRP: 105769,
          status: "Completed",
          hash: "B4E8…2D0",
          recipient: "BuildTech LLC"
        },
        {
          id: "3",
          ts: "2025-01-13T09:15:00",
          project: "Tech Campus Phase 2",
          milestone: "Foundation Waterproofing",
          direction: "Escrow→Contractor",
          amountUSD: 32000,
          amountXRP: 61538,
          status: "Completed",
          hash: "A93F…77C",
          recipient: "ElectroPro"
        }
      ];
      
      this.ledger = [...initialEntries];
      this.totals.paidUSD = initialEntries.reduce((sum, e) => sum + e.amountUSD, 0);
      this.totals.paidXRP = initialEntries.reduce((sum, e) => sum + e.amountXRP, 0);
      this.totals.txCount = initialEntries.length;
    }
  }
};

// Initialize on load
DemoStore.initialize();

// Dev tools exposure
if (typeof window !== 'undefined') {
  window.__xbpDemo = window.__xbpDemo || {};
  window.__xbpDemo.DemoStore = DemoStore;
}