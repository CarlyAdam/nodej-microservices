const aqmp = require('amqplib');
const emailController = require('./emailController');
const statusApi = require('../helpers/api');

exports.checkEnqueue = async (req, res) => {
  try {
    const conn = await aqmp.connect(process.env.CLOUDAMQP_URL);
    const channel = await conn.createChannel();

    const q = await channel.assertQueue('emails', { durable: true });
    channel.prefetch(1);

    channel.consume(q.queue, (message) => {
      if (message !== null) {
        const data = JSON.parse(message.content);
        emailController.sendEmail(data, res);
      }
    }, { noAck: false });

    return res.status(statusApi.status.success).send(statusApi.successMessage);
  } catch (err) {
    return res.status(statusApi.status.error).send(statusApi.errorMessage);
  }
};
