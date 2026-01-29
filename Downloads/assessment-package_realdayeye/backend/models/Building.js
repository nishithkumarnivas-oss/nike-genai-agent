/**
 * Minimal mock Building model used for local testing.
 */

class Building {
  constructor(data) {
    this._id = data._id || 'sample-id';
    this.name = data.name || 'Sample Building';
    // Allow passing units; otherwise generate a richer mock dataset
    this.units = Array.isArray(data.units) && data.units.length ? data.units : Building._generateMockUnits();
  }

  async executeBuildingLevelFormula() {
    const totalUnits = this.units.length;

    // Compute AMI buckets from units mock property `amiBand`
    const counts = { 80: 0, 60: 0, 30: 0 };
    for (const u of this.units) {
      if (u.amiBand && counts[u.amiBand] !== undefined) counts[u.amiBand]++;
    }

    const hierarchicalDistribution = {
      amiBuckets: [
        { percentage: '80%', numberOfUnits: counts[80] },
        { percentage: '60%', numberOfUnits: counts[60] },
        { percentage: '30%', numberOfUnits: counts[30] },
      ],
    };

    // Map internal units to the unitResults shape expected by services
    const unitResults = this.units.map((u, i) => ({
      unitId: u.unitId || `u${i + 1}`,
      unitNumber: u.unitNumber || i + 1,
      bedrooms: u.bedrooms,
      householdCount: u.householdCount,
      tenantIncome: u.tenantIncome,
      incomeLimit: u.incomeLimit,
      currentRent: u.currentRent,
      maxAllowedRent: u.maxAllowedRent,
    }));

    const amiData = [
      { incomePercentage: 30, householdIncomeLimits: { 1: 20000, 2: 25000, 3: 30000 } },
      { incomePercentage: 60, householdIncomeLimits: { 1: 40000, 2: 45000, 3: 50000 } },
      { incomePercentage: 80, householdIncomeLimits: { 1: 55000, 2: 60000, 3: 65000 } },
    ];

    return {
      totalUnits,
      hierarchicalDistribution,
      unitResults,
      amiData,
    };
  }

  static async findById(id) {
    // Return a building with deterministic mock units for the given id
    return new Building({ _id: id, name: `Building ${id}` });
  }

  // Helper to generate a richer, deterministic mock units array
  static _generateMockUnits() {
    // Create 12 units with a variety of bedrooms, incomes, and AMI bands
    const template = [
      { bedrooms: 1, householdCount: 1, tenantIncome: 18000, incomeLimit: 20000, currentRent: 450, maxAllowedRent: 500, amiBand: 30 },
      { bedrooms: 1, householdCount: 2, tenantIncome: 25000, incomeLimit: 30000, currentRent: 650, maxAllowedRent: 700, amiBand: 60 },
      { bedrooms: 2, householdCount: 3, tenantIncome: 32000, incomeLimit: 40000, currentRent: 900, maxAllowedRent: 1000, amiBand: 80 },
      { bedrooms: 0, householdCount: 1, tenantIncome: 15000, incomeLimit: 18000, currentRent: 350, maxAllowedRent: 400, amiBand: 30 },
      { bedrooms: 2, householdCount: 4, tenantIncome: 45000, incomeLimit: 48000, currentRent: 1100, maxAllowedRent: 1200, amiBand: 80 },
      { bedrooms: 3, householdCount: 5, tenantIncome: 60000, incomeLimit: 65000, currentRent: 1500, maxAllowedRent: 1600, amiBand: 80 },
      { bedrooms: 1, householdCount: 2, tenantIncome: 27000, incomeLimit: 30000, currentRent: 700, maxAllowedRent: 750, amiBand: 60 },
      { bedrooms: 2, householdCount: 3, tenantIncome: 38000, incomeLimit: 42000, currentRent: 950, maxAllowedRent: 980, amiBand: 80 },
      { bedrooms: 1, householdCount: 1, tenantIncome: 22000, incomeLimit: 26000, currentRent: 600, maxAllowedRent: 650, amiBand: 60 },
      { bedrooms: 0, householdCount: 1, tenantIncome: 16000, incomeLimit: 18000, currentRent: 400, maxAllowedRent: 430, amiBand: 30 },
      { bedrooms: 2, householdCount: 3, tenantIncome: 34000, incomeLimit: 38000, currentRent: 980, maxAllowedRent: 1020, amiBand: 80 },
      { bedrooms: 1, householdCount: 2, tenantIncome: 29000, incomeLimit: 32000, currentRent: 720, maxAllowedRent: 760, amiBand: 60 },
    ];

    return template.map((t, i) => ({ unitId: `u${i + 1}`, unitNumber: i + 1, ...t }));
  }
}

module.exports = Building;
