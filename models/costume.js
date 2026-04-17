const mongoose = require("mongoose");

const costumeSchema = mongoose.Schema({
  costume_type: String,
  size: String,
  cost: {
    type: Number,
    min: 0,
    max: 1000
  }
});

module.exports = mongoose.model("Costume", costumeSchema);