const { Schema, model } = require('mongoose');

const AuthSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = model('authentication', AuthSchema);
