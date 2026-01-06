const express = require('express')
const { verifyJwt } = require('../middlewares/verifyJwt')
const { paymentsControllers } = require('../controllers/paymentController')
const router = express.Router()

router.post('/payment-checkout', paymentsControllers.paymentCheckoutSessionController)
router.post('/payment-success', paymentsControllers.paymentSuccessController)
// router.get('/payment-session', paymentsControllers.getSessionController)
router.get('/user-payments', paymentsControllers.userPaymentsController)

const paymentsRoute = router
module.exports = {paymentsRoute}