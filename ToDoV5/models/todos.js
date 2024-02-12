const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model('counter', counterSchema);

const todosSchema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
    min: 5,
    max: 20,
  },
  status: {
    type: String,
    required: false,
    enum: ['to-do', 'in-progress', 'done'],
    default: 'to-do',
  },

  tags: {
    type: [String],
    required: false,
    max: 10,
  },
  userId: {
    type: Number,
    ref: 'users',
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.__v = undefined;
      return ret;
    },
  },
});

todosSchema.pre('save', async function preSaveHook() {
  const counter = await Counter.findOneAndUpdate({ name: 'todoCounter' }, { $inc: { seq: 1 } }, { upsert: true, new: true }).exec();
  this._id = counter.seq;
});

const Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;
