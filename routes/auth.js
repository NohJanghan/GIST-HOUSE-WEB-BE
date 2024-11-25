const express = require('express')
const requestAuth = require('../controllers/auth/login')
const callback = require('../controllers/auth/callback')
const logout = require('../controllers/auth/logout')
const getUserInfo = require('../controllers/auth/getUserInfo')

const router = express.Router()

router.get('/login', requestAuth)
router.get('/callback', callback)
router.post('/logout', logout)
router.get('/userinfo', getUserInfo)

module.exports = router