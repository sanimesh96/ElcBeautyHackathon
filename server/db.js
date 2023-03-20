const mongoose = require("mongoose");
// const uri = `mongodb://localhost:27017/SmartOdisha?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false`;
//const uri = "mongodb+srv://sanimesh96:satwik123@cluster0.wt1rqpn.mongodb.net/SmartOdisha?retryWrites=true&w=majority";
const uri = `mongodb+srv://Satwik:Newton%408730@cluster1.6w8tiit.mongodb.net/BeautyHackathon?retryWrites=true&w=majority`


const connectToMongo = () => {
  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("connection success to Mongo");
    }
  );
};
module.exports = connectToMongo;

