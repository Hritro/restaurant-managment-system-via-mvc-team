const express = require('express')
const { FoodController } = require('../controllers/foodController')
const { verifyJwt } = require('../middlewares/verifyJwt')

const router = express.Router()

router.put('/update-food', verifyJwt, FoodController.updateFood)
router.get('/food/:id', FoodController.getById)
router.get('/myfood/:email', verifyJwt, FoodController.getByMail)
const foodRoutes = router
module.exports = {foodRoutes}



