const mongoose = require("mongoose");
const { Schema } = mongoose;

const SessionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref:'user'
  },
  creator: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    default: "General",
  },
  classenrolled: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link:{
    type:String,
    required:true,
  }
});
module.exports = mongoose.model("session", SessionSchema);