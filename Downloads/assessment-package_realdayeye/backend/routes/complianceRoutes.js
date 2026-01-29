const express = require('express');
const router = express.Router();
const multer = require('multer');

const complianceController = require('../controllers/complianceController');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/extract-texas-requirements', upload.single('file'), complianceController.extractTexasRequirements);

module.exports = router;
