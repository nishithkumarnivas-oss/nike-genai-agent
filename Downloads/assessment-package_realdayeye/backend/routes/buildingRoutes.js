const express = require('express');
const router = express.Router();

const buildingController = require('../controllers/buildingController');

router.post('/:buildingId/validate-texas-compliance', buildingController.validateTexasCompliance);

module.exports = router;
