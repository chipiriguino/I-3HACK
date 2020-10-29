var express = require("express");
var router = express.Router();

const Event = require('../models/events.js');
const User = require('../models/user.js');
const withAuth = require("../helpers/middleware");

/* GET home page. */
router.get('/', withAuth, (req, res, next) => {
  res.render('index', { title: 'I <3 HACK' });
});

// router.use((req, res, next) => {
//   // if hay un usuario en sesión (si está logged in)
//   if (req.session.currentUser) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// });

router.get("/secret", function (req, res, next) {
  res.render("secret");
});

//esto es nuevo
router.get("/faq", withAuth, function (req, res, next) {
  res.render("faq");
});

//esto es nuevo
router.get("/myprofile", withAuth, function (req, res, next) {
  res.render("myprofile");
});

//esto es nuevo
router.get("/events", withAuth, function (req, res, next) {
  res.render("events");
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