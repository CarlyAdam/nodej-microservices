const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const orderController = require('../controllers');

// new order request
router.post('/', [
  check('name').isString(),
  check('email').isEmail(),
], orderController.addOrder);


module.exports = router;
orts = router;s = router;