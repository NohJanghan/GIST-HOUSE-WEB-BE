const express = require('express')
const requestAuth = require('../controllers/auth/login')

const router = express.Router()

router.get('/login', requestAuth)

module.exports = router