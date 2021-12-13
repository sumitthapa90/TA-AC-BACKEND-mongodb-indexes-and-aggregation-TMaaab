var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userScheam = new Schema({
  name: { type: String },
  username: { type: String },
  email: { type: String, unique: true, required: true },
  address: {
    city: String,
    state: String,
    country: String,
    pin: Number,
  },
});

userScheam.index({ username: 1 }, { unique: true });
userScheam.index({ email: 1 });

userScheam.index({ state: 1, country: 1 });

var User = mongoose.model("User", userScheam);

module.exports = User;
