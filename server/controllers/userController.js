const { handleError } = require("../config/handleError")
const { handleSucess } = require("../config/handleSuccess")


const userController = {
    async createUser(req,res){
        try {
            const user = req.body;
            const result = await userModel.createUser(user);
            return handleSucess(res, "Succesfully added!" , result)
        } catch (error) {
            return handleError(res , "Something went wrong!", error)
        }
    },

    async getUser(req,res){
        try {
            const result = await userModel.getUser();
            return handleSucess(res, "Successfully retrieved!", result)
        } catch (error) {
            return handleError(res , "Something went wrong!", error)
        }
    },

    async getUserByEmail(req,res){
        try {
            const {email} = req.query;
            const result = await userModel.getUserByEmail(email);
            return handleSucess(res, "Successfully retrieved user by email!" , result)
        } catch (error) {
            return handleError(res , "Something went wrong!", error)
        }
    }
}

module.exports = { userController }