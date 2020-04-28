const Order = require('../models');
const mq = require('../mq');
const debug = require('../helpers/debug');

// save order to db
exports.saveOrder = async (data) => {
  try {
    const order = new Order(data);
    await order.save();

    await mq.sendOrderToQueue('emails', JSON.stringify(order));
  } catch (err) {
    console.log(err);
  }
};
