const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model('Order', schema);
