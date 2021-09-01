const express = require('express')
const db = require('../../models')
const router = express.Router();

// get all appointments
router.get('/', (req, res) => {
    db.Appointment.findAll({
        include: [db.Patient, db.Doctor]
    })
        .then((appointments) => {
            res.json(appointments)
        })
})

module.exports = router;