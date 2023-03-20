const mongoose = require("mongoose");
const { Schema } = mongoose;

const AppprovalSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref:'user'
  },
  instituteId : {
    type: Schema.Types.ObjectId,
    ref:'user'
  },
  batch : {
    type : String 
  },
  status : {
    type : String,
    default : "Pending"
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("approval", AppprovalSchema);

