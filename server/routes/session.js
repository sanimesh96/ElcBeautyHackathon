const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Session = require("../models/Session");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// ROUTE 1 : get all session of an exisitng user: Login required
router.get("/fetchallsessions", fetchUser, async (req, res) => {
  try {
    const session = await Session.find({user: req.user.id});
    res.json(session);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

router.get("/fetchallsessionsmentee", fetchUser, async (req, res) => {
  try {
    const session = await Session.find({});
    res.json(session);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

// ROUTE 2 : Add a new session: Login required
router.post(
  "/addsession",
  body("title", "Enter a valid title").isLength({ min: 3 }),
  body("subject", "Description must be atleast 1 characters").isLength({
    min: 1,
  }),
  body("topic", "Enter a valid title").isLength({ min: 3 }),
  body("classenrolled", "Enter a valid title").isLength({ min: 1 }),
  body("date", "Enter a valid title").isLength({ min: 1 }),
  body("time", "Enter a valid title").isLength({ min: 1 }),
  body("description", "Enter a valid title").isLength({ min: 1 }),
  body("link", "Enter a valid title").isLength({ min: 1 }),
  body("creator", "Enter a valid title").isLength({ min: 1 }),

  fetchUser,
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const {
        creator,
        title,
        subject,
        topic,
        classenrolled,
        date,
        time,
        description,
        link,
      } = req.body;
      const session = new Session({
        creator,
        title,
        subject,
        topic,
        classenrolled,
        date,
        time,
        description,
        link,
        user: req.user.id,
      });
      const savedSession = await session.save();
      res.json(savedSession);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Oops internal server error occured");
    }
  }
);

// ROUTE 3 : update existing session of a user: Login required
router.put("/updatesession/:id", fetchUser, async (req, res) => {
  try {
    const {
      creator,
      title,
      subject,
      topic,
      classenrolled,
      date,
      time,
      description,
      link,
    } = req.body;
    //create new session object
    let newsession = {};
    if (creator) {
      newsession.creator = creator;
    }
    if (title) {
      newsession.title = title;
    }
    if (subject) {
      newsession.subject = subject;
    }
    if (topic) {
      newsession.topic = topic;
    }
    if (classenrolled) {
      newsession.classenrolled = classenrolled;
    }
    if (date) {
      newsession.date = date;
    }
    if (time) {
      newsession.time = time;
    }
    if (link) {
      newsession.link = link;
    }
    if (description) {
      newsession.description = description;
    }
    //find the session to be updated and then update it
    let session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).send("Such Session not found");
    }
    if (session.user.toString() !== req.user.id) {
      return res.status(401).send("Permission not granted");
    }
    session = await Session.findByIdAndUpdate(
      req.params.id,
      { $set: newsession },
      { new: true }
    );
    res.json({ session });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

// ROUTE 4 : delete existing session of a user: Login required
router.delete("/deletesession/:id", fetchUser, async (req, res) => {
  try {
    //find the session to be deleted and then delete it
    let session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).send("Such Session not found");
    }
    //if selected session is the loin users session
    if (session.user.toString() !== req.user.id) {
      return res.status(401).send("Permission not granted");
    }
    session = await Session.findByIdAndDelete(req.params.id);
    res.send("Success!! Session deleted succesfully");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

// ROUTE 5 : enroll sessions
router.post("/enrollsession", fetchUser, async (req, res) => {
  try {
    let user = await User.findById(req.user.id);
    const { title, description, date, time, creator,link } = req.body;
    await user.session.push({
      title,
      description,
      date,
      time,
      creator,
      link
    });
    const saveuser = await user.save();
    res.json(saveuser);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

// ROUTE 5 : fetch all sessions
router.get("/enrolledsessions", fetchUser, async (req, res) => {
  try {
    const session = await Session.find({ user: req.user.id });
    res.json(session);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});
// ROUTE 6 : get all sessions of an exisitng mentee: Login required
router.get("/fetchmenteeSesion", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.session);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

module.exports = router;
