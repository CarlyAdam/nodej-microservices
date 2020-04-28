const send = require('gmail-send');
const debug = require('../helpers/debug');

exports.sendEmail = async (data) => {
  try {
    send({
      user: process.env.APP_EMAIL,
      pass: process.env.APP_EMAIL_PASSWORD,
      to: data.email,
      subject: 'translation status',
      text: `Hello ${data.name}, your order is being processed.`,
    });

    await send();
  } catch (err) {
    debug(err);
  }
};
