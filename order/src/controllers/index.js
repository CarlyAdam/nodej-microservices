const { validationResult } = require('express-validator');
const Order = require('../models');
const statusApi = require('../helpers/api');
const mq = require('../mq');

// add order request to enqueue
exports.addOrder = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const order = new Order(req.body);
    await mq.sendOrderToQueue('orders', JSON.stringify(order));

    return res.status(statusApi.status.success).send(statusApi.successMessage);
  } catch (err) {
    return res.status(statusApi.status.error).send(statusApi.errorMessage);
  }
};
