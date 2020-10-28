const mongoose = require("mongoose");
const { use } = require("../routes");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname:String,
    birthdate:Date,
    gender:String,
    email:String,
    photo:String,
    questions:[String],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;