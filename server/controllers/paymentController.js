const { handleError } = require("../config/handleError")
const { handleSucess } = require("../config/handleSuccess")
const { paymentsModel } = require("../models/paymentModel")

const paymentsControllers = {
    async paymentCheckoutSessionController(req, res) {
    try {
      const paymentInfo = req.body;
      const result = await paymentsModel.paymentCheckoutSession(paymentInfo);
      return handleSucess(res,"Payment checkout created successfully!",result);
    } catch (error) {
      return handleError(res, "Something went wrong!", error);
    }
  },
    async paymentSuccessController(req, res) {
        try {
        const { sessionId,cart } = req.body;
        const result = await paymentsModel.paymentSuccess(sessionId,cart);
        return handleSucess(res, "Payment success!", result);
        } catch (error) {
        return handleError(res, "Something went wrong!", error);
        }
  },
    async getSessionController(req,res){
        try{
            const { sessionId } = req.query;
            const session = await paymentsModel.getSession(sessionId);
            return handleSucess(res, 'Session fetched', session);
        }catch(error){
            return handleError(res, 'Something went wrong fetching session', error);
        }
    },
    async userPaymentsController(req,res){
      try{
        const { email } = req.query;
        const payments = await paymentsModel.userPayments(email);
        return handleSucess(res, 'User payments fetched successfully', payments);
      }catch(error){
        return handleError(res, 'Something went wrong fetching user payments', error);
      }
    },
}

module.exports = {paymentsControllers}