const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name : String,
  number:Number,
  email: String,
  message:String

},
{
  timestamps: true,
  collection: 'rec'
});

const rec = mongoose.model("rec",itemSchema);
module.exports = {rec}; 