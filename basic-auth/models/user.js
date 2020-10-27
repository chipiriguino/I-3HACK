const mongoose = require("mongoose");
const { use } = require("../routes");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullname: String,
    birthdate: Date,
    genre:String,
    mail:String,
    photo:String,
    question1:String,
    question2:String,
    question3:String,
    question4:String,
    question5:String,
    question6:String,
    question7:String,
    question8:String,
    question9:String,
    question10:String,
    question11:String,
    question12:String,
    question13:String,
    question14:String,
    question15:String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema)

module.exports = User;