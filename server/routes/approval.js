const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Approval = require("../models/Approval");
const User = require("../models/User");

router.get("/getAllApprovalRequest/", fetchUser, async (req,res) => {
    try{
        let details = await Approval.find({instituteId : req.user.id}).populate(['instituteId','userId'])
        res.send(details);
    }catch(error){
        console.log(error.message);
        res.status(500).send("Oops internal server error occured");
    }
})

router.put("/acceptApproval/:id", fetchUser ,async(req,res) => {
    try{
        let allowed = await User.findOne({_id : req.user.id})
        let success = false;
        if(allowed.role === "Institution"){

            let details = await Approval.updateOne({_id : req.params.id },{
                $set : {
                    status : "Accepted"
                }
            })

            let x = await Approval.findOne({_id : req.params.id})
            
            let addToInstiDetails = await User.updateOne({_id: allowed._id},{
                $addToSet : {
                    registeredAlumni : x.userId
                }
            })

            let updateInfo = {}
            updateInfo[allowed.instiType.toLowerCase()] = x.instituteId
            console.log(updateInfo)
            let updateUserDetails = await User.updateOne({_id : x.userId},{
                $set : updateInfo
            })

            success = true;
            res.json({details,success})
        }
        
    }catch(error){
        console.log(error.message);
        res.status(500).send("Oops internal server error occured");
    }
})

router.put("/rejectApproval/:id", fetchUser ,async(req,res) => {
    try{
        let allowed = await User.findOne({_id : req.user.id})
        console.log(allowed)
        let success = false
        if(allowed.role === "Institution"){
            let details = await Approval.updateOne({_id : req.params.id },{
                $set : {
                    status : "Rejected"
                }
            })
            success = true;
            res.json({details,success})
            console.log(details)
        }
        
    }catch(error){
        console.log(error.message);
        res.status(500).send("Oops internal server error occured");
    }
})


module.exports = router;
