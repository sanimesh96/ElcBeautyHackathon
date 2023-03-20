const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Feed = require("../models/Feed");

router.post("/createFeed", fetchUser ,async(req,res) => {
    try{
        let success = false;
        console.log((req.body))
        let feedDetails = await Feed.create({
            userId : req.user.id,
            description : req.body
          });

            success = true;
            res.json({ success, feedDetails });
    }catch(error){
        console.log(error.message);
        res.status(500).send("Oops internal server error occured");
    }
})

router.get("/getAllFeed",fetchUser, async(req,res) => {
    try{
        let success = false;
        let feedDetails = await Feed.find()

            success = true;
            res.json({ success, feedDetails });
    }catch(error){
        console.log(error.message);
        res.status(500).send("Oops internal server error occured");
    }
})



module.exports = router;
