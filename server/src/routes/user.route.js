const router = require('express').Router()
const authMiddleware = require('../middlewares/auth')
const { getAllUsers } = require('../controllers/user.controller')

router.get('/users',authMiddleware,getAllUsers)

module.exports = router