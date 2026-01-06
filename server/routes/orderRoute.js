const express = require('express')
const { userController } = require('../controllers/userController')
const router = express.Router()

router.post('/user', userController.createUser)
router.get('/users', userController.getUser)
router.get('/user', userController.getUserByEmail)


const userRoutes = router


module.exports = {userRoutes}