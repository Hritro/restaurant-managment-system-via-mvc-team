const express = require('express')
const { verifyJwt } = require('../middlewares/verifyJwt')
const { OrderController } = require('../controllers/ordersController')
const router = express.Router()

router.get('/myorders', OrderController.getMyOrders)

const orderRoutes = router
module.exports = { orderRoutes }