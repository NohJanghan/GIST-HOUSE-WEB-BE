const express = require('express');
const getPlacereservation = require("../controllers/reservation/placereservation");

const router = express.Router();

router.get('/', getPlacereservation)

module.exports = router;