var express = require("express");
var router = express.Router();

const Event = require('../models/events.js');
const User = require('../models/user.js');

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home");
});

router.use((req, res, next) => {
  // if hay un usuario en sesión (si está logged in)
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

router.get("/secret", function (req, res, next) {
  res.render("secret");
});


//ADDING NEW EVENT FUNCTIONS:
router.get('/events/add-event', (req, res, next) => {
  res.render('add-event');
});
 
router.post('/events/add-event', (req, res, next) => {
  const { /*HERE WE NEED TO DESTRUCTURE THE MODEL WHENEVER WE HAVE IT */ } = req.body;
 
  const newEvent = new Event({ /*HERE WE NEED TO DESTRUCTURE THE MODEL WHENEVER WE HAVE IT */ });
  newEvent
    .save()
    .then(event => {
      res.redirect('/all-events');
    })
    .catch(error => {
      next(error);
    });
});



module.exports = router;