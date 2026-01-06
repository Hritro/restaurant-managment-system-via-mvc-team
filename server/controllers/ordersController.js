const { handleError } = require("../config/handleError")
const { handleSucess } = require("../config/handleSuccess")
const { orderModel } = require("../models/orderModel")


const OrderController = {
    async purchaseOrder(req,res){
        try{
            const data = req.body
            const result = await orderModel.purchase(data)
            return handleSucess(res, "Ordered Successfully!" , result)
        }catch(error){
            return handleError(res , "Something went wrong!", error)
        }
    },
    async addToCart(req,res){
        try{
            const data = req.body
            const result = await orderModel.addToCart(data)
            return handleSucess(res, "Add to cart Successfully!" , result)
        }catch(error){
            return handleError(res , "Something went wrong!", error)
        }
    },
    async getMyCart(req,res){
        try{
            const {email} = req.query
            const result = await orderModel.getCartByEmail(email)
            return handleSucess(res, "Successfully added to cart by email!" , result)
        }catch(error){
            return handleError(res , "Something went wrong!", error)
        }
    },
    async removeFromCart(req,res){
        try{
            const {id} = req.params
            const result = await orderModel.removeFromCartById(id)
            return handleSucess(res, "Removed from cart Successfully!" , result)
        }catch(error){
            return handleError(res , "Something went wrong!", error)
        }
    }
}


module.exports = { OrderController }