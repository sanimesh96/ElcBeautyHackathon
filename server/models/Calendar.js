const mongoose = require("mongoose");
const { Schema } = mongoose;

const CalendarSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  notify: {
    type: Schema.Types.ObjectId,
    ref: "notification",
  },
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  mentor: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("calendar", CalendarSchema);
