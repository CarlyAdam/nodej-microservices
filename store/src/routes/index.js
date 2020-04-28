const express = require('express');

const router = express.Router();
const storeController = require('../controllers');

// get orders
router.get('/',storeController.orders);



module.exports = router;
