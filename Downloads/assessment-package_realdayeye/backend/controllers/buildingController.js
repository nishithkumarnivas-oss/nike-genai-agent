const Building = require('../models/Building');

async function validateTexasCompliance(req, res) {
  try {
    const { buildingId } = req.params;
    if (!buildingId) {
      return res.status(400).json({ success: false, message: 'buildingId is required in route parameters' });
    }

    const building = await Building.findById(buildingId);
    if (!building) {
      return res.status(404).json({ success: false, message: 'Building not found' });
    }

    // For now, return the building-level formula result as a simple report
    const formulaResult = await building.executeBuildingLevelFormula();

    return res.status(200).json({ success: true, buildingId: building._id, buildingName: building.name, report: formulaResult });
  } catch (error) {
    console.error('Error in validateTexasCompliance:', error);
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
}

module.exports = {
  validateTexasCompliance,
};


