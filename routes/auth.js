const express = require('express')
const requestAuth = require('../controllers/auth/login')
const callback = require('../controllers/auth/callback')

const router = express.Router()

router.get('/login', requestAuth)
router.get('/callback', callback)

module.exports = router