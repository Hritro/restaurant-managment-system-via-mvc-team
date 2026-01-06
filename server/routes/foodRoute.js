const express = require('express')
const { FoodController } = require('../controllers/foodController')
const { verifyJwt } = require('../middlewares/verifyJwt')

const router = express.Router()


router.get('/top-foods', FoodController.getTopFood)

const foodRoutes = router
module.exports = {foodRoutes}



