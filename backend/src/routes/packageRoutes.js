const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');


const {
  createPackage,
  getPackage,
  updateStatus
} = require('../controllers/packageController');

 
router.post('/packages',verifyAdmin, createPackage);
router.get('/packages/:trackingNumber', getPackage);
router.put('/packages/:trackingNumber/status', updateStatus);

module.exports = router;
