const mongoose = require("mongoose");

const todoschema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  completed: {
    type:Boolean,
    default:false,
  }
});
module.exports = mongoose.model("Todo", todoschema);
