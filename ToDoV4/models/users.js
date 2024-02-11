const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model('usersCounter', counterSchema);

const usersSchema = new mongoose.Schema({
  id: Number,
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
  this.id = counter.seq;
});

const Users = mongoose.model('users', usersSchema);

module.exports = Users;
