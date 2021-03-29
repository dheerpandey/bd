const express = require('express')

const { batchController } = require('../controllers')

const router = express.Router() 

router.post('/send-batch-processing-request', batchController.takeNewRequest);
router.get('/currentProcessingstate', batchController.currentProcessingstate);
router.get('/compute', batchController.compute);

module.exports = router