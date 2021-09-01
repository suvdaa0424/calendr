var express = require('express');
const db = require('../../models')
var router = express.Router();

// POST /api/v1/doctors
router.post('/', function(req, res, next) {
  // check for all required fields
  if (!req.body || !req.body.name) {
    // if not all, send error
    res.status(422).json({ error: 'must include name' })
    return
  }
  // create a new doctor
  db.Doctor.create({
    name: req.body.name,
    specialty: req.body.specialty,
    location: req.body.location
  })
    .then((doctor) => {
      // send new doctor as response
      res.status(201).json(doctor)
    })
});

module.exports = router;
