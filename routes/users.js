var express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models');
var router = express.Router();

// POST /users/register
router.post('/register', function(req, res, next) {
  // check for email & password
  if (!req.body || !req.body.email || !req.body.password) {
    // respond with error if not included
    res.status(422).json({ error: 'must include email & password'})
    return
  }
  // hash password
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      // store user details
      db.User.create({
        email: req.body.email,
        password: hash
      })
        .then((user) => {
          // respond with success
          res.status(201).json(user);
        })
    })
});

// POST /users/login
router.post('/login', (req, res) => {
  // check for email & password
  if (!req.body || !req.body.email || !req.body.password) {
    // respond with error if not included
    res.status(422).json({ error: 'must include email & password'})
    return
  }

  // find user
  db.User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      // check user password
      bcrypt.compare(req.body.password, user.password)
        .then((success) => {
          if (success) {
            // log in user
            req.session.user = user;
            res.json({ message: 'successfully logged in' })
          } else {
            // incorrect password
            res.status(401).json({ error: 'incorrect password' })
          }
        })
    })
})

router.get('/logout', (req, res) => {
  // tell express that the user logged out
  req.session.user = null;
  // send response to show it worked
  res.json({ message: 'successfully logged out' })
})

module.exports = router;
