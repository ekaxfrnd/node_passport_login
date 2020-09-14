const router = require('express').Router()

const {
    getRegister,
    getLogin,
    postRegister
} = require('../controllers/userController')

router.get('/register', getRegister)
router.get('/login', getLogin)
router.post('/register', postRegister)

module.exports = router