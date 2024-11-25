const express = require('express');
const getPlacereservation = require("../controllers/reservation/placereservation");
const postPlacereservation = require("../controllers/reservation/postPlacereservation");

const router = express.Router();

router.get('/', getPlacereservation)
router.post('/', postPlacereservation)

module.exports = router;