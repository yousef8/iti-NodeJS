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
}, {
  timestamps: true,

  toJSON: {
    transform: (doc, ret) => {
      delete ret.__v;
      delete ret.password;
      return ret;
    },
  },
});

usersSchema.pre('save', async function preSaveHook() {
  console.log('save hook triggered');
  if (this.isNew) {
    console.log('creating new user');
    const counter = await Counter.findOneAndUpdate({ name: 'usersCounter' }, { $inc: { seq: 1 } }, { upsert: true, new: true }).exec();
    this._id = counter.seq;

    this.password = await bcrypt.hash(this.password, 10);
    return;
  }

  if (this.isModified('password')) {
    console.log('password changed');
    this.password = await bcrypt.hash(this.password, 10);
  }
});

usersSchema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password.toString(), this.password);
  return valid;
};

const Users = mongoose.model('users', usersSchema);

module.exports = Users;
