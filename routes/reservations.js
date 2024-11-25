const express = require('express');
const prisma = require('../prismaClient');
const router = express.Router();
const Reservation = require("../controllers/reservation/placereservation");

router.get('/placereservation', Reservation)

module.exports = router;