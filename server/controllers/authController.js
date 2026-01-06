const { handleError } = require("../config/handleError")
const { handleSucess } = require("../config/handleSuccess")
const { foodModel } = require("../models/foodModel")

const FoodController = {
    async updateFood(req,res){
        try{
            const result = await foodModel.update(req.body)
            return handleSucess(res, "Succesfully updated!" , result)
        }catch(error){
            return handleError(res , "Something went wrong!", error)
        }
    },
    async getById(req,res){
        try {
            const {id} = req.params;
            const result = await foodModel.getById(id)
            return handleSucess(res, "Succesfully get the single food!" , result)
        } catch (error) {
            return handleError(res , "Something went wrong!", error)
        }
    },

    async getByMail(req,res){
         try {
            const {email} = req.params;
            const result = await foodModel.getByMail(email)
            return handleSucess(res, "Succesfully get foods by email!" , result)
        } catch (error) {
            return handleError(res , "Something went wrong!", error)
        }
    }
}

module.exports = {FoodController}