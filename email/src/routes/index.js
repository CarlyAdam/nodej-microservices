const express = require('express');

const router = express.Router();
const controller = require('../controllers');

// check enqueue and send emails
router.get('/', controller.checkEnqueue);


module.exports = router;
