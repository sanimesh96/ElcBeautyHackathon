const mongoose = require("mongoose");
const { Schema } = mongoose;

const InstitutionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  instiType: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  pincode: {
    type: String,
  },
  img: {
    type: String,
  },

  registeredAlumni : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
  }],
  
});
const Institution = new mongoose.model("institution", InstitutionSchema);

Institution.createIndexes();
module.exports = Institution;
