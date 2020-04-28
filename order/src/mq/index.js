const aqmp = require('amqplib');


exports.sendOrderToQueue = async (queueName, data) => {
  try {
    const conn = await aqmp.connect(process.env.CLOUDAMQP_URL);
    const ch = await conn.createConfirmChannel(conn);

    ch.assertQueue(queueName, { durable: true });
    ch.sendToQueue(queueName, Buffer.from(data), { persistent: true });

    const result = await ch.waitForConfirms();
    return result;
  } catch (err) {
    return err;
  }
};
