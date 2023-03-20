const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeedSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref:'user'
  },
  description : {
    type : Object
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("feed", FeedSchema);

