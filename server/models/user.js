const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId(), unique: true },
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    password: { type: String, required: true },
    api_token_id: { type: Schema.Types.ObjectId, ref: 'ApiToken' },
    session: {type: String, unique: true }
  });

module.exports = mongoose.model('User', UserSchema);
