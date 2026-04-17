const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const accountSchema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  }
});

accountSchema.plugin(passportLocalMongoose.default || passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);
