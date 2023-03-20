const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Calendar = require("../models/Calendar");
const User = require("../models/User");
const Notification = require("../models/Notification");

// ROUTE 1 : Add a new event when mentor accepts: Login required
router.post("/addevent", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const { title, start, end, createdBy, notiId } = req.body;
    const event = new Calendar({
      title,
      start,
      // end,
      createdBy,
      user: req.user.id,
      notify: notiId,
      mentor: user.name
    });
    const savedEvent = await event.save();
    res.json(savedEvent);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Oops internal server error occured");
  }
});

// ROUTE 2 : get all events of an exisitng user: Login required
router.get("/fetchallevents/:id", fetchUser, async (req, res) => {
  try {
    const events = await Calendar.find({ user: req.params.id });
    res.json(events);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});
// ROUTE 3 : push to notification of mentor: Login required
router.post("/addNotification/:id", fetchUser, async (req, res) => {
  try {
    const { title, start, end, createdBy } = req.body;
    const event = new Notification({
      title,
      start,
      end,
      createdBy,
      user: req.params.id,
    });
    const savedNoti = await event.save();
    res.json(savedNoti);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Oops internal server error occured");
  }
});
// ROUTE 5 : get all event notification of a mentor: Login required
router.get("/fetchallnoti", fetchUser, async (req, res) => {
  try {
    const notification = await Notification.find({ user: req.user.id });
    res.json(notification);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});
// ROUTE 6 : delete notification  of a user: Login required
router.delete("/deleteevent/:id", fetchUser, async (req, res) => {
  try {
    //find the note to be deleted and then delete it
    let notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).send("Such Notification not found");
    }
    //if not users's event
    if (notification.user.toString() !== req.user.id) {
      return res.status(401).send("Permission not granted");
    }
    notification = await Notification.findByIdAndDelete(req.params.id);
    res.send('Success!! Notification deleted succesfully')
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});
// ROUTE 7 : get all events of an exisitng mentor: Login required
router.get("/fetchmyEvents", fetchUser, async (req, res) => {
  try {
    const events = await Calendar.find({ user: req.user.id });
    res.json(events);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});
// ROUTE 8 : get all events of an exisitng mentee: Login required
router.get("/fetchmenteeBooking", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const events = await Calendar.find({ createdBy: user.email });
    res.json(events);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});
// ROUTE 8 : get all events of an exisitng mentor: Login required
router.get("/fetchmentorBooking", fetchUser, async (req, res) => {
  try {
    const events = await Calendar.find({ user: req.user.id });
    res.json(events);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});
module.exports = router;
