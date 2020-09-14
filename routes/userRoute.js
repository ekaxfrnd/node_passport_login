const router = require('express').Router()

const {
    getRegister,
    getLogin
} = require('../controllers/userController')

router.get('/register', getRegister)
router.get('/login', getLogin)

module.exports = router