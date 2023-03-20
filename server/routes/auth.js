const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const env = require("dotenv/config");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


const JWT_SECRET = "secretkeyforsession";

// AUTH ROUTES :
// Route1: signup
router.post("/signup", async (req, res) => {
  let success = false;
  try {
    //check whteher user with this email exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({
        success,
        error: "Please give unique email value,  as email already registered",
      });
    }
    //hash password
    var salt = await bcrypt.genSalt(10);
    console.log(req.body.password);
    var secPass = await bcrypt.hash(req.body.password, salt);
    //if no user exists, then create new user
    if (req.body.role != "Institution")
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        phoneNumber: req.body.phoneNumber
      });
    else{
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        phoneNumber: req.body.phoneNumber
      });
    }

    const data = {
      session: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success,
      error: error.message,
    });
  }
});

//Route2: login: authenticate
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  async (req, res) => {
    let success = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //check whether user with this email exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).send({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const data = {
        session: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken, user });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Oops internal server error occured");
    }
  }
);

// ROUTE3: Get logged in user details: login required
router.get("/getUser", fetchUser, async (req, res) => {
  try {
    const user = '';
    user = await User.findById(req.user.id)
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

// ROUTE34: Get  details of all mentors
router.post("/getAllusers", fetchUser, async (req, res) => {
  try {
    console.log(req)
    const data = await User.find({ role: req.body.filter });
    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});




// ROUTE5: Get particular user details: login required
router.get("/getDetails/:id", fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

router.post("/updateEducationDetails", fetchUser, async(req,res) => {
  try{
    let allowed = await User.findOne({_id : req.user.id})
    console.log(allowed.role)
    if(allowed.role == 'Alumni'){
      console.log("asila")

      console.log(req.body)
      let userDetails = await User.updateOne({_id : req.user.id},{
        $set : {
          // highSchool : req.body.highschool,
          // university : req.body.university,
          // secondaryHighSchool : req.body.secondaryHighSchool,
          work : req.body.work,
          company : req.body.company,
          experience : req.body.experience,
          highSchoolBatch : req.body.highSchoolBatch,
          universityBatch : req.body.universityBatch,
          secondaryHighSchoolBatch : req.body.secondaryHighSchoolBatch,
        }
      })


      let approvalDetails1 = await Approval.create({
        userId : req.user.id,
        instituteId : req.body.highschool,
        batch : req.body.highSchoolBatch
      })
      let approvalDetails2 = await Approval.create({
        userId : req.user.id,
        instituteId :  req.body.secondaryHighSchool,
        batch : req.body.secondaryHighSchoolBatch
      })
      let approvalDetails3 = await Approval.create({
        userId : req.user.id,
        instituteId : req.body.university,
        batch : req.body.universityBatch
      })

      let success = true;
      res.status(200).json({success,userDetails})
    }
  }catch(error){
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
})

router.get("/getAllInstitutions", fetchUser, async(req,res) => {
  try{  
    let instiDetails = await User.find({role : "Institution"})
    res.send(instiDetails)
  }catch(error){
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
})

router.get("/getAllAllergies", fetchUser, async(req,res) => {
  try{
    let user = await User.findById(req.user.id)
    console.log(user)
    res.status(200).json({user})

  }catch(error){
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
})

router.post('/updateAllergies', fetchUser, async(req,res) => {
  try{
    console.log(req.body.allergies)
    let details = await User.updateOne({_id: req.user.id}, {
      $set : {
        allergies : req.body.allergies
      }
    })
    // const user = await User.findById(req.user.id);
    // const { allergies } = req.body;

    // const newObj = {
    //   "allergies": allergies,
    // };
    
    // await user.allergies.push(newObj);
    // const savedAllergies = await user.save();
    res.status(200).json({details})

  }catch(error){
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
})

module.exports = router;
