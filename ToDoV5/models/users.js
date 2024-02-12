const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model('usersCounter', counterSchema);

const usersSchema = new mongoose.Schema({
  _id: Number,
  username: {
    type: String,
    required: true,
    unique: true,
    min: 8,
  },
  firstName: {
    type: String,
    required: true,
    min: 3,
    max: 15,
  },

  lastName: {
    type: String,
    required: true,
    min: 3,
    max: 15,
  },

  dob: {
    type: Date,
  },

  password: {
    type: String,
    required: true,
    min: 8,
  },
}, { timestamps: true });

usersSchema.pre('save', async function preSaveHook() {
  const counter = await Counter.findOneAndUpdate({ name: 'usersCounter' }, { $inc: { seq: 1 } }, { upsert: true, new: true }).exec();
  this._id = counter.seq;

  this.password = await bcrypt.hash(this.password, 10);
});

usersSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

const Users = mongoose.model('users', usersSchema);

module.exports = Users;
