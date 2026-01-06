const { handleError } = require("../config/handleError")
const { handleSucess } = require("../config/handleSuccess")
const { orderModel } = require("../models/orderModel")


const OrderController = {
    async getMyOrders(req,res){
        try{
            const {email} = req.query
            const result = await orderModel.ordersByEmail(email)
            return handleSucess(res, "Successfully got orders by email!" , result)
        }catch(error){
            return handleError(res , "Something went wrong!", error)
        }
    },
}
module.exports = { OrderController }