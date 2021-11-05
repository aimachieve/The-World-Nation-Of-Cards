const express = require('express')
const router = express.Router()

const userController = require('../../controllers/UserController')
const upload = require('../../middlewares/upload')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/verify-email', userController.verifyEmail)
router.post('/update', upload.single('avatar'), userController.updateProfile)
router.post('/getAllUsers', userController.getAllUsers)

module.exports = router
