const aqmp = require('amqplib');
const statusApi = require('../helpers/api');
const orderController = require('./orderController');


exports.orders = async (req, res) => {
  try {
    const conn = await aqmp.connect(process.env.CLOUDAMQP_URL);
    const channel = await conn.createChannel();
    const q = await channel.assertQueue('orders', { durable: true });
    channel.prefetch(1);

    channel.consume(q.queue, (message) => {
      if (message !== null) {
        const data = JSON.parse(message.content);
        orderController.saveOrder(data);
      }
    }, { noAck: false });

    return res.status(statusApi.status.success).send(statusApi.successMessage);
  } catch (err) {
    console.log(err)
    return res.status(statusApi.status.error).send(statusApi.errorMessage);
  }
};
