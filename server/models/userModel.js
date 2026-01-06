const { getDB } = require('../config/db')
const userCollection = () => getDB().collection('users');

userModel = {
    async createUser(user){
        return await userCollection().insertOne(user)
    },

    async getUser(){
        return await userCollection().find({}).toArray()
    },

    async getUserByEmail(email){
        return await userCollection().findOne({email})
    }
}

module.exports = { userModel }